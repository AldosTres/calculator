import { addition, subtraction, multiplication, division } from "./validOperations";

function operate(value1, operator, value2)
{
    switch(operator)
    {
        case addition:
            return add(value1, value2);
            break;
        case subtraction:
            return subtract(value1, value2);
            break;
        case multiplication:
            return multiply(value1, value2);
            break;
        case division:
            return divide(value1, value2);
            break;
    }
}

function add(value1, value2)
{
    return value1 + value2;
}

function subtract(value1, value2)
{
    return value1 - value2;
}

function multiply(value1, value2)
{
    return value1 * value2;
}

function divide(value1, value2)
{
    if(value2 !== 0)
        return value1 / value2;
    else
        return 'ERROR';
}