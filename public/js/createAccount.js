const form = document.querySelector('form');
// const createAccountBtn = document.querySelector('#create-account-btn');
const inputUsername = document.querySelector('#username');
const inputEmail = document.querySelector('#email');
const inputPassword1 = document.querySelector('#password1');
const inputPassword2 = document.querySelector('#password2');
const errorMessage = document.querySelector('#error-message');

async function createUser(event) {
  event.preventDefault();
  let username = inputUsername.value;
  console.log('username', username);
  let userEmail = inputEmail.value;
  console.log('email', userEmail);
  let userPassword = inputPassword1.value;
  console.log('password1', userPassword);
  let password2 = inputPassword2.value;
  console.log('password2', password2);

  if (userPassword !== password2) {
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
form.addEventListener('submit', createUser);
