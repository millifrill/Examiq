import {
  appState,
  findId,
  getCollections,
  getQuizcards,
  addNewQuiz,
  addNewCollection,
  clearInputs,
  getQuiz,
  setCollectionInfo,
  setErrorInfo,
  setSuccessMessage,
  deleteQuizcards,
  updateQuiz,
} from './helperFunctions.js';

const pageState = {
  selectedCategory: localStorage.getItem('selectedCategory'),
  collectionNameTextbox: localStorage.getItem('collectionNameTextbox'),
  selectedCollection: localStorage.getItem('selectedCollection'),
  selectedCollectionName: localStorage.getItem('selectedCollectionName'),
  questionsInCollection: localStorage.getItem('questionsInCollection'),
  questionBox: localStorage.getItem('questionBox'),
  correctAnswerBox: localStorage.getItem('correctAnswerBox'),
  answerOption1: localStorage.getItem('answerOption1'),
  answerOption2: localStorage.getItem('answerOption2'),
  answerOption3: localStorage.getItem('answerOption3'),
};

let selectedSvg = pageState.selectedCategory || 'geography';

const svgOptions = document.querySelector('.svgOptions');
const selectSvgButton = document.querySelector('.svg-select-button');
const collectionName = document.querySelector('.collection-name-textbox');
collectionName.value = pageState.collectionNameTextbox || '';
const collectionQuizzes = document.querySelector('.cardSelect');
const createCollectionButton = document.querySelector(
  '.create-collection-button',
);

const collectionsSelect = document.querySelector('#Select-Collection');
const selectedCollection = document.querySelector('.selected-collection-text');
const inputSection = document.querySelector('.input-section');
const shareCollection = document.querySelector('#shareCollection');
const cardSelect = document.querySelector('.cardSelect');
const question = document.querySelector('.question-box');
const correctAnswer = document.querySelector('#correctAnswer');
const option1 = document.querySelector('.optionone');
const option2 = document.querySelector('.optiontwo');
const option3 = document.querySelector('.optionthree');
const errorOut = document.querySelector('.errorOut');
const addButton = document.querySelector('.addButton');
const deleteButton = document.querySelector('.deleteButton');

let inputValues = {
  collectionId: null,
  collectionName: localStorage.getItem('collectionNameTextbox') || '',
  sharedCollection: false,
  quizQuestion: '',
  quizCorrectAnswer: '',
  quizAnswer1: '',
  quizAnswer2: '',
  quizAnswer3: '',
  categoryId: null,
};
let collectionCards;
let selectedCollectionName;
let collections;
let user = 1;
let submitType = 'add';
let selectedQuizId;

updateSvg();
collectionsOptionInit('init');

shareCollection.addEventListener('change', () => {
  inputValues.sharedCollection = shareCollection.checked;
  console.log(inputValues.sharedCollection);
});

createCollectionButton.addEventListener('click', async () => {
  const response = await addNewCollection({
    collectionName: inputValues.collectionName,
    collectionType: 'quiz',
    sharedCollection: false,
    createdBy: user,
  });
  svgOptions.classList.remove('active');
  collectionName.value = '';
  localStorage.setItem('collectionNameTextbox', '');
  collectionsOptionInit();
  setCollectionInfo('Ny samling skapad!');
});

collectionsSelect.addEventListener('input', async (e) => {
  e.preventDefault();
  collectionQuizzes.innerHTML = '';
  collectionQuizzes.options[0] = new Option('Ny fråga');
  const selectedOption = e.target.selectedOptions[0];
  const selectedValue = e.target.value;
  const selectedName = selectedOption.textContent;
  localStorage.setItem('selectedCollection', e.target.selectedOptions[0]);
  localStorage.setItem('selectedCollectionName', selectedOption.textContent);
  appState.selectedCollection = e.target.value;
  inputValues.collectionId = e.target.value;
  console.log(selectedValue);
  selectedCollection.textContent = selectedName;
  inputSection.classList.add('active');
  collectionCards = await getQuizcards(e.target.value);
  console.log(collectionCards);
  updateCardSelection();
});

collectionName.addEventListener('input', () => {
  inputValues.collectionName = collectionName.value;
  localStorage.setItem('collectionNameTextbox', collectionName.value);
});

