const display = document.getElementById('display');
const buttons = document.querySelectorAll('.calculator-buttons button');
let currentInput = '';
let operator = '';
let firstOperand = null;
let shouldResetDisplay = false;

function clearCalculator() {
    currentInput = '';
    operator = '';
    firstOperand = null;
    display.value = '';
    shouldResetDisplay = false;
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }
    if (number === '.' && display.value.includes('.')) return;
    display.value += number;
}

function chooseOperator(op) {
    if (display.value === '') return;
    if (firstOperand !== null) {
        compute();
    }
    firstOperand = parseFloat(display.value);
    operator = op;
    shouldResetDisplay = true;
}

function compute() {
    if (operator === '' || firstOperand === null || display.value === '') return;
    let secondOperand = parseFloat(display.value);
    let result;
    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = secondOperand !== 0 ? firstOperand / secondOperand : 'Error';
            break;
        default:
            return;
    }
    display.value = result;
    firstOperand = result === 'Error' ? null : result;
    operator = '';
    shouldResetDisplay = true;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if (!isNaN(value) || value === '.') {
            appendNumber(value);
        } else if (value === 'C') {
            clearCalculator();
        } else if (value === '=') {
            compute();
        } else {
            chooseOperator(value);
        }
    });
});

clearCalculator(); 