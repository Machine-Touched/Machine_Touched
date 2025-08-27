/**
 * Three-Layer Firewall Demonstration Tool
 * Educational JavaScript for simulating firewall behavior
 */

// Global state management
const firewallState = {
    totalRequests: 0,
    blockedLayer1: 0,
    blockedLayer2: 0,
    blockedLayer3: 0,
    allowedThrough: 0,
    isProcessing: false
};

// Traffic type definitions with security characteristics
const trafficTypes = {
    legitimate: {
        label: '📦 HTTP Request',
        description: 'Legitimate web traffic',
        port: 80,
        protocol: 'HTTP',
        payload: 'GET /index.html HTTP/1.1',
        malicious: false,
        color: '#4CAF50'
    },
    'my-website': {
        label: '🌐 My Website',
        description: 'Accessing my personal website',
        port: 443,
        protocol: 'HTTPS',
        payload: 'GET /index.html HTTP/1.1\nHost: www.machinetouched.w3spaces.com',
        malicious: false,
        color: '#2196F3'
    },
    malware: {
        label: '🦠 Malware',
        description: 'Malicious executable download',
        port: 80,
        protocol: 'HTTP',
        payload: 'GET /malware.exe HTTP/1.1',
        malicious: true,
        signatures: ['trojan', 'backdoor'],
        color: '#f44336'
    },
    ddos: {
        label: '💥 DDoS',
        description: 'Distributed Denial of Service attack',
        port: 80,
        protocol: 'HTTP',
        payload: 'Flood attack - 1000 req/sec',
        malicious: true,
        rateLimit: true,
        color: '#FF9800'
    },
    'sql-injection': {
        label: '💉 SQL Injection',
        description: 'Database injection attack',
        port: 80,
        protocol: 'HTTP',
        payload: "GET /login?user=admin'OR'1'='1 HTTP/1.1",
        malicious: true,
        signatures: ['sqli', 'injection'],
        color: '#9C27B0'
    },
    phishing: {
        label: '🎣 Phishing',
        description: 'Phishing content delivery',
        port: 443,
        protocol: 'HTTPS',
        payload: 'GET /fake-bank-login.html HTTP/1.1',
        malicious: true,
        contentFilter: true,
        color: '#FF5722'
    },
    'port-scan': {
        label: '🔍 Port Scan',
        description: 'Network reconnaissance',
        port: 22,
        protocol: 'TCP',
        payload: 'SYN scan on multiple ports',
        malicious: true,
        suspicious: true,
        color: '#607D8B'
    }
};

/**
 * Utility function to create a delay for visualization.
 * @param {number} ms - Delay in milliseconds.
 */
const delay = (ms) => new Promise(res => setTimeout(res, ms));

/**
 * Adds a log entry to the specified layer's log panel.
 * @param {HTMLElement} logElement - The log content container.
 * @param {string} message - The message to log.
 * @param {string} type - The type of log entry ('info', 'blocked', 'allowed').
 */
function addLayerLog(logElement, message, type = 'info') {
    const entry = document.createElement('div');
    entry.className = `log-entry text-xs my-1 ${type}`;
    entry.innerHTML = `<code>${message}</code>`;
    logElement.appendChild(entry);
    logElement.scrollTop = logElement.scrollHeight;
}

/**
 * Adds a log entry to the global log panel.
 * @param {string} message - The message to log.
 * @param {string} type - The type of log entry ('info', 'warning', 'error', 'blocked', 'allowed').
 */
function addToGlobalLog(message, type = 'info') {
    const logElement = document.getElementById('globalLog');
    const entry = document.createElement('div');
    entry.className = `log-entry text-xs my-1 ${type}`;
    entry.innerHTML = `<code>${message}</code>`;
    logElement.appendChild(entry);
    logElement.scrollTop = logElement.scrollHeight;
}

/**
 * Updates the statistics displayed in the UI.
 */
function updateStatistics() {
    document.getElementById('statTotal').textContent = firewallState.totalRequests;
    document.getElementById('statAllowed').textContent = firewallState.allowedThrough;
    document.getElementById('statBlockedL1').textContent = firewallState.blockedLayer1;
    document.getElementById('statBlockedL2').textContent = firewallState.blockedLayer2;
    document.getElementById('statBlockedL3').textContent = firewallState.blockedLayer3;
}

