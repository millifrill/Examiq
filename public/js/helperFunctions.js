export const appState = {
  svg: [],
};

const question = document.querySelector('.question-box');
const correctAnswer = document.querySelector('#correctAnswer');
const option1 = document.querySelector('.optionone');
const option2 = document.querySelector('.optiontwo');
const option3 = document.querySelector('.optionthree');
const collectionInfo = document.querySelector('.collection-out');
setSvgs();
const quizMessageOut = document.querySelector('.quizMessageOut');

export function togglePassword(togglePassword, eyeIcon) {
  if (togglePassword.type === 'password') {
    togglePassword.type = 'text';
    eyeIcon.src = './img/eye-open.svg';
  } else {
    togglePassword.type = 'password';
    eyeIcon.src = './img/eye-closed.svg';
  }
}

function setSvgs() {
  let svgs = {
    history: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
  `,
    mathematics: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
    </svg>
  `,
    geography: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
    </svg>
  `,
    psychology: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
  `,
    biology: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082" />
    </svg>
  `,
    chemistry: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
  </svg>
  `,
    uxd: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
    </svg>
  `,
    physics: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
  </svg>
  `,
  };

  appState.svg = svgs;
}

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

export function findId(name) {
  return Object.keys(categories).find(
    (key) => categories[key].toLowerCase() === name.toLowerCase(),
  );
}

export function clearInputs() {
  question.value = '';
  correctAnswer.value = '';
  option1.value = '';
  option2.value = '';
  option3.value = '';
  localStorage.setItem('questionBox', '');
  localStorage.setItem('correctAnswerBox', '');
  localStorage.setItem('answerOption1', '');
  localStorage.setItem('answerOption2', '');
  localStorage.setItem('answerOption3', '');
}

export function setCollectionInfo(message, type) {
  collectionInfo.textContent = message;
  if (type === 1) {
    collectionInfo.classList.add('error-message');
  } else if (type === 2) {
    collectionInfo.classList.add('info-message');
    collectionInfo.classList.remove('error-message');
  }
  setTimeout(() => {
    collectionInfo.textContent = '';
    collectionInfo.classList.remove('error-message');
    collectionInfo.classList.remove('info-message');
  }, 4000);
}

export function setQuizInfo(message, type) {
  quizMessageOut.textContent = message;
  if (type === 1) {
    quizMessageOut.classList.add('error-message');
  } else if (type === 2) {
    quizMessageOut.classList.add('info-message');
    quizMessageOut.classList.remove('error-message');
  }
  setTimeout(() => {
    quizMessageOut.textContent = '';
    quizMessageOut.classList.remove('error-message');
    quizMessageOut.classList.remove('info-message');
  }, 4000);
}

export async function deleteQuizcards(id) {
  if (!id) return;
  try {
    const res = await fetch(`http://localhost:3000/api/quiz/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('failed to delete quiz', err);
  }
}

export async function updateQuiz(inputValues, id) {
  try {
    const response = await fetch(`http://localhost:3000/api/quiz/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json ' },
      body: JSON.stringify({
        quizQuestion: inputValues.quizQuestion,
        quizCorrectAnswer: inputValues.quizCorrectAnswer,
        quizAnswer1: inputValues.quizAnswer1,
        quizAnswer2: inputValues.quizAnswer2,
        quizAnswer3: inputValues.quizAnswer3,
      }),
    });
    if (response) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.error('gick fel på något vis', err);
  }
}

export async function addNewQuiz(inputValues) {
  try {
    const response = await fetch('http://localhost:3000/api/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json ' },
      body: JSON.stringify({
        collectionId: inputValues.collectionId,
        quizQuestion: inputValues.quizQuestion,
        quizCorrectAnswer: inputValues.quizCorrectAnswer,
        quizAnswer1: inputValues.quizAnswer1,
        quizAnswer2: inputValues.quizAnswer2,
        quizAnswer3: inputValues.quizAnswer3,
        categoryId: inputValues.categoryId,
      }),
    });
    if (response) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.error('gick fel på något vis', err);
  }
}

export async function getCollections(type) {
  try {
    const res = await fetch(`http://localhost:3000/api/collectionType/${type}`);

    const data = await res.json();
    console.log('returnData', data.returnData);

    return data.returnData;
  } catch (err) {
    console.error('failed to fetch collections', err);
  }
}

