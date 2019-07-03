var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

var x = parseInt(lines.shift());
var y = parseInt(lines.shift());

var menor = Math.min(x, y);
var maior = Math.max(x, y);
var soma = 0;

for (let index = menor; index < maior - 1; index++) {
    ((index + 1) % 2 !== 0) ? soma += (index + 1) : soma;
}

console.log(soma);
