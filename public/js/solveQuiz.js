import { getQuizcards } from './helperFunctions.js';

let parmans = new URLSearchParams(document.location.search);

const quizContainer = document.querySelector('#quizContainer');
// const finishButton = document.querySelector('.finishButton');
const finishA = document.querySelector('.finishA');
const quizId = parmans.get('id');

// console.log(quizId);

finishA.href = `/AgiltBackendProjekt/public/quizResult.html?id=${quizId}`;

const activeQuiz = await getQuizcards({ collectionId: quizId });
listQuestions();
// console.log(activeQuiz);
function listQuestions() {
  let index = 0;

  for (const quiz of activeQuiz) {
    console.log('quiz', quiz);
    console.log('index', index);

    const questionContainer = document.createElement('div');
    addClass(questionContainer, `question${index}`);
    addClass(questionContainer, `questionContainer`);
    const question = document.createElement('div');

    const answerOption1 = createCheckbox(
      quiz.quizCorrectAnswer,
      1,
      quiz.collectionId,
      quiz.quizId,
    );
    const answerOption2 = createCheckbox(
      quiz.quizAnswer1,
      2,
      quiz.collectionId,
      quiz.quizId,
    );
    const answerOption3 = createCheckbox(
      quiz.quizAnswer2,
      3,
      quiz.collectionId,
      quiz.quizId,
    );
    const answerOption4 = createCheckbox(
      quiz.quizAnswer3,
      4,
      quiz.collectionId,
      quiz.quizId,
    );
    // addClass(
    //   [answerOption1, answerOption2, answerOption3, answerOption4],
    //   'option',
    // );

    addClass(question, 'question');
    question.innerHTML = quiz.quizQuestion;
    questionContainer.appendChild(question);
    questionContainer.appendChild(answerOption1);
    questionContainer.appendChild(answerOption2);
    questionContainer.appendChild(answerOption3);
    questionContainer.appendChild(answerOption4);
    index++;
    quizContainer.appendChild(questionContainer);
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
  // let i = quantity;
  localStorage.setItem(`collection${collection}question${quiz}`, '');
  const container = document.createElement('div');
  container.classList.add('option');
  // for (i; i > 0; i--) {
  let option = `option${index}`;
  const label = document.createElement('label');
  const element = document.createElement('input');
  element.type = 'radio';
  element.value = answer;
  element.name = quiz;
  element.id = option;
  label.htmlFor = option;
  label.innerHTML = answer;
  container.appendChild(label);
  container.appendChild(element);

  container.addEventListener('change', (e) => {
    if (e.target.checked)
      localStorage.setItem(`collection${collection}question${quiz}`, answer);
  });

  return container;
}
