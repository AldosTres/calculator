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

  processCalculatorInput(validInput);
}