/**
 * Resets the visual state of all firewall layers.
 */
function resetLayerStates() {
    document.querySelectorAll('.firewall-layer').forEach(layer => {
        layer.classList.remove('processing', 'blocked', 'allowed');
    });
}

/**
 * Simulates different types of network traffic.
 * @param {string} trafficType - Type of traffic to simulate.
 */
async function simulateTraffic(trafficType) {
    if (firewallState.isProcessing) {
        addToGlobalLog('[WARNING] Processing in progress, please wait...', 'warning');
        return;
    }

    firewallState.isProcessing = true;
    firewallState.totalRequests++;

    const traffic = trafficTypes[trafficType];
    const packet = document.getElementById('trafficPacket');
    const packetLabel = document.getElementById('packetLabel');

    // Update packet appearance
    packet.style.background = traffic.color;
    packetLabel.textContent = traffic.label;

    // Reset all layer states
    resetLayerStates();

    // Start traffic animation
    packet.classList.add('moving');

    // Log traffic initiation
    addToGlobalLog(`[TRAFFIC] Incoming ${traffic.description}`, 'info');
    addToGlobalLog(`[DETAILS] Protocol: ${traffic.protocol}, Port: ${traffic.port}`, 'info');
    addToGlobalLog(`[PAYLOAD] ${traffic.payload.split('\n')[0]}...`, 'info');

    // Process through each layer with delays for visualization
    try {
        await processLayer1(traffic);
        await delay(500);

        await processLayer2(traffic);
        await delay(500);

        await processLayer3(traffic);
        await delay(500);

        await reachDestination(traffic);

    } catch (error) {
        // Log the final blocked state
        addToGlobalLog(`[FINAL] Traffic was blocked. Simulation complete.`, 'blocked');
    } finally {
        // Reset packet position and processing state
        setTimeout(() => {
            packet.classList.remove('moving');
            firewallState.isProcessing = false;
            resetLayerStates();
        }, 2000);

        updateStatistics();
    }
}

/**
 * Process traffic through Layer 1: Network Layer Firewall
 * @param {Object} traffic - Traffic object to process
 */
async function processLayer1(traffic) {
    const layer = document.querySelector('.layer-1');
    const log = document.getElementById('layer1Log').querySelector('.log-content');

    layer.classList.add('processing');
    await delay(500);

    addLayerLog(log, `[NETWORK] Analyzing packet from source`);
    addLayerLog(log, `[CHECK] Protocol: ${traffic.protocol}`);
    addLayerLog(log, `[CHECK] Destination Port: ${traffic.port}`);

    if (traffic.port === 22 && traffic.protocol === 'TCP' && traffic.suspicious) {
        layer.classList.remove('processing');
        layer.classList.add('blocked');
        addLayerLog(log, `[BLOCKED] Suspicious SSH activity detected`);
        addToGlobalLog(`[LAYER1] Traffic BLOCKED - Suspicious port access`, 'blocked');
        firewallState.blockedLayer1++;
        throw new Error('Blocked by Network Layer Firewall');
    }

    if (traffic.rateLimit) {
        layer.classList.remove('processing');
        layer.classList.add('blocked');
        addLayerLog(log, `[BLOCKED] Rate limit exceeded`);
        addToGlobalLog(`[LAYER1] Traffic BLOCKED - Rate limit exceeded`, 'blocked');
        firewallState.blockedLayer1++;
        throw new Error('Blocked by Network Layer Firewall - Rate Limit');
    }

    if ([80, 443].includes(traffic.port)) {
        layer.classList.remove('processing');
        layer.classList.add('allowed');
        addLayerLog(log, `[ALLOWED] Port ${traffic.port} is permitted`);
        addToGlobalLog(`[LAYER1] Traffic PASSED - Valid port ${traffic.port}`, 'allowed');
        return true;
    }

    layer.classList.remove('processing');
    layer.classList.add('blocked');
    addLayerLog(log, `[BLOCKED] Port ${traffic.port} not in allowed list`);
    addToGlobalLog(`[LAYER1] Traffic BLOCKED - Port not allowed`, 'blocked');
    firewallState.blockedLayer1++;
    throw new Error('Blocked by Network Layer Firewall - Port Denied');
}

