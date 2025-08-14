let currentInput = '';
let operator = null;
let previousInput = '';
const display = document.getElementById('display');

function appendNumber(number) {
    if (operator === null && previousInput !== '') {
        // If an operation was just completed, start a new calculation
        currentInput = number;
        previousInput = '';
    } else if (number === '.' && currentInput.includes('.')) {
        return; // Prevent multiple decimal points
    }
    currentInput += number;
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '') return; // Don't add operator if display is empty

    if (previousInput !== '') {
        // If there's a previous calculation, calculate before applying new operator
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = ''; // Clear current input for the next number
    updateDisplay(); // Update display to show current previousInput and operator
}

function calculate() {
    if (previousInput === '' || currentInput === '' || operator === null) {
        return; // Not enough values to calculate
    }

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                result = 'Error'; // Division by zero
            } else {
                result = prev / current;
            }
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    operator = null;
    previousInput = '';
    updateDisplay();
}

function updateDisplay() {
    if (currentInput === '' && previousInput === '' && operator === null) {
        display.value = '0'; // Display '0' when completely clear
    } else if (operator !== null && currentInput === '') {
        display.value = `${previousInput} ${operator}`; // Show previous input and operator
    } else {
        display.value = currentInput;
    }
}

// Initialize display on load
document.addEventListener('DOMContentLoaded', updateDisplay);
