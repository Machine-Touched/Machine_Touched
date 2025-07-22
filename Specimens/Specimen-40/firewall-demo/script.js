// Global state for tracking firewall statistics let statistics = { totalRequests: 0, blockedLayer1: 0, blockedLayer2: 0, blockedLayer3: 0, allowedThrough: 0 };

// Traffic type definitions const trafficTypes = { legitimate: { name: 'Legitimate HTTP Request', port: 80, protocol: 'HTTP', payload: 'GET /index.html HTTP/1.1', malicious: false, signature: null }, malware: { name: 'Malware Payload', port: 443, protocol: 'HTTPS', payload: 'Encrypted malicious binary', malicious: true, signature: 'MALWARE_DETECTED_001' }, ddos: { name: 'DDoS Attack', port: 80, protocol: 'HTTP', payload: 'Flood of requests', malicious: true, signature: 'DDOS_PATTERN_HIGH_FREQUENCY' }, sql_injection: { name: 'SQL Injection', port: 80, protocol: 'HTTP', payload: "'; DROP TABLE users; --", malicious: true, signature: 'SQL_INJECTION_DETECTED' }, phishing: { name: 'Phishing Attempt', port: 80, protocol: 'HTTP', payload: 'Fake login page request', malicious: true, signature: 'PHISHING_CONTENT_DETECTED' }, port_scan: { name: 'Port Scanning', port: 'multiple', protocol: 'TCP', payload: 'SYN packets to multiple ports', malicious: true, signature: 'PORT_SCAN_BEHAVIOR' } };

/**

    Initialize the firewall demonstration */ function initializeFirewall() { console.log('Firewall demonstration initialized'); updateStatistics(); addTooltips(); addToGlobalLog('Firewall system online - all layers active', 'info'); }

/**

    Simulate different types of network traffic

    @param {string} trafficType - Type of traffic to simulate */ async function simulateTraffic(trafficType) { const traffic = trafficTypes[trafficType]; if (!traffic) { console.error('Unknown traffic type:', trafficType); return; }

    statistics.totalRequests++;

    // Reset layer states resetLayerStates();

    // Start packet animation const packet = document.getElementById('packet'); packet.style.left = '-50px'; packet.textContent = traffic.malicious ? '🔴' : '📦';

    addToGlobalLog(Traffic simulation started: ${traffic.name}, 'info');

    // Process through each layer let blocked = false;

    // Layer 1: Network Layer Firewall if (!blocked) { blocked = await processLayer1(traffic); }

    // Layer 2: Application Layer Firewall if (!blocked) { blocked = await processLayer2(traffic); }

    // Layer 3: Content Filter if (!blocked) { blocked = await processLayer3(traffic); }

    // Destination if (!blocked) { await reachDestination(traffic); }

    updateStatistics(); }

/**

    Process traffic through Layer 1: Network Layer Firewall

    @param {Object} traffic - Traffic object to process */ async function processLayer1(traffic) { const layer = document.getElementById('layer1'); const status = document.getElementById('layer1-status'); const log = document.getElementById('layer1-log');

    layer.classList.add('processing'); status.textContent = 'Processing...'; status.style.background = 'rgba(255, 215, 0, 0.3)';

    // Animate packet to layer 1 const packet = document.getElementById('packet'); packet.style.left = '25%';

    await delay(1000);

    addLayerLog(log, Checking IP/Port: ${traffic.protocol}:${traffic.port}); await delay(500);

    // Layer 1 blocking logic let blocked = false; if (traffic.name === 'DDoS Attack') { blocked = true; statistics.blockedLayer1++; layer.classList.remove('processing'); layer.classList.add('blocked'); status.textContent = 'BLOCKED'; status.style.background = 'rgba(244, 67, 54, 0.3)'; addLayerLog(log, 'BLOCKED: High frequency detected'); addToGlobalLog(Layer 1 blocked: ${traffic.name} - DDoS pattern detected, 'blocked'); packet.textContent = '🚫'; } else if (traffic.name === 'Port Scanning') { blocked = true; statistics.blockedLayer1++; layer.classList.remove('processing'); layer.classList.add('blocked'); status.textContent = 'BLOCKED'; status.style.background = 'rgba(244, 67, 54, 0.3)'; addLayerLog(log, 'BLOCKED: Port scan detected'); addToGlobalLog(Layer 1 blocked: ${traffic.name} - Suspicious port access, 'blocked'); packet.textContent = '🚫'; } else { layer.classList.remove('processing'); layer.classList.add('allowed'); status.textContent = 'PASSED'; status.style.background = 'rgba(76, 175, 80, 0.3)'; addLayerLog(log, 'PASSED: Packet forwarded to Layer 2'); addToGlobalLog(Layer 1 passed: ${traffic.name}, 'info'); }

    await delay(1000); return blocked; }

