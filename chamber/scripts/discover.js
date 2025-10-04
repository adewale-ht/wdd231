// discover.js
// LocalStorage last visit message
function showVisitMessage() {
  const visitMsg = document.getElementById('visit-message');
  const lastVisit = localStorage.getItem('discoverLastVisit');
  const now = Date.now();
  let message = '';
  if (!lastVisit) {
    message = 'Welcome! Let us know if you have any questions.';
  } else {
    const days = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
    if (days < 1) {
      message = 'Back so soon! Awesome!';
    } else if (days === 1) {
      message = 'You last visited 1 day ago.';
    } else {
      message = `You last visited ${days} days ago.`;
    }
  }
  visitMsg.textContent = message;
  localStorage.setItem('discoverLastVisit', now);
}

// Load cards from JSON and build grid
async function loadDiscoverCards() {
  const res = await fetch('data/discover.json');
  const items = await res.json();
  const container = document.getElementById('discover-cards');
  container.innerHTML = items.map((item, i) => `
    <div class="discover-card card${i+1}">
      <h2>${item.title}</h2>
      <figure>
        <img src="images/${item.image}" alt="${item.title}" loading="lazy">
        <figcaption>${item.title}</figcaption>
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button class="learn-more">Learn More</button>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  showVisitMessage();
  loadDiscoverCards();
});
