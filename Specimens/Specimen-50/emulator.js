// Ensure this script runs after power.js and the powerSystem is instantiated
// This 'emulator' object will hold the CPU, memory, and instruction execution logic.
const emulator = {
    registers: {
        A: 0, // Accumulator register
        B: 0, // General purpose register (example)
        PC: 0 // Program Counter
    },
    memory: new Array(256).fill(0), // 256 bytes of memory, initialized to 0
    program: [], // Array to hold parsed instructions
    output: [], // Array to hold output messages

    // Initialize the emulator components
    init: function() {
        console.log("Emulator initialized.");
        // You can clear display/registers/memory here if needed
        this.clearDisplays();
    },

    // Clears the displayed content
    clearDisplays: function() {
        document.getElementById('registers').innerHTML = 'Registers:';
        document.getElementById('memory').innerHTML = 'Memory:';
        document.getElementById('output').innerHTML = 'Output:';
    },

    // Update the HTML display for registers and memory
    updateDisplays: function() {
        let regHtml = 'Registers:<br>';
        for (const reg in this.registers) {
            regHtml += `${reg}: ${this.registers[reg]}<br>`;
        }
        document.getElementById('registers').innerHTML = regHtml;

        let memHtml = 'Memory:<br>';
        for (let i = 0; i < this.memory.length; i += 8) { // Display 8 bytes per line
            let row = '';
            for (let j = 0; j < 8; j++) {
                if (i + j < this.memory.length) {
                    row += `[${(i + j).toString(16).padStart(2, '0')}] ${this.memory[i + j].toString(16).padStart(2, '0')} &nbsp;`;
                }
            }
            memHtml += row + '<br>';
        }
        document.getElementById('memory').innerHTML = memHtml;
        
        let outputHtml = 'Output:<br>';
        this.output.forEach(msg => {
            outputHtml += `${msg}<br>`;
        });
        document.getElementById('output').innerHTML = outputHtml;
    },

    // Parse the assembly-like code from the textarea
    loadProgram: function(codeText) {
        this.program = [];
        const lines = codeText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        
        lines.forEach((line, index) => {
            const parts = line.split(/[,\s]+/).map(p => p.toUpperCase());
            const instruction = {
                opcode: parts[0],
                args: parts.slice(1)
            };
            this.program.push(instruction);
            console.log(`Parsed instruction ${index}:`, instruction);
        });
        this.registers.PC = 0; // Reset Program Counter
        this.output = []; // Clear previous output
        this.init(); // Re-initialize displays
        console.log("Program loaded. Ready to run.");
    },

    // Execute a single instruction
    executeInstruction: function() {
        if (this.registers.PC >= this.program.length) {
            console.log("End of program.");
            document.getElementById('display').innerHTML += 'Program Finished.<br>';
            return false; // Indicate program finished
        }

        const instruction = this.program[this.registers.PC];
        console.log(`Executing PC ${this.registers.PC}: ${instruction.opcode} ${instruction.args.join(', ')}`);

        let handled = true;
        switch (instruction.opcode) {
            case 'MOV': // MOV <REGISTER>, <VALUE_OR_REGISTER>
                const targetReg = instruction.args[0];
                let value = parseInt(instruction.args[1]);
                if (isNaN(value)) { // If it's not a direct number, treat as another register
                    value = this.registers[instruction.args[1]];
                }
                this.registers[targetReg] = value;
                break;
            case 'ADD': // ADD <REGISTER>, <VALUE_OR_REGISTER>
                const regToAddTo = instruction.args[0];
                let addValue = parseInt(instruction.args[1]);
                if (isNaN(addValue)) { // If it's not a direct number, treat as another register
                    addValue = this.registers[instruction.args[1]];
                }
                this.registers[regToAddTo] += addValue;
                break;
            case 'OUT': // OUT <REGISTER_OR_VALUE>
                let outputValue = parseInt(instruction.args[0]);
                if (isNaN(outputValue)) { // If not a number, assume it's a register
                    outputValue = this.registers[instruction.args[0]];
                }
                this.output.push(`Output: ${outputValue}`);
                break;
            // You can add more instructions here (e.g., SUB, JMP, LDA, STA, etc.)
            default:
                this.output.push(`ERROR: Unknown instruction: ${instruction.opcode}`);
                console.error(`Unknown instruction: ${instruction.opcode}`);
                handled = false;
                break;
        }

        if (handled) {
            this.registers.PC++; // Increment program counter only if instruction was handled
        }
        this.updateDisplays();
        return true; // Indicate instruction executed
    },

    // Main run loop
    run: function() {
        // Check if the power system is in the 'BIOS' state before running
        if (powerSystem.state !== 'BIOS') {
            document.getElementById('display').innerHTML = 'System not ready. Please Power On.<br>';
            console.warn("Emulator cannot run. System is not in BIOS state.");
            return;
        }

        document.getElementById('display').innerHTML = 'Running program...<br>';
        console.log("Attempting to run program.");

        const codeText = document.getElementById('code').value;
        this.loadProgram(codeText);

        // Simple run loop - for more complex emulators, you might step or use setInterval
        // For now, let's execute all instructions with a small delay for visual effect
        let instructionIndex = 0;
        const executeNext = () => {
            if (instructionIndex < this.program.length) {
                this.executeInstruction();
                instructionIndex++;
                setTimeout(executeNext, 100); // Small delay between instructions
            } else {
                console.log("Program execution complete.");
                document.getElementById('display').innerHTML += 'Execution complete.<br>';
            }
        };
        executeNext();
    }
};

// Optional: Initialize the emulator immediately when the script loads
// This will set up the displays.
document.addEventListener('DOMContentLoaded', () => {
    emulator.init();
});
