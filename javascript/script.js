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
const weightInput = document.querySelector('#weight');
const calcBtn = document.querySelector('#calc-btn');
const clearBtn = document.querySelector('#clear-btn');

const calcContainer = document.querySelector('#calc-container');
const resultContainer = document.querySelector('#result-container');

const imcNumber = document.querySelector('#imc-number span');
const imcInfo =  document.querySelector('#imc-info span');

const backBtn = document.querySelector('#back-btn');

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

function cleanInputs() {
  heightInput.value = '';
  weightInput.value = ''
  imcNumber.classList = '';
  imcInfo.classList = '';
}

function validDigits(text) {
  // Substitui tudo que não for número ou vírgula por vazio
  text = text.replace(/[^0-9,]/g, '');

  // Verifica se há mais de uma vírgula
  let hasMultipleCommas = (text.match(/,/g) || []).length > 1;

  // Verifica se há casas decimais depois da vírgula
  let hasDecimalPlaces = text.indexOf(',') !== -1 && text.split(',')[1].length > 2;

  if (hasMultipleCommas || hasDecimalPlaces) {
    // Retorna vazio se houver mais de uma vírgula ou mais de duas casas decimais
    return '';
  }

  return text;
}

function calcImc(height, weight) {
  const imc = (weight / (height * height)).toFixed(1);
  return imc;
}

function showOrHideResults() {
  calcContainer.classList.toggle('hide');
  resultContainer.classList.toggle('hide');
}

// Inicialização

createTable(data);

// Eventos
[heightInput, weightInput].forEach((el) => {
  el.addEventListener('input', (e) => {
    const updatedValue = validDigits(e.target.value);

    e.target.value = updatedValue;
  });
});

calcBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const weight = +weightInput.value.replace(',', '.');
  const height = +heightInput.value.replace(',', '.');

  if (!weight || !height) return;

  const imc = calcImc(height, weight);

  let info;

  data.forEach((element) => {
    if (imc >= element.min && imc <= element.max) {
      info = element.info;
    }
  });

  if (!info) return;

  imcNumber.innerText = imc;
  imcInfo.innerText = info;

  switch (info) {
    case 'Magreza':
      imcNumber.classList.add('low');
      imcInfo.classList.add('low');
      break;

    case 'Normal':
      imcNumber.classList.add('good');
      imcInfo.classList.add('good');
      break;
        
    case 'Sobrepeso':
      imcNumber.classList.add('low');
      imcInfo.classList.add('low');
      break;
      
    case 'Obesidade':
      imcNumber.classList.add('medium');
      imcInfo.classList.add('medium');
      break;
    
    case 'Obesidade grave':
      imcNumber.classList.add('high');
      imcInfo.classList.add('high');
      break;
  }

  showOrHideResults();
});

clearBtn.addEventListener('click', (e) => {
  e.preventDefault();
  cleanInputs();
})

backBtn.addEventListener('click', () => {
  cleanInputs();
  showOrHideResults();
});