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
 * Initialize the firewall demonstration
 */
function initializeFirewall() {
    updateStatistics();
    addToGlobalLog('[SYSTEM] Three-layer firewall initialized successfully', 'info');
    addToGlobalLog('[SYSTEM] All security layers active and monitoring', 'info');
    addToGlobalLog('[INFO] Ready to process network traffic', 'info');
    
    // Initialize layer logs
    document.getElementById('layer1Log').querySelector('.log-content').innerHTML = 
        '<code>Network layer firewall ready</code>';
    document.getElementById('layer2Log').querySelector('.log-content').innerHTML = 
        '<code>Application layer firewall ready</code>';
    document.getElementById('layer3Log').querySelector('.log-content').innerHTML = 
        '<code>Content filter ready</code>';
}

/**
 * Simulate different types of network traffic
 * @param {string} trafficType - Type of traffic to simulate
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
    addToGlobalLog(`[PAYLOAD] ${traffic.payload}`, 'info');
    
    // Process through each layer with delays for visualization
    try {
        // Layer 1: Network Layer Firewall
        await processLayer1(traffic);
        await delay(1000);
        
        // Layer 2: Application Layer Firewall  
        await processLayer2(traffic);
        await delay(1000);
        
        // Layer 3: Content Filter
        await processLayer3(traffic);
        await delay(1000);
        
        // Final destination
        await reachDestination(traffic);
        
    } catch (error) {
        addToGlobalLog(`[ERROR] Processing failed: ${error.message}`, 'error');
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
    
    // Mark layer as processing
    layer.classList.add('processing');
    
    // Simulate processing time
    await delay(500);
    
    // Log processing start
    addLayerLog(log, `[NETWORK] Analyzing packet from source`);
    addLayerLog(log, `[CHECK] Protocol: ${traffic.protocol}`);
    addLayerLog(log, `[CHECK] Destination Port: ${traffic.port}`);
    
    // Layer 1 rules checking
    if (traffic.port === 22 && traffic.protocol === 'TCP') {
        if (trafficTypes['port-scan'] === traffic || traffic.suspicious) {
            layer.classList.remove('processing');
            layer.classList.add('blocked');
            addLayerLog(log, `[BLOCKED] Suspicious SSH activity detected`);
            addLayerLog(log, `[RULE] BLOCK port 22 from untrusted source`);
            addToGlobalLog(`[LAYER1] Traffic BLOCKED - Suspicious port access`, 'blocked');
            firewallState.blockedLayer1++;
            throw new Error('Blocked by Network Layer Firewall');
        }
    }
    
    if (traffic.rateLimit) {
        layer.classList.remove('processing');
        layer.classList.add('blocked');
        addLayerLog(log, `[BLOCKED] Rate limit exceeded`);
        addLayerLog(log, `[RULE] DDoS protection activated`);
        addToGlobalLog(`[LAYER1] Traffic BLOCKED - Rate limit exceeded`, 'blocked');
        firewallState.blockedLayer1++;
        throw new Error('Blocked by Network Layer Firewall - Rate Limit');
    }
    
    // Allow legitimate ports
    if ([80, 443].includes(traffic.port)) {
        layer.classList.remove('processing');
        layer.classList.add('allowed');
        addLayerLog(log, `[ALLOWED] Port ${traffic.port} is permitted`);
        addLayerLog(log, `[PASS] Forwarding to Application Layer`);
        addToGlobalLog(`[LAYER1] Traffic PASSED - Valid port ${traffic.port}`, 'allowed');
        return true;
    }
    
    // Default deny
    layer.classList.remove('processing');
    layer.classList.add('blocked');
    addLayerLog(log, `[BLOCKED] Port ${traffic.port} not in allowed list`);
    addLayerLog(log, `[RULE] Default DENY policy applied`);
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
    addLayerLog(log, `[SCAN] Signature-based detection active`);
    
    // Check for SQL injection
    if (traffic.signatures && traffic.signatures.includes('sqli')) {
        layer.classList.remove('processing');
        layer.classList.add('blocked');
        addLayerLog(log, `[BLOCKED] SQL injection pattern detected`);
        addLayerLog(log, `[SIGNATURE] Match: OR '1'='1 pattern`);
        addLayerLog(log, `[RULE] OWASP CRS triggered`);
        addToGlobalLog(`[LAYER2] Traffic BLOCKED - SQL injection detected`, 'blocked');
        firewallState.blockedLayer2++;
        throw new Error('Blocked by Application Layer Firewall - SQL Injection');
    }
    
    // Check for other malicious signatures
    if (traffic.signatures && traffic.signatures.includes('trojan')) {
        layer.classList.remove('processing');
        layer.classList.add('blocked');
        addLayerLog(log, `[BLOCKED] Malicious executable signature found`);
        addLayerLog(log, `[SIGNATURE] Trojan behavior pattern detected`);
        addToGlobalLog(`[LAYER2] Traffic BLOCKED - Malware signature detected`, 'blocked');
        firewallState.blockedLayer2++;
        throw new Error('Blocked by Application Layer Firewall - Malware Detected');
    }
    
    // XSS protection check
    if (traffic.payload.includes('<script>') || traffic.payload.includes('javascript:')) {
        layer.classList.remove('processing');
        layer.classList.add('blocked');
        addLayerLog(log, `[BLOCKED] Cross-site scripting attempt`);
        addLayerLog(log, `[XSS] Malicious script injection detected`);
        addToGlobalLog(`[LAYER2] Traffic BLOCKED - XSS attempt`, 'blocked');
        firewallState.blockedLayer2++;
        throw new Error('Blocked by Application Layer Firewall - XSS');
    }
    
    // Allow clean traffic
    layer.classList.remove('processing');
    layer.classList.add('allowed');
    addLayerLog(log, `[CLEAN] No malicious patterns detected`);
    addLayerLog(log, `[PASS] Forwarding to Content Filter`);
    addToGlobalLog(`[LAYER2] Traffic PASSED - Clean application data`, 'allowed');
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
    
    addLayerLog(log, `[FILTER] Deep packet inspection initiated`);
    addLayerLog(log, `[SCAN] Antivirus engine active`);
    addLayerLog(log, `[CHECK] URL reputation database`);
    
    // Malware detection
    if (traffic.malicious && traffic.signatures) {
        if (traffic.signatures.includes('backdoor') || traffic.signatures.includes('trojan')) {
            layer.classList.remove('processing');
            layer.classList.add('blocked');
            addLayerLog(log, `[BLOCKED] Malware detected by antivirus`);
            addLayerLog(log, `[QUARANTINE] File moved to secure container`);
            addToGlobalLog(`[LAYER3] Traffic BLOCKED - Malware quarantined`, 'blocked');
            firewallState.blockedLayer3++;
            throw new Error('Blocked by Content Filter - Malware Detected');
        }
    }
    
    // Content category filtering
    if (traffic.contentFilter) {
        layer.classList.remove('processing');
        layer.classList.add('blocked');
        addLayerLog(log, `[BLOCKED] Content category violation`);
        addLayerLog(log, `[CATEGORY] Phishing/Fraudulent content detected`);
        addLayerLog(log, `[REPUTATION] Domain flagged as malicious`);
        addToGlobalLog(`[LAYER3] Traffic BLOCKED - Malicious content category`, 'blocked');
        firewallState.blockedLayer3++;
        throw new Error('Blocked by Content Filter - Malicious Content');
    }
    
    // SSL inspection for HTTPS traffic
    if (traffic.protocol === 'HTTPS') {
        addLayerLog(log, `[SSL] Certificate validation successful`);
        addLayerLog(log, `[DECRYPT] SSL inspection completed`);
    }
    
    // Data Loss Prevention check
    addLayerLog(log, `[DLP] No sensitive data patterns found`);
    
    // Allow clean content
    layer.classList.remove('processing');
    layer.classList.add('allowed');
    addLayerLog(log, `[CLEAN] Content passed all security checks`);
    addLayerLog(log, `[PASS] Delivering to protected network`);
    addToGlobalLog(`[LAYER3] Traffic PASSED - Content verified safe`, 'allowed');
    return true;
}

/**
 * Handle traffic reaching the destination
 * @param {Object} traffic - Traffic object that passed all layers
 */
