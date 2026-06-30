import { createCalculatorButton } from './calculatorButton.js';
import { processCalculatorInput } from './calculator.js';

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

export function createCalculatorUI() {
  const calculatorContainer = document.createElement('article');

  for (let i = 0; i <= 9; i++) {
    calculatorContainer.appendChild(
      createCalculatorButton(i.toString(), processCalculatorInput),
    );
  }

  calculatorContainer.appendChild(
    createCalculatorButton(decimal, processCalculatorInput),
  );

  calculatorContainer.appendChild(
    createCalculatorButton(addition, processCalculatorInput),
  );
  calculatorContainer.appendChild(
    createCalculatorButton(subtraction, processCalculatorInput),
  );
  calculatorContainer.appendChild(
    createCalculatorButton(multiplication, processCalculatorInput),
  );
  calculatorContainer.appendChild(
    createCalculatorButton(division, processCalculatorInput),
  );
  calculatorContainer.appendChild(
    createCalculatorButton(clear, processCalculatorInput),
  );
  calculatorContainer.appendChild(
    createCalculatorButton(deleteLastInput, processCalculatorInput),
  );

  calculatorContainer.appendChild(
    createCalculatorButton(equals, processCalculatorInput),
  );

  return calculatorContainer;
}
