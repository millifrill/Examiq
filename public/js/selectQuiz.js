import { getTypeUserCollections, appState } from './helperFunctions.js';

const categories = {
  1: 'History',
  2: 'Mathematics',
  3: 'Geography',
  4: 'Psychology',
  5: 'Biology',
  6: 'Chemistry',
  7: 'UXD',
  8: 'Physics',
};

const type = 'quiz';

const userId = JSON.parse(localStorage.getItem('userId'));

const quizContainer = document.getElementById('quizContainer');
let collections;
collectionsOptionInit();
console.log(appState);

async function collectionsOptionInit() {
  quizContainer.innerHTML = '';
  collections = await getTypeUserCollections({ userId: userId, type: type });
  console.log(collections);
  if (collections) {
    for (const collection of collections) {
      const key = categories[collection.categoryId].toLowerCase();
      const svg = appState.svg[key];
      console.log(collection);
      const collectionButton = document.createElement('button');
      collectionButton.type = 'button';
      collectionButton.innerHTML = collection.collectionName;
      collectionButton.href = '/solveQuiz.html';
      collectionButton.classList.add('button');
      const a = document.createElement('a');
      a.href = `./solveQuiz.html?id=${collection.collectionId}`;
      const svgIcon = document.createElement('div');
      svgIcon.classList.add('svgIcon');
      svgIcon.innerHTML = svg;
      collectionButton.appendChild(svgIcon);
      a.appendChild(collectionButton);
      quizContainer.appendChild(a);
    }
  }
  console.log(collections);
}