async function reachDestination(traffic) {
    const destination = document.getElementById('destination');
    const status = document.getElementById('destinationStatus');
    
    destination.classList.add('receiving');
    
    status.innerHTML = `<code>✅ RECEIVED: ${traffic.description}<br/>Status: Traffic delivered safely</code>`;
    
    addToGlobalLog(`[DESTINATION] Traffic successfully delivered`, 'allowed');
    addToGlobalLog(`[SUCCESS] ${traffic.description} reached protected network`, 'allowed');
    
    firewallState.allowedThrough++;
    
    // Reset destination status after delay
    setTimeout(() => {
        destination.classList.remove('receiving');
        status.innerHTML = '<code>Status: Awaiting traffic</code>';
    }, 3000);
}

/**
 * Add log entry to a specific layer's log
 * @param {HTMLElement} logContainer - The log container element
 * @param {string} message - Log message to add
 */
function addLayerLog(logContainer, message) {
    const logEntry = document.createElement('code');
    logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
}

/**
 * Add entry to the global security log
 * @param {string} message - Log message
 * @param {string} type - Log type (info, warning, error, blocked, allowed)
 */
function addToGlobalLog(message, type = 'info') {
    const logContainer = document.getElementById('globalLog');
    const logEntry = document.createElement('code');
    
    logEntry.className = `log-entry ${type}`;
    logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
}

