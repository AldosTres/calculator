let display = null;

const MAX_DECIMALS = 2;
const MAX_DISPLAY_DIGITS = 10;

const OPERATOR_SYMBOLS = {
  "+": "+",
  "-": "−",
  "*": "×",
  "/": "÷",
};

const ERROR_MESSAGES = {
  DIVIDE_BY_ZERO: [
    "Nice try 😏",
    "Math says no.",
    "Zero? Really?",
    "Can't do that.",
    "∞ Not today.",
    "Zero? Nope.",
    "∞ Error",
    "Can't divide by 0.",
  ],
};

/**
 * Initializes the display element.
 * @param {HTMLElement} element - The display element.
 */
function setDisplay(element) {
  if (!(element instanceof HTMLElement)) {
    throw new Error("Invalid display element.");
  }

  display = element;
}

/**
 * Main function.
 * Receives the calculator state and renders it.
 * @param {object} state - The calculator state.
 */
function render(state) {
  if (!display) {
    throw new Error("Display has not been initialized.");
  }

  const text = buildDisplayText(state);
  updateDisplay(text);
}

/**
 * Updates the calculator display.
 * Assumes the display element is a <div>.
 * @param {string} text - The text to display.
 */
function updateDisplay(text) {
  if (!display) {
    throw new Error("Display has not been initialized.");
  }
  display.textContent = text;
}

/**
 * Clears the display.
 */
function clearDisplay() {
  updateDisplay("0");
}

/**
 * Displays an error message.
 */
function showError(errorCode) {
  const errorMessage = getRandomErrorMessage(errorCode);
  updateDisplay(errorMessage);
}

/* ---------- Private helpers ---------- */

/**
 * Builds the text that will be displayed on the calculator.
 *
 * @param {Object} state
 * @returns {string}
 */
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

/**
 * Formats a value before displaying it.
 *
 * @param {number|string} value
 * @returns {string}
 */
function formatDisplayValue(value) {
  const number = Number(value);

  const multiplier = 10 ** MAX_DECIMALS;

  const cleaned =
    Math.round((number + Number.EPSILON) * multiplier) / multiplier;

  const digitCount = cleaned
    .toString()
    .replace("-", "")
    .replace(".", "").length;

  if (digitCount <= MAX_DISPLAY_DIGITS) {
    return cleaned.toString();
  }

  return Number(cleaned.toPrecision(MAX_DISPLAY_DIGITS)).toString();
}

/**
 * Returns the display symbol for an operator.
 *
 * @param {string} operator
 * @returns {string}
 */
function getOperatorSymbol(operator) {
  if (!(operator in OPERATOR_SYMBOLS)) {
    throw new Error(`Invalid operator: ${operator}`);
  }
  return OPERATOR_SYMBOLS[operator];
}

/**
 * Returns a random error message for the given error code.
 *
 * @param {string} errorCode
 * @returns {string}
 */
function getRandomErrorMessage(errorCode) {
  const messages = ERROR_MESSAGES[errorCode];

  if (!messages) {
    throw new Error(`Invalid error code: ${errorCode}`);
  }

  const randomIndex = Math.floor(Math.random() * messages.length);

  return messages[randomIndex];
}

export { setDisplay, render, updateDisplay, clearDisplay, showError };
