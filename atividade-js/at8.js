
const pessoa = {
    nome: "Carlos",
    idade: 28,
    cidade: "São Paulo"
};

pessoa.profissao = "Desenvolvedor";
console.log("Objeto após adicionar profissão:", pessoa);

delete pessoa.idade;
console.log("Objeto após remover a propriedade 'idade':", pessoa);

console.log("Propriedades do objeto:");
for (let chave in pessoa) {
    console.log(`${chave}: ${pessoa[chave]}`);
}
const livro = {
    titulo: "O Senhor dos Anéis",
    autor: "J.R. Tolkien",
    ano: 1954
};

const { titulo, autor } = livro;
console.log(`Título: ${titulo}`);
console.log(`Autor: ${autor}`);

function obterInfoLivro(livro) {
    const { titulo, autor } = livro;
    return `O livro "${titulo}" foi escrito por ${autor}.`;
}

const infoLivro = obterInfoLivro(livro);
console.log(infoLivro);