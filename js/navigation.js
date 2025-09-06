
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('main-nav');
hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
});

const links = nav.querySelectorAll('a');
links.forEach(link => {
  if (link.href === window.location.href) {
    link.setAttribute('aria-current', 'page');
  }
});