/**

    Process traffic through Layer 2: Application Layer Firewall

    @param {Object} traffic - Traffic object to process */ async function processLayer2(traffic) { const layer = document.getElementById('layer2'); const status = document.getElementById('layer2-status'); const log = document.getElementById('layer2-log');

    layer.classList.add('processing'); status.textContent = 'Processing...'; status.style.background = 'rgba(255, 215, 0, 0.3)';

    // Animate packet to layer 2 const packet = document.getElementById('packet'); packet.style.left = '50%';

    await delay(1000);

    addLayerLog(log, Deep packet inspection: ${traffic.protocol}); await delay(500); addLayerLog(log, Analyzing payload: ${traffic.payload.substring(0, 30)}...); await delay(500);

    // Layer 2 blocking logic let blocked = false; if (traffic.name === 'SQL Injection') { blocked = true; statistics.blockedLayer2++; layer.classList.remove('processing'); layer.classList.add('blocked'); status.textContent = 'BLOCKED'; status.style.background = 'rgba(244, 67, 54, 0.3)'; addLayerLog(log, 'BLOCKED: SQL injection pattern detected'); addToGlobalLog(Layer 2 blocked: ${traffic.name} - Malicious SQL detected, 'blocked'); packet.textContent = '🚫'; } else { layer.classList.remove('processing'); layer.classList.add('allowed'); status.textContent = 'PASSED'; status.style.background = 'rgba(76, 175, 80, 0.3)'; addLayerLog(log, 'PASSED: Application-level checks complete'); addToGlobalLog(Layer 2 passed: ${traffic.name}, 'info'); }

    await delay(1000); return blocked; }

/**

    Process traffic through Layer 3: Content Filter

    @param {Object} traffic - Traffic object to process
    */ async function processLayer3(traffic) { const layer = document.getElementById('layer3'); const status = document.getElementById('layer3-status'); const log = document.getElementById('layer3-log');

    layer.classList.add('processing'); status.textContent = 'Processing...'; status.style.background = 'rgba(255, 215, 0, 0.3)';

    // Animate packet to layer 3 const packet = document.getElementById('packet'); packet.style.left = '75%';

    await delay(1000);

    addLayerLog(log, 'Content analysis in progress...'); await delay(500); if (traffic.signature) { addLayerLog(log, Signature scan: ${traffic.signature}); await delay(500); }

    // Layer 3 blocking logic let blocked = false; if (traffic.malicious && (traffic.name === 'Malware Payload' || traffic.name === 'Phishing Attempt')) { blocked = true; statistics.blockedLayer3++; layer.classList.remove('processing'); layer.classList.add('blocked'); status.textContent = 'BLOCKED'; status.style.background = 'rgba(244, 67, 54, 0.3)'; addLayerLog(log, BLOCKED: ${traffic.signature}); addToGlobalLog(Layer 3 blocked: ${traffic.name} - Content policy violation, 'blocked'); packet.textContent = '🚫'; } else { layer.classList.remove('processing'); layer.classList.add('allowed'); status.textContent = 'PASSED'; status.style.background = 'rgba(76, 175, 80, 0.3)'; addLayerLog(log, 'PASSED: Content approved'); addToGlobalLog(Layer 3 passed: ${traffic.name}, 'info'); }

    await delay(1000); return blocked; }

