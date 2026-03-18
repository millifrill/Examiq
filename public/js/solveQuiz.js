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

next.addEventListener('click', () => {
  if (index != activeQuiz.length - 1) {
    index++;

    listQuestions();
    next.disabled = true;
  } else {
    finishA.href = `/AgiltBackendProjekt/public/quizResult.html?id=${quizId}`;
  }
});

const activeQuiz = await getQuizcards({ collectionId: quizId });

listQuestions();
// console.log(activeQuiz);
function listQuestions() {
  info.innerHTML = `Fråga ${index + 1} av ${activeQuiz.length}`;
  // for (const quiz of activeQuiz) {
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
  // addClass(
  //   [answerOption1, answerOption2, answerOption3, answerOption4],
  //   'option',
  // );

  addClass(question, 'question');
  question.innerHTML = activeQuiz[index].quizQuestion;
  questionContainer.appendChild(question);
  questionContainer.appendChild(answerOption1);
  questionContainer.appendChild(answerOption2);
  questionContainer.appendChild(answerOption3);
  questionContainer.appendChild(answerOption4);
  quizContainer.appendChild(questionContainer);
  if (index === activeQuiz.length - 1) {
    next.value = 'Klart';
  }
}
// }

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
  // let i = quantity;
  localStorage.setItem(`collection${collection}question${quiz}`, '');
  const container = document.createElement('div');
  container.classList.add('option');
  // for (i; i > 0; i--) {
  let option = `option${index}`;
  const label = document.createElement('label');
  const element = document.createElement('input');
  const textNode = document.createTextNode(answer);
  element.type = 'radio';
  element.value = answer;
  element.name = quiz;
  element.id = option;
  label.htmlFor = option;
  // label.innerHTML = answer;
  label.appendChild(element);
  label.appendChild(textNode);
  container.appendChild(label);
  // container.appendChild(element);

  container.addEventListener('change', (e) => {
    if (e.target.checked)
      localStorage.setItem(`collection${collection}question${quiz}`, answer);
    next.disabled = false;
  });

  return container;
}
