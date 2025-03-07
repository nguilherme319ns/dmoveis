
const livro = {
    titulo: "O Senhor dos Anéis",
    autor: "J.R. Tolkien",
    ano: 1954
};

const { titulo, autor } = livro;
console.log(`Título: ${titulo}`);
console.log(`Autor: ${autor}`);

function obterInfoLivro({ titulo, autor }) {
    return `O livro "${titulo}" foi escrito por ${autor}.`;
}

const infoLivro = obterInfoLivro(livro);
console.log(infoLivro);