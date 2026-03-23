let params = new URLSearchParams(document.location.search);
const collectionId = params.get('id');
console.log('collectionId from url ', collectionId);
const activeQuestion = document.querySelector('#active-question');
const flashcardCard = document.querySelector('.card');
const knowQuestionOrWrongAnswerButton = document.querySelector('.know');
const guessQuestionOrRightAnswerButton = document.querySelector('.guess');
const buttons = document.querySelector('.buttons');
let currentQuestion = 0;
let currentAnswer = 0;
let correctAnswersCount = 0;
let incorrectAnswersCount = 0;
let knowAnswersCount = 0;
let guessAnswersCount = 0;
let data;

const state = {
  isQuestion: true,
};

async function getFlashcards() {
  try {
    const res = await fetch(
      `http://localhost:3000/api/flashcards/${collectionId}`,
    );
    data = await res.json();
    console.log('Flashcard data ', data);
    const collectionLength = data.length;
    localStorage.setItem('collectionLength', collectionLength);
    renderQuestions();
  } catch (err) {
    console.error('Failed to fetch collections', err);
  }
}
getFlashcards();

function renderQuestions() {
  if (currentAnswer >= data.length) {
    activeQuestion.textContent = '';
    flashcardCard.innerHTML = `<img src="./img/celebration.png" alt="Pokal"/>`;
    buttons.innerHTML = '';
    buttons.classList.add('column-buttons');
    const resultButton = document.createElement('a');
    resultButton.textContent = 'Se resultat';
    resultButton.classList.add('button', 'result');
    resultButton.setAttribute('href', '/public/flashcardResults.html');
    const startpageButton = document.createElement('a');
    startpageButton.textContent = 'Tillbaka till startsidan';
    startpageButton.classList.add('button', 'result');
    startpageButton.setAttribute('href', '/public/index.html');
    buttons.appendChild(resultButton);
    buttons.appendChild(startpageButton);

    return;
  }
  if (currentQuestion < data.length || currentAnswer < data.length) {
    if (state.isQuestion) {
      activeQuestion.textContent = `Fråga ${currentQuestion + 1} av ${data.length}`;
      flashcardCard.textContent = data[currentQuestion].flashcardQuestion;
      console.log('state.isQuestion flashcardQuestion ', state.isQuestion);
      document.querySelector('.know').textContent = 'Jag vet';
      document.querySelector('.know').style.backgroundColor =
        'rgba(68, 165, 174, 0.7)';
      document.querySelector('.guess').textContent = 'Jag gissar';
      document.querySelector('.guess').style.backgroundColor =
        'rgba(236, 236, 74, 0.7)';
      currentQuestion++;
      console.log('currentQuestion', currentQuestion);
      return;
    } else {
      flashcardCard.textContent = data[currentAnswer].flashcardAnswer;
      console.log('state.isQuestion flashcardAnswer ', state.isQuestion);
      document.querySelector('.wrong').textContent = 'Jag hade fel';
      document.querySelector('.wrong').style.backgroundColor =
        'rgba(166, 52, 52, 0.7)';
      document.querySelector('.right').textContent = 'Jag hade rätt';
      document.querySelector('.right').style.backgroundColor =
        'rgba(101, 210, 121, 0.7)';
      currentAnswer++;
      console.log('currentAnswer', currentAnswer);
    }
  }
}

function knowQuestionOrWrongAnswer(event) {
  console.log('event', event);
  console.log('currentQuestion', currentQuestion);

  const targetTextContent = event.target.textContent;

  if (targetTextContent === 'Jag vet') {
    knowAnswersCount++;
    localStorage.setItem('knowAnswersCount', knowAnswersCount);
  }

  if (targetTextContent === 'Jag hade fel') {
    console.log('targetTextContent inside if ', targetTextContent);
    incorrectAnswersCount++;
    localStorage.setItem('incorrectAnswersCount', incorrectAnswersCount);
  }

  state.isQuestion = !state.isQuestion;
  renderQuestions();
}
knowQuestionOrWrongAnswerButton.addEventListener(
  'click',
  knowQuestionOrWrongAnswer,
);

function guessQuestionOrRightAnswer(event) {
  console.log('event', event);
  console.log('currentQuestion', currentQuestion);

  const targetTextContent = event.target.textContent;
  console.log('targetTextContent outside if ', targetTextContent);

  if (targetTextContent === 'Jag gissar') {
    console.log('targetTextContent inside if ', targetTextContent);
    guessAnswersCount++;
    localStorage.setItem('guessAnswersCount', guessAnswersCount);
  }

  if (targetTextContent === 'Jag hade rätt') {
    console.log('targetTextContent inside if ', targetTextContent);
    correctAnswersCount++;
    localStorage.setItem('correctAnswersCount', correctAnswersCount);
  }

  state.isQuestion = !state.isQuestion;
  renderQuestions();
}
guessQuestionOrRightAnswerButton.addEventListener(
  'click',
  guessQuestionOrRightAnswer,
);
