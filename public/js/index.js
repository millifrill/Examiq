const getUsername = JSON.parse(localStorage.getItem('username'));

const username = getUsername.charAt(0).toUpperCase() + getUsername.slice(1);

document.querySelector('#username').textContent = ` ${username}!`;