/**
 * Process traffic through Layer 2: Application Layer Firewall
 * @param {Object} traffic - Traffic object to process
 */
async function processLayer2(traffic) {
    const layer = document.querySelector('.layer-2');
    const log = document.getElementById('layer2Log').querySelector('.log-content');
    layer.classList.add('processing');
    await delay(500);

    addLayerLog(log, `[WAF] Analyzing application layer data`);
    addLayerLog(log, `[INSPECT] HTTP headers and payload`);

    if (traffic.signatures && traffic.signatures.includes('sqli')) {
        layer.classList.remove('processing');
        layer.classList.add('blocked');
        addLayerLog(log, `[BLOCKED] SQL injection pattern detected`);
        addToGlobalLog(`[LAYER2] Traffic BLOCKED - SQL injection detected`, 'blocked');
        firewallState.blockedLayer2++;
        throw new Error('Blocked by Application Layer Firewall - SQL Injection');
    }

    if (traffic.malicious && !traffic.signatures) {
        layer.classList.remove('processing');
        layer.classList.add('blocked');
        addLayerLog(log, `[BLOCKED] Malicious content signature detected`);
        addToGlobalLog(`[LAYER2] Traffic BLOCKED - Malicious signature`, 'blocked');
        firewallState.blockedLayer2++;
        throw new Error('Blocked by Application Layer Firewall - Malicious Signature');
    }

    layer.classList.remove('processing');
    layer.classList.add('allowed');
    addLayerLog(log, `[ALLOWED] No malicious patterns found`);
    addToGlobalLog(`[LAYER2] Traffic PASSED - No threats detected`, 'allowed');
    return true;
}

/**
 * Process traffic through Layer 3: Content Filter
 * @param {Object} traffic - Traffic object to process
 */
async function processLayer3(traffic) {
    const layer = document.querySelector('.layer-3');
    const log = document.getElementById('layer3Log').querySelector('.log-content');
    layer.classList.add('processing');
    await delay(500);

    addLayerLog(log, `[FILTER] Performing deep packet inspection`);
    addLayerLog(log, `[SCAN] Checking for phishing and malware content`);

    if (traffic.contentFilter) {
        layer.classList.remove('processing');
        layer.classList.add('blocked');
        addLayerLog(log, `[BLOCKED] Phishing content detected`);
        addToGlobalLog(`[LAYER3] Traffic BLOCKED - Phishing content`, 'blocked');
        firewallState.blockedLayer3++;
        throw new Error('Blocked by Content Filter - Phishing Content');
    }

    if (traffic.malicious) {
        layer.classList.remove('processing');
        layer.classList.add('blocked');
        addLayerLog(log, `[BLOCKED] Antivirus scan detected malware`);
        addToGlobalLog(`[LAYER3] Traffic BLOCKED - Malware detected`, 'blocked');
        firewallState.blockedLayer3++;
        throw new Error('Blocked by Content Filter - Malware');
    }

    layer.classList.remove('processing');
    layer.classList.add('allowed');
    addLayerLog(log, `[ALLOWED] Content is clean`);
    addToGlobalLog(`[LAYER3] Traffic PASSED - All clear`, 'allowed');
    return true;
}

/**
 * Simulates traffic reaching its final destination.
 * @param {Object} traffic - The traffic object that reached the end.
 */
async function reachDestination(traffic) {
    const log = document.getElementById('layer3Log').querySelector('.log-content');
    addLayerLog(log, `[DESTINATION] Reached server successfully!`, 'allowed');
    addToGlobalLog(`[SYSTEM] Request to ${traffic.description} was successful.`, 'allowed');
    firewallState.allowedThrough++;
}

/**
 * Event listener for the clear log button.
 */
document.getElementById('clearGlobalLog').addEventListener('click', () => {
    document.getElementById('globalLog').innerHTML = '';
});

// Initialize on page load
window.onload = () => {
    updateStatistics();
    addToGlobalLog('[SYSTEM] Three-layer firewall initialized successfully', 'info');
    addToGlobalLog('[SYSTEM] All security layers active and monitoring', 'info');
    addToGlobalLog('[INFO] Ready to process network traffic', 'info');
};
