var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split("\n");
var notasDisponiveis = [100, 50, 20, 10, 5, 2, 1]
var valor = parseInt(lines.shift());

var contaNotas = function (valor, notas, quantias) {
    if (notas.length === 0) {
        return quantias;
    }

    divisaoCelulas = valor % notas[0];
    
    if (divisaoCelulas != valor) {
        quantidadeNotas = parseInt(valor / notas[0]);
        quantias.push(quantidadeNotas);
        valor = divisaoCelulas;
    } else {
        quantias.push(0);
    }

    notas.shift();
    return contaNotas(valor, notas, quantias);
};

var result = contaNotas(valor, notasDisponiveis.slice(), []);
console.log(valor);
result.forEach(function(item, index) {
    console.log(item + " nota(s) de R$ " + notasDisponiveis[index]+ ",00");
});
