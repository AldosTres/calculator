import { createCalculatorButton } from './calculatorButton.js';
import {
  addition,
  clear,
  decimal,
  deleteLastInput,
  division,
  equals,
  mapToValidInput,
  multiplication,
  subtraction,
} from './validOperations.js';

document.addEventListener('keydown', handleKeyboardInput);

const mainBody = document.querySelector('#body');

// TODO Delete from here until END DELETE comment, this is here just for development purposes
for (let i = 0; i <= 9; i++) {
  mainBody.appendChild(createCalculatorButton(i.toString(), handleButtonClick));
}

mainBody.appendChild(createCalculatorButton(decimal, handleButtonClick));

mainBody.appendChild(createCalculatorButton(addition, handleButtonClick));
mainBody.appendChild(createCalculatorButton(subtraction, handleButtonClick));
mainBody.appendChild(createCalculatorButton(multiplication, handleButtonClick));
mainBody.appendChild(createCalculatorButton(division, handleButtonClick));
mainBody.appendChild(createCalculatorButton(clear, handleButtonClick));
mainBody.appendChild(
  createCalculatorButton(deleteLastInput, handleButtonClick),
);

mainBody.appendChild(createCalculatorButton(equals, handleButtonClick));
// ========        END DELETE     =========

function processCalculatorInput(calculatorValueString) {
  // TODO: Here would go the logic to handle the click from the parent element
  console.log(`Button clicked: ${calculatorValueString}`);
}

function handleButtonClick(calculatorValueString) {
  processCalculatorInput(calculatorValueString);
}

function handleKeyboardInput(event) {
  const key = event.key;

  // By default, some browsers open search menu, this prevents that behavior
  if (event.key === '/') event.preventDefault();

  const validInput = mapToValidInput(key);

  if (!validInput) return;

  processCalculatorInput(validInput);
}
