const inputCollectionName = document.querySelector('#collection-name');
const checkboxSharedCollection = document.querySelector('#public');
const inputCategory = document.querySelector('#category');
const selectCollections = document.querySelector('#select-collections');
const getCollections = document.querySelector('.get-collections');
const accordion = document.querySelectorAll('.accordion');
const flashcardsDiv = document.querySelector('.flashcards-div');
const createCollectionBtn = document.querySelector('.create-collection-btn');
const saveFlashcardBtn = document.querySelector('.save-flashcard-btn');
// const deleteFlashcardBtn = document.querySelector('.delete-flashcard-btn');
const addIconSubmitDiv = document.querySelector('.add-icon-div');
const addFlashcard = document.querySelector('.add-flashcard');
const errorMessage = document.querySelector('.error-message');
let collections;
let selectedCollection;

function openAccordion(event) {
  const target = event.target;
  const clostestAccordion = target.closest('.accordion');
  clostestAccordion.classList.toggle('active');
  const panel = clostestAccordion.nextElementSibling;
  if (panel.style.display === 'block') {
    panel.style.display = 'none';
  } else {
    panel.style.display = 'block';
  }
}

function openFlaschcardAccordion(event) {
  const target = event.target;
  console.log('target', target);

  if (target.closest('.accordion')) {
    openAccordion(event);
  }

  if (target.closest('.save-flashcard-btn')) {
    saveFlashcard(event);
  }
}
flashcardsDiv.addEventListener('click', openFlaschcardAccordion);

function getCollectionWithFlashcards() {
  flashcardsDiv.style.display = 'block';
  addIconSubmitDiv.style.display = 'block';
  addFlashcardAccordion();
}
selectCollections.addEventListener('change', getCollectionWithFlashcards);

let i;
for (i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener('click', openAccordion);
}

async function createFlashcardCollection(event) {
  event.preventDefault();
  const collectionName = inputCollectionName.value.trim().toLocaleLowerCase();
  const sharedCollection = checkboxSharedCollection.checked;
  const createdBy = JSON.parse(localStorage.getItem('userId'));
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
    localStorage.setItem('collectionType', JSON.stringify(collectionType));
    localStorage.setItem('sharedCollection', JSON.stringify(sharedCollection));
    localStorage.setItem('createdBy', JSON.stringify(createdBy));
    localStorage.setItem('categoryId', JSON.stringify(categoryId));
  } catch (err) {
    console.error('Error creating collection', err);
  }
}
createCollectionBtn.addEventListener('click', createFlashcardCollection);

async function getFlashcardCollections() {
  const collectionType = 'flash';
  selectCollections.innerHTML = '';
  flashcardsDiv.innerHTML = '';
  try {
    const res = await fetch(
      `http://localhost:3000/api/collectionType/${collectionType}`,
    );
    const data = await res.json();
    console.log('data', data);
    collections = data.returnData;
    console.log('collections', collections);

    selectCollections.innerHTML = '<option value="">Välj en samling</option>';
    let optionFragment = document.createDocumentFragment();
    for (let items of collections) {
      let option = document.createElement('option');
      option.textContent = items.collectionName;
      option.value = items.collectionId;
      optionFragment.append(option);
    }
    selectCollections.append(optionFragment);
  } catch (err) {
    console.error('Failed to fetch collections', err);
  }
}
getCollections.addEventListener('click', getFlashcardCollections);

async function getCollectionFlashcards(event) {
  selectedCollection = event.target.value;
  console.log('selected value', selectedCollection);

  async function getFlashcards() {
    try {
      const res = await fetch(
        `http://localhost:3000/api/flashcards/${selectedCollection}`,
      );
      flashcardData = await res.json();
      console.log('Flashcard data ', flashcardData);

      if (!res.ok && res.status === 404) {
        errorMessage.textContent = 'Samlingen har inga flashcards än';
        return;
      }

      if (res.ok && res.status === 200) {
        errorMessage.textContent = '';
      }

      let flashcard = '';
      for (let items of flashcardData) {
        flashcard += `<div class="card">
              <div class="accordion flex-row">
                <div class="flex-row space-between">
                  <h3 class="h3">${items.flashcardQuestion}</h3>
                  <div class="flex-row icon-div">
                    <span class="unicode">&#x2335;</span>
                  </div>
                </div>
              </div>
              <div class="panel">
                <label class="label" for="flashcard-question">Fråga:</label>
                <textarea
                  class="textarea"
                  id="flashcard-question"
                  name="flashcard-question"
                  placeholder=""
                >${items.flashcardQuestion}</textarea>
                <label class="label" for="flashcard-answer">Svar:</label>
                <textarea
                  class="textarea"
                  id="flashcard-answer"
                  name="flashcard-answer"
                  placeholder=""
                >${items.flashcardAnswer}</textarea>
                <div class="flex-row space-between">
                  <button type="button" class="delete-flashcard-btn button">Radera kort</button>
                  <button class="save-flashcard-btn button">Spara kort</button>
                </div>
                </div>
              </div>`;
      }
      flashcardsDiv.innerHTML = flashcard;
    } catch (err) {
      console.error('Failed to fetch collections', err);
    }
  }
  getFlashcards();
}
selectCollections.addEventListener('input', getCollectionFlashcards);

function addFlashcardAccordion(event) {
  event.preventDefault();
  let flashcard = `<div class="card">
              <div class="accordion flex-row">
                <div class="flex-row space-between">
                  <h3 class="h3">Nytt kort</h3>
                  <div class="flex-row icon-div">
                    <span class="unicode">&#x2335;</span>
                  </div>
                </div>
              </div>
              <div class="panel">
                <label class="label" for="flashcard-question">Fråga</label>
                <textarea
                  class="textarea flashcard-question"
                  id="flashcard-question"
                  name="flashcard-question"
                  placeholder="Skriv frågan här"
                ></textarea>
                <textarea
                  class="textarea flashcard-answer"
                  name="flashcard-answer"
                  placeholder="Skriv svaret här"
                ></textarea>
                <div class="flex-row space-between">
                  <button type="button" class="delete-flashcard-btn button">Radera kort</button>
                  <button type="button" class="save-flashcard-btn button">Spara kort</button>
                </div>
                </div>
              </div>`;
  flashcardsDiv.insertAdjacentHTML('beforeend', flashcard);
}
addFlashcard.addEventListener('click', addFlashcardAccordion);

async function saveFlashcard(event) {
  const target = event.target;
  console.log('target save flashcard', target);
  const clostestCard = target.closest('.card');
  const inputFlashcardQuestion = clostestCard.querySelector(
    '.flashcard-question',
  );
  const inputFlashcardAnswer = clostestCard.querySelector('.flashcard-answer');
  const flashcardQuestion = inputFlashcardQuestion.value.trim();
  const flashcardAnswer = inputFlashcardAnswer.value.trim();
  const collectionId = selectedCollection;
  console.log('collectionId', collectionId);

  try {
    const res = await fetch('http://localhost:3000/api/flashcard', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        flashcardQuestion,
        flashcardAnswer,
        collectionId,
      }),
    });
    const data = await res.json();
    console.log('data', data);
  } catch (err) {
    console.error('Error creating collection', err);
  }
  getCollectionFlashcards();
}
saveFlashcardBtn.addEventListener('click', saveFlashcard);
