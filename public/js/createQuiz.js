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
  setQuizInfo,
  deleteQuizcards,
  updateQuiz,
  updateCollection,
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

let selectedSvg = pageState.selectedCategory || 1;

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
const addButton = document.querySelector('.addButton');
const deleteButton = document.querySelector('.deleteButton');

let collectionCards;
// let selectedCollectionName;
let collections;
let user = 1;
let submitType = 'add';
let selectedQuizId;

let inputValues = {
  collectionId: null,
  collectionName: localStorage.getItem('collectionNameTextbox') || '',
  collectionType: 'quiz',
  sharedCollection: false,
  collectionCategory: pageState.selectedCategory || 3,
  quizQuestion: '',
  quizCorrectAnswer: '',
  quizAnswer1: '',
  quizAnswer2: '',
  quizAnswer3: '',
  categoryId: null,
  createdBy: user,
};

updateSvg();
collectionsOptionInit('init');

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
      // console.log(collection.collectionName);
      collectionsSelect.appendChild(option);
      selectedCollectionName = collection.collectionName;
    }
  }
  console.log(collections);
  clearQuizFields();
}

shareCollection.addEventListener('change', async () => {
  inputValues.sharedCollection = shareCollection.checked;

  const response = await updateCollection(inputValues);
  if (response.error) {
    setCollectionInfo(response.error, 1);
    return;
  }

  setQuizInfo('Delningsinställning uppdaterad!', 2);
  collectionsOptionInit();
  console.log('Shared collection:', inputValues);
  console.log(inputValues.sharedCollection);
});

createCollectionButton.addEventListener('click', async () => {
  console.log('inputValues at submit', inputValues);
  const response = await addNewCollection({
    collectionName: inputValues.collectionName,
    collectionType: inputValues.collectionType,
    collectionCategory: inputValues.categoryId,
    sharedCollection: false,
    createdBy: user,
  });
  if (response.error) {
    setCollectionInfo(response.error, 1);
    return;
  }

  svgOptions.classList.remove('active');
  collectionName.value = '';
  localStorage.setItem('collectionNameTextbox', '');
  collectionsOptionInit();
  setCollectionInfo('Ny samling skapad!', 2);
});

collectionsSelect.addEventListener('input', async (e) => {
  // e.preventDefault();
  console.log('selected value', e.target.value);
  if (e.target.value === 'Välj samling') {
    inputSection.classList.remove('active');
    selectedCollection.textContent = '';
    shareCollection.checked = false;
    inputValues.sharedCollection = false;
    return;
  }
  inputValues.collectionName = e.target.selectedOptions[0].textContent;
  collectionQuizzes.innerHTML = '';
  collectionQuizzes.options[0] = new Option('Ny fråga');
  const selectedOption = e.target.selectedOptions[0];
  const selectedValue = e.target.value;
  const selectedName = selectedOption.textContent;
  localStorage.setItem('selectedCollection', e.target.selectedOptions[0]);
  localStorage.setItem('selectedCollectionName', selectedOption.textContent);

  appState.selectedCollection = e.target.value;
  inputValues.collectionId = e.target.value;
  syncShareCollectionCheckbox();
  console.log(selectedValue);
  selectedCollection.textContent = selectedName;
  inputSection.classList.add('active');
  collectionCards = await getQuizcards(inputValues);
  // console.log(collectionCards);
  updateCardSelection();
});

cardSelect.addEventListener('input', async () => {
  const selectedOption = cardSelect.selectedOptions[0];
  const selectedValue = selectedOption.value;
  selectedQuizId = selectedValue;
  if (selectedValue === 'Ny fråga') {
    clearInputs();
    setAddEditButton('add');
    return;
  }
  const quizData = await getQuiz(selectedValue);
  console.log('Quizdata: ', quizData);
  question.value = inputValues.quizQuestion = quizData.quizQuestion;
  correctAnswer.value = inputValues.quizCorrectAnswer =
    quizData.quizCorrectAnswer;
  option1.value = inputValues.quizAnswer1 = quizData.quizAnswer1;
  option2.value = inputValues.quizAnswer2 = quizData.quizAnswer2;
  option3.value = inputValues.quizAnswer3 = quizData.quizAnswer3;
  setAddEditButton('edit');
});

collectionName.addEventListener('input', () => {
  inputValues.collectionName = collectionName.value;
  localStorage.setItem('collectionNameTextbox', collectionName.value);
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
  // console.log(inputValues.quizAnswer2);
});

option3.addEventListener('input', () => {
  inputValues.quizAnswer3 = option3.value;
  console.log(inputValues.quizAnswer3);
});

addButton.addEventListener('click', async () => {
  let message = '';
  if (submitType === 'edit') {
    console.log('inputValues at submit: ', inputValues);
    const data = await updateQuiz(inputValues, selectedQuizId);
    if (data.error) {
      setQuizInfo('Du måste fylla i alla fält', 1);
      return;
    }
    message = 'Quizfråga uppdaterad!';
  } else {
    const data = await addNewQuiz(inputValues);
    console.log('input values at submit: ', inputValues);

    if (data.error) {
      setQuizInfo('Du måste fylla i alla fält', 1);
      return;
    }
    message = 'Quizfråga tillagd!';
  }
  clearQuizFields();
  setAddEditButton('add');
  selectedQuizId = null;
  setQuizInfo(message, 2);
  await refreshCardSelection();
});

deleteButton.addEventListener('click', async () => {
  if (!selectedQuizId) return;
  const data = await deleteQuizcards(selectedQuizId);

  if (data.error) {
    setErrorInfo('Kunde inte ta bort frågan');
    return;
  }
  clearQuizFields();
  setAddEditButton('add');
  selectedQuizId = null;
  await refreshCardSelection();
  setSuccessMessage('Fråga borttagen!');
});

async function refreshCardSelection() {
  if (!inputValues.collectionId) return;
  collectionQuizzes.innerHTML = '';
  collectionQuizzes.options[0] = new Option('Ny fråga');
  collectionCards = await getQuizcards(inputValues);
  console.log(collectionCards);
  updateCardSelection();
  collectionQuizzes.value = 'Ny fråga';
}

function updateCardSelection() {
  if (
    !collectionCards ||
    collectionCards?.error ||
    collectionCards?.length === 0
  ) {
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
  inputValues.categoryId = findId(selectedSvg) || 'history';
  console.log(inputValues.categoryId);
  console.log('selectecsvg', selectedSvg);
}

selectSvgButton.addEventListener('click', () => {
  const svgOptions = document.querySelector('.svgOptions');
  svgOptions.classList.toggle('active');
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
  setAddEditButton('add');
}
function syncShareCollectionCheckbox() {
  if (!collections || !inputValues.collectionId) {
    shareCollection.checked = false;
    inputValues.sharedCollection = false;
    return;
  }
  const selectedId = Number(inputValues.collectionId);
  const collection = collections.find(
    (item) => Number(item.collectionId) === selectedId,
  );
  const isShared = Boolean(collection?.sharedCollection);
  shareCollection.checked = isShared;
  inputValues.sharedCollection = isShared;
}
