var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

var notas = lines[0].split(" ");
var nota1 = parseFloat(notas.shift());
var nota2 = parseFloat(notas.shift());
var nota3 = parseFloat(notas.shift());
var nota4 = parseFloat(notas.shift());

var media = (nota1 * 2 + nota2 * 3 + nota3 * 4 + nota4 * 1) / 10;
console.log(`Media: ${media.toFixed(1)}`);

if (media >= 7.0) {
    console.log("Aluno aprovado.");
} else if (media < 5.0) {
    console.log("Aluno reprovado.");
} else if (media >= 5.0 && media <= 6.9) {
    console.log("Aluno em exame.");
    var exame = parseFloat(lines[1]);
    console.log(`Nota do exame: ${exame.toFixed(1)}`);
    var mediaFinal = (exame + media) / 2;

    if (mediaFinal >= 5.0) {
        console.log("Aluno aprovado.");
    } else {
        console.log("Aluno reprovado.");
    }
    console.log(`Media final: ${mediaFinal.toFixed(1)}`);
} 
