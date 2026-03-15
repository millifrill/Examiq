import { getQuizcards } from './helperFunctions.js';

const parmans = new URLSearchParams(document.location.search);
const quizResult = document.querySelector('.quizResult');
const quiz = parmans.get('id');
console.log(quiz);

const selectedQuiz = await getQuizcards({ collectionId: quiz });
console.log(selectedQuiz);
listResults();

function listResults() {
  for (const quizQuestion of selectedQuiz) {
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('question');
    const question = document.createElement('div');
    question.classList.add('question');
    const answer = document.createElement('div');
    const correctElement = document.createElement('div');

    const storedAnswer = localStorage.getItem(
      `collection${quiz}question${quizQuestion.quizId}`,
    );
    question.innerHTML = quizQuestion.quizQuestion;

    answer.innerHTML = storedAnswer;
    answer.classList.add('answer');
    if (quizQuestion.quizCorrectAnswer === storedAnswer) {
      answer.classList.add('correct');
    } else {
      answer.classList.add('wrong');
      correctElement.innerHTML = `Rätt svar var: ${quizQuestion.quizCorrectAnswer}`;
      correctElement.classList.add('hidden');
    }

    questionContainer.appendChild(question);
    questionContainer.appendChild(answer);
    if (correctElement.hasChildNodes) {
      questionContainer.appendChild(correctElement);
    }

    quizResult.appendChild(questionContainer);
  }
}
