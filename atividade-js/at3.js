

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Digite sua idade: ", (idade) => {
    idade = parseInt(idade); 

    if (idade < 18) {
        console.log("Você é menor de idade.");
    } else if (idade >= 65) {
        console.log("Você é idoso.");
    } else {
        console.log("Você é maior de idade.");
    }

    rl.close();
});