import {
  addition,
  subtraction,
  multiplication,
  division,
  OPERATOR_SYMBOLS,
} from './validOperations.js';
let display = null;

const MAX_DECIMALS = 2;
const MAX_DISPLAY_DIGITS = 10;

const ERROR_MESSAGES = {
  DIVIDE_BY_ZERO: [
    'Nice try 😏',
    'Math says no.',
    'Zero? Really?',
    "Can't do that.",
    '∞ Not today.',
    'Zero? Nope.',
    '∞ Error',
    "Can't divide by 0.",
  ],
};

function setDisplay(element) {
  if (!(element instanceof HTMLElement)) {
    console.log('Invalid display element.');
    return;
  }

  display = element;
}

function render(state) {
  if (!display) {
    console.log('Display has not been initialized.');
    return;
  }

  const text = buildDisplayText(state);
  updateDisplay(text);
}

function updateDisplay(text) {
  if (!display) {
    console.log('Display has not been initialized.');
    return;
  }
  display.textContent = text;
}

function clearDisplay() {
  updateDisplay('0');
}

function showError(errorCode) {
  const errorMessage = getRandomErrorMessage(errorCode);
  updateDisplay(errorMessage);
}

function buildDisplayText(state) {
  if (state.hasError || state.operator === null) {
    return formatDisplayValue(state.currentValue);
  }

  const operatorSymbol = getOperatorSymbol(state.operator);
  const firstPart = formatDisplayValue(state.firstNumber);
  const currentPart = formatDisplayValue(state.currentValue);

  return state.waitingForSecondNumber
    ? `${firstPart} ${operatorSymbol}`
    : `${firstPart} ${operatorSymbol} ${currentPart}`;
}

function formatDisplayValue(value) {
  const number = Number(value);

  const multiplier = 10 ** MAX_DECIMALS;

  const cleaned =
    Math.round((number + Number.EPSILON) * multiplier) / multiplier;

  const digitCount = cleaned
    .toString()
    .replace('-', '')
    .replace('.', '').length;

  if (digitCount <= MAX_DISPLAY_DIGITS) {
    return cleaned.toString();
  }

  return Number(cleaned.toPrecision(MAX_DISPLAY_DIGITS)).toString();
}

function getOperatorSymbol(operator) {
  if (!(operator in OPERATOR_SYMBOLS)) {
    console.log(operator);
    return;
  }
  return OPERATOR_SYMBOLS[operator];
}

function getRandomErrorMessage(errorCode) {
  const messages = ERROR_MESSAGES[errorCode];

  if (!messages) {
    console.log(errorCode);
    return;
  }

  const randomIndex = Math.floor(Math.random() * messages.length);

  return messages[randomIndex];
}

export { setDisplay, render, updateDisplay, clearDisplay, showError };
