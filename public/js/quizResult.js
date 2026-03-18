import { getQuizcards } from './helperFunctions.js';

const parmans = new URLSearchParams(document.location.search);
const quizResult = document.querySelector('.quizResult');
const quiz = parmans.get('id');
console.log(quiz);
const scoreContainer = document.querySelector('scoreContainer');
const selectedQuiz = await getQuizcards({ collectionId: quiz });
const score = document.querySelector('.score');

console.log(selectedQuiz);
listResults();

function listResults() {
  let correct = 0;
  let wrong = 0;
  for (const quizQuestion of selectedQuiz) {
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('questionBox');
    questionContainer.classList.add('card');
    const question = document.createElement('div');
    question.classList.add('question');
    question.classList.add('card');
    const answer = document.createElement('div');
    const correctElement = document.createElement('div');
    correctElement.classList.add('correctElement');
    const correctAnswerText = document.createElement('div');
    correctAnswerText.innerHTML = `Rätt svar: ${quizQuestion.quizCorrectAnswer}`;
    correctAnswerText.classList.add('correctAnswerText');
    correctAnswerText.classList.add('hidden');
    const revealAnswerButton = document.createElement('button');
    revealAnswerButton.classList.add('revealAnswerButton');
    revealAnswerButton.innerHTML = 'Visa rätt svar >';
    revealAnswerButton.addEventListener('click', () => {
      revealAnswerButton.classList.add('hidden');
      correctAnswerText.classList.remove('hidden');
    });
    const storedAnswer = localStorage.getItem(
      `collection${quiz}question${quizQuestion.quizId}`,
    );
    question.innerHTML = quizQuestion.quizQuestion;

    answer.innerHTML = `Du svarade: ${storedAnswer}`;
    answer.classList.add('answer');
    if (quizQuestion.quizCorrectAnswer === storedAnswer) {
      answer.classList.add('correct');
      correct++;
    } else {
      answer.classList.add('wrong');

      correctElement.appendChild(correctAnswerText);
      correctElement.appendChild(revealAnswerButton);
      // correctElement.classList.add('hidden');
      wrong++;
    }

    questionContainer.appendChild(question);
    questionContainer.appendChild(answer);
    if (correctElement.hasChildNodes) {
      questionContainer.appendChild(correctElement);
    }

    quizResult.appendChild(questionContainer);
  }
  score.innerHTML = `Du fick ${correct} av ${correct + wrong} rätt`;
}
