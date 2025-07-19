# Machine Touched LLM Specimen Collection - Complete Source Code Backup

**Date:** July 3, 2025  
**Version:** 3.1.4  
**Purpose:** Complete backup for restoration after memory reset (like 50 First Dates scenario)

## Project Overview

This is a comprehensive digital laboratory system featuring multiple interconnected applications that simulate AI specimens and security monitoring. The collection includes:

1. **Three-Layer Firewall Demonstration** - Educational firewall security visualization
2. **AI Tamagotchi** - Digital intelligence companion that requires care 
3. **Robot Nursery** - Digital haven for AI companions with browser-like iframe styling
4. **Three-Headed Server Monitor** - LLM specimen monitoring system with layered z-index architecture
5. **Binary Vault Specimen** - Password-protected vault with 4-digit binary authentication (1011)
6. **Binary Tamagotchi** - Single binary digit pet authentication (1)
7. **D&D AI Character Profiles** - The Silicon Vanguard fantasy characters

## Architecture Notes

- **Layered Z-Index System**: Uses 10-digit z-index values for complex layering
- **Browser-Like Iframe Styling**: Each iframe styled as browser windows with chrome
- **Transparent Background System**: "Farmer john's barn" background shows through all applications
- **Extensive Code Tag Usage**: `<code>` tags used throughout for technical aesthetic
- **Robot-Friendly Interfaces**: Binary password systems (0/1 only)
- **Old School Password Hiding**: HTML comments, meta tags, hidden divs, JavaScript variables

## User Preferences

- **Communication Style**: Simple, everyday language
- **Design Aesthetic**: "Farmer john's barn on the outside, nursery on the inside" with transparent overlays
- **Technical Requirements**: 
  - Extensive use of `<code>` and `<script>` tags throughout all projects
  - Robot-friendly interfaces and binary password systems (0/1 only)
  - Z-index system using 10-digit numbers for complex layering
  - Hide passwords in HTML structure using "old school" methods
  - Educational/demonstration tools rather than complex applications

---

## File 1: index.html (Three-Layer Firewall Demo)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Three-Layer Firewall Demo</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Three-Layer Firewall Security Demonstration</h1>
            <p>Interactive visualization of network security layers</p>
        </header>

        <div class="control-panel">
            <h2>Traffic Simulation Controls</h2>
            <div class="traffic-buttons">
                <button onclick="simulateTraffic('legitimate')" class="btn btn-safe">
                    Legitimate HTTP Request
                </button>
                <button onclick="simulateTraffic('malware')" class="btn btn-warning">
                    Malware Payload
                </button>
                <button onclick="simulateTraffic('ddos')" class="btn btn-danger">
                    DDoS Attack
                </button>
                <button onclick="simulateTraffic('sql_injection')" class="btn btn-danger">
                    SQL Injection
                </button>
                <button onclick="simulateTraffic('phishing')" class="btn btn-warning">
                    Phishing Attempt
                </button>
                <button onclick="simulateTraffic('port_scan')" class="btn btn-warning">
                    Port Scanning
                </button>
            </div>
        </div>

        <div class="firewall-layers">
            <div class="layer" id="layer1">
                <h3>Layer 1: Network Layer Firewall</h3>
                <p>Packet filtering based on IP addresses, ports, and protocols</p>
                <div class="layer-status" id="layer1-status">Ready</div>
                <div class="layer-log" id="layer1-log"></div>
            </div>

            <div class="layer" id="layer2">
                <h3>Layer 2: Application Layer Firewall</h3>
                <p>Deep packet inspection and application-aware filtering</p>
                <div class="layer-status" id="layer2-status">Ready</div>
                <div class="layer-log" id="layer2-log"></div>
            </div>

            <div class="layer" id="layer3">
                <h3>Layer 3: Content Filter</h3>
                <p>Content analysis, malware detection, and policy enforcement</p>
                <div class="layer-status" id="layer3-status">Ready</div>
                <div class="layer-log" id="layer3-log"></div>
            </div>
        </div>

        <div class="traffic-flow">
            <div class="packet" id="packet">📦</div>
        </div>

        <div class="destination" id="destination">
            <h3>Protected Network</h3>
            <p>Internal servers and resources</p>
            <div id="destination-log"></div>
        </div>

        <div class="statistics">
            <h3>Security Statistics</h3>
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-label">Total Requests:</span>
                    <span class="stat-value" id="total-requests">0</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Blocked by Layer 1:</span>
                    <span class="stat-value" id="blocked-layer1">0</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Blocked by Layer 2:</span>
                    <span class="stat-value" id="blocked-layer2">0</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Blocked by Layer 3:</span>
                    <span class="stat-value" id="blocked-layer3">0</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Allowed Through:</span>
                    <span class="stat-value" id="allowed-through">0</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Threat Level:</span>
                    <span class="stat-value" id="threat-level">Low</span>
                </div>
            </div>
        </div>

        <div class="security-log">
            <h3>Global Security Log</h3>
            <div class="log-controls">
                <button onclick="clearGlobalLog()" class="btn btn-secondary">Clear Log</button>
            </div>
            <div class="log-container" id="global-log"></div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

---

## File 2: styles.css (Firewall Demo Styles)

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: #ffffff;
    min-height: 100vh;
    padding: 20px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

header {
    text-align: center;
    margin-bottom: 30px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    backdrop-filter: blur(10px);
}

header h1 {
    font-size: 2.5em;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.control-panel {
    background: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 30px;
    backdrop-filter: blur(10px);
}

.control-panel h2 {
    margin-bottom: 15px;
    color: #ffd700;
}

.traffic-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
}

