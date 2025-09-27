// thankyou.js
// Display submitted form info from URL params
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const info = [
    { label: 'First Name', value: params.get('firstName') },
    { label: 'Last Name', value: params.get('lastName') },
    { label: 'Email', value: params.get('email') },
    { label: 'Mobile Phone', value: params.get('phone') },
    { label: 'Organization Name', value: params.get('orgName') },
    { label: 'Date Submitted', value: params.get('timestamp') }
  ];
  document.getElementById('applicant-info').innerHTML = info.map(i =>
    `<p><strong>${i.label}:</strong> ${i.value ? i.value : '<em>Not provided</em>'}</p>`
  ).join('');
});
