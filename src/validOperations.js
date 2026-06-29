export const addition = '+';
export const subtraction = '-';
export const multiplication = 'x';
export const division = '/';

export const clear = 'AC';
export const deleteLastInput = 'delete-last-input';

const validOperations = [addition, subtraction, multiplication, division];

export function isOperation(value) {
  return validOperations.includes(value);
}

export function isClear(value) {
  return value === clear;
}

export function isDeleteLastInput(value) {
  return value === deleteLastInput;
}
