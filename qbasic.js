
class QBasicEmulator {
    constructor() {
        this.screen = document.getElementById('screen');
        this.input = document.getElementById('input');
        this.setupInput();
    }

    print(text) {
        this.screen.innerHTML += text + '<br>';
    }

    cls() {
        this.screen.innerHTML = '';
    }

    setupInput() {
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand(this.input.value);
                this.input.value = '';
            }
        });
    }

    executeCommand(cmd) {
        cmd = cmd.toUpperCase();
        if (cmd === 'CLS') {
            this.cls();
        } else if (cmd.startsWith('PRINT')) {
            this.print(cmd.substring(6));
        } else {
            this.print('Syntax error');
        }
    }
}

const qbasic = new QBasicEmulator();
qbasic.print('QBASIC Web Emulator Ready');
qbasic.print('Type CLS or PRINT "Hello"');
