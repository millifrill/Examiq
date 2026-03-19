import { getCollections } from './helperFunctions.js';

const flashcardContainer = document.querySelector('.container');
let collections;

async function collectionsOptionInit() {
  flashcardContainer.innerHTML = '';
  collections = await getCollections('flash');
  console.log('collections', collections);
  if (collections) {
    for (const collection of collections) {
      console.log('collection', collection);
      const collectionButton = document.createElement('button');
      collectionButton.type = 'button';
      collectionButton.innerHTML = collection.collectionName;
      collectionButton.href = '/solveFlashcard.html';
      collectionButton.classList.add('white-button');
      const a = document.createElement('a');
      a.style.width = '100%';
      a.href = `/public/solveFlashcard.html?id=${collection.collectionId}`;
      a.appendChild(collectionButton);
      flashcardContainer.appendChild(a);
    }
  }
  console.log('collections', collections);
}
collectionsOptionInit();
