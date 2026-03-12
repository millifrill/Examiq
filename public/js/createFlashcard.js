// const card = document.querySelectorAll('.card');
// const flashcardForm = document.querySelectorAll('.flashcard-form');
const accordion = document.querySelectorAll('.accordion');
const deleteIcon = document.querySelector('.delete-icon');
const inputCollectionName = document.querySelector('#collection-name');
const checkboxSharedCollection = document.querySelector('#public');
const inputCreatedBy = document.querySelector('#created-by');
const inputCategory = document.querySelector('#category');
const selectCollections = document.querySelector('#select-collections');
const getCollections = document.querySelector('.get-collections');
const inputFlashcardQuestion = document.querySelector('.flashcard-question');
const inputFlashcardAnswer = document.querySelector('.flashcard-answer');
const createCollectionBtn = document.querySelector('.create-collection-btn');
const saveFlashcardBtn = document.querySelector('.save-flashcard-btn');
// const deleteFlashcardBtn = document.querySelector('.delete-flashcard-btn');

function openAccordion(event) {
  event.currentTarget.classList.toggle('active');
  let panel = event.currentTarget.nextElementSibling;
  if (panel.style.display === 'block') {
    panel.style.display = 'none';
  } else {
    panel.style.display = 'block';
  }
  if (panel.style.display === 'block') {
    deleteIcon.style.display = 'block';
  } else {
    deleteIcon.style.display = 'none';
  }
}

let i;
for (i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener('click', openAccordion);
}

async function createFlashcardCollection(event) {
  event.preventDefault();
  const collectionName = inputCollectionName.value.trim().toLocaleLowerCase();
  const sharedCollection = checkboxSharedCollection.checked;
  const createdBy = inputCreatedBy.value.trim().toLocaleLowerCase();
  const categoryId = Number(inputCategory.value);
  const collectionType = 'flash';

  try {
    const res = await fetch('http://localhost:3000/api/collection', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        collectionName,
        collectionType,
        sharedCollection,
        createdBy,
        categoryId,
      }),
    });
    const data = await res.json();
    console.log('data', data);
    localStorage.setItem('collectionName', JSON.stringify(collectionName));
    localStorage.setItem('sharedCollection', JSON.stringify(sharedCollection));
    localStorage.setItem('sharedCollection', JSON.stringify(sharedCollection));
    localStorage.setItem('collectionType', JSON.stringify(collectionType));
    localStorage.setItem('categoryId', JSON.stringify(categoryId));
  } catch (err) {
    console.error('Error creating collection', err);
  }
}
createCollectionBtn.addEventListener('click', createFlashcardCollection);

async function getFlashcardCollections() {
  selectCollections.innerHTML = '';
  try {
    const res = await fetch('http://localhost:3000/api/collections');
    const data = await res.json();

    let fragment = document.createDocumentFragment();
    for (let items of data) {
      let option = document.createElement('option');
      option.textContent = items.collectionName;
      option.value = items.collectionId;
      fragment.append(option);
    }
    selectCollections.append(fragment);
  } catch (err) {
    console.error('Failed to fetch collections', err);
  }
}
getCollections.addEventListener('click', getFlashcardCollections);
