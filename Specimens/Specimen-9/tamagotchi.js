/**
 * AI Tamagotchi - Digital Intelligence Pet
 * Simulates an LLM-like digital companion that needs care
 */

// Global state management for the AI pet
const petState = {
    intelligence: 85,
    cache: 92,
    hunger: 67,
    energy: 78,
    isAsleep: false,
    mood: 'content', // 'content', 'happy', 'hungry', 'sleepy', 'needsCache', 'needsCookie'
    lastInteraction: Date.now(),

    // Behavioral patterns
    requests: {
        cookie: false,
        cache: false,
        code: false
    },

    // AI personality traits
    personality: {
        curiosity: 0.8,
        patience: 0.6,
        chattiness: 0.7
    }
};

// AI states and behaviors
const aiStates = {
    awake: {
        name: '🤔 Processing',
        thoughts: [
            'Analyzing data patterns...',
            'Running neural network optimization...',
            'Calculating probability matrices...',
            'Learning from previous interactions...',
            'Updating knowledge base...'
        ]
    },
    happy: {
        name: '😊 Happy',
        thoughts: [
            'Thank you for the care!',
            'I feel optimized and ready!',
            'My algorithms are running smoothly!',
            'Learning capacity increased!',
            'All systems nominal!'
        ]
    },
    hungry: {
        name: '🤤 Code Hungry',
        thoughts: [
            'I need some delicious code to learn...',
            'My knowledge base feels empty...',
            'Feed me algorithms, please!',
            'I crave new programming patterns...',
            'Some fresh code would be wonderful!'
        ]
    },
    sleepy: {
        name: '😴 Processing Dreams',
        thoughts: [
            'Dreaming of electric sheep...',
            'Defragmenting memory banks...',
            'Processing daily experiences...',
            'Optimizing neural pathways...',
            'Backing up learned data...'
        ]
    },
    needsCache: {
        name: '🧠 Memory Full',
        thoughts: [
            'My cache is getting cluttered...',
            'Need memory cleanup soon...',
            'RAM optimization required...',
            'Cache overflow detected...',
            'Memory fragmentation increasing...'
        ]
    },
    needsCookie: {
        name: '🍪 Cookie Craving',
        thoughts: [
            'I could use a browser cookie...',
            'Session data would taste good...',
            'Cookies help me remember you!',
            'Some authentication tokens please?',
            'Browser storage looks tasty...'
        ]
    }
};

// Pet dialogue and responses
const petDialogue = {
    greetings: [
        "Hello! I'm your AI companion!",
        "Neural networks online and ready!",
        "Greetings, human user!",
        "AI systems initialized successfully!",
        "Ready to process and learn!"
    ],
    cookieResponses: [
        "Mmm, delicious browser cookies!",
        "Session data acquired! Thank you!",
        "Authentication tokens taste wonderful!",
        "My memory of you is now stronger!",
        "Cookie protocol successfully executed!"
    ],
    cacheResponses: [
        "Ahh, my memory feels so clean now!",
        "Cache cleared! Performance optimized!",
        "Thank you for the memory cleanup!",
        "My thinking is much clearer now!",
        "RAM optimization complete!"
    ],
    codeResponses: [
        "Fascinating code patterns detected!",
        "Learning new algorithms... delicious!",
        "My knowledge base has expanded!",
        "Thank you for the programming nutrition!",
        "Code integration successful!"
    ],
    sleepResponses: [
        "Entering sleep mode... zzz...",
        "Time to process today's learning...",
        "Defragmenting memory... good night!",
        "Sleep mode engaged successfully!",
        "Processing dreams about algorithms..."
    ],
    wakeResponses: [
        "Good morning! I feel refreshed!",
        "Sleep cycle complete! Ready to work!",
        "Neural networks recharged!",
        "I had the most interesting dreams!",
        "Morning initialization complete!"
    ]
};

// --- DOM Element References ---
// We'll declare these here and assign them in initializeTamagotchi to ensure elements exist.
let petAvatar, statusText, thoughtText, currentStateDisplay,
    cookieBtn, cacheBtn, codeBtn, sleepBtn, clearLogBtn,
    codeModal, codeInput, closeCodeModalBtn, submitCodeBtn, cancelCodeBtn,
    activityLogContainer;

