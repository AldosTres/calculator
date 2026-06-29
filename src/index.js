import { createCalculatorButton } from './calculatorButton.js';
import {
  addition,
  clear,
  division,
  multiplication,
  subtraction,
} from './validOperations.js';

const mainBody = document.querySelector('#body');

// TODO Delete from here until END DELETE comment, this is here just for development purposes
for (let i = 0; i <= 9; i++) {
  mainBody.appendChild(createCalculatorButton(i.toString(), handleButtonClick));
}

mainBody.appendChild(createCalculatorButton('.', handleButtonClick));

mainBody.appendChild(createCalculatorButton(addition, handleButtonClick));
mainBody.appendChild(createCalculatorButton(subtraction, handleButtonClick));
mainBody.appendChild(createCalculatorButton(multiplication, handleButtonClick));
mainBody.appendChild(createCalculatorButton(division, handleButtonClick));
mainBody.appendChild(createCalculatorButton(clear, handleButtonClick));

mainBody.appendChild(createCalculatorButton('=', handleButtonClick));
// ========        END DELETE     =========

function handleButtonClick(calculatorValueString) {
  // TODO: Here would go the logic to handle the click from the parent element
  console.log(`Button clicked: ${calculatorValueString}`);
}
