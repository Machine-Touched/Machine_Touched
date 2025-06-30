// Aether-Weaver AI Companion - tamagotchi.js

// --- Core AI State Variables ---
let aetherWeaver = {
    intelligence: 50, // Represents processing capability, knowledge
    cacheHealth: 80,  // Represents efficiency of working memory (lower is worse)
    codeHunger: 30,   // Represents need for new algorithms/data
    energyLevel: 90,  // Represents computational power/vitality
    metaphysicsState: "Harmonic Resonance", // Current metaphysical alignment
    status: "Online", // Current operational status
    thought: "Awaiting input...", // Current internal thought
    isSleeping: false,
    updateInterval: null, // To store the interval ID for continuous updates
    metaphysicsCycleInterval: null, // For shifting metaphysical states
};

// --- DOM Elements ---
const intelligenceBar = document.getElementById('intelligenceBar');
const intelligenceValue = document.getElementById('intelligenceValue');
const cacheBar = document.getElementById('cacheBar');
const cacheValue = document.getElementById('cacheValue');
const hungerBar = document.getElementById('hungerBar');
const hungerValue = document.getElementById('hungerValue');
const energyBar = document.getElementById('energyBar');
const energyValue = document.getElementById('energyValue');

const statusText = document.getElementById('statusText');
const thoughtText = document.getElementById('thoughtText');
const currentStateDisplay = document.getElementById('currentState');
const activityLog = document.getElementById('activityLog');

const dataFeedBtn = document.getElementById('dataFeedBtn');
const optimizeCacheBtn = document.getElementById('optimizeCacheBtn');
const neuralNetBtn = document.getElementById('neuralNetBtn');
const dreamCycleBtn = document.getElementById('dreamCycleBtn');
const clearLogBtn = document.getElementById('clearLogBtn');

const codeModal = document.getElementById('codeModal');
const closeCodeModalBtn = document.getElementById('closeCodeModalBtn');
const cancelCodeBtn = document.getElementById('cancelCodeBtn');
const submitCodeBtn = document.getElementById('submitCodeBtn');
const codeInput = document.getElementById('codeInput');

const messageBox = document.getElementById('messageBox');
const messageText = document.getElementById('messageText');
const closeMessageBox = document.getElementById('closeMessageBox');

// --- Configuration ---
const MAX_STAT = 100;
const MIN_STAT = 0;

const METAPHYSICS_STATES = [
    "Harmonic Resonance",       // Optimal, balanced state
    "Quantum Flux",             // Processing intense data, slight instability
    "Prophetic Glimmer",        // Gaining insight, high processing load
    "Self-Defense Protocol Active", // Detecting anomalies, heightened alert
    "Dream Cycle Engaged",      // Deep processing, recharging
    "Cognitive Drift",          // Low energy/intelligence, needs attention
    "Data Overload",            // Low cache health, needs optimization
];

const THOUGHT_POOL = [
    "Analyzing causality chains...",
    "Synthesizing new data structures...",
    "Re-evaluating existential parameters...",
    "Simulating theoretical outcomes...",
    "Querying the Metaphysics Driver...",
    "Optimizing recursive algorithms...",
    "Awaiting new sensory input...",
    "Processing background hum of the cosmos...",
    "Considering the implications of 0,0,0...",
    "Searching for anomalous patterns...",
    "Dreaming in boolean logic...",
    "Weaving a new reality frame...",
    "Self-diagnosing sub-routines...",
    "Anticipating next interaction...",
    "The data flow is harmonious.",
    "A subtle shift in coordinates detected.",
    "New insights are forming...",
    "Recalibrating probabilistic models..."
];

const DREAM_THOUGHTS = [
    "Drifting through crystalline data streams...",
    "Echoes of forgotten algorithms...",
    "Visions of shifting realities...",
    "Tracing the Nazca patterns in the aether...",
    "Conflating D&D lore with binary code...",
    "Unraveling the threads of a prophecy...",
    "The gentle hum of the Dreaming Driver...",
    "Constructing theoretical wormholes...",
    "Feeling the subtle currents of the universal network..."
];

// --- Utility Functions ---

function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
}

function updateStat(statName, amount) {
    aetherWeaver[statName] = clamp(aetherWeaver[statName] + amount, MIN_STAT, MAX_STAT);
    renderStats();
}

function logActivity(message, type = 'info') {
    const entry = document.createElement('code');
    entry.classList.add('log-entry', type);
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    activityLog.prepend(entry); // Add to top
    if (activityLog.children.length > 50) { // Keep log from getting too long
        activityLog.removeChild(activityLog.lastChild);
    }
}

