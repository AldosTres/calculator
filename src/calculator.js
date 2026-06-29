import {operate} from './operators.js'; // TO BE CREATED BY JOÃO

import {
  addition,
  subtraction,
  multiplication,
  division,
  decimal,
  equals as EQUALS_INPUT,
  isOperation,
  isClear,
  isDeleteLastInput,
} from './validOperations.js';

const DISPLAY_ELEMENT_ID = 'display';
const MAX_DISPLAY_DIGITS = 2;
const DIVIDE_BY_ZERO_MESSAGE = "Dividing by zero would tear a hole in reality. Try again.";
const OPERATOR_SYMBOLS = {
  [addition]: '+',
  [subtraction]: '−',
  [multiplication]: '×',
  [division]: '÷',
};

let currentValue = '0';
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;
let hasError = false;

export function getCurrentValue() {
  return currentValue;
}

export function isWaitingForSecondNumber() {
  return waitingForSecondNumber;
}

export function hasDecimal() {
  return currentValue.includes('.');
}

export function inputDigit(digit) {
  if (hasError) clear();

  if (waitingForSecondNumber || currentValue === "0") {
    currentValue = digit;
  } else {
    currentValue += digit;
  }

  waitingForSecondNumber = false;
  render();
}

export function inputDecimal() {
  if (hasError) clear();

  if (waitingForSecondNumber) {
    currentValue = '0.';
    waitingForSecondNumber = false;
    render();
    return;
  }

  if (!hasDecimal()) {
    currentValue += '.';
    render();
  }
}

export function backspace() {
  if (hasError) {
    clear();
    return;
  }
  if (waitingForSecondNumber) return;
  currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : '0';
  render();
}

export function clear() {
  currentValue = '0';
  firstNumber = null;
  operator = null;
  waitingForSecondNumber = false;
  hasError = false;
  render();
}

function roundForDisplay(value) {
  const cleaned = Math.round((value + Number.EPSILON) * 1e2) / 1e2;
  const digitCount = cleaned.toString().replace('-', '').replace('.', '').length;
  if (digitCount <= MAX_DISPLAY_DIGITS) return cleaned.toString();
  return Number(cleaned.toPrecision(MAX_DISPLAY_DIGITS)).toString();
}

function evaluatePendingOperation() {
  const secondNumber = parseFloat(currentValue);
  const result = operate(firstNumber, operator, secondNumber);

  if (!Number.isFinite(result)) {
    hasError = true;
    currentValue = DIVIDE_BY_ZERO_MESSAGE;
    render();
    return null;
  }

  currentValue = roundForDisplay(result);
  return parseFloat(currentValue);
}

export function chooseOperator(nextOperator) {
  if (hasError) clear();

  if (operator !== null && !waitingForSecondNumber) {
    const result = evaluatePendingOperation();
    if (result === null) return;
    firstNumber = result;
  } else {
    firstNumber = parseFloat(currentValue);
  }

  operator = nextOperator;
  waitingForSecondNumber = true;
  render();
}

export function equals() {
  if (hasError) {
    clear();
    return;
  }
  
  if (operator === null || waitingForSecondNumber) return;

  const result = evaluatePendingOperation();
  
  if (result === null) return;

  firstNumber = result;
  operator = null;
  waitingForSecondNumber = true;
  render();
}

export function processCalculatorInput(calculatorValueString) {
  if (isDeleteLastInput(calculatorValueString)) return backspace();
  if (isClear(calculatorValueString)) return clear();
  if (calculatorValueString === decimal) return inputDecimal();
  if (calculatorValueString === EQUALS_INPUT) return equals();
  if (isOperation(calculatorValueString)) return chooseOperator(calculatorValueString);
  return inputDigit(calculatorValueString);
}

function buildDisplayText() {
  if (hasError || operator === null) return currentValue;
  const symbol = OPERATOR_SYMBOLS[operator] ?? operator;
  const firstPart = roundForDisplay(firstNumber);
  return waitingForSecondNumber ? `${firstPart} ${symbol}` : `${firstPart} ${symbol} ${currentValue}`;
}

function render() {
  const displayElement = document.getElementById(DISPLAY_ELEMENT_ID);
  if (!displayElement) return;
  const text = buildDisplayText();
  if ('value' in displayElement) {
    displayElement.value = text;
  } else {
    displayElement.textContent = text;
  }
}
