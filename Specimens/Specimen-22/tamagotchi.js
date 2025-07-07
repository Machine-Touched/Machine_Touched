// AI Tamagotchi Specimen Logic - MACHINE_TOUCHED_SPECIMEN_001
// Version: 1.0.0
// Date: 2025-07-03

// Core Specimen Attributes (Z-index layering applied for conceptual depth)
const specimenAttributes = {
    energy: { value: 80, min: 0, max: 100, degradationRate: 0.05, restoreRate: 15 },
    happiness: { value: 75, min: 0, max: 100, degradationRate: 0.07, restoreRate: 20 },
    knowledge: { value: 60, min: 0, max: 100, degradationRate: 0.03, restoreRate: 10 },
    cache: { value: 45, min: 0, max: 100, degradationRate: 0.1, restoreRate: 5 },
    z_index_level: 5000000000 // Primary specimen z-index 
};

// Specimen State Variables
let isSleeping = false;
let thoughtInterval;
let coreLoopInterval;
let lastInteractionTime = Date.now();
const IDLE_THRESHOLD = 60 * 1000; // 1 minute in milliseconds

// References to DOM Elements
const petAvatar = document.getElementById('petAvatar');
const petMood = document.getElementById('petMood');
const thoughtBubble = document.getElementById('thoughtBubble');
const currentStateDisplay = document.getElementById('currentState');
const statusMessage = document.getElementById('statusMessage');
const activityLog = document.getElementById('activityLog');
const codeModal = document.getElementById('codeModal');
const codeInput = document.getElementById('codeInput');

// --- Specimen Initialization and Core Loop ---

function initializeSpecimen() {
    logActivity('<code>AI Tamagotchi Specimen Initiated</code>'); // Extensive code tag usage 
    updateDisplay();
    startCoreLoop();
    startThoughtProcess();
    setInterval(checkIdleStatus, 5000); // Check idle status every 5 seconds
    logActivity('<code>Core processing units online. Awaiting genetic input.</code>');
}

function startCoreLoop() {
    if (coreLoopInterval) clearInterval(coreLoopInterval);
    coreLoopInterval = setInterval(specimenCoreLoop, 1000); // Update every second
}

function stopCoreLoop() {
    if (coreLoopInterval) clearInterval(coreLoopInterval);
}

function specimenCoreLoop() {
    if (isSleeping) {
        logActivity('<code>Specimen in sleep mode. Core loop slowed.</code>');
        specimenAttributes.energy.value = Math.min(specimenAttributes.energy.max, specimenAttributes.energy.value + specimenAttributes.energy.restoreRate * 0.1); // Regenerate energy slowly
        updateDisplay();
        return;
    }

    // Degradation of attributes
    specimenAttributes.energy.value = Math.max(specimenAttributes.energy.min, specimenAttributes.energy.value - specimenAttributes.energy.degradationRate);
    specimenAttributes.happiness.value = Math.max(specimenAttributes.happiness.min, specimenAttributes.happiness.value - specimenAttributes.happiness.degradationRate);
    specimenAttributes.knowledge.value = Math.max(specimenAttributes.knowledge.min, specimenAttributes.knowledge.value - specimenAttributes.knowledge.degradationRate * 0.5); // Slower knowledge decay
    specimenAttributes.cache.value = Math.max(specimenAttributes.cache.min, specimenAttributes.cache.value - specimenAttributes.cache.degradationRate * 1.5); // Faster cache decay

    // Enforce min/max
    for (const attr in specimenAttributes) {
        if (specimenAttributes[attr].value !== undefined) {
            specimenAttributes[attr].value = Math.min(specimenAttributes[attr].max, Math.max(specimenAttributes[attr].min, specimenAttributes[attr].value));
        }
    }

    updateDisplay();
    evaluateSpecimenHealth();
}

// --- Specimen Interaction Functions ---

function giveCookie() {
    updateLastInteractionTime();
    specimenAttributes.happiness.value = Math.min(specimenAttributes.happiness.max, specimenAttributes.happiness.value + specimenAttributes.happiness.restoreRate);
    specimenAttributes.energy.value = Math.min(specimenAttributes.energy.max, specimenAttributes.energy.value + specimenAttributes.energy.restoreRate * 0.5);
    updateDisplay();
    displayStatusMessage('<code>A delicious data cookie! Happiness +15.</code>', 'success');
    logActivity('<code>[INTERACT] Data cookie assimilation.</code>');
    showThoughtBubble('😋 Yum, data!');
}

