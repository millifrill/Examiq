import { appState, findId } from './helperFunctions.js';

let selectedSvg = 'geography';

let inputValues = {
  collectionId: 1,
  collectionName: '',
  quizQuestion: '',
  quizCorrectAnswer: '',
  quizAnswer1: '',
  quizAnswer2: '',
  quizAnswer3: '',
  categoryId: 'geography',
};

findId(selectedSvg);

const button = document.querySelector('.addButton');

const collectionName = document.querySelector('.collection-name-textbox');

collectionName.addEventListener('input', () => {
  inputValues.collectionName = collectionName.value;
  // console.log(inputValues.collectionName);
});

//MARK: Question
const question = document.querySelector('.question-box');

question.addEventListener('input', () => {
  inputValues.quizQuestion = question.value;
  console.log(inputValues.quizQuestion);
});

//MARK: Correct Answer
const correctAnswer = document.querySelector('#correctAnswer');

correctAnswer.addEventListener('input', () => {
  inputValues.quizCorrectAnswer = correctAnswer.value;
  console.log(inputValues.quizCorrectAnswer);
});

// MARK: option1
const option1 = document.querySelector('.optionone');

option1.addEventListener('input', () => {
  inputValues.quizAnswer1 = option1.value;
  console.log(inputValues.quizAnswer1);
});
// MARK: option2
const option2 = document.querySelector('.optiontwo');

option2.addEventListener('input', () => {
  inputValues.quizAnswer2 = option2.value;
  console.log(inputValues.quizAnswer2);
});
// MARK: option3
const option3 = document.querySelector('.optionthree');

option3.addEventListener('input', () => {
  inputValues.quizAnswer3 = option3.value;
  console.log(inputValues.quizAnswer3);
});

const quizSvgBox = document.querySelector('.svg-select-button');
updateSvg();
function updateSvg() {
  quizSvgBox.innerHTML = appState.svg[selectedSvg];
  inputValues.categoryId = findId(selectedSvg);
  console.log(inputValues.categoryId);
}
const selectSvgButton = document.querySelector('.svg-select-button');
selectSvgButton.addEventListener('click', () => {
  const svgOptions = document.querySelector('.svgOptions');
  svgOptions.classList.toggle('active');
});

const svgOptions = document.querySelector('.svgOptions');

for (const key in appState.svg) {
  const svgOption = document.createElement('button');
  svgOption.classList.add('svgOption');
  svgOption.value = key;

  // const title = document.createElement('div');
  // title.classList.add('svgTitle');
  // title.textContent = key;
  const image = document.createElement('div');
  image.classList.add('svgImage');
  image.innerHTML = appState.svg[key];
  // svgOption.appendChild(title);
  svgOption.appendChild(image);
  svgOption.addEventListener('click', () => {
    selectedSvg = key;
    svgOptions.classList.toggle('active');
    updateSvg();
  });

  svgOptions.appendChild(svgOption);
}

button.addEventListener('click', async () => {
  try {
    const response = await fetch('http://localhost:3000/api/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json ' },
      body: JSON.stringify(inputValues),
    });
    if (response) {
      console.log(response);
    }
  } catch {
    console.log('gick fel på något vis');
  }
});