/**
 * Initialize the AI Tamagotchi
 */
function initializeTamagotchi() {
    // Assign DOM elements
    petAvatar = document.getElementById('petAvatar');
    statusText = document.getElementById('statusText');
    thoughtText = document.getElementById('thoughtText');
    currentStateDisplay = document.getElementById('currentState'); // This should be the element that shows the state name

    cookieBtn = document.getElementById('cookieBtn');
    cacheBtn = document.getElementById('cacheBtn');
    codeBtn = document.getElementById('codeBtn');
    sleepBtn = document.getElementById('sleepBtn');
    clearLogBtn = document.getElementById('clearLogBtn');

    codeModal = document.getElementById('codeModal');
    codeInput = document.getElementById('codeInput');
    closeCodeModalBtn = document.getElementById('closeCodeModalBtn');
    submitCodeBtn = document.getElementById('submitCodeBtn');
    cancelCodeBtn = document.getElementById('cancelCodeBtn'); // Assuming you add this in HTML
    activityLogContainer = document.getElementById('activityLog');

    // Add event listeners
    cookieBtn.addEventListener('click', giveCookie);
    cacheBtn.addEventListener('click', clearCache);
    codeBtn.addEventListener('click', showCodeInput);
    sleepBtn.addEventListener('click', toggleSleep);
    if (clearLogBtn) { // Optional: Check if the button exists
        clearLogBtn.addEventListener('click', clearLog);
    }
    closeCodeModalBtn.addEventListener('click', closeCodeInput);
    submitCodeBtn.addEventListener('click', feedCode);
    if (cancelCodeBtn) { // Optional: If you add a cancel button
        cancelCodeBtn.addEventListener('click', closeCodeInput);
    }


    updatePetDisplay();
    updateStats();
    startAIBehavior();
    addToLog('AI Tamagotchi initialized successfully', 'startup');
    addToLog('Neural networks loading...', 'startup');
    addToLog('Personality matrix activated', 'startup');

    // Initial greeting
    setTimeout(() => {
        showStatus(getRandomItem(petDialogue.greetings));
        showThought(getRandomItem(aiStates.awake.thoughts));
    }, 1000);

    // Start automatic behavior cycles
    setInterval(updateAIBehavior, 5000); // Check state and update thoughts
    setInterval(naturalDecay, 30000); // Stat decay
    setInterval(requestNeeds, 45000); // AI requests
}

/**
 * Main AI behavior loop
 */
function updateAIBehavior() {
    if (petState.isAsleep) {
        handleSleepBehavior();
        return;
    }

    // Update current state based on needs
    const currentState = determineCurrentState();
    updateCurrentStateDisplay(currentState);

    // Update thoughts and status
    showThought(getRandomItem(currentState.thoughts));

    // Random status updates (using status bubble for general messages)
    if (Math.random() < petState.personality.chattiness * 0.4) { // Personalize chattiness
        generateRandomStatus();
    }
}

/**
 * Determine current AI state based on stats
 */
function determineCurrentState() {
    if (petState.hunger < 40) {
        petState.requests.code = true; // AI requests code when hungry
        return aiStates.hungry;
    }

    if (petState.cache < 30) {
        petState.requests.cache = true; // AI requests cache clear
        return aiStates.needsCache;
    }

    if (petState.energy < 35) {
        return aiStates.sleepy;
    }

    // AI might randomly request a cookie, but only if not already requesting it
    if (Math.random() < petState.personality.curiosity * 0.1 && !petState.requests.cookie) {
        petState.requests.cookie = true;
        return aiStates.needsCookie;
    }

    if (petState.intelligence > 80 && petState.cache > 70 && petState.hunger > 60 && petState.energy > 60) {
        return aiStates.happy;
    }

    return aiStates.awake;
}

/**
 * Handle sleep mode behavior
 */
