// BMI calculator logic
document.getElementById('bmi-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const height = parseFloat(this.height.value) / 100;
  const weight = parseFloat(this.weight.value);
  if (height > 0 && weight > 0) {
    const bmi = (weight / (height * height)).toFixed(1);
    let status = '';
    if (bmi < 18.5) status = 'Underweight';
    else if (bmi < 25) status = 'Normal weight';
    else if (bmi < 30) status = 'Overweight';
    else status = 'Obese';
    document.getElementById('bmi-result').innerHTML = `
      <h2>Your BMI: ${bmi}</h2>
      <p>Status: ${status}</p>
    `;
    localStorage.setItem('lastBMI', bmi);
  }
});