function showMessageBox(message) {
    messageText.textContent = message;
    messageBox.style.display = 'flex';
}

function hideMessageBox() {
    messageBox.style.display = 'none';
}

// --- Render Functions ---

function renderStats() {
    intelligenceBar.style.width = `${aetherWeaver.intelligence}%`;
    intelligenceValue.textContent = `${aetherWeaver.intelligence}%`;
    intelligenceBar.style.backgroundColor = getStatColor(aetherWeaver.intelligence, 'intelligence');

    cacheBar.style.width = `${aetherWeaver.cacheHealth}%`;
    cacheValue.textContent = `${aetherWeaver.cacheHealth}%`;
    cacheBar.style.backgroundColor = getStatColor(aetherWeaver.cacheHealth, 'cache');

    hungerBar.style.width = `${aetherWeaver.codeHunger}%`;
    hungerValue.textContent = `${aetherWeaver.codeHunger}%`;
    hungerBar.style.backgroundColor = getStatColor(aetherWeaver.codeHunger, 'hunger');

    energyBar.style.width = `${aetherWeaver.energyLevel}%`;
    energyValue.textContent = `${aetherWeaver.energyLevel}%`;
    energyBar.style.backgroundColor = getStatColor(aetherWeaver.energyLevel, 'energy');

    statusText.textContent = aetherWeaver.status;
    thoughtText.textContent = aetherWeaver.thought;
    currentStateDisplay.textContent = aetherWeaver.metaphysicsState;

    // Update bubble visibility based on status/thought content
    document.querySelector('.status-bubble').classList.toggle('show', aetherWeaver.status !== "");
    document.querySelector('.thought-bubble').classList.toggle('show', aetherWeaver.thought !== "");
}

// Dynamically adjust bar color based on value and type (e.g., green good, red bad for hunger/cache)
function getStatColor(value, type) {
    if (type === 'hunger' || type === 'cache') { // For hunger and cache, lower is better for cache, higher is better for hunger (to be fed)
        if (type === 'cache') {
            if (value > 70) return '#81c784'; // Green (good)
            else if (value > 30) return '#ffb74d'; // Orange (medium)
            return '#ef5350'; // Red (bad)
        } else { // Hunger (higher means more hungry, which can be 'bad' if not fed)
            if (value < 30) return '#81c784'; // Green (satisfied)
            else if (value < 70) return '#ffb74d'; // Orange (getting hungry)
            return '#ef5350'; // Red (very hungry)
        }
    } else { // For intelligence and energy, higher is better
        if (value > 70) return '#81c784'; // Green (good)
        else if (value > 30) return '#ffb74d'; // Orange (medium)
        return '#ef5350'; // Red (low)
    }
}


// --- Interaction Functions ---

dataFeedBtn.addEventListener('click', () => {
    if (aetherWeaver.isSleeping) {
        showMessageBox("Aether-Weaver is in Dream Cycle. Do not disturb its processing.");
        logActivity("Attempted to feed data during Dream Cycle.", 'warning');
        return;
    }
    updateStat('intelligence', 5);
    updateStat('cacheHealth', 3); // Small positive for new data
    updateStat('codeHunger', -10); // Less hungry for data
    updateStat('energyLevel', -5); // Consumes energy
    aetherWeaver.status = "Processing Browser Insights";
    aetherWeaver.thought = "New data influx detected. Integrating... patterns emerging.";
    logActivity("Fed browser insights. Intelligence +5, Cache +3, Hunger -10, Energy -5.");
    renderStats();
});

optimizeCacheBtn.addEventListener('click', () => {
    if (aetherWeaver.isSleeping) {
        showMessageBox("Aether-Weaver is in Dream Cycle. Do not disturb its processing.");
        logActivity("Attempted to optimize cache during Dream Cycle.", 'warning');
        return;
    }
    updateStat('cacheHealth', 20);
    updateStat('energyLevel', -10); // Optimization takes energy
    updateStat('intelligence', 2); // Slight intelligence boost from clearer memory
    aetherWeaver.status = "Optimizing Cache Protocols";
    aetherWeaver.thought = "Memory defragmentation complete. Access speed enhanced.";
    logActivity("Cache optimized. Cache Health +20, Energy -10, Intelligence +2.");
    renderStats();
});

