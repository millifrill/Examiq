// const card = document.querySelectorAll('.card');
// const flashcardForm = document.querySelectorAll('.flashcard-form');
const accordion = document.querySelectorAll('.accordion');
const deleteIcon = document.querySelector('.delete-icon');
const createCollectionBtn = document.querySelector('.create-collection-btn');
const inputCollectionName = document.querySelector('#collection-name');
const checkboxSharedCollection = document.querySelector('#public');
const inputCreatedBy = document.querySelector('#created-by');
// const inputFlashcardQuestion = document.querySelector('.flashcard-question');
// const inputFlashcardAnswer = document.querySelector('.flashcard-answer');
// const saveFlashcardBtn = document.querySelector('.save-flashcard-btn');
// const deleteFlashcardBtn = document.querySelector('.delete-flashcard-btn');

function openAccordion(event) {
  event.currentTarget.classList.toggle('active');
  const panel = event.currentTarget.nextElementSibling;
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

  try {
    const res = await fetch('http://localhost:3000/api/collections', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        collectionName,
        sharedCollection,
        createdBy,
      }),
    });
    const data = await res.json();
    console.log('data', data);
    localStorage.setItem('collectionName', JSON.stringify(collectionName));
    localStorage.setItem('sharedCollection', JSON.stringify(sharedCollection));
    localStorage.setItem('createdBy', JSON.stringify(createdBy));
  } catch (err) {
    console.error('Error creating collection', err);
  }
}
createCollectionBtn.addEventListener('click', createFlashcardCollection);
