function goBack(){ window.location.href='games.html'; }

const messages = document.querySelectorAll('.messages p');

messages.forEach(msg => {
  msg.addEventListener('click', () => {
    msg.classList.toggle('open');
  });
});