var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

var a = parseFloat(lines.shift());
const n = 3.14159

console.log('A=' + (n * Math.pow(a, 2)).toFixed(4));
