var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

var valoresPositivos = lines.filter(item => parseFloat(item) > 0).map(item => parseFloat(item));
var total = valoresPositivos.reduce((total, item) => total + item);
total = total / valoresPositivos.length;
console.log(`${valoresPositivos.length} valores positivos`);
console.log(`${total.toFixed(1)}`);
