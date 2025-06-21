class BiosEmulator {
    constructor() {
        this.postScreen = document.getElementById('post-screen');
        this.biosMenu = document.getElementById('bios-menu');
        this.systemSpecs = {
            cpu: "EmulatedCPU 1.0",
            memory: "256KB Base, 64KB Extended",
            storage: "No Boot Device Found",
            bios: "BasicBIOS v1.0"
        };
    }

    async powerOn() {
        this.postScreen.innerHTML = '';
        await this.showPostMessage("Starting POST Process...");
        await this.showPostMessage("CPU Test... OK");
        await this.showPostMessage("Memory Test... OK");
        await this.showPostMessage("Checking Storage Devices...");
        await this.showPostMessage("No Boot Device Found");
        await this.showPostMessage("Press F2 to enter BIOS setup...");
        
        // Automatically show BIOS menu since we can't capture F2 in this context
        setTimeout(() => this.enterBiosSetup(), 2000);
    }

    async showPostMessage(message) {
        const msgElement = document.createElement('div');
        msgElement.className = 'post-message';
        msgElement.textContent = message;
        this.postScreen.appendChild(msgElement);
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    enterBiosSetup() {
        this.postScreen.style.display = 'none';
        this.biosMenu.style.display = 'block';
    }

    selectOption(option) {
        switch(option) {
            case 1:
                alert(`System Information:\nCPU: ${this.systemSpecs.cpu}\nMemory: ${this.systemSpecs.memory}\nBIOS Version: ${this.systemSpecs.bios}`);
                break;
            case 2:
                alert("Boot Priority:\n1. [Empty] CD-ROM Drive\n2. [Empty] Hard Drive\n3. [Empty] USB Device");
                break;
            case 3:
                alert("CPU Configuration:\nCPU Type: EmulatedCPU\nSpeed: 1.0 MHz\nCache: Enabled");
                break;
            case 4:
                alert("Memory Configuration:\nBase Memory: 256KB\nExtended Memory: 64KB\nCache Memory: Enabled");
                break;
            case 5:
                if(confirm("Save configuration and restart?")) {
                    location.reload();
                }
                break;
        }
    }
}

const biosEmulator = new BiosEmulator();
window.onload = () => biosEmulator.powerOn();