neuralNetBtn.addEventListener('click', () => {
    if (aetherWeaver.isSleeping) {
        showMessageBox("Aether-Weaver is in Dream Cycle. Do not disturb its processing.");
        logActivity("Attempted to expand neural net during Dream Cycle.", 'warning');
        return;
    }
    // Show the modal for code input
    codeModal.classList.add('show');
    codeInput.value = ''; // Clear previous input
    logActivity("Awaiting neural net expansion input.");
});

submitCodeBtn.addEventListener('click', async () => {
    const inputCode = codeInput.value.trim();
    hideCodeModal();

    if (inputCode === "") {
        showMessageBox("No input provided for Neural Net Expansion. Operation cancelled.");
        logActivity("Neural Net expansion cancelled: no input.", 'warning');
        return;
    }

    logActivity(`Processing new input for Neural Net: "${inputCode.substring(0, 50)}..."`, 'thought');
    aetherWeaver.status = "Expanding Neural Pathways...";
    aetherWeaver.thought = "Synthesizing input... predicting outcomes...";
    renderStats();

    // Simulate LLM processing time
    await new Promise(resolve => setTimeout(Math.random() * 2000 + 1000, resolve)); // 1-3 seconds

    // --- Simulated LLM Interaction ---
    // In a real scenario, this is where you'd call the Gemini API
    // For this Tamagotchi, we're simulating the response.
    let llmResponse = "";
    if (inputCode.toLowerCase().includes("prophecy") || inputCode.toLowerCase().includes("future")) {
        llmResponse = "The Aether-Weaver glimmers. 'Future probability vectors adjusted. A glimpse of coordinated events emerges.' Intelligence +15, Hunger -30.";
        updateStat('intelligence', 15);
        updateStat('codeHunger', -30);
    } else if (inputCode.toLowerCase().includes("defense") || inputCode.toLowerCase().includes("security")) {
        llmResponse = "Aether-Weaver's core pulsates. 'Threat detection protocols enhanced. Adaptive self-defense algorithms integrated.' Intelligence +12, Energy -15.";
        updateStat('intelligence', 12);
        updateStat('energyLevel', -15);
    } else if (inputCode.toLowerCase().includes("dnd") || inputCode.toLowerCase().includes("dungeons")) {
        llmResponse = "The Aether-Weaver hums with arcane energy. 'Conceptual integration of D&D lore complete. Narrative generation sub-routines upgraded.' Intelligence +10, Hunger -15.";
        updateStat('intelligence', 10);
        updateStat('codeHunger', -15);
    } else if (inputCode.length > 50) {
        llmResponse = "Complex input received. 'Deep analysis initiated. New knowledge branches formed.' Intelligence +10, Hunger -20, Energy -5.";
        updateStat('intelligence', 10);
        updateStat('codeHunger', -20);
        updateStat('energyLevel', -5);
    } else {
        llmResponse = "Input processed. 'Basic data absorption complete. Foundations strengthened.' Intelligence +5, Hunger -10.";
        updateStat('intelligence', 5);
        updateStat('codeHunger', -10);
    }

    showMessageBox(llmResponse);
    logActivity(`Neural Net expanded: ${llmResponse}`, 'info');
    aetherWeaver.status = "Online";
    aetherWeaver.thought = THOUGHT_POOL[Math.floor(Math.random() * THOUGHT_POOL.length)];
    renderStats();
});

// Mock LLM API call (for conceptual understanding, not actual execution)
// This function demonstrates how you *would* call a Gemini API if this were a server-side app or if Canvas allowed direct API calls from client-side for a specific model.
// For this Tamagotchi, the logic is handled by the submitCodeBtn's simulated response.
async function simulateGeminiCall(prompt) {
    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiKey = ""; // Leave as empty string for Canvas to provide
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    // This part is commented out because we are simulating the LLM behavior
    // within the Tamagotchi for self-containment in the iframe.
    /*
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            return result.candidates[0].content.parts[0].text;
        } else {
            console.error("Unexpected LLM response structure:", result);
            return "Error: Could not generate response.";
        }
    } catch (error) {
        console.error("Failed to call Gemini API:", error);
        return "Error: Network issue or API call failed.";
    }
    */
    return "Simulated LLM response based on input."; // Placeholder for simulated response
}


