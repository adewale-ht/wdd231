// home.js
// Weather API and Company Spotlights for Lagos Chamber Home Page

// --- WEATHER SECTION ---
const weatherApiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your actual API key
const city = 'Lagos';
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${weatherApiKey}`;

async function fetchWeather() {
  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();
    if (!data.list) throw new Error('Weather data not found');
    // Current weather
    const current = data.list[0];
    // 3-day forecast (every 8th item is ~24h apart)
    const forecast = [data.list[8], data.list[16], data.list[24]];
    renderWeather(current, forecast);
  } catch (err) {
    document.getElementById('weather-data').textContent = 'Weather data unavailable.';
  }
}
function renderWeather(current, forecast) {
  const container = document.getElementById('weather-data');
  container.innerHTML = `
    <p><strong>Current:</strong> ${current.main.temp.toFixed(1)}°C, ${current.weather[0].description}</p>
    <ul>
      <li><strong>Tomorrow:</strong> ${forecast[0].main.temp.toFixed(1)}°C, ${forecast[0].weather[0].description}</li>
      <li><strong>Day 2:</strong> ${forecast[1].main.temp.toFixed(1)}°C, ${forecast[1].weather[0].description}</li>
      <li><strong>Day 3:</strong> ${forecast[2].main.temp.toFixed(1)}°C, ${forecast[2].weather[0].description}</li>
    </ul>
  `;
}

// --- COMPANY SPOTLIGHTS ---
async function fetchMembers() {
  const response = await fetch('data/members.json');
  return await response.json();
}
function getRandomSpotlights(members, count = 2) {
  const goldSilver = members.filter(m => m.membership === 'gold' || m.membership === 'silver');
  const shuffled = goldSilver.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
function renderSpotlights(spotlights) {
  const container = document.getElementById('spotlight-cards');
  container.innerHTML = spotlights.map(m => `
    <div class="member-card ${m.membership}">
      <img src="images/${m.image}" alt="${m.name} logo" loading="lazy">
      <div>
        <h3>${m.name}</h3>
        <p><strong>Address:</strong> ${m.address}</p>
        <p><strong>Phone:</strong> ${m.phone}</p>
        <p><a href="${m.website}" target="_blank">Website</a></p>
        <p><strong>Membership:</strong> ${m.membership.charAt(0).toUpperCase() + m.membership.slice(1)}</p>
      </div>
    </div>
  `).join('');
}
document.addEventListener('DOMContentLoaded', async () => {
  fetchWeather();
  const members = await fetchMembers();
  const spotlights = getRandomSpotlights(members, 2 + Math.floor(Math.random() * 2)); // 2 or 3
  renderSpotlights(spotlights);
});