/**
 * Update the statistics display
 */
function updateStatistics() {
    document.getElementById('totalRequests').textContent = firewallState.totalRequests;
    document.getElementById('blockedLayer1').textContent = firewallState.blockedLayer1;
    document.getElementById('blockedLayer2').textContent = firewallState.blockedLayer2;
    document.getElementById('blockedLayer3').textContent = firewallState.blockedLayer3;
    document.getElementById('allowedThrough').textContent = firewallState.allowedThrough;
    
    // Calculate security level based on block ratio
    const totalBlocked = firewallState.blockedLayer1 + firewallState.blockedLayer2 + firewallState.blockedLayer3;
    const blockRatio = firewallState.totalRequests > 0 ? totalBlocked / firewallState.totalRequests : 0;
    
    let securityLevel = '🟢 HIGH';
    if (blockRatio < 0.3) securityLevel = '🟡 MEDIUM';
    if (blockRatio < 0.1) securityLevel = '🔴 LOW';
    
    document.getElementById('securityLevel').textContent = securityLevel;
}

/**
 * Reset all firewall layer visual states
 */
function resetLayerStates() {
    const layers = document.querySelectorAll('.firewall-layer');
    layers.forEach(layer => {
        layer.classList.remove('processing', 'blocked', 'allowed');
    });
    
    const destination = document.getElementById('destination');
    destination.classList.remove('receiving');
}

/**
 * Clear the global security log
 */
function clearGlobalLog() {
    const logContainer = document.getElementById('globalLog');
    logContainer.innerHTML = '<code class="log-entry">[SYSTEM] Security log cleared</code>';
    addToGlobalLog('[SYSTEM] Ready to monitor new traffic', 'info');
}

/**
 * Utility function for creating delays
 * @param {number} ms - Milliseconds to delay
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize the firewall when the page loads
document.addEventListener('DOMContentLoaded', initializeFirewall);

// Add keyboard shortcuts for quick simulation
document.addEventListener('keydown', function(event) {
    if (event.altKey) {
        switch(event.key) {
            case '1':
                event.preventDefault();
                simulateTraffic('legitimate');
                break;
            case '2':
                event.preventDefault();
                simulateTraffic('malware');
                break;
            case '3':
                event.preventDefault();
                simulateTraffic('ddos');
                break;
            case '4':
                event.preventDefault();
                simulateTraffic('sql-injection');
                break;
            case '5':
                event.preventDefault();
                simulateTraffic('phishing');
                break;
            case '6':
                event.preventDefault();
                simulateTraffic('port-scan');
                break;
        }
    }
});

// Add educational tooltips for better learning experience
function addTooltips() {
    const tooltips = {
        '.layer-1': 'Network Layer Firewall: Filters traffic based on IP addresses, ports, and protocols',
        '.layer-2': 'Application Layer Firewall: Inspects application data for malicious patterns and signatures',
        '.layer-3': 'Content Filter: Performs deep packet inspection and malware scanning'
    };
    
    Object.entries(tooltips).forEach(([selector, text]) => {
        const element = document.querySelector(selector);
        if (element) {
            element.title = text;
        }
    });
}

// Initialize tooltips when page loads
document.addEventListener('DOMContentLoaded', addTooltips);
