var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

const porcentagemComissao = 15.0;
var nome = (lines.shift());
var salario = Number(parseFloat(lines.shift()).toFixed(2));
var montanteVendas = Number(parseFloat(lines.shift()).toFixed(2));
var comissao = (montanteVendas * porcentagemComissao) / 100

console.log("TOTAL = R$ " + (salario + comissao).toFixed(2))
