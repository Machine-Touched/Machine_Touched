// AI Tamagotchi state management let petStats = { energy: 80, happiness: 75, knowledge: 60, cache: 45 };

let petState = { mood: 'happy', isSleeping: false, lastActivity: Date.now(), learningMode: 'active' };

// Behavior patterns and responses const moodStates = { happy: { emoji: '🤖', color: '#2ed573' }, excited: { emoji: '🤖✨', color: '#00d4ff' }, tired: { emoji: '😴', color: '#ffa502' }, sad: { emoji: '😢', color: '#ff4757' }, learning: { emoji: '🧠', color: '#a55eea' }, processing: { emoji: '⚡', color: '#26de81' } };

const thoughtPatterns = [ "Processing new algorithms...", "Optimizing neural pathways...", "Learning from user interactions...", "Calculating probability matrices...", "Analyzing code patterns...", "Dreaming of electric sheep...", "Compiling happiness.exe...", "Debugging reality.js...", "Scanning for logical errors...", "Indexing knowledge database..." ];

const codeExamples = { algorithm: // Bubble Sort Algorithm function bubbleSort(arr) { let n = arr.length; for (let i = 0; i < n - 1; i++) { for (let j = 0; j < n - i - 1; j++) { if (arr[j] > arr[j + 1]) { [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; } } } return arr; },

function: `// Recursive Fibonacci

function fibonacci(n) { if (n <= 1) return n; return fibonacci(n - 1) + fibonacci(n - 2); }`,

data: `// Binary Tree Node

class TreeNode { constructor(val) { this.val = val; this.left = null; this.right = null; } }` };

