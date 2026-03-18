export function initHeader() {
  const hamburgerButton = document.querySelector('.hamburger-menu');
  const navMenu = document.querySelector('.nav-menu');
  // const listOption = document.querySelector('.list-option');
  const backdrop = document.querySelector('.backdrop');
  const buttonbar1 = document.querySelector('.bar1');
  const buttonbar2 = document.querySelector('.bar2');
  const buttonbar3 = document.querySelector('.bar3');
  const body = document.querySelector('body');
  const loggedInMenu = document.querySelector('.loggedin-menu');
  const loggedOutMenu = document.querySelector('.loggedout-menu');
  const logout = document.querySelector('#logout');
  const username = JSON.parse(localStorage.getItem('username'));
  const userId = JSON.parse(localStorage.getItem('userId'));

  const state = {
    isLoggedIn: false,
  };

  if (username && userId) {
    state.isLoggedIn = true;
    console.log('User logged in:', state.isLoggedIn);
    updateMenu();
  }

  if (!username && !userId) {
    state.isLoggedIn = false;
    console.log('User logged in:', state.isLoggedIn);
    updateMenu();
  }

  function updateMenu() {
    if (state.isLoggedIn) {
      loggedInMenu.classList.add('loggedIn');
      loggedOutMenu.classList.add('loggedIn');
    } else {
      loggedInMenu.classList.remove('loggedIn');
      loggedOutMenu.classList.remove('loggedIn');
    }
  }

  if (hamburgerButton && navMenu && backdrop) {
    hamburgerButton.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      backdrop.classList.toggle('active');
      // listOption.classList.toggle('active');
      body.classList.toggle('no-scroll');
      updateHamburgerButton();
    });
    backdrop.addEventListener('click', () => {
      navMenu.classList.remove('active');
      backdrop.classList.remove('active');
      // listOption.classList.remove('active');
      body.classList.remove('no-scroll');
      updateHamburgerButton();
    });
  }

  function updateHamburgerButton() {
    if (navMenu.classList.contains('active')) {
      buttonbar1.classList.add('rotate1');
      buttonbar2.classList.add('fade');
      buttonbar3.classList.add('rotate2');
    } else {
      buttonbar1.classList.remove('rotate1');
      buttonbar2.classList.remove('fade');
      buttonbar3.classList.remove('rotate2');
    }
  }

  function logoutUser() {
    localStorage.setItem('username', JSON.stringify(''));
    localStorage.setItem('userId', JSON.stringify(''));
  }
  logout.addEventListener('click', logoutUser);
}
