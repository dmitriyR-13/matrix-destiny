import { calculateMainPoints } from './utils/ArcanaLogic.js';
import { drawMatrix } from './components/MatrixView.js';

const birthDateInput = document.querySelector('#birth-date');
const calculateBtn = document.querySelector('#calculate-btn');
const display = document.querySelector('#matrix-display');

calculateBtn.addEventListener('click', () => {
  const dateValue = birthDateInput.value;

  if (!dateValue) {
    alert('Пожалуйста, выберите дату рождения');
    return;
  }

  const results = calculateMainPoints(dateValue);

  display.innerHTML = drawMatrix(results);
});

function renderSimpleList(data) {
  display.innerHTML = `
    <div style="text-align: left; background: #333; padding: 20px; border-radius: 8px;">
      <p>Лево (День): ${data.pointA}</p>
      <p>Верх (Месяц): ${data.pointB}</p>
      <p>Право (Год): ${data.pointC}</p>
      <p>Низ (Судьба): ${data.pointD}</p>
      <p>Центр (Комфорт): ${data.pointE}</p>
    </div>
  `;
}