const flashcardCard = document.querySelector('.card');
const knowQuestionOrWrongAnswerButton = document.querySelector('.know');
const guessQuestionOrRightAnswerButton = document.querySelector('.guess');
let currentQuestion = 0;
let currentAnswer = 0;
let data;

const state = {
  isQuestion: true,
};

async function getFlashcards() {
  flashcardCard.innerHTML = '';
  try {
    const res = await fetch(`http://localhost:3000/api/flashcards/2`);
    data = await res.json();
    console.log('Flashcard data ', data);
    renderQuestions();
  } catch (err) {
    console.error('Failed to fetch collections', err);
  }
}
getFlashcards();

function renderQuestions() {
  if (currentQuestion < data.length) {
    if (state.isQuestion) {
      flashcardCard.textContent = data[currentQuestion].flashcardQuestion;
      console.log('state.isQuestion flashcardQuestion ', state.isQuestion);
      document.querySelector('.know').textContent = 'Jag vet';
      document.querySelector('.know').style.backgroundColor =
        'rgba(68, 165, 174, 0.7)';
      document.querySelector('.guess').textContent = 'Jag gissar';
      document.querySelector('.guess').style.backgroundColor =
        'rgba(236, 236, 74, 0.7)';
      currentQuestion++;
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
    }
  }
}

function knowQuestionOrWrongAnswer() {
  console.log('currentQuestion', currentQuestion);
  state.isQuestion = !state.isQuestion;
  renderQuestions();
}
knowQuestionOrWrongAnswerButton.addEventListener(
  'click',
  knowQuestionOrWrongAnswer,
);

function guessQuestionOrRightAnswer() {
  console.log('currentQuestion', currentQuestion);
  state.isQuestion = !state.isQuestion;
  renderQuestions();
}
guessQuestionOrRightAnswerButton.addEventListener(
  'click',
  guessQuestionOrRightAnswer,
);
