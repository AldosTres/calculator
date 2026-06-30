import { processCalculatorInput } from './calculator.js';
import { createCalculatorUI } from './calculatorUI.js';
import { mapToValidInput } from './validOperations.js';

document.addEventListener('keydown', handleKeyboardInput);

const mainBody = document.querySelector('#body');

const calculatorUI = createCalculatorUI();

mainBody.appendChild(calculatorUI);

function handleKeyboardInput(event) {
  const key = event.key;

  // By default, some browsers open search menu when clicking '/', this prevents that behavior
  if (event.key === '/') event.preventDefault();

  const validInput = mapToValidInput(key);

  if (!validInput) return;

  showButtonFeedback(validInput);
  processCalculatorInput(validInput);
}

function showButtonFeedback(buttonId) {
  const button = document.getElementById(buttonId);
  if (!button) return;

  button.classList.add('is-keyboard-pressed');

  setTimeout(() => {
    button.classList.remove('is-keyboard-pressed');
  }, 150);
}
