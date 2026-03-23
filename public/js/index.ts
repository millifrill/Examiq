const getUsername: string | null = localStorage.getItem('username');

const username = getUsername!.charAt(0).toUpperCase() + getUsername!.slice(1);

document.querySelector('#username')!.textContent = ` ${username}!`;

const solveQuizButton = document.querySelector<HTMLElement>('.solve-quiz');

function clearLocaleStorage() {
  localStorage.removeItem('correctAnswersCount');
  localStorage.removeItem('incorrectAnswersCount');
  localStorage.removeItem('knowAnswersCount');
  localStorage.removeItem('guessAnswersCount');
}
solveQuizButton?.addEventListener('click', clearLocaleStorage);
