const card = document.querySelectorAll('.accordion');
const deleteIcon = document.querySelector('.delete-icon');
let i;

function openAccordion(event) {
  event.currentTarget.classList.toggle('active');
  let panel = event.currentTarget.nextElementSibling;
  if (panel.style.display === 'block') {
    panel.style.display = 'none';
  } else {
    panel.style.display = 'block';
  }
  if (panel.style.display === 'block') {
    deleteIcon.style.display = 'block';
  } else {
    deleteIcon.style.display = 'none';
  }
}

for (i = 0; i < card.length; i++) {
  card[i].addEventListener('click', openAccordion);
}