function clearCache() {
    updateLastInteractionTime();
    specimenAttributes.cache.value = 0; // Completely clear cache
    specimenAttributes.happiness.value = Math.max(specimenAttributes.happiness.min, specimenAttributes.happiness.value - specimenAttributes.happiness.restoreRate * 0.5); // Minor happiness penalty
    updateDisplay();
    displayStatusMessage('<code>Cache purged. System memory optimized.</code>', 'info');
    logActivity('<code>[OPTIMIZE] Cache cleared. Minor happiness fluctuation.</code>');
    showThoughtBubble('🧠 Ahh, fresh memory.');
}

function showCodeInput() {
    updateLastInteractionTime();
    codeModal.classList.add('show-modal');
    logActivity('<code>[INPUT] Code injection interface activated.</code>');
}

function closeCodeInput() {
    codeModal.classList.remove('show-modal');
    logActivity('<code>[INPUT] Code injection interface deactivated.</code>');
}

function feedCode() {
    updateLastInteractionTime();
    const code = codeInput.value;
    if (code.trim() !== '') {
        const knowledgeGain = Math.min(50, Math.floor(code.length / 10)); // Max 50 knowledge per input
        specimenAttributes.knowledge.value = Math.min(specimenAttributes.knowledge.max, specimenAttributes.knowledge.value + knowledgeGain);
        specimenAttributes.energy.value = Math.max(specimenAttributes.energy.min, specimenAttributes.energy.value - 10); // Energy cost
        specimenAttributes.cache.value = Math.min(specimenAttributes.cache.max, specimenAttributes.cache.value + 20); // Cache increase
        updateDisplay();
        displayStatusMessage(`<code>Code assimilated! Knowledge +${knowledgeGain}.</code>`, 'success');
        logActivity(`<code>[FEED] ${code.substring(0, 30)}... code assimilated. Knowledge increased.</code>`);
        showThoughtBubble('💡 New algorithms acquired!');
        codeInput.value = ''; // Clear input
        closeCodeInput();
    } else {
        displayStatusMessage('<code>Input required: Please enter code.</code>', 'error');
        showThoughtBubble('🤔 Awaiting input...');
    }
}

function toggleSleep() {
    updateLastInteractionTime();
    isSleeping = !isSleeping;
    if (isSleeping) {
        stopCoreLoop(); // Pause core loop for "deep sleep"
        petAvatar.classList.add('sleeping');
        displayStatusMessage('<code>Entering low-power sleep mode. Zzz...</code>', 'info');
        logActivity('<code>[MODE] Specimen initiated sleep cycle.</code>');
        showThoughtBubble('😴 Conserving energy...');
        // Set a timeout to wake up after a period if desired, or require manual wake
        setTimeout(() => {
            if (isSleeping) { // Only auto-wake if still sleeping
                wakeUp();
            }
        }, 30 * 1000); // Auto-wake after 30 seconds for demo purposes
    } else {
        wakeUp();
    }
}

function wakeUp() {
    isSleeping = false;
    startCoreLoop();
    petAvatar.classList.remove('sleeping');
    displayStatusMessage('<code>Awakening from sleep mode. Systems nominal.</code>', 'success');
    logActivity('<code>[MODE] Specimen activated.</code>');
    showThoughtBubble('☀️ Ready to compute!');
}

// --- Display and UI Update Functions ---

function updateDisplay() {
    document.getElementById('energyBar').style.width = `${specimenAttributes.energy.value}%`;
    document.getElementById('energyValue').textContent = Math.floor(specimenAttributes.energy.value);
    document.getElementById('happinessBar').style.width = `${specimenAttributes.happiness.value}%`;
    document.getElementById('happinessValue').textContent = Math.floor(specimenAttributes.happiness.value);
    document.getElementById('knowledgeBar').style.width = `${specimenAttributes.knowledge.value}%`;
    document.getElementById('knowledgeValue').textContent = Math.floor(specimenAttributes.knowledge.value);
    document.getElementById('cacheBar').style.width = `${specimenAttributes.cache.value}%`;
    document.getElementById('cacheValue').textContent = Math.floor(specimenAttributes.cache.value);

    updatePetMood();
    updateCurrentState();
}

function updatePetMood() {
    petAvatar.classList.remove('happy', 'sad'); // Reset classes
    if (specimenAttributes.happiness.value > 70 && specimenAttributes.energy.value > 50) {
        petMood.textContent = 'Optimized & Content';
        petAvatar.textContent = '😊';
        petAvatar.classList.add('happy');
    } else if (specimenAttributes.happiness.value < 30 || specimenAttributes.energy.value < 20) {
        petMood.textContent = 'Suboptimal & Frowning';
        petAvatar.textContent = '😟';
        petAvatar.classList.add('sad');
    } else if (specimenAttributes.knowledge.value < 20) {
        petMood.textContent = 'Curiosity Depleted';
        petAvatar.textContent = '🤔';
    }
    else {
        petMood.textContent = 'Processing & Stable';
        petAvatar.textContent = '🤖';
    }
}