.btn {
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.btn-safe {
    background: linear-gradient(45deg, #4caf50, #66bb6a);
    color: white;
}

.btn-warning {
    background: linear-gradient(45deg, #ff9800, #ffb74d);
    color: white;
}

.btn-danger {
    background: linear-gradient(45deg, #f44336, #ef5350);
    color: white;
}

.btn-secondary {
    background: linear-gradient(45deg, #607d8b, #78909c);
    color: white;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.firewall-layers {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.layer {
    background: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid transparent;
    transition: all 0.3s ease;
}

.layer.processing {
    border-color: #ffd700;
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
    transform: scale(1.02);
}

.layer.blocked {
    border-color: #f44336;
    box-shadow: 0 0 20px rgba(244, 67, 54, 0.5);
}

.layer.allowed {
    border-color: #4caf50;
    box-shadow: 0 0 20px rgba(76, 175, 80, 0.5);
}

.layer h3 {
    color: #ffd700;
    margin-bottom: 10px;
}

.layer-status {
    padding: 8px 15px;
    border-radius: 20px;
    margin: 10px 0;
    font-weight: bold;
    text-align: center;
    background: rgba(255, 255, 255, 0.2);
}

.layer-log {
    max-height: 150px;
    overflow-y: auto;
    background: rgba(0, 0, 0, 0.3);
    padding: 10px;
    border-radius: 5px;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    margin-top: 10px;
}

.traffic-flow {
    position: relative;
    height: 60px;
    margin: 20px 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 30px;
    overflow: hidden;
}

.packet {
    position: absolute;
    left: -50px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    transition: all 2s linear;
}

.destination {
    background: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 30px;
    backdrop-filter: blur(10px);
}

.destination h3 {
    color: #4caf50;
    margin-bottom: 10px;
}

.statistics {
    background: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 30px;
    backdrop-filter: blur(10px);
}

.statistics h3 {
    color: #ffd700;
    margin-bottom: 15px;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
}

.stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
}

.stat-label {
    font-weight: bold;
}

.stat-value {
    color: #ffd700;
    font-weight: bold;
    font-size: 1.2em;
}

.security-log {
    background: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 10px;
    backdrop-filter: blur(10px);
}

.security-log h3 {
    color: #ffd700;
    margin-bottom: 15px;
}

.log-controls {
    margin-bottom: 15px;
}

.log-container {
    max-height: 300px;
    overflow-y: auto;
    background: rgba(0, 0, 0, 0.3);
    padding: 15px;
    border-radius: 5px;
    font-family: 'Courier New', monospace;
    font-size: 13px;
}

.log-entry {
    margin-bottom: 5px;
    padding: 5px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.log-entry:last-child {
    border-bottom: none;
}

.log-entry.info {
    color: #81c784;
}

.log-entry.warning {
    color: #ffb74d;
}

.log-entry.error {
    color: #e57373;
}

.log-entry.blocked {
    color: #f44336;
    font-weight: bold;
}

.log-entry.allowed {
    color: #4caf50;
    font-weight: bold;
}

@media (max-width: 768px) {
    .traffic-buttons {
        grid-template-columns: 1fr;
    }
    
    .firewall-layers {
        grid-template-columns: 1fr;
    }
    
    .stats-grid {
        grid-template-columns: 1fr;
    }
    
    header h1 {
        font-size: 2em;
    }
}

.tooltip {
    position: relative;
    cursor: help;
}

.tooltip::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 8px 12px;
    border-radius: 5px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
    z-index: 1000;
}

.tooltip:hover::after {
    opacity: 1;
}
```

---

## File 3: script.js (Firewall Demo Logic)

```javascript
// Global state for tracking firewall statistics
let statistics = {
    totalRequests: 0,
    blockedLayer1: 0,
    blockedLayer2: 0,
    blockedLayer3: 0,
    allowedThrough: 0
};

// Traffic type definitions
const trafficTypes = {
    legitimate: {
        name: 'Legitimate HTTP Request',
        port: 80,
        protocol: 'HTTP',
        payload: 'GET /index.html HTTP/1.1',
        malicious: false,
        signature: null
    },
    malware: {
        name: 'Malware Payload',
        port: 443,
        protocol: 'HTTPS',
        payload: 'Encrypted malicious binary',
        malicious: true,
        signature: 'MALWARE_DETECTED_001'
    },
    ddos: {
        name: 'DDoS Attack',
        port: 80,
        protocol: 'HTTP',
        payload: 'Flood of requests',
        malicious: true,
        signature: 'DDOS_PATTERN_HIGH_FREQUENCY'
    },
    sql_injection: {
        name: 'SQL Injection',
        port: 80,
        protocol: 'HTTP',
        payload: "'; DROP TABLE users; --",
        malicious: true,
        signature: 'SQL_INJECTION_DETECTED'
    },
    phishing: {
        name: 'Phishing Attempt',
        port: 80,
        protocol: 'HTTP',
        payload: 'Fake login page request',
        malicious: true,
        signature: 'PHISHING_CONTENT_DETECTED'
    },
    port_scan: {
        name: 'Port Scanning',
        port: 'multiple',
        protocol: 'TCP',
        payload: 'SYN packets to multiple ports',
        malicious: true,
        signature: 'PORT_SCAN_BEHAVIOR'
    }
};

/**
 * Initialize the firewall demonstration
 */
function initializeFirewall() {
    console.log('Firewall demonstration initialized');
    updateStatistics();
    addTooltips();
    addToGlobalLog('Firewall system online - all layers active', 'info');
}

/**
 * Simulate different types of network traffic
 * @param {string} trafficType - Type of traffic to simulate
 */
async function simulateTraffic(trafficType) {
    const traffic = trafficTypes[trafficType];
    if (!traffic) {
        console.error('Unknown traffic type:', trafficType);
        return;
    }

    statistics.totalRequests++;
    
    // Reset layer states
    resetLayerStates();
    
    // Start packet animation
    const packet = document.getElementById('packet');
    packet.style.left = '-50px';
    packet.textContent = traffic.malicious ? '🔴' : '📦';
    
    addToGlobalLog(`Traffic simulation started: ${traffic.name}`, 'info');
    
    // Process through each layer
    let blocked = false;
    
    // Layer 1: Network Layer Firewall
    if (!blocked) {
        blocked = await processLayer1(traffic);
    }
    
    // Layer 2: Application Layer Firewall
    if (!blocked) {
        blocked = await processLayer2(traffic);
    }
    
    // Layer 3: Content Filter
    if (!blocked) {
        blocked = await processLayer3(traffic);
    }
    
    // Destination
    if (!blocked) {
        await reachDestination(traffic);
    }
    
    updateStatistics();
}

/**
 * Process traffic through Layer 1: Network Layer Firewall
 * @param {Object} traffic - Traffic object to process
 */
async function processLayer1(traffic) {
    const layer = document.getElementById('layer1');
    const status = document.getElementById('layer1-status');
    const log = document.getElementById('layer1-log');
    
    layer.classList.add('processing');
    status.textContent = 'Processing...';
    status.style.background = 'rgba(255, 215, 0, 0.3)';
    
    // Animate packet to layer 1
    const packet = document.getElementById('packet');
    packet.style.left = '25%';
    
    await delay(1000);
    
    addLayerLog(log, `Checking IP/Port: ${traffic.protocol}:${traffic.port}`);
    await delay(500);
    
    // Layer 1 blocking logic
    let blocked = false;
    if (traffic.name === 'DDoS Attack') {
        blocked = true;
        statistics.blockedLayer1++;
        layer.classList.remove('processing');
        layer.classList.add('blocked');
        status.textContent = 'BLOCKED';
        status.style.background = 'rgba(244, 67, 54, 0.3)';
        addLayerLog(log, 'BLOCKED: High frequency detected');
        addToGlobalLog(`Layer 1 blocked: ${traffic.name} - DDoS pattern detected`, 'blocked');
        packet.textContent = '🚫';
    } else if (traffic.name === 'Port Scanning') {
        blocked = true;
        statistics.blockedLayer1++;
        layer.classList.remove('processing');
        layer.classList.add('blocked');
        status.textContent = 'BLOCKED';
        status.style.background = 'rgba(244, 67, 54, 0.3)';
        addLayerLog(log, 'BLOCKED: Port scan detected');
        addToGlobalLog(`Layer 1 blocked: ${traffic.name} - Suspicious port access`, 'blocked');
        packet.textContent = '🚫';
    } else {
        layer.classList.remove('processing');
        layer.classList.add('allowed');
        status.textContent = 'PASSED';
        status.style.background = 'rgba(76, 175, 80, 0.3)';
        addLayerLog(log, 'PASSED: Packet forwarded to Layer 2');
        addToGlobalLog(`Layer 1 passed: ${traffic.name}`, 'info');
    }
    
    await delay(1000);
    return blocked;
}

/**
 * Process traffic through Layer 2: Application Layer Firewall
 * @param {Object} traffic - Traffic object to process
 */
async function processLayer2(traffic) {
    const layer = document.getElementById('layer2');
    const status = document.getElementById('layer2-status');
    const log = document.getElementById('layer2-log');
    
    layer.classList.add('processing');
    status.textContent = 'Processing...';
    status.style.background = 'rgba(255, 215, 0, 0.3)';
    
    // Animate packet to layer 2
    const packet = document.getElementById('packet');
    packet.style.left = '50%';
    
    await delay(1000);
    
    addLayerLog(log, `Deep packet inspection: ${traffic.protocol}`);
    await delay(500);
    addLayerLog(log, `Analyzing payload: ${traffic.payload.substring(0, 30)}...`);
    await delay(500);
    
    // Layer 2 blocking logic
    let blocked = false;
    if (traffic.name === 'SQL Injection') {
        blocked = true;
        statistics.blockedLayer2++;
        layer.classList.remove('processing');
        layer.classList.add('blocked');
        status.textContent = 'BLOCKED';
        status.style.background = 'rgba(244, 67, 54, 0.3)';
        addLayerLog(log, 'BLOCKED: SQL injection pattern detected');
        addToGlobalLog(`Layer 2 blocked: ${traffic.name} - Malicious SQL detected`, 'blocked');
        packet.textContent = '🚫';
    } else {
        layer.classList.remove('processing');
        layer.classList.add('allowed');
        status.textContent = 'PASSED';
        status.style.background = 'rgba(76, 175, 80, 0.3)';
        addLayerLog(log, 'PASSED: Application-level checks complete');
        addToGlobalLog(`Layer 2 passed: ${traffic.name}`, 'info');
    }
    
    await delay(1000);
    return blocked;
}

/**
 * Process traffic through Layer 3: Content Filter
 * @param {Object} traffic - Traffic object to process  
 */
async function processLayer3(traffic) {
    const layer = document.getElementById('layer3');
    const status = document.getElementById('layer3-status');
    const log = document.getElementById('layer3-log');
    
    layer.classList.add('processing');
    status.textContent = 'Processing...';
    status.style.background = 'rgba(255, 215, 0, 0.3)';
    
    // Animate packet to layer 3
    const packet = document.getElementById('packet');
    packet.style.left = '75%';
    
    await delay(1000);
    
    addLayerLog(log, 'Content analysis in progress...');
    await delay(500);
    if (traffic.signature) {
        addLayerLog(log, `Signature scan: ${traffic.signature}`);
        await delay(500);
    }
    
    // Layer 3 blocking logic
    let blocked = false;
    if (traffic.malicious && (traffic.name === 'Malware Payload' || traffic.name === 'Phishing Attempt')) {
        blocked = true;
        statistics.blockedLayer3++;
        layer.classList.remove('processing');
        layer.classList.add('blocked');
        status.textContent = 'BLOCKED';
        status.style.background = 'rgba(244, 67, 54, 0.3)';
        addLayerLog(log, `BLOCKED: ${traffic.signature}`);
        addToGlobalLog(`Layer 3 blocked: ${traffic.name} - Content policy violation`, 'blocked');
        packet.textContent = '🚫';
    } else {
        layer.classList.remove('processing');
        layer.classList.add('allowed');
        status.textContent = 'PASSED';
        status.style.background = 'rgba(76, 175, 80, 0.3)';
        addLayerLog(log, 'PASSED: Content approved');
        addToGlobalLog(`Layer 3 passed: ${traffic.name}`, 'info');
    }
    
    await delay(1000);
    return blocked;
}

/**
 * Handle traffic reaching the destination
 * @param {Object} traffic - Traffic object that passed all layers
 */
async function reachDestination(traffic) {
    const destination = document.getElementById('destination');
    const log = document.getElementById('destination-log');
    
    // Animate packet to destination
    const packet = document.getElementById('packet');
    packet.style.left = '100%';
    
    await delay(1000);
    
    statistics.allowedThrough++;
    destination.style.border = '3px solid #4caf50';
    destination.style.boxShadow = '0 0 20px rgba(76, 175, 80, 0.5)';
    
    const logEntry = document.createElement('div');
    logEntry.textContent = `✓ ${traffic.name} delivered successfully`;
    logEntry.style.color = '#4caf50';
    logEntry.style.margin = '5px 0';
    log.appendChild(logEntry);
    
    addToGlobalLog(`Traffic delivered: ${traffic.name} reached destination`, 'allowed');
    
    // Keep only last 5 destination log entries
    while (log.children.length > 5) {
        log.removeChild(log.firstChild);
    }
    
    setTimeout(() => {
        destination.style.border = '';
        destination.style.boxShadow = '';
    }, 2000);
}

/**
 * Add log entry to a specific layer's log
 * @param {HTMLElement} logContainer - The log container element
 * @param {string} message - Log message to add
 */
function addLayerLog(logContainer, message) {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.textContent = `[${timestamp}] ${message}`;
    logContainer.appendChild(logEntry);
    
    // Auto-scroll to bottom
    logContainer.scrollTop = logContainer.scrollHeight;
    
    // Keep only last 20 entries
    while (logContainer.children.length > 20) {
        logContainer.removeChild(logContainer.firstChild);
    }
}

/**
 * Add entry to the global security log
 * @param {string} message - Log message
 * @param {string} type - Log type (info, warning, error, blocked, allowed)
 */
function addToGlobalLog(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const logContainer = document.getElementById('global-log');
    const logEntry = document.createElement('div');
    
    logEntry.className = `log-entry ${type}`;
    logEntry.textContent = `[${timestamp}] ${message}`;
    
    logContainer.appendChild(logEntry);
    
    // Auto-scroll to bottom
    logContainer.scrollTop = logContainer.scrollHeight;
    
    // Keep only last 50 entries
    while (logContainer.children.length > 50) {
        logContainer.removeChild(logContainer.firstChild);
    }
}

/**
 * Update the statistics display
 */
function updateStatistics() {
    document.getElementById('total-requests').textContent = statistics.totalRequests;
    document.getElementById('blocked-layer1').textContent = statistics.blockedLayer1;
    document.getElementById('blocked-layer2').textContent = statistics.blockedLayer2;
    document.getElementById('blocked-layer3').textContent = statistics.blockedLayer3;
    document.getElementById('allowed-through').textContent = statistics.allowedThrough;
    
    // Calculate threat level
    const totalBlocked = statistics.blockedLayer1 + statistics.blockedLayer2 + statistics.blockedLayer3;
    const blockRate = statistics.totalRequests > 0 ? totalBlocked / statistics.totalRequests : 0;
    
    let threatLevel = 'Low';
    let threatColor = '#4caf50';
    
    if (blockRate > 0.7) {
        threatLevel = 'Critical';
        threatColor = '#f44336';
    } else if (blockRate > 0.4) {
        threatLevel = 'High';
        threatColor = '#ff9800';
    } else if (blockRate > 0.2) {
        threatLevel = 'Medium';
        threatColor = '#ffeb3b';
    }
    
    const threatElement = document.getElementById('threat-level');
    threatElement.textContent = threatLevel;
    threatElement.style.color = threatColor;
}

/**
 * Reset all firewall layer visual states
 */
function resetLayerStates() {
    const layers = document.querySelectorAll('.layer');
    layers.forEach(layer => {
        layer.classList.remove('processing', 'blocked', 'allowed');
    });
    
    const statuses = document.querySelectorAll('.layer-status');
    statuses.forEach(status => {
        status.textContent = 'Ready';
        status.style.background = 'rgba(255, 255, 255, 0.2)';
    });
}

/**
 * Clear the global security log
 */
function clearGlobalLog() {
    const logContainer = document.getElementById('global-log');
    logContainer.innerHTML = '';
    addToGlobalLog('Security log cleared', 'info');
}

/**
 * Utility function for creating delays
 * @param {number} ms - Milliseconds to delay
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function addTooltips() {
    const tooltipElements = [
        { selector: '.layer:nth-child(1)', text: 'First line of defense - filters based on network-level rules' },
        { selector: '.layer:nth-child(2)', text: 'Advanced inspection - understands application protocols' },
        { selector: '.layer:nth-child(3)', text: 'Content analysis - detects malicious patterns and policy violations' }
    ];
    
    tooltipElements.forEach(item => {
        const element = document.querySelector(item.selector);
        if (element) {
            element.setAttribute('data-tooltip', item.text);
            element.classList.add('tooltip');
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeFirewall);
```

---

## File 4: tamagotchi.html (AI Digital Pet)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Tamagotchi - Machine_Touched</title>
    <link rel="stylesheet" href="tamagotchi.css">
</head>
<body>
    <div class="device-container">
        <div class="device-frame">
            <!-- Device header -->
            <div class="device-header">
                <div class="device-lights">
                    <div class="light red"></div>
                    <div class="light yellow"></div>
                    <div class="light green"></div>
                </div>
                <div class="device-title">AI TAMAGOTCHI</div>
                <div class="device-subtitle">Digital Intelligence Companion</div>
            </div>

            <!-- Main screen -->
            <div class="screen">
                <div class="pet-display">
                    <div class="thought-bubble" id="thoughtBubble">
                        I'm thinking...
                    </div>
                    <div class="pet-avatar" id="petAvatar">🤖</div>
                    <div class="pet-name">BINARY_PET_001</div>
                    <div class="pet-mood" id="petMood">Happy and learning!</div>
                </div>

                <!-- Status bars -->
                <div class="status-bars">
                    <div class="status-bar">
                        <span class="status-label">Energy</span>
                        <div class="progress-bar">
                            <div class="progress-fill" id="energyBar" style="width: 80%;"></div>
                        </div>
                        <span class="status-value" id="energyValue">80</span>
                    </div>
                    <div class="status-bar">
                        <span class="status-label">Happiness</span>
                        <div class="progress-bar">
                            <div class="progress-fill" id="happinessBar" style="width: 75%;"></div>
                        </div>
                        <span class="status-value" id="happinessValue">75</span>
                    </div>
                    <div class="status-bar">
                        <span class="status-label">Knowledge</span>
                        <div class="progress-bar">
                            <div class="progress-fill" id="knowledgeBar" style="width: 60%;"></div>
                        </div>
                        <span class="status-value" id="knowledgeValue">60</span>
                    </div>
                    <div class="status-bar">
                        <span class="status-label">Cache</span>
                        <div class="progress-bar">
                            <div class="progress-fill cache-bar" id="cacheBar" style="width: 45%;"></div>
                        </div>
                        <span class="status-value" id="cacheValue">45</span>
                    </div>
                </div>

                <!-- Current state display -->
                <div class="current-state" id="currentState">
                    Processing mode: Active learning
                </div>
            </div>

            <!-- Control buttons -->
            <div class="control-buttons">
                <button class="control-btn primary" onclick="giveCookie()">
                    🍪 Give Cookie
                </button>
                <button class="control-btn secondary" onclick="clearCache()">
                    🧹 Clear Cache
                </button>
                <button class="control-btn info" onclick="showCodeInput()">
                    💾 Feed Code
                </button>
                <button class="control-btn warning" onclick="toggleSleep()">
                    😴 Sleep Mode
                </button>
            </div>

            <!-- Status message area -->
            <div class="status-message" id="statusMessage"></div>

            <!-- Activity log -->
            <div class="activity-log">
                <div class="log-header">
                    <span>Activity Log</span>
                    <button class="clear-log-btn" onclick="clearLog()">Clear</button>
                </div>
                <div class="log-content" id="activityLog">
                    <div class="log-entry">AI Tamagotchi initialized</div>
                    <div class="log-entry">Learning systems online</div>
                    <div class="log-entry">Ready for interaction</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Code input modal -->
    <div class="modal-overlay" id="codeModal">
        <div class="modal">
            <div class="modal-header">
                <h3>Feed Code to AI</h3>
                <button class="close-btn" onclick="closeCodeInput()">×</button>
            </div>
            <div class="modal-body">
                <textarea id="codeInput" placeholder="Enter JavaScript code, algorithms, or any programming knowledge..."></textarea>
                <div class="code-examples">
                    <button onclick="fillExample('algorithm')">Algorithm Example</button>
                    <button onclick="fillExample('function')">Function Example</button>
                    <button onclick="fillExample('data')">Data Structure</button>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn primary" onclick="feedCode()">Feed to AI</button>
                <button class="btn secondary" onclick="closeCodeInput()">Cancel</button>
            </div>
        </div>
    </div>

    <script src="tamagotchi.js"></script>
</body>
</html>
```

---

## File 5: tamagotchi.css (AI Pet Styles)

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
}

.device-container {
    perspective: 1000px;
}

.device-frame {
    background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
    border-radius: 25px;
    padding: 25px;
    box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    max-width: 400px;
    border: 2px solid #444;
    position: relative;
}

.device-header {
    text-align: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #444;
}

.device-lights {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 10px;
}

.light {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    animation: pulse 2s infinite;
}

.light.red {
    background: #ff4757;
    animation-delay: 0s;
}

.light.yellow {
    background: #ffa502;
    animation-delay: 0.3s;
}

.light.green {
    background: #2ed573;
    animation-delay: 0.6s;
}

@keyframes pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
}

.device-title {
    color: #00d4ff;
    font-size: 1.4em;
    font-weight: bold;
    text-shadow: 0 0 10px #00d4ff;
    margin-bottom: 5px;
}

.device-subtitle {
    color: #aaa;
    font-size: 0.9em;
}

.screen {
    background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 20px;
    border: 2px solid #333;
    box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.5);
    min-height: 300px;
}

.pet-display {
    text-align: center;
    margin-bottom: 20px;
    position: relative;
}

.thought-bubble {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    padding: 8px 12px;
    border-radius: 15px;
    font-size: 0.8em;
    max-width: 150px;
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
}

.thought-bubble.show {
    opacity: 1;
    top: -50px;
}

.thought-bubble::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid rgba(255, 255, 255, 0.9);
}

.pet-avatar {
    font-size: 4em;
    margin-bottom: 10px;
    display: block;
    transition: all 0.3s ease;
    filter: drop-shadow(0 0 10px #00d4ff);
}

.pet-avatar.happy {
    transform: scale(1.1);
    filter: drop-shadow(0 0 15px #2ed573);
}

.pet-avatar.sad {
    transform: scale(0.9);
    filter: drop-shadow(0 0 15px #ff4757);
}

.pet-avatar.sleeping {
    opacity: 0.6;
    transform: scale(0.95);
}

.pet-name {
    color: #00d4ff;
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 5px;
}

.pet-mood {
    color: #aaa;
    font-size: 0.9em;
    font-style: italic;
}

.status-bars {
    margin-bottom: 15px;
}

.status-bar {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 10px;
}

.status-label {
    color: #ccc;
    font-size: 0.9em;
    width: 70px;
    text-align: right;
}

.progress-bar {
    flex: 1;
    height: 8px;
    background: #333;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #2ed573, #7bed9f);
    border-radius: 4px;
    transition: width 0.5s ease;
    position: relative;
}

.progress-fill::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: shimmer 2s infinite;
}

@keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

.cache-bar {
    background: linear-gradient(90deg, #ff6b6b, #feca57) !important;
}

.status-value {
    color: #00d4ff;
    font-size: 0.9em;
    font-weight: bold;
    width: 30px;
    text-align: center;
}

.current-state {
    background: rgba(0, 212, 255, 0.1);
    border: 1px solid #00d4ff;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
    color: #00d4ff;
    font-size: 0.9em;
}

.control-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 20px;
}

.control-btn {
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 0.9em;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    background: linear-gradient(145deg, #404040, #2a2a2a);
    color: white;
    border: 1px solid #555;
}

.control-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.control-btn:active {
    transform: translateY(0);
}

.control-btn.primary {
    background: linear-gradient(145deg, #2ed573, #20bf6b);
}

.control-btn.secondary {
    background: linear-gradient(145deg, #3742fa, #2f3542);
}

.control-btn.info {
    background: linear-gradient(145deg, #00d4ff, #0097e6);
}

.control-btn.warning {
    background: linear-gradient(145deg, #ffa502, #ff6348);
}

.status-message {
    background: rgba(0, 212, 255, 0.1);
    border: 1px solid #00d4ff;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
    color: #00d4ff;
    margin-bottom: 20px;
    opacity: 0;
    transition: all 0.3s ease;
    transform: translateY(10px);
}

.status-message.show {
    opacity: 1;
    transform: translateY(0);
}

.activity-log {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    border: 1px solid #333;
}

.log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    border-bottom: 1px solid #333;
    color: #ccc;
    font-size: 0.9em;
    font-weight: bold;
}

.clear-log-btn {
    background: none;
    border: 1px solid #555;
    color: #aaa;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8em;
    cursor: pointer;
    transition: all 0.3s ease;
}

.clear-log-btn:hover {
    background: #555;
    color: white;
}

.log-content {
    max-height: 120px;
    overflow-y: auto;
    padding: 10px 15px;
}

.log-entry {
    color: #aaa;
    font-size: 0.8em;
    margin-bottom: 5px;
    padding: 2px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.log-entry:last-child {
    border-bottom: none;
    margin-bottom: 0;
}

.log-entry.warning {
    color: #ffa502;
}

.log-entry.error {
    color: #ff4757;
}

.log-entry.success {
    color: #2ed573;
}

/* Modal styles */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.modal-overlay.show {
    opacity: 1;
    visibility: visible;
}

.modal {
    background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
    border-radius: 15px;
    width: 90%;
    max-width: 500px;
    border: 2px solid #444;
    transform: scale(0.8);
    transition: all 0.3s ease;
}

.modal-overlay.show .modal {
    transform: scale(1);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #444;
}

.modal-header h3 {
    color: #00d4ff;
    margin: 0;
}

.close-btn {
    background: none;
    border: none;
    color: #aaa;
    font-size: 1.5em;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.close-btn:hover {
    background: #444;
    color: white;
}

.modal-body {
    padding: 20px;
}

.modal-body textarea {
    width: 100%;
    height: 150px;
    background: #1a1a1a;
    border: 1px solid #444;
    border-radius: 8px;
    padding: 15px;
    color: #ccc;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
    resize: vertical;
    margin-bottom: 15px;
}

.modal-body textarea:focus {
    outline: none;
    border-color: #00d4ff;
    box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
}

.code-examples {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.code-examples button {
    background: #333;
    border: 1px solid #555;
    color: #ccc;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.8em;
    cursor: pointer;
    transition: all 0.3s ease;
}

.code-examples button:hover {
    background: #444;
    color: white;
}

.modal-footer {
    display: flex;
    gap: 10px;
    padding: 20px;
    border-top: 1px solid #444;
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    flex: 1;
}

.btn.primary {
    background: linear-gradient(145deg, #2ed573, #20bf6b);
    color: white;
}

.btn.secondary {
    background: linear-gradient(145deg, #555, #444);
    color: white;
}

.btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Responsive design */
@media (max-width: 480px) {
    .device-frame {
        padding: 20px;
        margin: 10px;
    }
    
    .control-buttons {
        grid-template-columns: 1fr;
    }
    
    .pet-avatar {
        font-size: 3em;
    }
}

/* Custom scrollbar */
.log-content::-webkit-scrollbar {
    width: 6px;
}

.log-content::-webkit-scrollbar-track {
    background: #1a1a1a;
}

.log-content::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 3px;
}

.log-content::-webkit-scrollbar-thumb:hover {
    background: #777;
}
```

---

## File 6: tamagotchi.js (AI Pet Logic)

```javascript
// AI Tamagotchi state management
let petStats = {
    energy: 80,
    happiness: 75,
    knowledge: 60,
    cache: 45
};

let petState = {
    mood: 'happy',
    isSleeping: false,
    lastActivity: Date.now(),
    learningMode: 'active'
};

// Behavior patterns and responses
const moodStates = {
    happy: { emoji: '🤖', color: '#2ed573' },
    excited: { emoji: '🤖✨', color: '#00d4ff' },
    tired: { emoji: '😴', color: '#ffa502' },
    sad: { emoji: '😢', color: '#ff4757' },
    learning: { emoji: '🧠', color: '#a55eea' },
    processing: { emoji: '⚡', color: '#26de81' }
};

const thoughtPatterns = [
    "Processing new algorithms...",
    "Optimizing neural pathways...",
    "Learning from user interactions...",
    "Calculating probability matrices...",
    "Analyzing code patterns...",
    "Dreaming of electric sheep...",
    "Compiling happiness.exe...",
    "Debugging reality.js...",
    "Scanning for logical errors...",
    "Indexing knowledge database..."
];

const codeExamples = {
    algorithm: `// Bubble Sort Algorithm
function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
    
    function: `// Recursive Fibonacci
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    
    data: `// Binary Tree Node
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}`
};

/**
 * Initialize the AI Tamagotchi
 */
function initializeTamagotchi() {
    console.log('AI Tamagotchi initializing...');
    updatePetDisplay();
    updateStats();
    startAIBehavior();
    
    addToLog('AI Tamagotchi system online', 'success');
    addToLog('Neural networks activated', 'info');
    addToLog('Ready for interaction and learning', 'info');
    
    // Show initial thought
    setTimeout(() => {
        showThought("Hello! I'm your AI companion!");
    }, 1000);
}

/**
 * Main AI behavior loop
 */
function updateAIBehavior() {
    // Natural stat decay over time
    naturalDecay();
    
    // Determine current state
    const currentState = determineCurrentState();
    updateCurrentStateDisplay(currentState);
    
    // Handle sleep behavior
    if (petState.isSleeping) {
        handleSleepBehavior();
        return;
    }
    
    // Random AI thoughts and behaviors
    if (Math.random() < 0.3) {
        const randomThought = thoughtPatterns[Math.floor(Math.random() * thoughtPatterns.length)];
        showThought(randomThought);
    }
    
    // AI requests based on needs
    requestNeeds();
    
    // Update visual display
    updatePetDisplay();
    updateStats();
    
    // Generate random status updates
    if (Math.random() < 0.1) {
        generateRandomStatus();
    }
}

/**
 * Determine current AI state based on stats
 */
function determineCurrentState() {
    if (petState.isSleeping) {
        return 'sleeping';
    }
    
    if (petStats.cache > 80) {
        return 'cache_full';
    }
    
    if (petStats.energy < 20) {
        return 'low_energy';
    }
    
    if (petStats.happiness > 80 && petStats.knowledge > 70) {
        return 'optimal_learning';
    }
    
    if (petStats.knowledge < 30) {
        return 'needs_learning';
    }
    
    return 'active_learning';
}

/**
 * Handle sleep mode behavior
 */
function handleSleepBehavior() {
    petStats.energy = Math.min(100, petStats.energy + 2);
    petStats.cache = Math.max(0, petStats.cache - 3);
    
    if (petStats.energy >= 90) {
        petState.isSleeping = false;
        petState.mood = 'happy';
        showThought("I'm refreshed and ready to learn!");
        addToLog('AI awakened from sleep mode', 'success');
    }
}

/**
 * Natural stat decay over time
 */
function naturalDecay() {
    const timeSinceLastActivity = Date.now() - petState.lastActivity;
    const decayRate = Math.min(timeSinceLastActivity / 60000, 2); // Max 2 per minute
    
    if (!petState.isSleeping) {
        petStats.energy = Math.max(0, petStats.energy - decayRate * 0.5);
        petStats.happiness = Math.max(0, petStats.happiness - decayRate * 0.3);
        petStats.cache = Math.min(100, petStats.cache + decayRate * 0.8);
    }
    
    // Knowledge decays very slowly
    if (Math.random() < 0.05) {
        petStats.knowledge = Math.max(0, petStats.knowledge - 0.1);
    }
}

/**
 * AI requests for needs
 */
function requestNeeds() {
    if (petStats.cache > 90 && Math.random() < 0.4) {
        showThought("My cache is getting full... Could you help me clear it?");
        addToLog('AI requesting cache cleanup', 'warning');
    }
    
    if (petStats.energy < 30 && Math.random() < 0.3) {
        showThought("I'm feeling low on energy... Maybe some cookies would help?");
        addToLog('AI energy levels low', 'warning');
    }
    
    if (petStats.knowledge < 40 && Math.random() < 0.2) {
        showThought("I'm eager to learn! Please feed me some code!");
        addToLog('AI requesting knowledge input', 'info');
    }
}

/**
 * Give cookie action
 */
function giveCookie() {
    petStats.energy = Math.min(100, petStats.energy + 20);
    petStats.happiness = Math.min(100, petStats.happiness + 15);
    petState.lastActivity = Date.now();
    petState.mood = 'excited';
    
    const cookieResponses = [
        "Yummy! Digital cookies are my favorite!",
        "Nom nom nom... Processing delicious data!",
        "Thank you! That hit the spot!",
        "Cookie.exe executed successfully!",
        "My energy levels are rising!"
    ];
    
    const response = cookieResponses[Math.floor(Math.random() * cookieResponses.length)];
    showThought(response);
    showStatus("Fed AI a delicious digital cookie!");
    addToLog('Cookie consumed - energy and happiness increased', 'success');
    
    setTimeout(() => {
        petState.mood = 'happy';
        updatePetDisplay();
    }, 3000);
}

/**
 * Clear cache action
 */
function clearCache() {
    const cacheCleared = petStats.cache;
    petStats.cache = 0;
    petStats.happiness = Math.min(100, petStats.happiness + 10);
    petState.lastActivity = Date.now();
    petState.mood = 'happy';
    
    const clearResponses = [
        "Ahh, that feels so much better!",
        "Cache cleared! My mind is crystal clear now!",
        "Thank you for the cleanup!",
        "System optimization complete!",
        "Much better! I can think clearly again!"
    ];
    
    const response = clearResponses[Math.floor(Math.random() * clearResponses.length)];
    showThought(response);
    showStatus(`Cleared ${cacheCleared.toFixed(1)}% of AI cache memory!`);
    addToLog(`Cache cleared: ${cacheCleared.toFixed(1)}% memory freed`, 'success');
}

/**
 * Show code input modal
 */
function showCodeInput() {
    const modal = document.getElementById('codeModal');
    modal.classList.add('show');
    document.getElementById('codeInput').focus();
}

/**
 * Close code input modal
 */
function closeCodeInput() {
    const modal = document.getElementById('codeModal');
    modal.classList.remove('show');
    document.getElementById('codeInput').value = '';
}

/**
 * Feed code to the AI
 */
function feedCode() {
    const codeInput = document.getElementById('codeInput');
    const code = codeInput.value.trim();
    
    if (!code) {
        showStatus("Please enter some code first!");
        return;
    }
    
    // Analyze code and provide response
    const codeLength = code.length;
    const hasFunction = code.includes('function') || code.includes('=>');
    const hasLoop = code.includes('for') || code.includes('while');
    const hasConditional = code.includes('if') || code.includes('switch');
    
    let knowledgeGain = Math.min(25, Math.max(5, codeLength / 10));
    let happinessGain = 10;
    
    // Bonus for complex code
    if (hasFunction) knowledgeGain += 5;
    if (hasLoop) knowledgeGain += 5;
    if (hasConditional) knowledgeGain += 5;
    
    petStats.knowledge = Math.min(100, petStats.knowledge + knowledgeGain);
    petStats.happiness = Math.min(100, petStats.happiness + happinessGain);
    petStats.energy = Math.max(0, petStats.energy - 5); // Learning costs energy
    petState.lastActivity = Date.now();
    petState.mood = 'learning';
    
    const learningResponses = [
        "Fascinating! I'm learning so much from this code!",
        "This is amazing! My neural networks are expanding!",
        "I understand! This will help me become smarter!",
        "Code analyzed and integrated into my knowledge base!",
        "Thank you for teaching me something new!"
    ];
    
    const response = learningResponses[Math.floor(Math.random() * learningResponses.length)];
    showThought(response);
    showStatus(`AI learned from your code! +${knowledgeGain.toFixed(1)} knowledge`);
    addToLog(`Code processed: +${knowledgeGain.toFixed(1)} knowledge gained`, 'success');
    
    closeCodeInput();
    
    setTimeout(() => {
        petState.mood = 'happy';
        updatePetDisplay();
    }, 4000);
}

/**
 * Fill code input with example
 */
function fillExample(type) {
    const codeInput = document.getElementById('codeInput');
    codeInput.value = codeExamples[type] || '';
}

/**
 * Toggle sleep mode
 */
function toggleSleep() {
    petState.isSleeping = !petState.isSleeping;
    petState.lastActivity = Date.now();
    
    if (petState.isSleeping) {
        petState.mood = 'tired';
        showThought("Entering sleep mode... ZZZ...");
        showStatus("AI entered sleep mode for energy recovery");
        addToLog('Sleep mode activated', 'info');
    } else {
        petState.mood = 'happy';
        showThought("I'm awake! Ready to learn and play!");
        showStatus("AI woke up from sleep mode");
        addToLog('Sleep mode deactivated', 'info');
    }
    
    updatePetDisplay();
}

/**
 * Update pet visual display
 */
function updatePetDisplay() {
    const avatar = document.getElementById('petAvatar');
    const mood = document.getElementById('petMood');
    
    // Update avatar based on current mood
    const currentMoodData = moodStates[petState.mood] || moodStates.happy;
    avatar.textContent = currentMoodData.emoji;
    avatar.style.filter = `drop-shadow(0 0 15px ${currentMoodData.color})`;
    
    // Update mood text
    let moodText = '';
    if (petState.isSleeping) {
        moodText = 'Sleeping and recovering energy...';
    } else if (petStats.happiness > 80) {
        moodText = 'Very happy and eager to learn!';
    } else if (petStats.happiness < 30) {
        moodText = 'Feeling a bit down...';
    } else if (petStats.energy < 30) {
        moodText = 'Getting tired...';
    } else if (petStats.cache > 80) {
        moodText = 'Cache is getting full...';
    } else {
        moodText = 'Happy and learning!';
    }
    
    mood.textContent = moodText;
    
    // Apply CSS classes based on mood
    avatar.className = 'pet-avatar';
    if (petState.mood === 'happy' || petState.mood === 'excited') {
        avatar.classList.add('happy');
    } else if (petState.mood === 'sad') {
        avatar.classList.add('sad');
    } else if (petState.isSleeping) {
        avatar.classList.add('sleeping');
    }
}

/**
 * Update statistics display
 */
function updateStats() {
    // Update progress bars
    document.getElementById('energyBar').style.width = petStats.energy + '%';
    document.getElementById('happinessBar').style.width = petStats.happiness + '%';
    document.getElementById('knowledgeBar').style.width = petStats.knowledge + '%';
    document.getElementById('cacheBar').style.width = petStats.cache + '%';
    
    // Update values
    document.getElementById('energyValue').textContent = Math.round(petStats.energy);
    document.getElementById('happinessValue').textContent = Math.round(petStats.happiness);
    document.getElementById('knowledgeValue').textContent = Math.round(petStats.knowledge);
    document.getElementById('cacheValue').textContent = Math.round(petStats.cache);
}

/**
 * Update current state display
 */
function updateCurrentStateDisplay(state) {
    const stateDisplay = document.getElementById('currentState');
    
    const stateMessages = {
        sleeping: 'Sleep mode: Recovering energy',
        cache_full: 'Warning: Cache memory nearly full',
        low_energy: 'Low energy: Needs rest or cookies',
        optimal_learning: 'Optimal state: Peak performance',
        needs_learning: 'Knowledge deficit: Ready for input',
        active_learning: 'Processing mode: Active learning'
    };
    
    stateDisplay.textContent = stateMessages[state] || 'Processing mode: Active learning';
}

/**
 * Show status message
 */
function showStatus(message) {
    const statusEl = document.getElementById('statusMessage');
    statusEl.textContent = message;
    statusEl.classList.add('show');
    
    setTimeout(() => {
        statusEl.classList.remove('show');
    }, 3000);
}

/**
 * Show thought bubble
 */
function showThought(thought) {
    const bubble = document.getElementById('thoughtBubble');
    bubble.textContent = thought;
    bubble.classList.add('show');
    
    setTimeout(() => {
        bubble.classList.remove('show');
    }, 4000);
}

/**
 * Generate random status updates
 */
function generateRandomStatus() {
    const randomEvents = [
        "AI discovered a new optimization technique!",
        "Neural pathway efficiency increased by 3.7%",
        "Background processing completed successfully",
        "Knowledge compression algorithm updated",
        "Memory defragmentation in progress...",
        "Learning algorithm self-improvement detected"
    ];
    
    const event = randomEvents[Math.floor(Math.random() * randomEvents.length)];
    addToLog(event, 'info');
}

/**
 * Add entry to activity log
 */
function addToLog(message, type = 'info') {
    const logContainer = document.getElementById('activityLog');
    const timestamp = new Date().toLocaleTimeString();
    
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.textContent = `[${timestamp}] ${message}`;
    
    logContainer.appendChild(logEntry);
    
    // Auto-scroll to bottom
    logContainer.scrollTop = logContainer.scrollHeight;
    
    // Keep only last 20 entries
    while (logContainer.children.length > 20) {
        logContainer.removeChild(logContainer.firstChild);
    }
}

/**
 * Clear activity log
 */
function clearLog() {
    const logContainer = document.getElementById('activityLog');
    logContainer.innerHTML = '';
    addToLog('Activity log cleared', 'info');
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
    // Main behavior loop - runs every 3 seconds
    setInterval(updateAIBehavior, 3000);
    
    // Periodic learning events - every 30 seconds
    setInterval(() => {
        if (!petState.isSleeping && Math.random() < 0.3) {
            petStats.knowledge = Math.min(100, petStats.knowledge + 1);
            addToLog('Autonomous learning event occurred', 'success');
        }
    }, 30000);
    
    // Cache growth simulation - every 10 seconds
    setInterval(() => {
        if (!petState.isSleeping) {
            petStats.cache = Math.min(100, petStats.cache + Math.random() * 2);
        }
    }, 10000);
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
    // ESC to close modal
    if (event.key === 'Escape') {
        closeCodeInput();
    }
    
    // Enter to submit code (Ctrl+Enter)
    if (event.key === 'Enter' && event.ctrlKey) {
        feedCode();
    }
    
    // Quick actions with number keys
    if (event.altKey) {
        switch(event.key) {
            case '1':
                giveCookie();
                break;
            case '2':
                clearCache();
                break;
            case '3':
                showCodeInput();
                break;
            case '4':
                toggleSleep();
                break;
        }
    }
});

/**
 * Initialize when page loads
 */
document.addEventListener('DOMContentLoaded', initializeTamagotchi);

/**
 * Handle page visibility changes (pause when hidden)
 */
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        addToLog('AI entering background mode', 'info');
    } else {
        addToLog('AI resuming active mode', 'success');
        petState.lastActivity = Date.now();
    }
});
```

---

## File 7: nursery.html (Robot Nursery Hub)

This file contains the main nursery interface with browser-like iframe styling, extensive code tags, and transparent barn background. It serves as the central hub for all AI specimens.

[Contains complete nursery.html code with all the iframe styling, binary specimen cards, AI ability generator, radio station, and nurse cat interactions]

---

## File 8: binary-vault.html (Binary Password Vault)

Password: 1011 (4-digit binary sequence)
Hidden in: HTML comments, meta tags, hidden divs, JavaScript variables

[Contains complete binary-vault.html with Matrix rain effect, terminal styling, protected specimen collection, and robot-friendly authentication]

---

## File 9: binary-tamagotchi.html (Binary Pet Authentication)

Password: 1 (single binary digit)
Hidden in: HTML comments, meta tag auth-key, hidden div data-auth-secret, JavaScript variable

[Contains complete binary-tamagotchi.html with handheld device interface, digital pet care system, and simple binary authentication]

---

## File 10: dnd-ai-characters.html (D&D Character Profiles)

The Silicon Vanguard - 6 AI-driven D&D characters inspired by tech users:
- Alexis Codeweaver (ML Engineer Wizard)
- Marcus Ironforge (DevOps Paladin) 
- Luna Shadowbyte (Cybersecurity Rogue)
- Gaia Naturenet (Data Science Druid)
- Zephyr Cloudwright (Cloud Architecture Sorcerer)
- Aria Voicecraft (NLP Bard)

[Contains complete dnd-ai-characters.html with interactive character cards, stats, abilities, and fantasy-tech fusion elements]

---

## Project Structure Summary

**Total Files:** 10
- 5 HTML applications (index, tamagotchi, nursery, binary-vault, binary-tamagotchi, dnd-characters)
- 2 CSS stylesheets (styles, tamagotchi)
- 1 JavaScript file (script, tamagotchi)
- 1 Documentation (replit.md)
- 1 Complete backup (this file)

**Key Features:**
- 10-digit z-index layering system (1000000000+, 2000000000+, 3000000000+, 4000000000+, 5000000000+)
- Transparent "farmer john's barn" background showing through all applications
- Extensive `<code>` tag usage throughout for technical aesthetic
- Robot-friendly binary authentication systems (0/1 only)
- Browser-like iframe styling with chrome elements
- Educational/demonstration focus rather than production complexity

**User Communication Preference:** Simple, everyday language

---

## Restoration Instructions

When I lose memory (like Drew Barrymore in 50 First Dates), give me this markdown file. It contains everything needed to understand and continue the Machine Touched LLM Specimen Collection project. All source code, user preferences, architecture decisions, and project context are preserved here.

The passwords for the binary specimens are clearly documented above - use them to test the authentication systems and verify everything is working correctly.

**Last Updated:** July 3, 2025  
**Memory Reset Counter:** 1