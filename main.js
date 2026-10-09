import { calculateMainPoints, calculateCompatibility } from './ArcanaLogic.js';
import { drawMatrix } from './MatrixView.js';

const birthDateInput = document.querySelector('#birth-date');
const birthDateInput2 = document.querySelector('#birth-date-2');
const calculateBtn = document.querySelector('#calculate-btn');
const display = document.querySelector('#matrix-display');
const ctaSection = document.querySelector('#cta-section');
const welcomeContent = document.querySelector('#welcome-content');
const groupDate2 = document.querySelector('#input-group-2');
const tabBtns = document.querySelectorAll('.tab-btn');
const labelDate1 = document.querySelector('#input-group-1 label');

let currentMode = 'personal';

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentMode = btn.dataset.mode || (btn.textContent.includes('Совместимость') ? 'compatibility' : 'personal');
    if (currentMode === 'compatibility') {
      groupDate2.classList.remove('hidden');
      if (labelDate1) labelDate1.textContent = 'Ваша дата рождения:';
    } else {
      groupDate2.classList.add('hidden');
      if (labelDate1) labelDate1.textContent = 'Введите дату рождения:'
    }
  });
});

calculateBtn.addEventListener('click', () => {
  const dateValue = birthDateInput ? birthDateInput.value : '';
  const dateValue2 = birthDateInput2 ? birthDateInput2.value : '';
  if (!dateValue) {
    alert('Пожалуйста выберите дату рождения');
    retutn;
  }
  if (currentMode === 'compatibility' && !dateValue2) {
    alert('Пожалуйста, выберите дату рождения партнера');
    retun;
  }
  try {
    if (welcomeContent) {
      welcomeContent.classList.add('welcome-hidden');
    }
    let results = null;
    if (currentMode === 'compatibility') {
      results = calculateCompatibility(dateValue, dateValue2)
    } else {
      results = calculateMainPoints(dateValue);
    }
    if (!results) {
      alert('Ошибка при расчете матрицы. Проверьте введенные даты');
      return;
    }
    display.innerHTML = drawMatrix(results, currentMode === 'compatibility');
    display.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (ctaSection) {
      ctaSection.classList.replace('cta-hidden', 'cta-visible');
    }
  } catch (err) {
    console.error('Ошибка расчетов:', err)
  }
});