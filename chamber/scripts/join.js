// join.js
// Set timestamp field on page load
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('timestamp').value = new Date().toLocaleString();

  // Modal logic
  document.querySelectorAll('.modal-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const modalId = link.getAttribute('data-modal');
      document.getElementById(modalId).showModal();
    });
  });
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', e => {
      const modalId = btn.getAttribute('data-modal');
      document.getElementById(modalId).close();
    });
  });

  // Animate membership cards on load
  document.querySelectorAll('.membership-card').forEach((card, i) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.7s, transform 0.7s';
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }, 200 + i * 200);
  });
});
