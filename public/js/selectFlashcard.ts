import { getCollections } from './helperFunctions.js';

const flashcardContainer = document.querySelector<HTMLDivElement>('.container');
let collections;

async function collectionsOptionInit(): Promise<void> {
  flashcardContainer!.innerHTML = '';
  collections = await getCollections('flash');
  console.log('collections', collections);
  if (collections) {
    for (const collection of collections) {
      console.log('collection', collection);
      const collectionButton = document.createElement('a');
      collectionButton.type = 'button';
      collectionButton.innerHTML = collection.collectionName;
      collectionButton.classList.add('white-button');
      collectionButton.style.width = '100%';
      collectionButton.href = `./solveFlashcard.html?id=${collection.collectionId}`;
      flashcardContainer?.appendChild(collectionButton);
    }
  }
  console.log('collections', collections);
}
collectionsOptionInit();