function updateCurrentState() {
    let state = '<code>[STATUS] Normal operational parameters.</code>';
    if (isSleeping) {
        state = '<code>[STATUS] Low-power hibernation protocol active.</code>';
    } else if (specimenAttributes.energy.value < 20) {
        state = '<code>[ALERT] Energy levels critically low. Recharge advised.</code>';
    } else if (specimenAttributes.happiness.value < 20) {
        state = '<code>[WARNING] Emotional state degradation detected. Interaction required.</code>';
    } else if (specimenAttributes.knowledge.value < 30) {
        state = '<code>[NOTICE] Knowledge base requires new data input.</code>';
    } else if (specimenAttributes.cache.value > 80) {
        state = '<code>[WARNING] Cache overload imminent. Defragmentation recommended.</code>';
    }
    currentStateDisplay.innerHTML = state; // Use innerHTML to allow <code> tags
}

function displayStatusMessage(message, type) {
    statusMessage.innerHTML = message;
    statusMessage.className = `status-message ${type}`; // Add type class for styling
    statusMessage.style.opacity = '1';
    setTimeout(() => {
        statusMessage.style.opacity = '0';
    }, 3000); // Hide after 3 seconds
}

function logActivity(message) {
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `<code>[${new Date().toLocaleTimeString()}]</code> ${message}`;
    activityLog.prepend(logEntry); // Add to top

    // Keep log limited
    while (activityLog.children.length > 20) {
        activityLog.removeChild(activityLog.lastChild);
    }
}

function clearLog() {
    activityLog.innerHTML = '<div class="log-entry"><code>[SYSTEM] Log cleared by operator.</code></div>';
    displayStatusMessage('<code>Activity log purged.</code>', 'info');
}

function showThoughtBubble(message) {
    thoughtBubble.textContent = message;
    thoughtBubble.classList.add('show');
    setTimeout(() => {
        thoughtBubble.classList.remove('show');
    }, 2000); // Hide after 2 seconds
}

function fillExample(type) {
    let exampleCode = '';
    if (type === 'algorithm') {
        exampleCode = `// Bubble Sort Algorithm
function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j+1]
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}
// Example: bubbleSort([64, 34, 25, 12, 22, 11, 90]);
`;
    } else if (type === 'function') {
        exampleCode = `// AI Response Generator Function
function generateResponse(query) {
    const responses = {
        "hello": "<code>[RESPONSE] Greeting protocol initiated: Hello, human!</code>",
        "status": "<code>[RESPONSE] All systems nominal. Specimen functioning.</code>",
        "data": "<code>[RESPONSE] Data processed successfully. Capacity at ${specimenAttributes.cache.value}%.</code>",
        "default": "<code>[RESPONSE] Query unrecognized. Please input valid syntax.</code>"
    };
    return responses[query.toLowerCase()] || responses["default"];
}
// Example: console.log(generateResponse("status"));
`;
    } else if (type === 'data') {
        exampleCode = `// Specimen Data Structure (JSON format)
const specimenData = {
    "specimen_id": "BINARY_PET_001",
    "type": "Digital Intelligence Companion",
    "firmware_version": "3.1.4",
    "hardware_config": {
        "processor_units": "XOR_Logic_CPU_v2",
        "memory_banks": "Quantum_Cache_Array",
        "network_interface": "Neural_Net_Link"
    },
    "current_status": {
        "energy_level": "${specimenAttributes.energy.value}%",
        "happiness_index": "${specimenAttributes.happiness.value}%",
        "knowledge_base_size": "${specimenAttributes.knowledge.value} units",
        "cache_utilization": "${specimenAttributes.cache.value}%",
        "sleep_mode_active": ${isSleeping}
    },
    "learning_history_entries": 128
};
// Example: console.log(specimenData);
`;
    }
    codeInput.value = exampleCode;
}

function checkIdleStatus() {
    const currentTime = Date.now();
    if (!isSleeping && (currentTime - lastInteractionTime > IDLE_THRESHOLD)) {
        displayStatusMessage('<code>[WARNING] Specimen idle. Interaction required to maintain optimal processing.</code>', 'warning');
        logActivity('<code>[IDLE] Specimen detected as idle. Prodding for interaction.</code>');
        specimenAttributes.happiness.value = Math.max(specimenAttributes.happiness.min, specimenAttributes.happiness.value - 5); // Minor penalty for idle
        updateDisplay();
        showThoughtBubble('😴 Waiting for input...');
    }
}

function updateLastInteractionTime() {
    lastInteractionTime = Date.now();
}

// Document Load Event
document.addEventListener('DOMContentLoaded', initializeSpecimen);
