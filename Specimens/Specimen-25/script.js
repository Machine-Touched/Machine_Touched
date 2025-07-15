// script.js for Analogue Text Talker Specimen 20

document.addEventListener('DOMContentLoaded', () => {
    // --- Analogue Text Talker ---
    const displayOutput = document.getElementById('display-output');
    const textInput = document.getElementById('text-input');
    const talkButton = document.getElementById('talk-button');

    let displayLines = [];
    const maxDisplayLines = 6; // To simulate a small 90s screen

    const addLineToDisplay = (line) => {
        displayLines.push(`> ${line}`);
        if (displayLines.length > maxDisplayLines) {
            displayLines.shift(); // Remove oldest line
        }
        displayOutput.innerHTML = displayLines.map(l => `<code>${l}</code>`).join('\n');
        displayOutput.scrollTop = displayOutput.scrollHeight; // Scroll to bottom
    };

    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            const voices = speechSynthesis.getVoices();
            // Try to find a robotic or distinct voice, if available
            const roboticVoice = voices.find(voice => voice.name.includes('Robot') || voice.lang.startsWith('en-US') && (voice.name.includes('Google') || voice.name.includes('Microsoft')) && (voice.pitch === 0.5 || voice.rate === 0.8));
            if (roboticVoice) {
                utterance.voice = roboticVoice;
                utterance.pitch = 0.5; // Lower pitch for robot sound
                utterance.rate = 0.8;  // Slower rate
            } else {
                utterance.pitch = 0.8;
                utterance.rate = 1.0;
            }
            speechSynthesis.speak(utterance);
        } else {
            console.warn('Speech Synthesis not supported in this browser.');
            addLineToDisplay("Speech not supported. Cannot 'talk'.");
        }
    };

    talkButton.addEventListener('click', () => {
        const inputText = textInput.value.trim();
        if (inputText) {
            addLineToDisplay(inputText);
            speakText(inputText);
            textInput.value = ''; // Clear input
        } else {
            addLineToDisplay("Please enter text.");
            speakText("Please enter text.");
        }
    });

    textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            talkButton.click();
        }
    });

    addLineToDisplay("Welcome, User.");

    // --- Tamagotchi Logic (Simplified from the GitHub repository concept) ---
    // The 'machine-touched/Machine_Touched' repo on GitHub is broad.
    // For this specific 'Tamagotchi' instruction, I'll simulate its core
    // states and interactions, drawing inspiration from typical Tamagotchi mechanics
    // described in many GitHub Tamagotchi projects (e.g., stats, feeding, playing).

    const tamaStatusDisplay = document.getElementById('tama-status');
    const tamaCharacterDisplay = document.getElementById('tama-character');
    const tamaFeedButton = document.getElementById('tama-feed');
    const tamaPlayButton = document.getElementById('tama-play');
    const tamaDisciplineButton = document.getElementById('tama-discipline');

    let tama = {
        name: "RoboBuddy",
        hunger: 5, // Max 5
        happiness: 5, // Max 5
        discipline: 3, // Max 5
        age: 0,
        isAlive: true
    };

    const updateTamagotchiDisplay = () => {
        let statusText = `<code>&lt;Name&gt;</code>: ${tama.name}\n`;
        statusText += `<code>&lt;Age&gt;</code>: ${tama.age} cycles\n`;
        statusText += `<code>&lt;Hunger&gt;</code>: [${'|'.repeat(tama.hunger)}${' '.repeat(5 - tama.hunger)}]\n`;
        statusText += `<code>&lt;Happiness&gt;</code>: [${'|'.repeat(tama.happiness)}${' '.repeat(5 - tama.happiness)}]\n`;
        statusText += `<code>&lt;Discipline&gt;</code>: [${'|'.repeat(tama.discipline)}${' '.repeat(5 - tama.discipline)}]\n`;

        let characterArt = `
  _.-'^'-._
 /         \\
|  (.) (.)  |
|     ^     |
 \\    '-'    /
  '-.,___,.-'
        `; // Happy face

        if (tama.hunger < 2 || tama.happiness < 2) {
            characterArt = `
  _.-'^'-._
 /         \\
|  (.) (.)  |
|     O     |
 \\    ---    /
  '-.,___,.-'
            `; // Sad/hungry face
        }
        if (tama.hunger === 0 || tama.happiness === 0) {
            tama.isAlive = false;
            characterArt = `
   x-x
  /   \\
 /     \\
(  RIP  )
 \\     /
  \\___/
            `; // Deceased
            statusText += `<code>&lt;Status&gt;</code>: Deceased. Rebirth?`;
            alert("Oh no! RoboBuddy has perished! Refresh to try again.");
            clearInterval(tamaInterval);
        }

        tamaStatusDisplay.innerHTML = statusText;
        tamaCharacterDisplay.innerHTML = `<code>${characterArt}</code>`;
    };

    const tamaAction = (stat, amount, message) => {
        if (!tama.isAlive) return;
        tama[stat] = Math.min(5, tama[stat] + amount);
        addLineToDisplay(message);
        updateTamagotchiDisplay();
    };

    tamaFeedButton.addEventListener('click', () => tamaAction('hunger', 1, "RoboBuddy feels less hungry."));
    tamaPlayButton.addEventListener('click', () => tamaAction('happiness', 1, "RoboBuddy feels happier after playing."));
    tamaDisciplineButton.addEventListener('click', () => tamaAction('discipline', 1, "RoboBuddy is now more disciplined."));

    const tamaInterval = setInterval(() => {
        if (!tama.isAlive) return;

        tama.hunger = Math.max(0, tama.hunger - 1);
        tama.happiness = Math.max(0, tama.happiness - 1);
        // Discipline slowly decreases if not reinforced
        if (Math.random() < 0.2) { // 20% chance to lose discipline per interval
            tama.discipline = Math.max(0, tama.discipline - 1);
        }
        tama.age++;
        updateTamagotchiDisplay();

        if (tama.hunger === 0 || tama.happiness === 0) {
            updateTamagotchiDisplay(); // Update one last time for death state
        } else if (tama.hunger < 2 || tama.happiness < 2) {
            addLineToDisplay("RoboBuddy needs attention!");
        }
    }, 5000); // Update every 5 seconds (fast for demo)

    updateTamagotchiDisplay(); // Initial display

    // --- Optical Mark Reader (Keyboard Emoticons) ---
    const omrInput = document.getElementById('omr-input');
    const smileyDisplay = document.getElementById('smiley-display');

    const emoticonMap = {
        ':)': '😊',
        ':-)' : '😊',
        ':(': '😞',
        ':-(': '😞',
        ';)': '😉',
        ';-)': '😉',
        ':D': '😄',
        ':-D': '😄',
        ':P': '😛',
        ':-P': '😛',
        '<3': '❤️',
        'XD': '😂',
        'x D': '😂',
        ':O': '😮',
        ':-O': '😮',
        'o_O': '🤨',
        'O_o': '🤨'
    };

    omrInput.addEventListener('input', () => {
        let text = omrInput.value;
        let detectedSmileys = '';

        for (const key in emoticonMap) {
            if (emoticonMap.hasOwnProperty(key)) {
                // Use a global regex to find all occurrences
                const regex = new RegExp(escapeRegExp(key), 'g');
                text = text.replace(regex, (match) => {
                    detectedSmileys += emoticonMap[match] + ' ';
                    return emoticonMap[match]; // Replace text with emoji in the input field
                });
            }
        }
        smileyDisplay.textContent = detectedSmileys.trim();
        omrInput.value = text; // Update the input field with emojis
    });

    // Helper to escape special characters for regex
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the matched substring
    }

    // --- Counter (Pascal/QBasic Style) ---
    const qbasicCounterDisplay = document.getElementById('qbasic-counter');
    const incrementButton = document.getElementById('increment-button');
    const resetButton = document.getElementById('reset-button');

    let counter = 0;

    const updateCounterDisplay = () => {
        qbasicCounterDisplay.innerHTML = `<code>${counter}</code>`;
    };

    incrementButton.addEventListener('click', () => {
        counter++;
        updateCounterDisplay();
        addLineToDisplay(`Counter incremented to ${counter}.`);
    });

    resetButton.addEventListener('click', () => {
        counter = 0;
        updateCounterDisplay();
        addLineToDisplay("Counter reset.");
    });

    updateCounterDisplay(); // Initial display for counter
});
