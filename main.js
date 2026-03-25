import { calculateMainPoints } from './ArcanaLogic.js';
import { drawMatrix } from './MatrixView.js';

const birthDateInput = document.querySelector('#birth-date');
const calculateBtn = document.querySelector('#calculate-btn');
const display = document.querySelector('#matrix-display');
const ctaSection = document.querySelector('#cta-section');

calculateBtn.addEventListener('click', () => {
  const dateValue = birthDateInput.value;

  if (!dateValue) {
    alert('Пожалуйста, выберите дату рождения');
    return;
  }

  try {
    const results = calculateMainPoints(dateValue);
    display.innerHTML = drawMatrix(results);
    display.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (ctaSection) {
      ctaSection.classList.replace('cta-hidden', 'cta-visible');
    }

  } catch (err) {
    console.error("Ошибка при расчете или отрисовке:", err);
  }
});