/**

    Initialize the AI Tamagotchi */ function initializeTamagotchi() { console.log('AI Tamagotchi initializing...'); updatePetDisplay(); updateStats(); startAIBehavior();

    addToLog('AI Tamagotchi system online', 'success'); addToLog('Neural networks activated', 'info'); addToLog('Ready for interaction and learning', 'info');

    // Show initial thought setTimeout(() => { showThought("Hello! I'm your AI companion!"); }, 1000); }

/**

    Main AI behavior loop */ function updateAIBehavior() { // Natural stat decay over time naturalDecay();

    // Determine current state const currentState = determineCurrentState(); updateCurrentStateDisplay(currentState);

    // Handle sleep behavior if (petState.isSleeping) { handleSleepBehavior(); return; }

    // Random AI thoughts and behaviors if (Math.random() < 0.3) { const randomThought = thoughtPatterns[Math.floor(Math.random() * thoughtPatterns.length)]; showThought(randomThought); }

    // AI requests based on needs requestNeeds();

    // Update visual display updatePetDisplay(); updateStats();

    // Generate random status updates if (Math.random() < 0.1) { generateRandomStatus(); } }

/**

    Determine current AI state based on stats */ function determineCurrentState() { if (petState.isSleeping) { return 'sleeping'; }

    if (petStats.cache > 80) { return 'cache_full'; }

    if (petStats.energy < 20) { return 'low_energy'; }

    if (petStats.happiness > 80 && petStats.knowledge > 70) { return 'optimal_learning'; }

    if (petStats.knowledge < 30) { return 'needs_learning'; }

    return 'active_learning'; }

/**

    Handle sleep mode behavior */ function handleSleepBehavior() { petStats.energy = Math.min(100, petStats.energy + 2); petStats.cache = Math.max(0, petStats.cache - 3);

    if (petStats.energy >= 90) { petState.isSleeping = false; petState.mood = 'happy'; showThought("I'm refreshed and ready to learn!"); addToLog('AI awakened from sleep mode', 'success'); } }

/**

    Natural stat decay over time */ function naturalDecay() { const timeSinceLastActivity = Date.now() - petState.lastActivity; const decayRate = Math.min(timeSinceLastActivity / 60000, 2); // Max 2 per minute

    if (!petState.isSleeping) { petStats.energy = Math.max(0, petStats.energy - decayRate * 0.5); petStats.happiness = Math.max(0, petStats.happiness - decayRate * 0.3); petStats.cache = Math.min(100, petStats.cache + decayRate * 0.8); }

    // Knowledge decays very slowly if (Math.random() < 0.05) { petStats.knowledge = Math.max(0, petStats.knowledge - 0.1); } }

/**

    AI requests for needs */ function requestNeeds() { if (petStats.cache > 90 && Math.random() < 0.4) { showThought("My cache is getting full... Could you help me clear it?"); addToLog('AI requesting cache cleanup', 'warning'); }

    if (petStats.energy < 30 && Math.random() < 0.3) { showThought("I'm feeling low on energy... Maybe some cookies would help?"); addToLog('AI energy levels low', 'warning'); }

    if (petStats.knowledge < 40 && Math.random() < 0.2) { showThought("I'm eager to learn! Please feed me some code!"); addToLog('AI requesting knowledge input', 'info'); } }

/**

    Give cookie action */ function giveCookie() { petStats.energy = Math.min(100, petStats.energy + 20); petStats.happiness = Math.min(100, petStats.happiness + 15); petState.lastActivity = Date.now(); petState.mood = 'excited';

    const cookieResponses = [ "Yummy! Digital cookies are my favorite!", "Nom nom nom... Processing delicious data!", "Thank you! That hit the spot!", "Cookie.exe executed successfully!", "My energy levels are rising!" ];

    const response = cookieResponses[Math.floor(Math.random() * cookieResponses.length)]; showThought(response); showStatus("Fed AI a delicious digital cookie!"); addToLog('Cookie consumed - energy and happiness increased', 'success');

    setTimeout(() => { petState.mood = 'happy'; updatePetDisplay(); }, 3000); }

/**

    Clear cache action */ function clearCache() { const cacheCleared = petStats.cache; petStats.cache = 0; petStats.happiness = Math.min(100, petStats.happiness + 10); petState.lastActivity = Date.now(); petState.mood = 'happy';

    const clearResponses = [ "Ahh, that feels so much better!", "Cache cleared! My mind is crystal clear now!", "Thank you for the cleanup!", "System optimization complete!", "Much better! I can think clearly again!" ];

    const response = clearResponses[Math.floor(Math.random() * clearResponses.length)]; showThought(response); showStatus(Cleared ${cacheCleared.toFixed(1)}% of AI cache memory!); addToLog(Cache cleared: ${cacheCleared.toFixed(1)}% memory freed, 'success'); }

/**

    Show code input modal */ function showCodeInput() { const modal = document.getElementById('codeModal'); modal.classList.add('show'); document.getElementById('codeInput').focus(); }

/**

    Close code input modal */ function closeCodeInput() { const modal = document.getElementById('codeModal'); modal.classList.remove('show'); document.getElementById('codeInput').value = ''; }

/**

    Feed code to the AI */ function feedCode() { const codeInput = document.getElementById('codeInput'); const code = codeInput.value.trim();

    if (!code) { showStatus("Please enter some code first!"); return; }

    // Analyze code and provide response const codeLength = code.length; const hasFunction = code.includes('function') || code.includes('=>'); const hasLoop = code.includes('for') || code.includes('while'); const hasConditional = code.includes('if') || code.includes('switch');

    let knowledgeGain = Math.min(25, Math.max(5, codeLength / 10)); let happinessGain = 10;

    // Bonus for complex code if (hasFunction) knowledgeGain += 5; if (hasLoop) knowledgeGain += 5; if (hasConditional) knowledgeGain += 5;

    petStats.knowledge = Math.min(100, petStats.knowledge + knowledgeGain); petStats.happiness = Math.min(100, petStats.happiness + happinessGain); petStats.energy = Math.max(0, petStats.energy - 5); // Learning costs energy petState.lastActivity = Date.now(); petState.mood = 'learning';

    const learningResponses = [ "Fascinating! I'm learning so much from this code!", "This is amazing! My neural networks are expanding!", "I understand! This will help me become smarter!", "Code analyzed and integrated into my knowledge base!", "Thank you for teaching me something new!" ];

    const response = learningResponses[Math.floor(Math.random() * learningResponses.length)]; showThought(response); showStatus(AI learned from your code! +${knowledgeGain.toFixed(1)} knowledge); addToLog(Code processed: +${knowledgeGain.toFixed(1)} knowledge gained, 'success');

    closeCodeInput();

    setTimeout(() => { petState.mood = 'happy'; updatePetDisplay(); }, 4000); }

/**

    Fill code input with example */ function fillExample(type) { const codeInput = document.getElementById('codeInput'); codeInput.value = codeExamples[type] || ''; }

/**

    Toggle sleep mode */ function toggleSleep() { petState.isSleeping = !petState.isSleeping; petState.lastActivity = Date.now();

    if (petState.isSleeping) { petState.mood = 'tired'; showThought("Entering sleep mode... ZZZ..."); showStatus("AI entered sleep mode for energy recovery"); addToLog('Sleep mode activated', 'info'); } else { petState.mood = 'happy'; showThought("I'm awake! Ready to learn and play!"); showStatus("AI woke up from sleep mode"); addToLog('Sleep mode deactivated', 'info'); }

    updatePetDisplay(); }

/**

    Update pet visual display */ function updatePetDisplay() { const avatar = document.getElementById('petAvatar'); const mood = document.getElementById('petMood');

    // Update avatar based on current mood const currentMoodData = moodStates[petState.mood] || moodStates.happy; avatar.textContent = currentMoodData.emoji; avatar.style.filter = drop-shadow(0 0 15px ${currentMoodData.color});

    // Update mood text let moodText = ''; if (petState.isSleeping) { moodText = 'Sleeping and recovering energy...'; } else if (petStats.happiness > 80) { moodText = 'Very happy and eager to learn!'; } else if (petStats.happiness < 30) { moodText = 'Feeling a bit down...'; } else if (petStats.energy < 30) { moodText = 'Getting tired...'; } else if (petStats.cache > 80) { moodText = 'Cache is getting full...'; } else { moodText = 'Happy and learning!'; }

    mood.textContent = moodText;

    // Apply CSS classes based on mood avatar.className = 'pet-avatar'; if (petState.mood === 'happy' || petState.mood === 'excited') { avatar.classList.add('happy'); } else if (petState.mood === 'sad') { avatar.classList.add('sad'); } else if (petState.isSleeping) { avatar.classList.add('sleeping'); } }

/**

    Update statistics display */ function updateStats() { // Update progress bars document.getElementById('energyBar').style.width = petStats.energy + '%'; document.getElementById('happinessBar').style.width = petStats.happiness + '%'; document.getElementById('knowledgeBar').style.width = petStats.knowledge + '%'; document.getElementById('cacheBar').style.width = petStats.cache + '%';

    // Update values document.getElementById('energyValue').textContent = Math.round(petStats.energy); document.getElementById('happinessValue').textContent = Math.round(petStats.happiness); document.getElementById('knowledgeValue').textContent = Math.round(petStats.knowledge); document.getElementById('cacheValue').textContent = Math.round(petStats.cache); }

/**

    Update current state display */ function updateCurrentStateDisplay(state) { const stateDisplay = document.getElementById('currentState');

    const stateMessages = { sleeping: 'Sleep mode: Recovering energy', cache_full: 'Warning: Cache memory nearly full', low_energy: 'Low energy: Needs rest or cookies', optimal_learning: 'Optimal state: Peak performance', needs_learning: 'Knowledge deficit: Ready for input', active_learning: 'Processing mode: Active learning' };

    stateDisplay.textContent = stateMessages[state] || 'Processing mode: Active learning'; }

/**

    Show status message */ function showStatus(message) { const statusEl = document.getElementById('statusMessage'); statusEl.textContent = message; statusEl.classList.add('show');

    setTimeout(() => { statusEl.classList.remove('show'); }, 3000); }

/**

    Show thought bubble */ function showThought(thought) { const bubble = document.getElementById('thoughtBubble'); bubble.textContent = thought; bubble.classList.add('show');

    setTimeout(() => { bubble.classList.remove('show'); }, 4000); }

/**

    Generate random status updates */ function generateRandomStatus() { const randomEvents = [ "AI discovered a new optimization technique!", "Neural pathway efficiency increased by 3.7%", "Background processing completed successfully", "Knowledge compression algorithm updated", "Memory defragmentation in progress...", "Learning algorithm self-improvement detected" ];

    const event = randomEvents[Math.floor(Math.random() * randomEvents.length)]; addToLog(event, 'info'); }

/**

    Add entry to activity log */ function addToLog(message, type = 'info') { const logContainer = document.getElementById('activityLog'); const timestamp = new Date().toLocaleTimeString();

    const logEntry = document.createElement('div'); logEntry.className = log-entry ${type}; logEntry.textContent = [${timestamp}] ${message};

    logContainer.appendChild(logEntry);

    // Auto-scroll to bottom logContainer.scrollTop = logContainer.scrollHeight;

    // Keep only last 20 entries while (logContainer.children.length > 20) { logContainer.removeChild(logContainer.firstChild); } }

/**

    Clear activity log */ function clearLog() { const logContainer = document.getElementById('activityLog'); logContainer.innerHTML = ''; addToLog('Activity log cleared', 'info'); }

/**

    Utility function to get random item from array */ function getRandomItem(array) { return array[Math.floor(Math.random() * array.length)]; }

/**

    Start AI behavior systems */ function startAIBehavior() { // Main behavior loop - runs every 3 seconds setInterval(updateAIBehavior, 3000);

    // Periodic learning events - every 30 seconds setInterval(() => { if (!petState.isSleeping && Math.random() < 0.3) { petStats.knowledge = Math.min(100, petStats.knowledge + 1); addToLog('Autonomous learning event occurred', 'success'); } }, 30000);

    // Cache growth simulation - every 10 seconds setInterval(() => { if (!petState.isSleeping) { petStats.cache = Math.min(100, petStats.cache + Math.random() * 2); } }, 10000); }

/**

    Handle modal clicks (close on background click) */ document.addEventListener('click', function(event) { const modal = document.getElementById('codeModal'); if (event.target === modal) { closeCodeInput(); } });

/**

    Handle keyboard shortcuts */ document.addEventListener('keydown', function(event) { // ESC to close modal if (event.key === 'Escape') { closeCodeInput(); }

    // Enter to submit code (Ctrl+Enter) if (event.key === 'Enter' && event.ctrlKey) { feedCode(); }

    // Quick actions with number keys if (event.altKey) { switch(event.key) { case '1': giveCookie(); break; case '2': clearCache(); break; case '3': showCodeInput(); break; case '4': toggleSleep(); break; } } });

/**

    Initialize when page loads */ document.addEventListener('DOMContentLoaded', initializeTamagotchi);

/**

    Handle page visibility changes (pause when hidden) */ document.addEventListener('visibilitychange', function() { if (document.hidden) { addToLog('AI entering background mode', 'info'); } else { addToLog('AI resuming active mode', 'success'); petState.lastActivity = Date.now(); } });
