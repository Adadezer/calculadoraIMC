// IMC DATA
const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
  },
];

// Seleção de elementos

const imcTable = document.querySelector('#imc-table');

const heightInput = document.querySelector('#height');
const wightInput = document.querySelector('#weight');
const calcBtn = document.querySelector('#calc-btn');
const clearBtn = document.querySelector('#clear-btn');

// Funções

function createTable(data) {
  data.forEach((element) => {
    const div = document.createElement('div');
    div.classList.add('table-data');

    const classification = document.createElement('p');
    classification.innerText = element.classification;

    const info = document.createElement('p');
    info.innerText = element.info;

    const obesity = document.createElement('p');
    obesity.innerText = element.obesity;

    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);

    imcTable.appendChild(div);
  });
}

// Inicialização

createTable(data);
// Eventos