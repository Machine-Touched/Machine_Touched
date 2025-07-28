class Emulator {
    constructor() {
        this.memory = new Array(256).fill(0);
        this.registers = { A: 0, B: 0, C: 0, D: 0 };
        // Link to the actual HTML elements
        this.screen = document.getElementById('screen'); // The overall screen div
        this.output = document.getElementById('output'); // Where commands like 'OUT' print
        this.registersDisplay = document.getElementById('registers');
        this.memoryDisplay = document.getElementById('memory');
        this.commandInput = document.getElementById('commandInput'); // The input field
        this.codeArea = document.getElementById('code'); // The hidden textarea for programs

        this.history = []; // To store command history
        this.historyIndex = -1; // For navigating history

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.commandInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const command = this.commandInput.value.trim();
                if (command) {
                    this.output.innerHTML += `> ${command}<br>`; // Echo command to output
                    this.history.unshift(command); // Add to history
                    this.historyIndex = -1; // Reset history navigation
                    this.executeCommand(command);
                    this.commandInput.value = ''; // Clear input
                    this.scrollScreenToEnd();
                }
            } else if (event.key === 'ArrowUp') {
                event.preventDefault(); // Prevent cursor from moving
                this.navigateHistory(1); // Go back in history
            } else if (event.key === 'ArrowDown') {
                event.preventDefault(); // Prevent cursor from moving
                this.navigateHistory(-1); // Go forward in history
            }
        });
    }

    navigateHistory(direction) {
        if (this.history.length === 0) return;

        let newIndex = this.historyIndex + direction;

        if (newIndex >= 0 && newIndex < this.history.length) {
            this.historyIndex = newIndex;
            this.commandInput.value = this.history[this.historyIndex];
        } else if (newIndex === -1) { // Navigated past the newest command
            this.historyIndex = -1;
            this.commandInput.value = '';
        }
    }

    parseInstruction(line) {
        const parts = line.trim().split(/[\s,]+/);
        return {
            opcode: parts[0].toUpperCase(), // Convert to uppercase for case-insensitivity
            args: parts.slice(1)
        };
    }

    executeInstruction(instruction) {
        switch(instruction.opcode) {
            case 'MOV':
                if (this.registers.hasOwnProperty(instruction.args[0])) {
                    this.registers[instruction.args[0]] = parseInt(instruction.args[1]);
                } else {
                    this.output.innerHTML += `<span style="color: red;">Error: Invalid register ${instruction.args[0]}</span><br>`;
                }
                break;
            case 'ADD':
                if (this.registers.hasOwnProperty(instruction.args[0])) {
                    this.registers[instruction.args[0]] += parseInt(instruction.args[1]);
                } else {
                    this.output.innerHTML += `<span style="color: red;">Error: Invalid register ${instruction.args[0]}</span><br>`;
                }
                break;
            case 'SUB':
                if (this.registers.hasOwnProperty(instruction.args[0])) {
                    this.registers[instruction.args[0]] -= parseInt(instruction.args[1]);
                } else {
                    this.output.innerHTML += `<span style="color: red;">Error: Invalid register ${instruction.args[0]}</span><br>`;
                }
                break;
            case 'OUT':
                if (this.registers.hasOwnProperty(instruction.args[0])) {
                    this.output.innerHTML += `Output: ${this.registers[instruction.args[0]]}<br>`;
                } else {
                    this.output.innerHTML += `<span style="color: red;">Error: Invalid register ${instruction.args[0]}</span><br>`;
                }
                break;
            case 'CLS': // Clear screen command
                this.output.innerHTML = '';
                break;
            default:
                this.output.innerHTML += `<span style="color: red;">Error: Unknown command "${instruction.opcode}"</span><br>`;
                break;
        }
    }

    executeCommand(command) {
        const instruction = this.parseInstruction(command);
        this.executeInstruction(instruction);
        this.updateDisplay();
    }

    updateDisplay() {
        this.registersDisplay.innerHTML = 'Registers: ' +
            Object.entries(this.registers)
                .map(([reg, val]) => `${reg}=${val}`)
                .join(' ');

        this.memoryDisplay.innerHTML = 'Memory: ' +
            this.memory.slice(0, 16) // Display first 16 memory locations
                .map((val, i) => `[${i}]=${val}`)
                .join(' ');
        this.scrollScreenToEnd(); // Ensure scroll to end after display updates
    }

    scrollScreenToEnd() {
        this.screen.scrollTop = this.screen.scrollHeight;
    }

    // This run method is for multi-line programs (like from the hidden textarea)
    // You would need to add UI to trigger this, e.g., a "RUN" button
    runProgram(code) {
        this.output.innerHTML = ''; // Clear output for new program
        const lines = code.split('\n');

        for(const line of lines) {
            if(line.trim()) {
                const instruction = this.parseInstruction(line);
                this.executeInstruction(instruction);
                this.updateDisplay(); // Update display after each instruction
            }
        }
        this.scrollScreenToEnd();
    }
}

const emulator = new Emulator();
emulator.updateDisplay(); // Initial display update
emulator.commandInput.focus(); // Focus the input field on load

