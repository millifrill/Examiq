import { togglePassword, validateUserInput } from './helperFunctions.js';

const cardUsername = document.querySelector('#card-username');
const cardUserEmail = document.querySelector('#card-email');
const updateForm = document.querySelector('#updateForm');
const inputUsername = document.querySelector('#username');
const deleteButton = document.querySelector('#delete-button');
const inputEmail = document.querySelector('#email');
const inputPassword1 = document.querySelector('#password1');
const inputPassword2 = document.querySelector('#password2');
const errorMessage = document.querySelector('.error-message');
const eyeIcon1 = document.querySelector('.eye-icon1');
const eyeIcon2 = document.querySelector('.eye-icon2');
const togglePassword1 = document.querySelector('.toggle-password1');
const togglePassword2 = document.querySelector('.toggle-password2');

eyeIcon1.addEventListener('click', function () {
  togglePassword(togglePassword1, eyeIcon1);
});

eyeIcon2.addEventListener('click', function () {
  togglePassword(togglePassword2, eyeIcon2);
});

async function getUser() {
  const userId = JSON.parse(localStorage.getItem('userId'));

  try {
    const res = await fetch(`http://localhost:3000/api/user/${userId}`);
    const data = await res.json();
    console.log('data', data);

    const getCardUsername = data.username;
    console.log('getCardUsername', getCardUsername);
    const toUpperCaseUsername =
      getCardUsername.charAt(0).toUpperCase() + getCardUsername.slice(1);
    cardUsername.textContent = toUpperCaseUsername;

    const getCardUserEmail = data.userEmail;
    console.log('getCardUserEmail', getCardUserEmail);
    cardUserEmail.textContent = getCardUserEmail;
  } catch (error) {
    console.log('error ', error);
  }
}
await getUser();

async function updateUser(event) {
  event.preventDefault();
  const username = inputUsername.value.trim().toLowerCase();
  const userEmail = inputEmail.value.trim().toLowerCase();
  const userPassword1 = inputPassword1.value.trim();
  const userPassword2 = inputPassword2.value.trim();
  const userPassword = userPassword1;
  const userId = JSON.parse(localStorage.getItem('userId'));

  const isValid = validateUserInput({
    username,
    userEmail,
    userPassword,
    userPassword2,
    errorMessage,
  });
  if (!isValid) return true;

  const user = {};
  console.log('user', user);

  if (username) {
    user.username = username;
  }

  if (userEmail) {
    user.userEmail = userEmail;
  }

  if (userPassword) {
    user.userPassword = userPassword;
  }

  try {
    const res = await fetch(`http://localhost:3000/api/user/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log('data', data);
    if (!res.ok && res.status === 401) {
      errorMessage.textContent = 'Något gick fel';
      return;
    }
    if (username) {
      localStorage.setItem('username', JSON.stringify(username));
    }
    getUser();
  } catch (err) {
    console.error('Error updating user', err);
  }
}
updateForm.addEventListener('submit', updateUser);

async function deleteUser() {
  const userId = JSON.parse(localStorage.getItem('userId'));
  console.log('userId', userId);
  try {
    const res = await fetch(`http://localhost:3000/api/user/${userId}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    console.log('data', data);
    localStorage.setItem('userId', JSON.stringify(''));
    localStorage.setItem('username', JSON.stringify(''));
    window.location.href = 'login.html';
  } catch (err) {
    console.error('Error deleting user', err);
  }
}
deleteButton.addEventListener('click', deleteUser);