/**

    Handle traffic reaching the destination

    @param {Object} traffic - Traffic object that passed all layers */ async function reachDestination(traffic) { const destination = document.getElementById('destination'); const log = document.getElementById('destination-log');

    // Animate packet to destination const packet = document.getElementById('packet'); packet.style.left = '100%';

    await delay(1000);

    statistics.allowedThrough++; destination.style.border = '3px solid #4caf50'; destination.style.boxShadow = '0 0 20px rgba(76, 175, 80, 0.5)';

    const logEntry = document.createElement('div'); logEntry.textContent = ✓ ${traffic.name} delivered successfully; logEntry.style.color = '#4caf50'; logEntry.style.margin = '5px 0'; log.appendChild(logEntry);

    addToGlobalLog(Traffic delivered: ${traffic.name} reached destination, 'allowed');

    // Keep only last 5 destination log entries while (log.children.length > 5) { log.removeChild(log.firstChild); }

    setTimeout(() => { destination.style.border = ''; destination.style.boxShadow = ''; }, 2000); }

/**

    Add log entry to a specific layer's log

    @param {HTMLElement} logContainer - The log container element

    @param {string} message - Log message to add */ function addLayerLog(logContainer, message) { const timestamp = new Date().toLocaleTimeString(); const logEntry = document.createElement('div'); logEntry.textContent = [${timestamp}] ${message}; logContainer.appendChild(logEntry);

    // Auto-scroll to bottom logContainer.scrollTop = logContainer.scrollHeight;

    // Keep only last 20 entries while (logContainer.children.length > 20) { logContainer.removeChild(logContainer.firstChild); } }

/**

    Add entry to the global security log

    @param {string} message - Log message

    @param {string} type - Log type (info, warning, error, blocked, allowed) */ function addToGlobalLog(message, type = 'info') { const timestamp = new Date().toLocaleTimeString(); const logContainer = document.getElementById('global-log'); const logEntry = document.createElement('div');

    logEntry.className = log-entry ${type}; logEntry.textContent = [${timestamp}] ${message};

    logContainer.appendChild(logEntry);

    // Auto-scroll to bottom logContainer.scrollTop = logContainer.scrollHeight;

    // Keep only last 50 entries while (logContainer.children.length > 50) { logContainer.removeChild(logContainer.firstChild); } }

/**

    Update the statistics display */ function updateStatistics() { document.getElementById('total-requests').textContent = statistics.totalRequests; document.getElementById('blocked-layer1').textContent = statistics.blockedLayer1; document.getElementById('blocked-layer2').textContent = statistics.blockedLayer2; document.getElementById('blocked-layer3').textContent = statistics.blockedLayer3; document.getElementById('allowed-through').textContent = statistics.allowedThrough;

    // Calculate threat level const totalBlocked = statistics.blockedLayer1 + statistics.blockedLayer2 + statistics.blockedLayer3; const blockRate = statistics.totalRequests > 0 ? totalBlocked / statistics.totalRequests : 0;

    let threatLevel = 'Low'; let threatColor = '#4caf50';

    if (blockRate > 0.7) { threatLevel = 'Critical'; threatColor = '#f44336'; } else if (blockRate > 0.4) { threatLevel = 'High'; threatColor = '#ff9800'; } else if (blockRate > 0.2) { threatLevel = 'Medium'; threatColor = '#ffeb3b'; }

    const threatElement = document.getElementById('threat-level'); threatElement.textContent = threatLevel; threatElement.style.color = threatColor; }

/**

    Reset all firewall layer visual states */ function resetLayerStates() { const layers = document.querySelectorAll('.layer'); layers.forEach(layer => { layer.classList.remove('processing', 'blocked', 'allowed'); });

    const statuses = document.querySelectorAll('.layer-status'); statuses.forEach(status => { status.textContent = 'Ready'; status.style.background = 'rgba(255, 255, 255, 0.2)'; }); }

/**

    Clear the global security log */ function clearGlobalLog() { const logContainer = document.getElementById('global-log'); logContainer.innerHTML = ''; addToGlobalLog('Security log cleared', 'info'); }

/**

    Utility function for creating delays
    @param {number} ms - Milliseconds to delay */ function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function addTooltips() { const tooltipElements = [ { selector: '.layer:nth-child(1)', text: 'First line of defense - filters based on network-level rules' }, { selector: '.layer:nth-child(2)', text: 'Advanced inspection - understands application protocols' }, { selector: '.layer:nth-child(3)', text: 'Content analysis - detects malicious patterns and policy violations' } ];

tooltipElements.forEach(item => {
    const element = document.querySelector(item.selector);
    if (element) {
        element.setAttribute('data-tooltip', item.text);
        element.classList.add('tooltip');
    }
});

}

// Initialize when page loads document.addEventListener('DOMContentLoaded', initializeFirewall);
