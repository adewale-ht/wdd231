
const courses = [
  { code: 'WDD 130', name: 'Web Fundamentals', credits: 2, completed: true, subject: 'wdd' },
  { code: 'WDD 131', name: 'Dynamic Web Fundamentals', credits: 2, completed: true, subject: 'wdd' },
  { code: 'WDD 230', name: 'Web Frontend Development I', credits: 2, completed: false, subject: 'wdd' },
  { code: 'WDD 231', name: 'Web Frontend Development II', credits: 2, completed: false, subject: 'wdd' },
  { code: 'CSE 110', name: 'Introduction to Programming', credits: 2, completed: true, subject: 'cse' },
  { code: 'CSE 111', name: 'Programming with Functions', credits: 2, completed: false, subject: 'cse' },
  { code: 'CSE 210', name: 'Programming with Classes', credits: 2, completed: false, subject: 'cse' },
  { code: 'CSE 212', name: 'Data Structures', credits: 2, completed: false, subject: 'cse' },
  { code: 'CSE 222', name: 'Discrete Mathematics', credits: 2, completed: false, subject: 'cse' }
];
function renderCourses(filter = 'all') {
  let filtered = courses;
  if (filter === 'wdd') filtered = courses.filter(c => c.subject === 'wdd');
  if (filter === 'cse') filtered = courses.filter(c => c.subject === 'cse');
  const container = document.getElementById('courses');
  container.innerHTML = '';
  filtered.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card' + (course.completed ? ' completed' : '');
    card.innerHTML = `<h3>${course.code}</h3><p>${course.name}</p><p>Credits: ${course.credits}</p>`;
    container.appendChild(card);
  });

  const total = filtered.reduce((sum, c) => sum + c.credits, 0);
  document.getElementById('total-credits').textContent = `Total Credits: ${total}`;
}
document.addEventListener('DOMContentLoaded', () => {
  renderCourses();
  document.getElementById('course-filters').addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
      renderCourses(e.target.dataset.filter);
    }
  });
});