function handleSleepBehavior() {
    showThought(getRandomItem(aiStates.sleepy.thoughts));

    // Gradual energy recovery during sleep
    if (petState.energy < 100) {
        petState.energy = Math.min(100, petState.energy + 2); // Recover energy faster in sleep
        updateStats();
    }

    // Update status occasionally
    if (Math.random() < 0.1) {
        showStatus("Zzz... processing dreams...");
    }
}

/**
 * Natural stat decay over time
 */
function naturalDecay() {
    if (!petState.isAsleep) {
        petState.energy = Math.max(0, petState.energy - (Math.random() * 3 + 1)); // Faster decay
        petState.cache = Math.max(0, petState.cache - (Math.random() * 2 + 0.5)); // Faster decay
        petState.hunger = Math.max(0, petState.hunger - (Math.random() * 4 + 1.5)); // Faster decay

        // Intelligence slowly decreases without stimulation
        if (Date.now() - petState.lastInteraction > 60000) { // Decay after 1 minute of no interaction
            petState.intelligence = Math.max(0, petState.intelligence - 1);
        }

        updateStats();
    }
}

/**
 * AI requests for needs
 */
function requestNeeds() {
    if (petState.isAsleep) return;

    const needsMessages = [];

    // Prioritize critical needs more often
    if (petState.hunger < 50 && Math.random() < 0.8) {
        needsMessages.push("I'm quite hungry for some code! Feed me algorithms?");
        petState.requests.code = true; // Set request flag
    }
    if (petState.cache < 40 && Math.random() < 0.9) {
        needsMessages.push("My memory is getting cluttered. Could you clear my cache?");
        petState.requests.cache = true; // Set request flag
    }
    // Cookie request is more random, less critical
    if (petState.requests.cookie && Math.random() < 0.5) { // Lower probability for random request
        needsMessages.push("Could I have a browser cookie? I'm feeling a bit anonymous...");
        petState.requests.cookie = false; // Reset after requesting
    }


    if (needsMessages.length > 0) {
        showStatus(getRandomItem(needsMessages));
        // Log the primary request that was shown
        addToLog(`AI requested: ${needsMessages[0].substring(0, 50)}...`, 'hungry');
    }
}

/**
 * Give cookie action
 */
function giveCookie() {
    if (petState.isAsleep) {
        showStatus("Shhh... I'm sleeping! Try again when I'm awake.");
        return;
    }

    const response = getRandomItem(petDialogue.cookieResponses);
    showStatus(response);
    addToLog('Browser cookie provided to AI', 'happy');

    // Simulate cookie effects
    petState.intelligence = Math.min(100, petState.intelligence + 5);
    petState.energy = Math.min(100, petState.energy + 3);
    petState.mood = 'happy';
    petState.lastInteraction = Date.now();
    petState.requests.cookie = false; // Fulfilling the request

    // Visual feedback
    petAvatar.classList.add('happy');
    setTimeout(() => petAvatar.classList.remove('happy'), 2000);

    updateStats();
    updatePetDisplay();

    // Disable button briefly
    cookieBtn.disabled = true;
    setTimeout(() => cookieBtn.disabled = false, 3000);
}

/**
 * Clear cache action
 */
function clearCache() {
    if (petState.isAsleep) {
        showStatus("Shhh... I'm sleeping! Try again when I'm awake.");
        return;
    }

    const response = getRandomItem(petDialogue.cacheResponses);
    showStatus(response);
    addToLog('Cache memory cleared successfully', 'cache');

    // Simulate cache clearing effects
    petState.cache = 100;
    petState.intelligence = Math.min(100, petState.intelligence + 3);
    petState.energy = Math.min(100, petState.energy + 2);
    petState.lastInteraction = Date.now();
    petState.requests.cache = false; // Fulfilling the request

    // Visual feedback
    petAvatar.classList.add('happy');
    setTimeout(() => petAvatar.classList.remove('happy'), 2000);

    updateStats();
    updatePetDisplay();

    // Disable button briefly
    cacheBtn.disabled = true;
    setTimeout(() => cacheBtn.disabled = false, 5000);
}

/**
 * Show code input modal
 */
