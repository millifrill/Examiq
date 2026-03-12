const RegisterForm = document.querySelector('#registerForm');
const loginForm = document.querySelector('#loginForm');
// const createAccountBtn = document.querySelector('#create-account-btn');
const inputUsername = document.querySelector('#username');
const inputEmail = document.querySelector('#email');
const inputPassword = document.querySelector('#password1');
const inputPassword2 = document.querySelector('#password2');
const errorMessage = document.querySelector('.error-message');
const eyeIcon = document.querySelector('.eye-icon');
const togglePassword = document.querySelector('.toggle-password');

const url = window.location.pathname.split('/').pop();
console.log('Current page:', url);
let page;

if (url === 'createAccount.html') {
  page = 1;
} else if (url === 'login.html') {
  page = 2;
}

function togglePasswordIcon() {
  if (togglePassword.type === 'password') {
    togglePassword.type = 'text';
    eyeIcon.src = './img/eye-open.svg';
  } else {
    togglePassword.type = 'password';
    eyeIcon.src = './img/eye-closed.svg';
  }
}
eyeIcon.addEventListener('click', togglePasswordIcon);

async function createUser(event) {
  event.preventDefault();
  let username = inputUsername.value.trim().toLowerCase();
  let userEmail = inputEmail.value.trim().toLowerCase();
  let userPassword = inputPassword.value.trim();
  let userPassword2 = inputPassword2.value.trim();

  if (username.length < 2) {
    errorMessage.textContent = 'Användarnamnet måste vara minst 2 karaktärer';
    return;
  }

  if (username.length > 20) {
    errorMessage.textContent =
      'Användarnamnet får inte vara mer än 20 karaktärer';
    return;
  }

  if (!userEmail.includes('.')) {
    errorMessage.textContent = 'Email behöver innehålla .';
    return;
  }

  if (!userEmail.includes('@')) {
    errorMessage.textContent = 'Email behöver innehålla @';
    return;
  }

  if (userPassword.length < 10) {
    errorMessage.textContent = 'Lösenordet måste vara minst 10 karaktärer';
    return;
  }

  if (!/[a-zåäö]/.test(userPassword)) {
    errorMessage.textContent =
      'Lösenordet måste innehålla minst 1 liten bokstav';
    return;
  }

  if (!/[A-ÖÅÄÖ]/.test(userPassword)) {
    errorMessage.textContent =
      'Lösenordet måste innehålla minst 1 stor bokstav';
    return;
  }

  if (!/[0-9]/.test(userPassword)) {
    errorMessage.textContent = 'Lösenordet måste innehålla minst 1 siffra';
    return;
  }

  if (!/[^A-Za-z0-9ÅÄÖåäö]/.test(userPassword)) {
    errorMessage.textContent =
      'Lösenordet måste innehålla minst 1 specialtecken';
    return;
  }

  if (userPassword !== userPassword2) {
    errorMessage.textContent = 'Lösenorden matchar inte';
    return;
  }

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
  let username = inputUsername.value.trim().toLowerCase();
  let userPassword = inputPassword.value.trim();

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
    window.location.href = 'index.html';
  } catch (err) {
    console.error('Error logging in user', err);
  }
}
if (page === 2) {
  loginForm.addEventListener('submit', loginUser);
}
