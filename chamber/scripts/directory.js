
async function fetchMembers() {
  const response = await fetch('data/members.json');
  const members = await response.json();
  return members;
}
function createMemberCard(member) {
  return `<div class="member-card ${member.membership}">
    <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
    <div>
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><a href="${member.website}" target="_blank">Website</a></p>
      <p><strong>Membership:</strong> ${member.membership.charAt(0).toUpperCase() + member.membership.slice(1)}</p>
    </div>
  </div>`;
}
function createMemberListItem(member) {
  return `<div class="member-card ${member.membership}">
    <div>
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><a href="${member.website}" target="_blank">Website</a></p>
      <p><strong>Membership:</strong> ${member.membership.charAt(0).toUpperCase() + member.membership.slice(1)}</p>
    </div>
  </div>`;
}
async function renderMembers(view = 'grid') {
  const members = await fetchMembers();
  const container = document.getElementById('members');
  container.className = view === 'list' ? 'list-view' : '';
  container.innerHTML = members.map(m => view === 'list' ? createMemberListItem(m) : createMemberCard(m)).join('');
}
document.addEventListener('DOMContentLoaded', () => {
  renderMembers('grid');
  document.getElementById('gridBtn').addEventListener('click', () => {
    renderMembers('grid');
    document.getElementById('gridBtn').classList.add('active');
    document.getElementById('listBtn').classList.remove('active');
  });
  document.getElementById('listBtn').addEventListener('click', () => {
    renderMembers('list');
    document.getElementById('listBtn').classList.add('active');
    document.getElementById('gridBtn').classList.remove('active');
  });
});