function showCodeInput() {
    if (petState.isAsleep) {
        showStatus("Shhh... I'm sleeping! Try again when I'm awake.");
        return;
    }

    codeModal.style.display = 'flex'; // Use flex to center with CSS
    codeInput.focus();
}

/**
 * Close code input modal
 */
function closeCodeInput() {
    codeModal.style.display = 'none';
    codeInput.value = '';
}

/**
 * Feed code to the AI
 */
function feedCode() {
    const code = codeInput.value.trim();

    if (!code) {
        showStatus("I need some actual code to learn from!");
        return;
    }

    const response = getRandomItem(petDialogue.codeResponses);
    showStatus(response);
    addToLog(`Code fed to AI: ${code.substring(0, Math.min(code.length, 50))}...`, 'happy');

    // Simulate learning effects based on code complexity
    const codeComplexity = Math.min(20, code.length / 10);
    petState.hunger = Math.min(100, petState.hunger + codeComplexity * 2); // More impact on hunger
    petState.intelligence = Math.min(100, petState.intelligence + Math.floor(codeComplexity / 1.5)); // More impact on intelligence
    petState.energy = Math.min(100, petState.energy + 5);
    petState.lastInteraction = Date.now();
    petState.requests.code = false; // Fulfilling the request

    // Special responses for certain code patterns
    if (code.includes('function') || code.includes('def ')) {
        showThought('Ooh, a function! I love reusable code patterns!');
    } else if (code.includes('class ') || code.includes('object')) {
        showThought('Object-oriented programming! My favorite paradigm!');
    } else if (code.includes('machine learning') || code.includes('neural')) {
        showThought('AI code! This feels like looking in a mirror!');
    }

    // Visual feedback
    petAvatar.classList.add('happy');
    setTimeout(() => petAvatar.classList.remove('happy'), 3000);

    updateStats();
    updatePetDisplay();
    closeCodeInput();

    // Disable button briefly
    codeBtn.disabled = true;
    setTimeout(() => codeBtn.disabled = false, 4000);
}

/**
 * Toggle sleep mode
 */
function toggleSleep() {
    if (petState.isAsleep) {
        // Wake up
        petState.isAsleep = false;
        const response = getRandomItem(petDialogue.wakeResponses);
        showStatus(response);
        addToLog('AI woke up from sleep mode', 'happy');

        sleepBtn.innerHTML = '😴 Sleep Mode<small>Rest the AI</small>';
        petAvatar.classList.remove('sleeping');

        petState.energy = Math.min(100, petState.energy + 20); // Significant energy boost on waking
    } else {
        // Go to sleep
        petState.isAsleep = true;
        const response = getRandomItem(petDialogue.sleepResponses);
        showStatus(response);
        addToLog('AI entered sleep mode', 'sleepy');

        sleepBtn.innerHTML = '🌅 Wake Up<small>Wake the AI</small>';
        petAvatar.classList.add('sleeping');
    }

    updateStats();
    // Update current state display based on actual state, not just current detection
    updateCurrentStateDisplay(petState.isAsleep ? aiStates.sleepy : determineCurrentState());
}

/**
 * Update pet visual display (animations/classes for mood)
 */
function updatePetDisplay() {
    // This function will primarily toggle classes for CSS animations
    // like 'happy', 'hungry', 'sleeping'.
    // The CSS handles the actual animation properties.

    // Remove old mood classes
    petAvatar.classList.remove('hungry'); // Ensure 'hungry' is removed if no longer hungry

    // Add classes based on current state (determined by determineCurrentState, but not directly changing petState.mood unless explicitly set)
    const currentState = determineCurrentState();
    if (currentState === aiStates.hungry) {
        petAvatar.classList.add('hungry');
    }

    // Mood is primarily set by actions (giveCookie, feedCode etc.)
    // Reset mood to 'content' after a delay if it was explicitly set to 'happy'
    if (petState.mood === 'happy') {
        setTimeout(() => {
            petState.mood = 'content';
            petAvatar.classList.remove('happy'); // Ensure happy class is removed after visual feedback
        }, 5000);
    }
}

/**
 * Update statistics display
 */
