document.addEventListener('DOMContentLoaded', () => {
    const backgroundIframe = document.getElementById('background-iframe');

    // --- The Machine-Touched Pet (Digital Clothing Louse) ---
    class DigitalLouse {
        constructor() {
            this.louse = document.createElement('div');
            this.louse.className = 'louse-body';
            document.body.appendChild(this.louse);

            this.thoughtBubble = document.createElement('div');
            this.thoughtBubble.className = 'thought-bubble';
            this.louse.appendChild(this.thoughtBubble);

            this.x = window.innerWidth / 2;
            this.y = window.innerHeight / 2;
            this.targetX = this.x;
            this.targetY = this.y;
            this.state = 'wandering';
            this.thoughts = {
                wandering: ['Hmm...', 'What\'s over there?', 'Just cruising...'],
                investigating: ['What is this?', 'A monitor!', 'I should check this out.'],
                searching: ['Looking for something...', 'Where could it be?', 'Lost...']
            };

            this.updatePosition();
            this.setupListeners();
            this.startBehaviorLoop();
        }

        updatePosition() {
            this.louse.style.left = `${this.x}px`;
            this.louse.style.top = `${this.y}px`;
        }

        setTarget(x, y) {
            this.targetX = x;
            this.targetY = y;
        }

        showThought(text) {
            this.thoughtBubble.textContent = text;
            this.thoughtBubble.style.opacity = '1';
            setTimeout(() => {
                this.thoughtBubble.style.opacity = '0';
            }, 2000);
        }

        startBehaviorLoop() {
            setInterval(() => {
                this.behave();
            }, 5000); // Change behavior every 5 seconds
        }

        behave() {
            if (backgroundIframe.contentWindow && backgroundIframe.contentWindow.document) {
                const availableMonitors = Array.from(backgroundIframe.contentWindow.document.querySelectorAll('.monitor'));
                const chance = Math.random();

                if (availableMonitors.length > 0 && chance < 0.6) {
                    this.state = 'investigating';
                    const randomMonitor = availableMonitors[Math.floor(Math.random() * availableMonitors.length)];
                    const rect = randomMonitor.getBoundingClientRect();
                    const iframeRect = backgroundIframe.getBoundingClientRect();
                    this.setTarget(iframeRect.left + rect.left + rect.width / 2, iframeRect.top + rect.top + rect.height / 2);
                    this.showThought(this.thoughts.investigating[Math.floor(Math.random() * this.thoughts.investigating.length)]);
                } else {
                    this.state = 'wandering';
                    this.setTarget(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
                    this.showThought(this.thoughts.wandering[Math.floor(Math.random() * this.thoughts.wandering.length)]);
                }
            }
        }

        move() {
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 1) {
                const speed = 10;
                this.x += dx / distance * speed;
                this.y += dy / distance * speed;
            }
            this.updatePosition();
        }

        setupListeners() {
            window.addEventListener('resize', () => {
                this.setTarget(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
            });
            setInterval(() => {
                this.move();
            }, 100);
        }
    }
    
    // Listen for messages from the iframe
    window.addEventListener('message', (event) => {
        if (event.data.type === 'monitorMessage') {
            console.log(`Main page received message from ${event.data.sender}`);
        }
    });

    // Start the louse after the iframe content is loaded
    backgroundIframe.addEventListener('load', () => {
        new DigitalLouse();
    });
});
