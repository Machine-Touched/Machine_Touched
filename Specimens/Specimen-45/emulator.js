class Emulator {
    constructor() {
        this.memory = new Array(256).fill(0);
        this.registers = { A: 0, B: 0, C: 0, D: 0 };
        this.output = document.getElementById('output');
        this.memoryDisplay = document.getElementById('memory');
        this.registersDisplay = document.getElementById('registers');
    }

    parseInstruction(line) {
        const parts = line.trim().split(/[\s,]+/);
        return {
            opcode: parts[0],
            args: parts.slice(1)
        };
    }

    execute(instruction) {
        switch(instruction.opcode) {
            case 'MOV':
                this.registers[instruction.args[0]] = parseInt(instruction.args[1]);
                break;
            case 'ADD':
                this.registers[instruction.args[0]] += parseInt(instruction.args[1]);
                break;
            case 'SUB':
                this.registers[instruction.args[0]] -= parseInt(instruction.args[1]);
                break;
            case 'OUT':
                this.output.innerHTML += `Output: ${this.registers[instruction.args[0]]}<br>`;
                break;
        }
    }

    updateDisplay() {
        this.registersDisplay.innerHTML = 'Registers: ' + 
            Object.entries(this.registers)
                .map(([reg, val]) => `${reg}=${val}`)
                .join(' ');
        
        this.memoryDisplay.innerHTML = 'Memory: ' + 
            this.memory.slice(0, 16)
                .map((val, i) => `[${i}]=${val}`)
                .join(' ');
    }

    run() {
        this.output.innerHTML = '';
        const code = document.getElementById('code').value;
        const lines = code.split('\n');
        
        for(const line of lines) {
            if(line.trim()) {
                const instruction = this.parseInstruction(line);
                this.execute(instruction);
                this.updateDisplay();
            }
        }
    }
}

const emulator = new Emulator();
emulator.updateDisplay();

