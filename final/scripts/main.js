// Responsive navigation and localStorage example
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('nav-list').classList.toggle('open');
});

// LocalStorage: store last visit
localStorage.setItem('lastVisit', Date.now());
const lastVisit = localStorage.getItem('lastVisit');
// Use lastVisit to show a welcome or "back soon" message if desired