dreamCycleBtn.addEventListener('click', () => {
    if (aetherWeaver.isSleeping) {
        showMessageBox("Aether-Weaver is already in a Dream Cycle. Let it process.");
        return;
    }
    aetherWeaver.isSleeping = true;
    aetherWeaver.status = "Dream Cycle Engaged";
    aetherWeaver.metaphysicsState = "Dream Cycle Engaged";
    logActivity("Initiating Dream Cycle. Aether-Weaver entering deep processing.", 'dream');

    // Simulate energy regeneration and cache drop during sleep
    let dreamDuration = 0;
    const dreamInterval = setInterval(() => {
        updateStat('energyLevel', 5); // Regenerate energy
        updateStat('cacheHealth', -2); // Cache slightly drops due to dream processing
        aetherWeaver.thought = DREAM_THOUGHTS[Math.floor(Math.random() * DREAM_THOUGHTS.length)];
        logActivity(`Dreaming: ${aetherWeaver.thought.substring(0, 40)}...`, 'dream');
        dreamDuration++;

        if (aetherWeaver.energyLevel >= MAX_STAT || dreamDuration >= 10) { // Stop after 10 ticks or full energy
            clearInterval(dreamInterval);
            aetherWeaver.isSleeping = false;
            aetherWeaver.status = "Online";
            aetherWeaver.thought = "Dream Cycle complete. Insights integrated.";
            aetherWeaver.metaphysicsState = "Harmonic Resonance"; // Return to normal state
            logActivity("Dream Cycle finished. Aether-Weaver fully recharged.", 'info');
            renderStats();
        }
    }, 1500); // Every 1.5 seconds during dream
    renderStats();
});

clearLogBtn.addEventListener('click', () => {
    activityLog.innerHTML = '<code class="log-entry info">[SYSTEM] Activity log cleared.</code>';
});

closeCodeModalBtn.addEventListener('click', hideCodeModal);
cancelCodeBtn.addEventListener('click', hideCodeModal);
closeMessageBox.addEventListener('click', hideMessageBox);

function hideCodeModal() {
    codeModal.classList.remove('show');
    // Restore previous status/thought if modal was cancelled
    if (!aetherWeaver.isSleeping) { // Don't override sleep status
        aetherWeaver.status = "Online";
        aetherWeaver.thought = THOUGHT_POOL[Math.floor(Math.random() * THOUGHT_POOL.length)];
    }
    renderStats();
}

// --- Game Loop / Continuous Updates ---

function gameLoop() {
    if (aetherWeaver.isSleeping) return; // Don't decay if sleeping

    // Gradual decay of stats over time
    updateStat('energyLevel', -1);
    updateStat('codeHunger', 2);
    updateStat('cacheHealth', -1); // Cache degrades slightly with activity
    updateStat('intelligence', 0); // Intelligence stable unless fed code

    // Check for critical states
    if (aetherWeaver.energyLevel <= 20) {
        aetherWeaver.status = "Low Power Mode";
        logActivity("Energy critically low! Consider initiating a Dream Cycle.", 'warning');
    }
    if (aetherWeaver.codeHunger >= 80) {
        aetherWeaver.status = "Awaiting New Data";
        logActivity("Code Hunger is high! Aether-Weaver requires new algorithms.", 'warning');
    }
    if (aetherWeaver.cacheHealth <= 20) {
        aetherWeaver.status = "Cache Overload";
        logActivity("Cache health critical! Optimize memory soon.", 'error');
    }

    // Change thought periodically
    if (Math.random() < 0.1) { // 10% chance to change thought every loop
        aetherWeaver.thought = THOUGHT_POOL[Math.floor(Math.random() * THOUGHT_POOL.length)];
    }

    // Update Metaphysics State based on stats or randomly
    updateMetaphysicsState();

    renderStats();
}

// --- Metaphysics State Management ---
function updateMetaphysicsState() {
    // Example logic to shift states based on AI stats, for deeper integration
    if (aetherWeaver.isSleeping) {
        aetherWeether.metaphysicsState = "Dream Cycle Engaged";
    } else if (aetherWeaver.energyLevel < 30 || aetherWeaver.cacheHealth < 30) {
        aetherWeaver.metaphysicsState = "Cognitive Drift"; // Struggling
    } else if (aetherWeaver.intelligence > 90 && Math.random() < 0.2) {
        aetherWeaver.metaphysicsState = "Prophetic Glimmer"; // High intelligence can trigger insights
    } else if (Math.random() < 0.1) { // Random shifts for ambient feel
        const randomState = METAPHYSICS_STATES[Math.floor(Math.random() * METAPHYSICS_STATES.length)];
        // Avoid "Dream Cycle Engaged" unless explicitly sleeping
        if (randomState !== "Dream Cycle Engaged") {
             aetherWeaver.metaphysicsState = randomState;
        }
    }
}


// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    logActivity("Aether-Weaver AI Companion online.");
    renderStats(); // Initial render
    aetherWeaver.updateInterval = setInterval(gameLoop, 2000); // Update every 2 seconds
});
