/*let button = document.querySelector('.button-small');
let search = document.querySelector('#search-collections');
let placing = document.querySelector('#render-collections');

button.addEventListener('click', displayDialogBox);
function displayDialogBox(event) {
  event.preventDefault();
}
*/
let allButtons = document.querySelectorAll('.classer');
//let placing = document.querySelector('#render-collections');

allButtons.forEach((button) => {
  button.addEventListener('click', displayDialogBox);
});

function displayDialogBox(event) {
  event.target(allButtons);
  let valdCategori = data - target('.classer');
  console.log(valdCategori);
}