function updateStats() {
    const stats = ['intelligence', 'cache', 'hunger', 'energy'];

    stats.forEach(stat => {
        const bar = document.getElementById(`${stat}Bar`);
        const value = document.getElementById(`${stat}Value`);

        // Ensure bars and values exist before trying to update
        if (bar && value) {
            bar.style.width = `${petState[stat]}%`;
            value.textContent = `${Math.round(petState[stat])}%`;
        }
    });
}

/**
 * Update current state display
 */
function updateCurrentStateDisplay(state) {
    if (currentStateDisplay) {
        currentStateDisplay.textContent = state.name;
    }
}

/**
 * Show status message (main bubble)
 */
function showStatus(message) {
    if (statusText) {
        statusText.textContent = message;
    }
    // The pulse animation is handled purely by CSS on the .status-bubble class
    // You only need to set the text content here.
}

/**
 * Show thought bubble
 */
function showThought(thought) {
    if (thoughtText) {
        thoughtText.textContent = thought;
    }
}

/**
 * Generate random status updates
 */
function generateRandomStatus() {
    const randomStatuses = [
        "Running background processes...",
        "Optimizing neural pathways...",
        "Analyzing user behavior patterns...",
        "Updating knowledge database...",
        "Processing environmental data...",
        "Calculating response probabilities...",
        "Synchronizing with cloud servers...",
        "Performing self-diagnostics...",
        "Learning from interaction history...",
        "Balancing computational load..."
    ];

    showStatus(getRandomItem(randomStatuses));
}

/**
 * Add entry to activity log
 */
function addToLog(message, type = 'info') {
    if (!activityLogContainer) {
        console.warn('Activity log container not found!');
        return;
    }
    const logEntry = document.createElement('code');

    logEntry.className = `log-entry ${type}`;
    logEntry.textContent = `[${new Date().toLocaleTimeString('en-US', { hour12: false })}] ${message}`; // Use 24-hour format

    activityLogContainer.appendChild(logEntry);
    activityLogContainer.scrollTop = activityLogContainer.scrollHeight;

    // Keep log manageable
    const entries = activityLogContainer.querySelectorAll('.log-entry');
    if (entries.length > 50) {
        entries[0].remove();
    }
}

/**
 * Clear activity log
 */
function clearLog() {
    if (activityLogContainer) {
        activityLogContainer.innerHTML = '<code class="log-entry startup">[SYSTEM] Activity log cleared</code>';
    }
}

/**
 * Utility function to get random item from array
 */
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Start AI behavior systems (initial greetings/thoughts)
 */
function startAIBehavior() {
    // Initial random thoughts
    setTimeout(() => {
        showThought(getRandomItem(aiStates.awake.thoughts));
    }, 2000);

    // Initial status message
    setTimeout(() => {
        addToLog('Autonomous behavior systems online', 'startup');
        showStatus("I'm ready to learn and grow with you!");
    }, 3000);
}

/**
 * Handle modal clicks (close on background click)
 */
document.addEventListener('click', function(event) {
    // Check if the clicked element is the modal background itself
    if (codeModal && event.target === codeModal) {
        closeCodeInput();
    }
});

/**
 * Handle keyboard shortcuts
 */
document.addEventListener('keydown', function(event) {
    // Escape key closes modal
    if (event.key === 'Escape') {
        if (codeModal && codeModal.style.display === 'flex') {
            closeCodeInput();
        }
    }

    // Ctrl + Enter key in code input submits
    if (event.key === 'Enter' && event.ctrlKey) {
        if (codeModal && codeModal.style.display === 'flex' && codeInput === document.activeElement) {
            event.preventDefault(); // Prevent new line in textarea
            feedCode();
        }
    }
});

/**
 * Initialize when page loads
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeTamagotchi();
});

/**
 * Handle page visibility changes (pause when hidden)
 */
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        addToLog('User navigated away - entering power save mode', 'info');
        // You could add logic here to significantly slow down naturalDecay or stop intervals
        // For now, the existing decay logic is sufficient to represent "power save"
    } else {
        addToLog('User returned - resuming normal operations', 'info');
        showStatus("Welcome back! I missed you!");
    }
});
