import { togglePassword, validateUserInput } from './helperFunctions.js';

const RegisterForm = document.querySelector('#registerForm');
const loginForm = document.querySelector('#loginForm');
const inputUsername = document.querySelector('#username');
const inputEmail = document.querySelector('#email');
const inputPassword1 = document.querySelector('#password1');
const inputPassword2 = document.querySelector('#password2');
const errorMessage = document.querySelector('.error-message');
const eyeIcon1 = document.querySelector('.eye-icon1');
const eyeIcon2 = document.querySelector('.eye-icon2');
const togglePassword1 = document.querySelector('.toggle-password1');
const togglePassword2 = document.querySelector('.toggle-password2');
const privacyPolicy = document.querySelector('#privacy-policy');

const url = window.location.pathname.split('/').pop();
console.log('Current page:', url);
let page;

if (url === 'createAccount.html') {
  page = 1;
} else if (url === 'login.html') {
  page = 2;
}

eyeIcon1.addEventListener('click', function () {
  togglePassword(togglePassword1, eyeIcon1);
});

if (page === 1) {
  eyeIcon2.addEventListener('click', function () {
    togglePassword(togglePassword2, eyeIcon2);
  });
}

async function createUser(event) {
  event.preventDefault();
  const username = inputUsername.value.trim().toLowerCase();
  const userEmail = inputEmail.value.trim().toLowerCase();
  const userPassword1 = inputPassword1.value.trim();
  const userPassword2 = inputPassword2.value.trim();
  const userPassword = userPassword1;

  validateUserInput(
    username,
    userEmail,
    userPassword,
    userPassword2,
    errorMessage,
  );

  try {
    const res = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ username, userEmail, userPassword }),
    });
    const data = await res.json();
    console.log('data', data);
    window.location.href = 'login.html';
  } catch (err) {
    console.error('Error creating user account', err);
  }
}
if (page === 1) {
  RegisterForm.addEventListener('submit', createUser);
}

async function loginUser(event) {
  event.preventDefault();
  const username = inputUsername.value.trim().toLowerCase();
  const userPassword = inputPassword1.value.trim();

  try {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ username, userPassword }),
    });
    const data = await res.json();
    console.log('data', data);
    if (!res.ok && res.status === 401) {
      errorMessage.textContent = 'Fel inloggningsuppgifter';
      return;
    }
    localStorage.setItem('username', JSON.stringify(username));
    localStorage.setItem('userId', JSON.stringify(data.userId));
    window.location.href = 'index.html';
  } catch (err) {
    console.error('Error logging in user', err);
  }
}
if (page === 2) {
  loginForm.addEventListener('submit', loginUser);
}

if (page === 1) {
  const createAccountBtn = document.querySelector('.create-account-btn');
  createAccountBtn.disabled = true;

  function enableCreateAccountBtn() {
    if (privacyPolicy.checked) {
      createAccountBtn.disabled = false;
    } else {
      createAccountBtn.disabled = true;
    }
  }
  privacyPolicy.addEventListener('change', enableCreateAccountBtn);
}
