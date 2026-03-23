import { getQuizcards } from './helperFunctions.js';

let parmans = new URLSearchParams(document.location.search);

const quizContainer = document.querySelector('#quizContainer');
// const finishButton = document.querySelector('.finishButton');
const finishA = document.querySelector('.finishA');
const quizId = parmans.get('id');
const next = document.querySelector('.nextButton');
next.disabled = true;
const info = document.querySelector('.info');
// console.log(quizId);
let index = 0;
let activeQuiz = {};
init();

async function init() {
  activeQuiz = await getQuizcards({ collectionId: quizId });

  if (!activeQuiz[0]) {
    quizContainer.innerHTML = 'Denna samling har inga quiz';
  } else {
    listQuestions();
  }
}

next.addEventListener('click', () => {
  if (index != activeQuiz.length - 1) {
    index++;

    listQuestions();
    next.disabled = true;
  } else {
    finishA.href = `./quizResult.html?id=${quizId}`;
  }
});

function listQuestions() {
  info.innerHTML = `Fråga ${index + 1} av ${activeQuiz.length}`;

  console.log('quiz', activeQuiz[index]);
  console.log('index', index);
  quizContainer.innerHTML = '';

  const questionContainer = document.createElement('div');
  addClass(questionContainer, `question${index}`);
  addClass(questionContainer, `questionContainer`);
  const question = document.createElement('div');

  const answerOption1 = createCheckbox(
    activeQuiz[index].quizCorrectAnswer,
    1,
    activeQuiz[index].collectionId,
    activeQuiz[index].quizId,
  );
  const answerOption2 = createCheckbox(
    activeQuiz[index].quizAnswer1,
    2,
    activeQuiz[index].collectionId,
    activeQuiz[index].quizId,
  );
  const answerOption3 = createCheckbox(
    activeQuiz[index].quizAnswer2,
    3,
    activeQuiz[index].collectionId,
    activeQuiz[index].quizId,
  );
  const answerOption4 = createCheckbox(
    activeQuiz[index].quizAnswer3,
    4,
    activeQuiz[index].collectionId,
    activeQuiz[index].quizId,
  );

  const mixedAnswers = [
    answerOption1,
    answerOption2,
    answerOption3,
    answerOption4,
  ];

  for (let i = mixedAnswers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mixedAnswers[i], mixedAnswers[j]] = [mixedAnswers[j], mixedAnswers[i]];
  }

  addClass(question, 'question');
  question.innerHTML = activeQuiz[index].quizQuestion;
  questionContainer.appendChild(question);
  mixedAnswers.forEach((answer) => {
    questionContainer.appendChild(answer);
  });

  quizContainer.appendChild(questionContainer);
  if (index === activeQuiz.length - 1) {
    next.value = 'Klart';
  }
}

function addClass(element, newClass) {
  let i;
  if (element.length) {
    for (i = element.length; i >= 0; i--) {
      element[i].classList.add(newClass);
    }
  } else {
    element.classList.add(newClass);
  }
}

function createCheckbox(answer, index, collection, quiz) {
  localStorage.setItem(`collection${collection}question${quiz}`, '');
  const container = document.createElement('div');
  container.classList.add('option');

  let option = `option${index}`;
  const label = document.createElement('label');
  const element = document.createElement('input');
  const textNode = document.createTextNode(answer);
  element.type = 'radio';
  element.value = answer;
  element.name = quiz;
  element.id = option;
  element.classList.add('option');
  label.htmlFor = option;

  label.appendChild(element);
  label.appendChild(textNode);
  container.appendChild(label);

  container.addEventListener('change', (e) => {
    if (e.target.checked)
      localStorage.setItem(`collection${collection}question${quiz}`, answer);
    next.disabled = false;
  });

  return container;
}
