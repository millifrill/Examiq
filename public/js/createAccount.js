const form = document.querySelector('#registerForm');
// const createAccountBtn = document.querySelector('#create-account-btn');
const inputUsername = document.querySelector('#username');
const inputEmail = document.querySelector('#email');
const inputPassword1 = document.querySelector('#password1');
const inputPassword2 = document.querySelector('#password2');
const errorMessage = document.querySelector('.error-message');

async function createUser(event) {
  event.preventDefault();
  let username = inputUsername.value.trim().toLowerCase();
  console.log('username', username);
  let userEmail = inputEmail.value.trim().toLowerCase();
  console.log('email', userEmail);
  let userPassword = inputPassword1.value.trim();
  console.log('password1', userPassword);
  let userPassword2 = inputPassword2.value.trim();
  console.log('password2', userPassword2);

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
    // window.location.href = 'login.html';
  } catch (err) {
    console.error('Error creating user account', err);
  }
}
form.addEventListener('submit', createUser);
