const form = document.querySelector('#loginForm');
const inputUsername = document.querySelector('#username');
const inputPassword = document.querySelector('#password');
const errorMessage = document.querySelector('.error-message');

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
form.addEventListener('submit', loginUser);
