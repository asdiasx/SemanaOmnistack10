var string = ['teste', 'de', 'mapeamento', 'array'].map(function (variavel, indice, array) {
  console.log(array);
  console.log(indice);

  return variavel.toUpperCase()
});


console.log(string);