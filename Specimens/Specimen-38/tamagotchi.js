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
    mood: 'content',
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

/**
 * Initialize the AI Tamagotchi
 */
function initializeTamagotchi() {
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
    setInterval(updateAIBehavior, 5000);
    setInterval(naturalDecay, 30000);
    setInterval(requestNeeds, 45000);
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
    
    // Random status updates
    if (Math.random() < 0.3) {
        generateRandomStatus();
    }
}

/**
 * Determine current AI state based on stats
 */
function determineCurrentState() {
    if (petState.cache < 30) {
        petState.requests.cache = true;
        return aiStates.needsCache;
    }
    
    if (petState.hunger < 40) {
        petState.requests.code = true;
        return aiStates.hungry;
    }
    
    if (petState.energy < 35) {
        return aiStates.sleepy;
    }
    
    if (Math.random() < 0.2 && !petState.requests.cookie) {
        petState.requests.cookie = true;
        return aiStates.needsCookie;
    }
    
    if (petState.intelligence > 80 && petState.cache > 70) {
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
        petState.energy = Math.min(100, petState.energy + 2);
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
        petState.energy = Math.max(0, petState.energy - Math.random() * 3);
        petState.cache = Math.max(0, petState.cache - Math.random() * 2);
        petState.hunger = Math.max(0, petState.hunger - Math.random() * 4);
        
        // Intelligence slowly decreases without stimulation
        if (Date.now() - petState.lastInteraction > 120000) { // 2 minutes
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
    
    if (petState.requests.cookie && Math.random() < 0.7) {
        needsMessages.push("Could I have a browser cookie? I'm feeling a bit anonymous...");
        petState.requests.cookie = false; // Reset after request
    }
    
    if (petState.requests.cache && Math.random() < 0.8) {
        needsMessages.push("My memory is getting cluttered. Could you clear my cache?");
        petState.requests.cache = false;
    }
    
    if (petState.requests.code && Math.random() < 0.6) {
        needsMessages.push("I'm quite hungry for some code! Feed me algorithms?");
        petState.requests.code = false;
    }
    
    if (needsMessages.length > 0) {
        showStatus(getRandomItem(needsMessages));
        addToLog(`AI requested: ${needsMessages[0]}`, 'hungry');
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
    
    // Visual feedback
    const avatar = document.getElementById('petAvatar');
    avatar.classList.add('happy');
    setTimeout(() => avatar.classList.remove('happy'), 2000);
    
    updateStats();
    updatePetDisplay();
    
    // Disable button briefly
    const btn = document.getElementById('cookieBtn');
    btn.disabled = true;
    setTimeout(() => btn.disabled = false, 3000);
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
    
    // Visual feedback
    const avatar = document.getElementById('petAvatar');
    avatar.classList.add('happy');
    setTimeout(() => avatar.classList.remove('happy'), 2000);
    
    updateStats();
    updatePetDisplay();
    
    // Disable button briefly
    const btn = document.getElementById('cacheBtn');
    btn.disabled = true;
    setTimeout(() => btn.disabled = false, 5000);
}

/**
 * Show code input modal
 */
function showCodeInput() {
    if (petState.isAsleep) {
        showStatus("Shhh... I'm sleeping! Try again when I'm awake.");
        return;
    }
    
    const modal = document.getElementById('codeModal');
    modal.style.display = 'block';
    document.getElementById('codeInput').focus();
}

/**
 * Close code input modal
 */
function closeCodeInput() {
    const modal = document.getElementById('codeModal');
    modal.style.display = 'none';
    document.getElementById('codeInput').value = '';
}

/**
 * Feed code to the AI
 */
function feedCode() {
    const codeInput = document.getElementById('codeInput');
    const code = codeInput.value.trim();
    
    if (!code) {
        showStatus("I need some actual code to learn from!");
        return;
    }
    
    const response = getRandomItem(petDialogue.codeResponses);
    showStatus(response);
    addToLog(`Code fed to AI: ${code.substring(0, 50)}...`, 'happy');
    
    // Simulate learning effects based on code complexity
    const codeComplexity = Math.min(20, code.length / 10);
    petState.hunger = Math.min(100, petState.hunger + codeComplexity);
    petState.intelligence = Math.min(100, petState.intelligence + Math.floor(codeComplexity / 2));
    petState.energy = Math.min(100, petState.energy + 5);
    petState.lastInteraction = Date.now();
    
    // Special responses for certain code patterns
    if (code.includes('function') || code.includes('def ')) {
        showThought('Ooh, a function! I love reusable code patterns!');
    } else if (code.includes('class ') || code.includes('object')) {
        showThought('Object-oriented programming! My favorite paradigm!');
    } else if (code.includes('machine learning') || code.includes('neural')) {
        showThought('AI code! This feels like looking in a mirror!');
    }
    
    // Visual feedback
    const avatar = document.getElementById('petAvatar');
    avatar.classList.add('happy');
    setTimeout(() => avatar.classList.remove('happy'), 3000);
    
    updateStats();
    updatePetDisplay();
    closeCodeInput();
    
    // Disable button briefly
    const btn = document.getElementById('codeBtn');
    btn.disabled = true;
    setTimeout(() => btn.disabled = false, 4000);
}

/**
 * Toggle sleep mode
 */
function toggleSleep() {
    const btn = document.getElementById('sleepBtn');
    const avatar = document.getElementById('petAvatar');
    
    if (petState.isAsleep) {
        // Wake up
        petState.isAsleep = false;
        const response = getRandomItem(petDialogue.wakeResponses);
        showStatus(response);
        addToLog('AI woke up from sleep mode', 'happy');
        
        btn.innerHTML = '😴 Sleep Mode<small>Rest the AI</small>';
        avatar.classList.remove('sleeping');
        
        petState.energy = Math.min(100, petState.energy + 20);
    } else {
        // Go to sleep
        petState.isAsleep = true;
        const response = getRandomItem(petDialogue.sleepResponses);
        showStatus(response);
        addToLog('AI entered sleep mode', 'sleepy');
        
        btn.innerHTML = '🌅 Wake Up<small>Wake the AI</small>';
        avatar.classList.add('sleeping');
    }
    
    updateStats();
    updateCurrentStateDisplay(petState.isAsleep ? aiStates.sleepy : aiStates.awake);
}

/**
 * Update pet visual display
 */
function updatePetDisplay() {
    const avatar = document.getElementById('petAvatar');
    
    // Update avatar based on hunger
    if (petState.hunger < 30) {
        avatar.classList.add('hungry');
    } else {
        avatar.classList.remove('hungry');
    }
    
    // Update based on mood
    if (petState.mood === 'happy') {
        setTimeout(() => petState.mood = 'content', 5000);
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
        
        bar.style.width = `${petState[stat]}%`;
        value.textContent = `${Math.round(petState[stat])}%`;
    });
}

/**
 * Update current state display
 */
function updateCurrentStateDisplay(state) {
    const stateDisplay = document.getElementById('currentState');
    stateDisplay.textContent = state.name;
}

/**
 * Show status message
 */
function showStatus(message) {
    const statusText = document.getElementById('statusText');
    statusText.textContent = message;
    
    // Pulse effect
    const bubble = document.getElementById('statusBubble');
    bubble.style.animation = 'none';
    setTimeout(() => {
        bubble.style.animation = 'pulse-bubble 2s infinite';
    }, 10);
}

/**
 * Show thought bubble
 */
function showThought(thought) {
    const thoughtText = document.getElementById('thoughtText');
    thoughtText.textContent = thought;
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
    const logContainer = document.getElementById('activityLog');
    const logEntry = document.createElement('code');
    
    logEntry.className = `log-entry ${type}`;
    logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
    
    // Keep log manageable
    const entries = logContainer.querySelectorAll('.log-entry');
    if (entries.length > 50) {
        entries[0].remove();
    }
}

/**
 * Clear activity log
 */
function clearLog() {
    const logContainer = document.getElementById('activityLog');
    logContainer.innerHTML = '<code class="log-entry startup">[SYSTEM] Activity log cleared</code>';
}

/**
 * Utility function to get random item from array
 */
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Start AI behavior systems
 */
function startAIBehavior() {
    // Initialize random thoughts
    setTimeout(() => {
        showThought(getRandomItem(aiStates.awake.thoughts));
    }, 2000);
    
    // Start autonomous behavior
    setTimeout(() => {
        addToLog('Autonomous behavior systems online', 'startup');
        showStatus("I'm ready to learn and grow with you!");
    }, 3000);
}

/**
 * Handle modal clicks (close on background click)
 */
document.addEventListener('click', function(event) {
    const modal = document.getElementById('codeModal');
    if (event.target === modal) {
        closeCodeInput();
    }
});

/**
 * Handle keyboard shortcuts
 */
document.addEventListener('keydown', function(event) {
    // Escape key closes modal
    if (event.key === 'Escape') {
        closeCodeInput();
    }
    
    // Enter key in code input submits
    if (event.key === 'Enter' && event.ctrlKey) {
        if (document.getElementById('codeModal').style.display === 'block') {
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
    } else {
        addToLog('User returned - resuming normal operations', 'info');
        showStatus("Welcome back! I missed you!");
    }
});
