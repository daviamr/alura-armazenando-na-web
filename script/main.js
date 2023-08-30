const form = document.getElementById("novoItem");
const list = document.getElementById("lista");

//JSON.parse converte o string em array novamente, após isso, localStorage verifique se há itens dentro de array, caso não tenha, crie um array vazio
const listaDeItens = JSON.parse(localStorage.getItem("items")) || [];

listaDeItens.forEach((elemento) => {
  criaElemento(elemento);
});
console.log(listaDeItens)

//Evento de submit do formulário
form.addEventListener("submit", (evento) => {
  evento.preventDefault(); //Prevenindo o evento padrão do submit
  const nome = evento.target.elements["nome"];
  const quantidade = evento.target.elements["quantidade"];

  const existe = listaDeItens.find((elemento) => elemento.nome === nome.value); //Verificando se o elemento já existe dentro da array

  const itemAtual = { //Objeto esqueleto do elemento criado
    nome: nome.value,
    quantidade: quantidade.value,
  };

  if (existe) { //Caso o elementro já exista na array faça;
    itemAtual.id = existe.id;
    atualizaElemento(itemAtual);
    listaDeItens[existe.id] = itemAtual;
  } else { //Caso não exista, faça;
    itemAtual.id = listaDeItens.length;
    criaElemento(itemAtual);
    listaDeItens.push(itemAtual);
  }

  localStorage.setItem("items", JSON.stringify(listaDeItens)); //JSON.stringify convertendo o objetos em string para salvar no localStorage

  //Restaurando os campos vazioas após o submit
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
  document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}
