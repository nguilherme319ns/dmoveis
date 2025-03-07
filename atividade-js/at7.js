
const frutas = ["Maçã", "Banana", "Abacaxi", "Laranja"];

const frutasMaiusculas = frutas.map(fruta => fruta.toUpperCase());
console.log(`Frutas em maiúsculas: ${frutasMaiusculas}`);

const frutasComA = frutas.filter(fruta => fruta[0].toUpperCase() === 'A');
console.log(`Frutas que começam com 'A': ${frutasComA}`);

const comprimentoDasFrutas = frutas.map(fruta => fruta.length);
console.log(`Comprimento de cada fruta: ${comprimentoDasFrutas}`);