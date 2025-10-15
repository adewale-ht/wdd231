// Fetch and display recipes from data/recipes.json
import { openModal, closeModal } from './modal.js';

async function loadRecipes() {
  try {
    const response = await fetch('data/recipes.json');
    if (!response.ok) throw new Error('Failed to fetch recipes');
    const recipes = await response.json();

    const container = document.getElementById('recipe-list');
    container.innerHTML = recipes.map(recipe => `
      <div class="recipe-card">
        <figure>
          <img src="images/${recipe.image}" alt="${recipe.name}" loading="lazy">
          <figcaption>${recipe.name}</figcaption>
        </figure>
        <p><strong>Type:</strong> ${recipe.type}</p>
        <p><strong>Calories:</strong> ${recipe.calories}</p>
        <button class="modal-link" data-modal="recipe-modal" data-id="${recipe.id}">Details</button>
      </div>
    `).join('');

    document.querySelectorAll('.modal-link').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = btn.dataset.id;
        const recipe = recipes.find(r => r.id == id);
        const modal = document.getElementById('recipe-modal');
        modal.innerHTML = `
          <h2>${recipe.name}</h2>
          <img src="images/${recipe.image}" alt="${recipe.name}" loading="lazy">
          <p>${recipe.description}</p>
          <p><strong>Type:</strong> ${recipe.type}</p>
          <p><strong>Calories:</strong> ${recipe.calories}</p>
          <button class="close-modal" data-modal="recipe-modal">Close</button>
        `;
        openModal('recipe-modal');
        modal.querySelector('.close-modal').onclick = () => closeModal('recipe-modal');
      });
    });
  } catch (err) {
    document.getElementById('recipe-list').textContent = 'Could not load recipes.';
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', loadRecipes);