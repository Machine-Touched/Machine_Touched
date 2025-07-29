class PowerSystem {
    constructor() {
        this.state = 'OFF';
        this.display = document.getElementById('display');
        this.onStateChangeCallback = null; // Property to hold a function that runs on state change
    }

    // Method to set a function that will be called whenever the state changes
    onStateChange(callback) {
        this.onStateChangeCallback = callback;
    }

    // Internal method to update state and trigger the callback
    _updateState(newState, message) {
        this.state = newState;
        if (this.display) { // Check if display element exists before updating
            this.display.innerHTML += message + '<br>';
        }
        if (this.onStateChangeCallback) {
            this.onStateChangeCallback(newState); // Call the stored callback function
        }
    }

    powerOn() {
        this._updateState('STARTING', 'Power button pressed...');
        
        setTimeout(() => {
            this._updateState('POST_CPU', 'CPU Check...');
        }, 500);
        
        setTimeout(() => {
            this._updateState('POST_MEMORY', 'Memory Test...');
        }, 1000);
        
        setTimeout(() => {
            this._updateState('POST_DISPLAY', 'Display Controller Initialize...');
        }, 1500);
        
        setTimeout(() => {
            this._updateState('BIOS', 'Loading BIOS...');
            // In a real emulator, you'd load the operating system or main program here
        }, 2000);
    }

    powerOff() {
        this._updateState('OFF', 'System shutting down...');
        // Clear the display when powering off
        setTimeout(() => {
            if (this.display) {
                this.display.innerHTML = '';
            }
        }, 1000); // Clear after a short delay
    }
}
