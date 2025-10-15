import { openModal, closeModal } from './modal.js';

async function loadWorkouts() {
  try {
    const response = await fetch('data/workouts.json');
    if (!response.ok) throw new Error('Failed to fetch workouts');
    const workouts = await response.json();

    const container = document.getElementById('workout-list');
    container.innerHTML = workouts.map(workout => `
      <div class="workout-card">
        <figure>
          <img src="images/${workout.image}" alt="${workout.name}" loading="lazy">
          <figcaption>${workout.name}</figcaption>
        </figure>
        <p><strong>Duration:</strong> ${workout.duration}</p>
        <p><strong>Level:</strong> ${workout.level}</p>
        <button class="modal-link" data-modal="workout-modal" data-id="${workout.id}">Details</button>
      </div>
    `).join('');

    // Modal event listeners
    document.querySelectorAll('.modal-link').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = btn.dataset.id;
        const workout = workouts.find(w => w.id == id);
        const modal = document.getElementById('workout-modal');
        modal.innerHTML = `
          <h2>${workout.name}</h2>
          <img src="images/${workout.image}" alt="${workout.name}" loading="lazy">
          <p>${workout.description}</p>
          <p><strong>Duration:</strong> ${workout.duration}</p>
          <p><strong>Level:</strong> ${workout.level}</p>
          <button class="close-modal" data-modal="workout-modal">Close</button>
        `;
        openModal('workout-modal');
        modal.querySelector('.close-modal').onclick = () => closeModal('workout-modal');
      });
    });
  } catch (err) {
    document.getElementById('workout-list').textContent = 'Could not load workouts.';
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', loadWorkouts);