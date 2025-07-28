class QBasicEmulator {
    constructor() {
        this.screen = document.getElementById('screen');
        this.input = document.getElementById('input');
        this.variables = {}; // Store variables
        this.waitingForInput = false;
        this.inputVariable = '';
        this.setupInput();
        this.print('QBASIC Web Emulator Ready');
        this.print('Try: PRINT "HELLO" or CLS');
        this.print('New: INPUT "WHAT IS YOUR NAME?"; N$');
    }

    print(text) {
        this.screen.innerHTML += text + '<br>';
        this.screen.scrollTop = this.screen.scrollHeight; // Auto-scroll
    }

    cls() {
        this.screen.innerHTML = '';
    }

    setupInput() {
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = this.input.value;
                this.input.value = ''; // Clear input field immediately

                if (this.waitingForInput) {
                    this.handleInputResponse(command);
                } else {
                    this.executeCommand(command);
                }
            }
        });
    }

    executeCommand(cmd) {
        cmd = cmd.trim().toUpperCase();

        if (cmd === 'CLS') {
            this.cls();
        } else if (cmd.startsWith('PRINT ')) {
            const printContent = cmd.substring(6).trim();
            // Basic handling for strings in quotes
            if (printContent.startsWith('"') && printContent.endsWith('"')) {
                this.print(printContent.slice(1, -1));
            } else {
                // Try to print a variable if it exists (very basic)
                if (this.variables.hasOwnProperty(printContent)) {
                    this.print(this.variables[printContent]);
                } else {
                    this.print('?SYNTAX ERROR');
                }
            }
        } else if (cmd.startsWith('INPUT ')) {
            const inputParts = cmd.substring(6).trim();
            let prompt = '';
            let varName = '';

            // Check for prompt in quotes
            const quoteMatch = inputParts.match(/"(.*?)"(;|,)?\s*([A-Z0-9$]+)?/);
            if (quoteMatch) {
                prompt = quoteMatch[1];
                varName = (quoteMatch[3] || '').toUpperCase();
            } else {
                // No prompt, just a variable name
                varName = inputParts.toUpperCase();
            }

            if (varName) {
                this.waitingForInput = true;
                this.inputVariable = varName;
                this.print(prompt + (prompt ? ' ' : '') + '?'); // QBasic adds a '?' for INPUT
            } else {
                this.print('?SYNTAX ERROR: INPUT requires a variable.');
            }
        } else if (cmd.includes('=')) { // Very basic assignment: VAR = VALUE
            const parts = cmd.split('=');
            if (parts.length === 2) {
                const varName = parts[0].trim().toUpperCase();
                const value = parts[1].trim();
                // Store as a string for now
                this.variables[varName] = value.replace(/"/g, ''); // Remove quotes from stored value
                this.print('OK'); // Indicate successful assignment
            } else {
                this.print('?SYNTAX ERROR');
            }
        }
         else {
            this.print('?SYNTAX ERROR');
        }
    }

    handleInputResponse(response) {
        if (this.waitingForInput) {
            this.variables[this.inputVariable] = response;
            this.waitingForInput = false;
            this.inputVariable = '';
            // No explicit "OK" after input in QBasic, so we just proceed
        }
    }
}

const qbasic = new QBasicEmulator();

