express = require('express');
var nome = "Adriano";
var sobrenome = "Dias";
var idade = 51;

const identidade = { nome, sobrenome, idade };
const idJson = JSON.stringify(identidade);
console.log(identidade);
console.log(idJson);
