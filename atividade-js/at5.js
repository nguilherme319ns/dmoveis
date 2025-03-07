
function calcularNumeros(num) {
    const dobro = num * 2;
    const triplo = num * 3;
    const quadrado = num * num;

    return { dobro, triplo, quadrado };
}

const resultado = calcularNumeros(5);

console.log(`Dobro: ${resultado.dobro}`);
console.log(`Triplo: ${resultado.triplo}`);
console.log(`Quadrado: ${resultado.quadrado}`);