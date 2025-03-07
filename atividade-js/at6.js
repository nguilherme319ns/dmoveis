
const numeros = [10, 20, 30, 40, 50];

numeros.push(60);
console.log(`Array após adicionar 60 no final: ${numeros}`);

numeros.shift();
console.log(`Array após remover o primeiro número: ${numeros}`);

const maiorNumero = Math.max(...numeros);
console.log(`Maior número do array: ${maiorNumero}`);

const menorNumero = Math.min(...numeros);
console.log(`Menor número do array: ${menorNumero}`);