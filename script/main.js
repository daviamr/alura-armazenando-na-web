const form = document.getElementById("novoItem");
const list = document.getElementById("lista");
const listaDeItens = JSON.parse(localStorage.getItem("items")) || []; //JSON.parse converte o string em array novamente, após isso, localStorage verifique se há itens dentro de array, caso não tenha, crie um array vazio

listaDeItens.forEach((elemento) => {
  criaElemento(elemento);
});

//Evento de submit do formulário
form.addEventListener("submit", (evento) => {
  evento.preventDefault(); //Prevenindo o evento padrão do submit
  const nome = evento.target.elements["nome"];
  const quantidade = evento.target.elements["quantidade"];

  const existe = listaDeItens.find((elemento) => elemento.nome === nome.value);

  const itemAtual = {
    nome: nome.value,
    quantidade: quantidade.value,
  };

  if (existe) {
    itemAtual.id = existe.id;
    atualizaElemento(itemAtual);
  } else {
    itemAtual.id = listaDeItens.length;
    criaElemento(itemAtual);
    listaDeItens.push(itemAtual);
  }

  localStorage.setItem("items", JSON.stringify(listaDeItens)); //JSON.stringify convertendo o objetos em string para salvar no localStorage

  nome.value = "";
  quantidade.value = "";
});

//Função responsável por criar o novo elemento
function criaElemento(item) {
  const novoItem = document.createElement("li");
  novoItem.classList.add("item");

  const quantidadeItem = document.createElement("strong");
  quantidadeItem.innerHTML = item.quantidade;
  quantidadeItem.dataset.id = item.id;

  novoItem.appendChild(quantidadeItem);
  novoItem.innerHTML += item.nome;

  list.appendChild(novoItem);
}

//Função responsável por atualizar o elemento
function atualizaElemento(item) {
  const elementoQuant = document.querySelector("[data-id='" + item.id + "']");
  console.log(elementoQuant);
}
