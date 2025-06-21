class PowerSystem {
    constructor() {
        this.state = 'OFF';
        this.display = document.getElementById('display');
    }

    powerOn() {
        this.state = 'STARTING';
        this.display.innerHTML = 'Power button pressed...<br>';
        
        // POST Sequence
        setTimeout(() => {
            this.display.innerHTML += 'CPU Check...<br>';
        }, 500);
        
        setTimeout(() => {
            this.display.innerHTML += 'Memory Test...<br>';
        }, 1000);
        
        setTimeout(() => {
            this.display.innerHTML += 'Display Controller Initialize...<br>';
        }, 1500);
        
        setTimeout(() => {
            this.display.innerHTML += 'Loading BIOS...<br>';
            this.state = 'BIOS';
        }, 2000);
    }

    powerOff() {
        this.state = 'OFF';
        this.display.innerHTML = 'System shutting down...<br>';
    }
}
