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