cardSelect.addEventListener('input', async () => {
  const selectedOption = cardSelect.selectedOptions[0];
  const selectedValue = selectedOption.value;
  localStorage.setItem('selectedQuestion', selectedOption.value);
  console.log('selected: ', selectedValue);
  selectedQuizId = selectedValue;
  console.log('you can now delete quiz with id: ', selectedQuizId);
  if (selectedValue === 'Ny fråga') {
    clearInputs();
    setAddEditButton('add');
    return;
  }
  const quizData = await getQuiz(selectedValue);
  console.log('Quizdata: ', quizData);
  question.value = quizData.quizQuestion;
  correctAnswer.value = quizData.quizCorrectAnswer;
  option1.value = quizData.quizAnswer1;
  option2.value = quizData.quizAnswer2;
  option3.value = quizData.quizAnswer3;
  inputValues.quizQuestion = quizData.quizQuestion;
  inputValues.quizCorrectAnswer = quizData.quizCorrectAnswer;
  inputValues.quizAnswer1 = quizData.quizAnswer1;
  inputValues.quizAnswer2 = quizData.quizAnswer2;
  inputValues.quizAnswer3 = quizData.quizAnswer3;
  setAddEditButton('edit');
});

question.addEventListener('input', () => {
  inputValues.quizQuestion = question.value;
  localStorage.setItem('questionBox', inputValues.quizQuestion);
  console.log(inputValues.quizQuestion);
});

correctAnswer.addEventListener('input', () => {
  inputValues.quizCorrectAnswer = correctAnswer.value;
  console.log(inputValues.quizCorrectAnswer);
});

option1.addEventListener('input', () => {
  inputValues.quizAnswer1 = option1.value;
  console.log(inputValues.quizAnswer1);
});

option2.addEventListener('input', () => {
  inputValues.quizAnswer2 = option2.value;
  console.log(inputValues.quizAnswer2);
});

option3.addEventListener('input', () => {
  inputValues.quizAnswer3 = option3.value;
  console.log(inputValues.quizAnswer3);
});

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

addButton.addEventListener('click', async () => {
  if (submitType === 'edit') {
    const data = await updateQuiz(inputValues, selectedQuizId);
    if (data.error) {
      setErrorInfo('Du måste fylla i alla fält');
      return;
    }
  } else {
    const data = await addNewQuiz(inputValues);
    if (data.error) {
      setErrorInfo('Du måste fylla i alla fält');
      return;
    }
  }
  clearQuizFields();
  // collectionsOptionInit();
  setSuccessMessage('Fråga tillagd!');
  collectionCards = await getQuizcards(e.target.value);
  console.log(collectionCards);
  updateCardSelection();
});

deleteButton.addEventListener('click', async () => {
  if (!selectedQuizId) return;
  const data = await deleteQuizcards(selectedQuizId);

  if (data.error) {
    setErrorInfo('Kunde inte ta bort frågan');
    return;
  }
  clearQuizFields();
  collectionsOptionInit();
  setSuccessMessage('Fråga borttagen!');
});

function updateCardSelection() {
  if (collectionCards?.error || collectionCards?.length === 0) {
    collectionQuizzes.options[0] = new Option('Inga frågor');
    return;
  }
  try {
    for (const card of collectionCards) {
      const quizOption = document.createElement('option');
      const quizId = card.quizId;
      quizOption.value = quizId;
      quizOption.textContent = card.quizQuestion.slice(0, 10);
      collectionQuizzes.appendChild(quizOption);
    }
  } catch (err) {
    console.log('Cant list questions', err);
  }
}

function updateSvg() {
  selectSvgButton.innerHTML = appState.svg[selectedSvg];
  localStorage.setItem('selectedCategory', selectedSvg);
  inputValues.categoryId = findId(selectedSvg);
  console.log(inputValues.categoryId);
}

selectSvgButton.addEventListener('click', () => {
  const svgOptions = document.querySelector('.svgOptions');
  svgOptions.classList.toggle('active');
});

async function collectionsOptionInit() {
  collectionsSelect.innerHTML = '';
  collections = await getCollections('quiz');
  if (collections) {
    const option = document.createElement('option');
    option.value = 'Välj samling';
    option.textContent = 'Välj samling';
    collectionsSelect.appendChild(option);
    for (const collection of collections) {
      const option = document.createElement('option');
      option.value = collection.collectionId;

      option.textContent = collection.collectionName;
      option.name = collection.collectionName;
      console.log(collection.collectionName);
      collectionsSelect.appendChild(option);
      selectedCollectionName = collection.collectionName;
    }
  }
  console.log(collections);
}

function setAddEditButton(setting) {
  if (setting === 'edit') {
    addButton.textContent = 'Spara ändringar';
    submitType = 'edit';
  } else if (setting === 'add') {
    addButton.textContent = 'Lägg till fråga';
    submitType = 'add';
  } else {
    console.log('Invalid setting for add/edit button');
  }
}

function clearQuizFields() {
  clearInputs();
  inputValues.quizQuestion = '';
  inputValues.quizAnswer1 = '';
  inputValues.quizAnswer2 = '';
  inputValues.quizAnswer3 = '';
}