export async function getTypeUserCollections(data) {
  try {
    const res = await fetch(`http://localhost:3000/api/collectionTypeUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json ' },
      body: JSON.stringify({ id: data.userId, type: data.type }),
    });

    const response = await res.json();
    console.log(response.returnData);

    return response.returnData;
  } catch (err) {
    console.error('failed to fetch collections', err);
  }
}

export async function getQuizcards(data) {
  console.log('data in get quizcards: ', data);
  if (!data.collectionId) return;
  try {
    const response = await fetch(
      `http://localhost:3000/api/quizByCol/${data.collectionId}`,
    );
    const res = await response.json();
    return res;
  } catch (err) {
    console.error('failed to fetch collection', err);
  }
}

export async function addNewCollection(data) {
  try {
    const response = await fetch('http://localhost:3000/api/collection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json ' },
      body: JSON.stringify({
        collectionName: data.collectionName,
        collectionType: data.collectionType,
        categoryId: data.collectionCategory,
        sharedCollection: data.sharedCollection,
        createdBy: data.createdBy,
      }),
    });
    if (response) {
      return response;
    }
  } catch (err) {
    console.log('gick fel på något vis', err);
  }
}

export async function getQuiz(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/quiz/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('failed to fetch quiz', err);
  }
}

export async function updateCollection(data) {
  let response;
  try {
    const res = await fetch(
      `http://localhost:3000/api/collection/${data.collectionId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json ' },
        body: JSON.stringify({
          collectionName: data.collectionName,
          collectionType: data.collectionType,
          categoryId: data.categoryId,
          sharedCollection: data.sharedCollection,
          createdBy: data.createdBy,
        }),
      },
    );
    if (res) {
      response = await res.json();
    }
  } catch (err) {
    console.error('gick fel på något vis', err);
  }
  return response;
}

export function validateUserInput({
  username,
  userEmail,
  currentPassword,
  userPassword,
  userPassword2,
  errorMessage,
}) {
  if (username === '') {
    errorMessage.textContent = 'Användarnamn krävs';
    return false;
  }
  if (username.length < 2) {
    errorMessage.textContent = 'Användarnamnet måste vara minst 2 karaktärer';
    return false;
  }
  if (username.length > 20) {
    errorMessage.textContent =
      'Användarnamnet får inte vara mer än 20 karaktärer';
    return false;
  }

  if (userEmail === '') {
    errorMessage.textContent = 'Email krävs';
    return false;
  }
  if (!userEmail.includes('@')) {
    errorMessage.textContent = 'Email behöver innehålla @';
    return false;
  }
  if (!userEmail.includes('.')) {
    errorMessage.textContent = 'Email behöver innehålla .';
    return false;
  }

  if (currentPassword) {
    if (currentPassword.length < 10) {
      errorMessage.textContent = 'Lösenordet måste vara minst 10 karaktärer';
      return false;
    }
  }

  if (userPassword.length === 0 || userPassword2.length === 0) {
    errorMessage.textContent = 'Lösenord krävs';
    return false;
  }
  if (userPassword.length < 10) {
    errorMessage.textContent = 'Lösenordet måste vara minst 10 karaktärer';
    return false;
  }
  if (!/[a-zåäö]/.test(userPassword)) {
    errorMessage.textContent =
      'Lösenordet måste innehålla minst 1 liten bokstav';
    return false;
  }
  if (!/[A-ÖÅÄÖ]/.test(userPassword)) {
    errorMessage.textContent =
      'Lösenordet måste innehålla minst 1 stor bokstav';
    return false;
  }
  if (!/[0-9]/.test(userPassword)) {
    errorMessage.textContent = 'Lösenordet måste innehålla minst 1 siffra';
    return false;
  }
  if (!/[^A-Za-z0-9ÅÄÖåäö]/.test(userPassword)) {
    errorMessage.textContent =
      'Lösenordet måste innehålla minst 1 specialtecken';
    return false;
  }
  if (userPassword !== userPassword2) {
    errorMessage.textContent = 'Lösenorden matchar inte';
    return false;
  }
  return true;
}
