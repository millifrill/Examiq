const scoreP = document.querySelector('.score');
const score = localStorage.getItem('correctAnswersCount');
const collectionLength = localStorage.getItem('collectionLength');

scoreP.textContent = `Du fick ${score} av ${collectionLength} rätt `;
