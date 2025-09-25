document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.calculator button');
    let currentExpression = '';
    
    // Function to update the display and expression string
    const updateDisplay = (value) => {
        // Limit display to a reasonable length
        if (value.length > 30) {
            display.value = value.substring(0, 30) + '...';
        } else {
            display.value = value;
        }
        currentExpression = value;
    };

    // Initialize display
    updateDisplay('0');

    // Use a try...catch block to handle errors in math.js evaluation
    const evaluateExpression = () => {
        if (currentExpression === '') return;
        try {
            // math.evaluate is the secure alternative to JavaScript's unsafe eval()
            const result = math.evaluate(currentExpression);
            
            // Handle infinity, NaN, and other non-standard results
            if (typeof result === 'number' && isFinite(result)) {
                updateDisplay(String(result));
            } else {
                updateDisplay('Error');
            }
        } catch (error) {
            console.error('Calculation Error:', error);
            updateDisplay('Error');
        }
    };

    // Attach event listeners to all buttons securely
    buttons.forEach(button => {
        // Using addEventListener is CSP compliant (no inline 'onclick')
        button.addEventListener('click', () => {
            const key = button.getAttribute('data-key');

            if (key === 'AC') {
                // All Clear
                updateDisplay('0');
            } else if (key === 'DEL') {
                // Delete last character
                if (currentExpression.length > 1) {
                    updateDisplay(currentExpression.slice(0, -1));
                } else {
                    updateDisplay('0');
                }
            } else if (key === '=') {
                // Evaluate the expression
                evaluateExpression();
            } else if (['sin', 'cos', 'tan', 'log', 'sqrt'].includes(key)) {
                // Scientific functions: format as 'sin(' etc.
                const func = key === 'sqrt' ? 'sqrt' : key;
                const newExpr = (currentExpression === '0' ? '' : currentExpression) + func + '(';
                updateDisplay(newExpr);
            } else {
                // Standard input (numbers, operators, parentheses)
                if (currentExpression === '0' && !isNaN(parseInt(key))) {
                    // Replace initial zero with the first number
                    updateDisplay(key);
                } else if (currentExpression === '0' && key === '.') {
                    updateDisplay('0.');
                } else {
                    updateDisplay(currentExpression + key);
                }
            }
        });
    });
});
