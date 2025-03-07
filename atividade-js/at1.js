

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Coloque aqui a string: ", (string) => {
    rl.question("Digite o caractere que será alterado: ", (letraASerTrocada) => {
        rl.question(`Digite o caractere por qual você irá substituir a letra "${letraASerTrocada}": `, (letraSubstituta) => {
            console.log(`\nResultados:`);
            console.log(`Maiúscula: ${string.toUpperCase()}`);
            console.log(`Minúscula: ${string.toLowerCase()}`);
            console.log(`Invertida: ${string.split('').reverse().join('')}`);
            console.log(`Texto modificado: ${string.replace(new RegExp(letraASerTrocada, 'g'), letraSubstituta)}`);

            rl.close();
        });
    });
});