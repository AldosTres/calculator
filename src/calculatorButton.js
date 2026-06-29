import { isOperation, isClear, isDeleteLastInput } from './validOperations.js';

export function createCalculatorButton(calculatorValueString, onClick) {
  const button = document.createElement('button');
  button.classList.add('calculator-button');
  button.textContent = isDeleteLastInput(calculatorValueString)
    ? '⌫'
    : calculatorValueString;

  const isOperationButton = isOperation(calculatorValueString);

  if (isOperationButton) button.classList.add('calculator-button--operation');

  if (isClear(calculatorValueString))
    button.classList.add('calculator-button--clear');

  button.addEventListener('click', () => {
    onClick(calculatorValueString);
  });

  return button;
}
