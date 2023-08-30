const form = document.getElementById("novoItem");
const list = document.getElementById("lista");

//JSON.parse converte o string em array novamente, após isso, localStorage verifique se há itens dentro de array, caso não tenha, crie um array vazio
const listaDeItens = JSON.parse(localStorage.getItem("items")) || [];

//Laço para criar elemento com dados do localstorage
listaDeItens.forEach((elemento) => {
  criaElemento(elemento);
});

//Evento de submit do formulário
form.addEventListener("submit", (evento) => {
  evento.preventDefault(); //Prevenindo o evento padrão do submit
  //Variáveis para acessar os campos de input
  const nome = evento.target.elements["nome"];
  const quantidade = evento.target.elements["quantidade"];

  //Condicional para validar se os campos estão preenchidos corretamente
  if (nome.value.trim() == "" || quantidade.value.trim() == "") {
    alert("Preencha os campos corretamente.");
    return;
  }

  //Verificando se o item que foi submitado já existe no localstorage
  const existe = listaDeItens.find((elemento) => elemento.nome === nome.value);

  //Objeto de item para adicionar valores ao localStorage
  const itemAtual = {
    nome: nome.value,
    quantidade: quantidade.value,
  };

  if (existe) { //Caso o elementro já exista na array faça;

    //Atribuindo ao item atual o id do item existente
    itemAtual.id = existe.id;

    //Atualizando a quantidade do item existente
    atualizaElemento(itemAtual);

    //Refatoração da condicional if else, atualizando um id para cada item
    listaDeItens[listaDeItens.findIndex(elemento => elemento.id === existe.id )] = itemAtual;

  } else { //Caso não exista, faça;

    itemAtual.id = listaDeItens[listaDeItens.length -1] ? listaDeItens[listaDeItens.length -1].id + 1 : 0;

    criaElemento(itemAtual);
    listaDeItens.push(itemAtual);
  }

  //JSON.stringify convertendo o objetos em string para salvar no localStorage
  localStorage.setItem("items", JSON.stringify(listaDeItens));

  //Restaurando os campos vazioas após o submit
  nome.value = "";
  quantidade.value = "";
});

//Função responsável por criar o novo elemento
function criaElemento(item) {
  const novoElemento = document.createElement("li");
  novoElemento.classList.add("item");

  const quantidadeItem = document.createElement("strong");
  quantidadeItem.innerHTML = item.quantidade;
  quantidadeItem.dataset.id = item.id;

  novoElemento.appendChild(quantidadeItem);
  novoElemento.innerHTML += item.nome;

  novoElemento.appendChild(botaoDeleta(item.id));
  list.appendChild(novoElemento);
}

//Função responsável por atualizar o elemento
function atualizaElemento(item) {
  //Declarando variável para armazenar tag strong com mesmo id do item passado
  const quantidade = document.querySelector("[data-id='" + item.id + "']");
  //Atribuindo ao valor dentro da tag strong já criada a quantidade atua
  quantidade.innerHTML = item.quantidade;
}

function botaoDeleta (id) {
  const elementoBotao = document.createElement('button');
  elementoBotao.innerText = 'X'
  elementoBotao.style.cursor = 'pointer';

  elementoBotao.addEventListener('click', function () {
    deletaElemento(this.parentNode, id);
  })
  return elementoBotao;
}

function deletaElemento (tag, id) {
  tag.remove();

  listaDeItens.splice(listaDeItens.findIndex(elemento => elemento.id === id), 1);

  localStorage.setItem("items", JSON.stringify(listaDeItens));
}
