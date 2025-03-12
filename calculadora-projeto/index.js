
import { soma, subtracao, multiplicacao, divisao } from './calculadora.js';
import moment from 'moment';

console.log("Soma: ", soma(10, 5));
console.log("Subtração: ", subtracao(10, 5));
console.log("Multiplicação: ", multiplicacao(10, 5));
console.log("Divisão: ", divisao(10, 5));

function calcularIdade(anoNascimento) {
  const hoje = moment();
  const dataNascimento = moment({ year: anoNascimento });
  return hoje.diff(dataNascimento, 'years');
}

const anoNascimento = 1990;
const idade = calcularIdade(anoNascimento);
console.log(`Idade: ${idade} anos`);