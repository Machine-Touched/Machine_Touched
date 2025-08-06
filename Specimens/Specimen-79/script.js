 document.addEventListener('DOMContentLoaded', () => {
    const calculator = document.querySelector('.calculator');
    const display = calculator.querySelector('.calculator-display');
    const keys = calculator.querySelector('.calculator-keys');

    let firstValue = null;
    let operator = null;
    let waitingForSecondValue = false; // Flag to check if we're waiting for the second number

    keys.addEventListener('click', event => {
        if (!event.target.matches('button')) return; // Ignore clicks not on buttons

        const key = event.target;
        const keyValue = key.textContent; // Get the text content of the button (e.g., '7', '+')
        const action = key.dataset.action; // Get the data-action attribute (e.g., 'add', 'clear')

        // Handle number keys
        if (!action) { // If there's no data-action, it's a number
            if (waitingForSecondValue === true) {
                display.value = keyValue;
                waitingForSecondValue = false;
            } else {
                display.value = display.value === '0' ? keyValue : display.value + keyValue;
            }
        }

        // Handle decimal key
        if (action === 'decimal') {
            if (!display.value.includes('.')) { // Only add decimal if not already present
                display.value += '.';
            }
            if (waitingForSecondValue === true) { // If waiting for second value, start new number with '0.'
                display.value = '0.';
                waitingForSecondValue = false;
            }
        }

        // Handle operator keys
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            const currentValue = parseFloat(display.value); // Convert display value to a number

            if (firstValue === null) { // If this is the first number, store it
                firstValue = currentValue;
            } else if (operator) { // If there's an operator already, perform previous calculation
                const result = calculate(firstValue, operator, currentValue);
                display.value = result;
                firstValue = result; // Store the result as the new first value for chaining operations
            }

            operator = action; // Store the new operator
            waitingForSecondValue = true; // Set flag to true, indicating next input is a new number
        }

        // Handle clear key
        if (action === 'clear') {
            display.value = '0';
            firstValue = null;
            operator = null;
            waitingForSecondValue = false;
        }

        // Handle calculate (equals) key
        if (action === 'calculate') {
            if (firstValue === null || operator === null) {
                return; // Do nothing if no calculation is pending
            }

            const secondValue = parseFloat(display.value);
            const result = calculate(firstValue, operator, secondValue);

            display.value = result;
            firstValue = null; // Reset for a new calculation
            operator = null;
            waitingForSecondValue = false;
        }
    });

    // Function to perform the actual calculation
    function calculate(n1, op, n2) {
        let result = 0;
        if (op === 'add') {
            result = n1 + n2;
        } else if (op === 'subtract') {
            result = n1 - n2;
        } else if (op === 'multiply') {
            result = n1 * n2;
        } else if (op === 'divide') {
            result = n1 / n2;
        }
        // Handle floating point inaccuracies
        return parseFloat(result.toFixed(7)); // Rounds to 7 decimal places for precision
    }
});
