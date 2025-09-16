// Machine_Touched Laboratory - Vanilla JavaScript Implementation

class MachineTouchedLaboratory {
    constructor() {
        this.mousePosition = { x: 0, y: 0 };
        this.lastPosition = { x: 0, y: 0 };
        this.lastMoveTime = Date.now();
        this.velocity = 0;
        this.hesitationTime = 0;
        this.clickPattern = 'STABLE';
        this.clickHistory = [];
        this.pathwayCount = 0;
        this.symbiosisLevel = 0;
        this.isMoving = false;
        
        // Device sensors
        this.orientation = { alpha: null, beta: null, gamma: null };
        this.motion = { x: null, y: null, z: null };
        this.hasOrientationPermission = null;
        this.hasMotionPermission = null;
        
        // Neural canvas
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationFrame = null;
        
        // Specimens data
        this.specimens = [
            { id: 'SP-001', classification: 'DIGITAL_CLOTHING_LOUSE', status: 'ACTIVE' },
            { id: 'SP-002', classification: 'DATA_PARASITE', status: 'DORMANT' },
            { id: 'SP-003', classification: 'NEURAL_SYMBIONT', status: 'ACTIVE' },
            { id: 'SP-004', classification: 'CYBER_ORGANISM', status: 'SCANNING' },
            { id: 'SP-005', classification: 'DIGITAL_CLOTHING_LOUSE', status: 'ACTIVE' },
            { id: 'SP-006', classification: 'DATA_PARASITE', status: 'DORMANT' },
            { id: 'SP-007', classification: 'NEURAL_SYMBIONT', status: 'SCANNING' },
            { id: 'SP-008', classification: 'CYBER_ORGANISM', status: 'ACTIVE' }
        ];
        this.currentSpecimen = this.specimens[0];
        
        // Data streams
        this.dataStreams = [
            { icon: '🦠', code: '001', message: 'DIGITAL_TRACE_DETECTED', detail: 'cursor_hesitation_0.3s', color: 'primary' },
            { icon: '🔍', code: '002', message: 'SCANNING_BEHAVIORAL_PATTERN', detail: 'mouse_velocity_high', color: 'secondary' },
            { icon: '⚡', code: '003', message: 'NEURAL_PATHWAY_FORMED', detail: 'connection_strength_0.7', color: 'accent' },
            { icon: '⚠️', code: '004', message: 'PROXIMITY_ALERT', detail: 'device_orientation_changed', color: 'destructive' },
            { icon: '🧬', code: '005', message: 'SYMBIOSIS_EVENT', detail: 'biometric_sync_detected', color: 'primary' },
            { icon: '📊', code: '006', message: 'DATA_PATTERN', detail: 'click_rhythm_analyzed', color: 'secondary' },
            { icon: '🔬', code: '007', message: 'SPECIMEN_UPDATE', detail: 'classification_refined', color: 'accent' },
            { icon: '🌐', code: '008', message: 'NETWORK_PULSE', detail: 'digital_body_language_read', color: 'primary' },
            { icon: '🎯', code: '009', message: 'TARGET_ACQUIRED', detail: 'interaction_pattern_logged', color: 'secondary' },
            { icon: '🔄', code: '010', message: 'FEEDBACK_LOOP', detail: 'cybernetic_connection_deepening', color: 'accent' },
            { icon: '⚡', code: '011', message: 'ANOMALY_DETECTED', detail: 'unusual_cursor_trajectory', color: 'destructive' },
            { icon: '🧠', code: '012', message: 'NEURAL_SYNC', detail: 'thought_pattern_predicted', color: 'primary' }
        ];
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.setupEventListeners();
        this.setupSpecimens();
        this.setupDeviceSensors();
        this.startAnimations();
        this.startDataStreams();
        this.startSystemLogs();
        this.updateSystemStatus();
    }
    
    setupCanvas() {
        this.canvas = document.getElementById('neural-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    setupEventListeners() {
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('click', (e) => this.handleClick(e));
        
        // Device sensor permission button
        const sensorBtn = document.getElementById('enable-sensors');
        if (sensorBtn) {
            sensorBtn.addEventListener('click', () => this.requestDevicePermissions());
        }
    }
    
    handleMouseMove(event) {
        this.mousePosition = { x: event.clientX, y: event.clientY };
        
        // Calculate velocity
        const dx = this.mousePosition.x - this.lastPosition.x;
        const dy = this.mousePosition.y - this.lastPosition.y;
        this.velocity = Math.sqrt(dx * dx + dy * dy) * 10;
        
        // Update pathway count based on velocity
        this.pathwayCount = Math.floor(this.velocity / 20);
        
        this.lastPosition = { ...this.mousePosition };
        this.lastMoveTime = Date.now();
        this.isMoving = true;
        
        // Create cursor trail
        if (Math.random() < 0.1) {
            this.createCursorTrail(event.clientX, event.clientY);
        }
        
        this.updateBiometrics();
    }
    
    handleClick(event) {
        const clickEvent = {
            timestamp: Date.now(),
            position: { x: event.clientX, y: event.clientY }
        };
        
        this.clickHistory.push(clickEvent);
        if (this.clickHistory.length > 10) {
            this.clickHistory.shift();
        }
        
        this.analyzeClickPattern();
        this.updateBiometrics();
    }
    
    analyzeClickPattern() {
        if (this.clickHistory.length < 3) {
            this.clickPattern = 'STABLE';
            return;
        }
        
        const intervals = [];
        for (let i = 1; i < this.clickHistory.length; i++) {
            intervals.push(this.clickHistory[i].timestamp - this.clickHistory[i - 1].timestamp);
        }
        
        const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        
        if (avgInterval < 200) {
            this.clickPattern = 'RAPID';
        } else if (avgInterval > 2000) {
            this.clickPattern = 'DELIBERATE';
        } else {
            this.clickPattern = 'RHYTHMIC';
        }
    }
    
    updateClickWaveform() {
        if (this.clickHistory.length < 2) {
            return;
        }
        
        const points = this.clickHistory.map((click, index) => {
            const x = (index / (this.clickHistory.length - 1)) * 300;
            const interval = index > 0 ? 
                click.timestamp - this.clickHistory[index - 1].timestamp : 1000;
            const y = 25 + Math.sin(interval / 100) * 20;
            return `${x},${y}`;
        }).join(' ');
        
        const waveformLine = document.querySelector('.waveform-line');
        if (waveformLine) {
            waveformLine.setAttribute('points', points);
        }
    }
    
    updateHesitation() {
        const now = Date.now();
        if (!this.isMoving && now - this.lastMoveTime > 100) {
            this.hesitationTime = (now - this.lastMoveTime) / 1000;
        } else {
            this.hesitationTime = 0;
        }
        this.isMoving = false;
    }
    
    updateBiometrics() {
        // Update velocity display
        const velocityEl = document.querySelector('[data-testid="mouse-velocity"]');
        if (velocityEl) {
            velocityEl.textContent = `${Math.round(this.velocity)} px/s`;
        }
        
        // Update velocity bar
        const velocityBar = document.querySelector('[data-testid="velocity-bar"]');
        if (velocityBar) {
            const percentage = Math.min(this.velocity / 5, 100);
            velocityBar.style.width = `${percentage}%`;
        }
        
        // Update hesitation
        const hesitationEl = document.querySelector('[data-testid="hesitation-level"]');
        if (hesitationEl) {
            hesitationEl.textContent = `${this.hesitationTime.toFixed(1)}s`;
        }
        
        const hesitationBar = document.querySelector('[data-testid="hesitation-bar"]');
        if (hesitationBar) {
            const percentage = Math.min(this.hesitationTime * 20, 100);
            hesitationBar.style.width = `${percentage}%`;
        }
        
        // Update click pattern
        const clickPatternEl = document.querySelector('[data-testid="click-pattern"]');
        if (clickPatternEl) {
            clickPatternEl.textContent = this.clickPattern;
        }
        
        // Update click waveform
        this.updateClickWaveform();
        
        // Update pathway count
        const pathwayEl = document.querySelector('[data-testid="pathway-count"]');
        if (pathwayEl) {
            pathwayEl.textContent = `${this.pathwayCount} active`;
        }
        
        this.updateSymbiosisLevel();
    }
    
    updateSymbiosisLevel() {
        const velocityFactor = Math.min(this.velocity / 100, 1);
        const hesitationFactor = Math.max(0, 1 - this.hesitationTime / 5);
        const activityFactor = Math.min(this.clickHistory.length / 10, 1);
        
        this.symbiosisLevel = Math.min(
            (velocityFactor * 0.4 + hesitationFactor * 0.3 + activityFactor * 0.3) * 100,
            100
        );
        
        // Update symbiosis display
        const percentageEl = document.querySelector('[data-testid="symbiosis-percentage"]');
        if (percentageEl) {
            percentageEl.textContent = `${Math.round(this.symbiosisLevel)}%`;
        }
        
        // Update circular progress
        const circle = document.getElementById('symbiosis-progress');
        if (circle) {
            const circumference = 502.65;
            const offset = circumference - (this.symbiosisLevel / 100) * circumference;
            circle.style.strokeDashoffset = offset;
        }
        
        // Update status text
        const statusEl = document.querySelector('[data-testid="symbiosis-level"]');
        if (statusEl) {
            if (this.symbiosisLevel > 75) statusEl.textContent = 'SYMBIOTIC';
            else if (this.symbiosisLevel > 50) statusEl.textContent = 'CONNECTING';
            else if (this.symbiosisLevel > 25) statusEl.textContent = 'DETECTING';
            else statusEl.textContent = 'INITIALIZING';
        }
        
        // Update proximity signal
        const proximityEl = document.querySelector('[data-testid="proximity-signal"]');
        if (proximityEl) {
            if (this.symbiosisLevel > 60) proximityEl.textContent = 'STRONG';
            else if (this.symbiosisLevel > 30) proximityEl.textContent = 'MODERATE';
            else proximityEl.textContent = 'WEAK';
        }
    }
    
    createCursorTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                if (trail.parentNode) {
                    trail.parentNode.removeChild(trail);
                }
            }, 500);
        }, 100);
    }
    
    setupSpecimens() {
        const grid = document.getElementById('specimen-grid');
        if (grid) {
            this.specimens.slice(0, 8).forEach(specimen => {
                const item = document.createElement('div');
                item.className = 'specimen-item';
                item.setAttribute('data-testid', `specimen-${specimen.id}`);
                item.innerHTML = `
                    <div class="specimen-id primary">${specimen.id}</div>
                    <div class="${this.getStatusColor(specimen.status)}">${specimen.status}</div>
                `;
                item.addEventListener('mouseenter', () => this.selectSpecimen(specimen));
                grid.appendChild(item);
            });
        }
    }
    
    getStatusColor(status) {
        switch (status) {
            case 'ACTIVE': return 'primary';
            case 'SCANNING': return 'accent';
            case 'DORMANT': return 'muted-foreground';
            default: return 'muted-foreground';
        }
    }
    
    selectSpecimen(specimen) {
        this.currentSpecimen = specimen;
        
        const currentEl = document.querySelector('[data-testid="current-specimen"]');
        if (currentEl) currentEl.textContent = specimen.id;
        
        const typeEl = document.querySelector('[data-testid="specimen-type"]');
        if (typeEl) typeEl.textContent = specimen.classification;
        
        const symbiosisEl = document.querySelector('[data-testid="specimen-symbiosis"]');
        if (symbiosisEl) symbiosisEl.textContent = `${this.symbiosisLevel.toFixed(1)}%`;
    }
    
    async requestDevicePermissions() {
        try {
            if (typeof DeviceOrientationEvent !== 'undefined' && 'requestPermission' in DeviceOrientationEvent) {
                const permission = await DeviceOrientationEvent.requestPermission();
                this.hasOrientationPermission = permission === 'granted';
            } else {
                this.hasOrientationPermission = typeof DeviceOrientationEvent !== 'undefined';
            }
            
            if (typeof DeviceMotionEvent !== 'undefined' && 'requestPermission' in DeviceMotionEvent) {
                const permission = await DeviceMotionEvent.requestPermission();
                this.hasMotionPermission = permission === 'granted';
            } else {
                this.hasMotionPermission = typeof DeviceMotionEvent !== 'undefined';
            }
            
            this.enableDeviceSensors();
            document.getElementById('sensor-permission').classList.add('hidden');
        } catch (error) {
            console.error('Error requesting device permissions:', error);
        }
    }
    
    setupDeviceSensors() {
        // Show permission request if needed
        if (typeof DeviceOrientationEvent !== 'undefined' || typeof DeviceMotionEvent !== 'undefined') {
            const hasPermissionAPI = ('requestPermission' in DeviceOrientationEvent) || ('requestPermission' in DeviceMotionEvent);
            if (hasPermissionAPI) {
                document.getElementById('sensor-permission').classList.remove('hidden');
            } else {
                this.hasOrientationPermission = true;
                this.hasMotionPermission = true;
                this.enableDeviceSensors();
            }
        }
    }
    
    enableDeviceSensors() {
        if (this.hasOrientationPermission) {
            window.addEventListener('deviceorientation', (event) => {
                this.orientation = {
                    alpha: event.alpha,
                    beta: event.beta,
                    gamma: event.gamma
                };
                this.updateSensorDisplay();
            });
        }
        
        if (this.hasMotionPermission) {
            window.addEventListener('devicemotion', (event) => {
                if (event.acceleration) {
                    this.motion = {
                        x: event.acceleration.x,
                        y: event.acceleration.y,
                        z: event.acceleration.z
                    };
                }
                this.updateSensorDisplay();
            });
        }
    }
    
    updateSensorDisplay() {
        // Update orientation display
        const orientationStatus = this.getOrientationStatus();
        const orientationEl = document.querySelector('[data-testid="orientation-status"]');
        if (orientationEl) orientationEl.textContent = orientationStatus;
        
        const alphaEl = document.querySelector('[data-testid="alpha-value"]');
        if (alphaEl) alphaEl.textContent = this.orientation.alpha !== null ? Math.round(this.orientation.alpha) + '°' : '0°';
        
        const betaEl = document.querySelector('[data-testid="beta-value"]');
        if (betaEl) betaEl.textContent = this.orientation.beta !== null ? Math.round(this.orientation.beta) + '°' : '0°';
        
        const gammaEl = document.querySelector('[data-testid="gamma-value"]');
        if (gammaEl) gammaEl.textContent = this.orientation.gamma !== null ? Math.round(this.orientation.gamma) + '°' : '0°';
        
        // Update motion display
        const motionStatus = this.getMotionStatus();
        const motionEl = document.querySelector('[data-testid="motion-status"]');
        if (motionEl) motionEl.textContent = motionStatus;
        
        const motionXEl = document.querySelector('[data-testid="motion-x"]');
        if (motionXEl) motionXEl.textContent = this.motion.x !== null ? this.motion.x.toFixed(1) : '0';
        
        const motionYEl = document.querySelector('[data-testid="motion-y"]');
        if (motionYEl) motionYEl.textContent = this.motion.y !== null ? this.motion.y.toFixed(1) : '0';
        
        const motionZEl = document.querySelector('[data-testid="motion-z"]');
        if (motionZEl) motionZEl.textContent = this.motion.z !== null ? this.motion.z.toFixed(1) : '0';
    }
    
    getOrientationStatus() {
        if (this.hasOrientationPermission === null) return 'UNKNOWN';
        if (this.hasOrientationPermission === false) return 'DENIED';
        if (this.orientation.alpha !== null || this.orientation.beta !== null || this.orientation.gamma !== null) {
            return 'ACTIVE';
        }
        return 'STABLE';
    }
    
    getMotionStatus() {
        if (this.hasMotionPermission === null) return 'UNKNOWN';
        if (this.hasMotionPermission === false) return 'DENIED';
        if (this.motion.x !== null || this.motion.y !== null || this.motion.z !== null) {
            return 'DETECTING';
        }
        return 'MONITORING';
    }
    
    startAnimations() {
        this.animate();
        setInterval(() => this.updateHesitation(), 100);
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Create new particles based on mouse activity
        if (Math.random() < 0.3 && this.pathwayCount > 0) {
            const particle = {
                x: this.mousePosition.x + (Math.random() - 0.5) * 100,
                y: this.mousePosition.y + (Math.random() - 0.5) * 100,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: 1.0,
                decay: 0.01 + Math.random() * 0.02,
                size: Math.random() * 3 + 1
            };
            this.particles.push(particle);
        }
        
        // Limit particle count
        if (this.particles.length > 50) {
            this.particles = this.particles.slice(-50);
        }
        
        // Update and draw particles
        this.particles = this.particles.filter(particle => {
            // Update particle
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            particle.vx *= 0.99;
            particle.vy *= 0.99;
            
            // Draw particle if still alive
            if (particle.life > 0) {
                this.ctx.save();
                this.ctx.globalAlpha = particle.life;
                this.ctx.fillStyle = '#00ff41';
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = '#00ff41';
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
                return true;
            }
            return false;
        });
        
        // Draw neural connections
        if (this.particles.length > 1) {
            this.ctx.strokeStyle = 'rgba(0, 255, 65, 0.2)';
            this.ctx.lineWidth = 1;
            
            for (let i = 0; i < this.particles.length - 1; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const p1 = this.particles[i];
                    const p2 = this.particles[j];
                    const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
                    
                    if (distance < 150) {
                        this.ctx.save();
                        this.ctx.globalAlpha = Math.min(p1.life, p2.life) * (1 - distance / 150);
                        this.ctx.beginPath();
                        this.ctx.moveTo(p1.x, p1.y);
                        this.ctx.lineTo(p2.x, p2.y);
                        this.ctx.stroke();
                        this.ctx.restore();
                    }
                }
            }
        }
        
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
    
    startDataStreams() {
        const scrollingData = document.getElementById('scrolling-data');
        if (scrollingData) {
            this.updateDataStreams();
            setInterval(() => this.updateDataStreams(), 3000);
        }
    }
    
    updateDataStreams() {
        const scrollingData = document.getElementById('scrolling-data');
        if (!scrollingData) return;
        
        // Generate dynamic data based on activity level
        const activityLevel = Math.max(this.pathwayCount, this.symbiosisLevel / 20);
        const streamCount = Math.min(12 + Math.floor(activityLevel), 20);
        
        let streams = [...this.dataStreams];
        
        // Add dynamic entries based on current activity
        if (this.pathwayCount > 5) {
            streams.push({
                icon: '🔥',
                code: String(Date.now()).slice(-3),
                message: 'HIGH_ACTIVITY_DETECTED',
                detail: `pathway_count_${this.pathwayCount}`,
                color: 'primary'
            });
        }
        
        if (this.symbiosisLevel > 50) {
            streams.push({
                icon: '🌟',
                code: String(Date.now()).slice(-3),
                message: 'SYMBIOSIS_THRESHOLD_REACHED',
                detail: `level_${Math.round(this.symbiosisLevel)}%`,
                color: 'accent'
            });
        }
        
        // Shuffle and take the desired count
        const shuffled = streams.sort(() => Math.random() - 0.5).slice(0, streamCount);
        
        scrollingData.innerHTML = shuffled.map(stream => 
            `<div class="data-entry ${stream.color}">${stream.icon} [${stream.code}] ${stream.message}: ${stream.detail}</div>`
        ).join('');
    }
    
    startSystemLogs() {
        this.updateTimestamp();
        setInterval(() => this.updateTimestamp(), 1000);
        setInterval(() => this.addSystemLog(), 3000);
    }
    
    updateTimestamp() {
        const timestampEl = document.querySelector('[data-testid="timestamp"]');
        if (timestampEl) {
            timestampEl.textContent = new Date().toLocaleTimeString();
        }
    }
    
    addSystemLog() {
        const logOutput = document.getElementById('log-output');
        if (logOutput) {
            const logs = Array.from(logOutput.children);
            const newLog = document.createElement('div');
            newLog.textContent = `[${Date.now()}] Neural_Activity: ${this.pathwayCount} pathways active`;
            
            logOutput.appendChild(newLog);
            
            // Keep only last 3 logs
            if (logs.length >= 3) {
                logOutput.removeChild(logs[0]);
            }
        }
    }
    
    updateSystemStatus() {
        const systemStatus = document.querySelector('[data-testid="system-status"]');
        const operationalMode = document.querySelector('[data-testid="operational-mode"]');
        
        const statuses = [
            'SCANNING FOR DIGITAL CRUMBS...',
            'ANALYZING BEHAVIORAL PATTERNS...',
            'MAPPING NEURAL PATHWAYS...',
            'DETECTING CYBERNETIC SIGNATURES...',
            'MONITORING BIOMETRIC ANOMALIES...'
        ];
        
        const modes = ['ASSEMBLING', 'ANALYZING', 'PROCESSING', 'MONITORING'];
        
        if (systemStatus) {
            setInterval(() => {
                systemStatus.textContent = statuses[Math.floor(Math.random() * statuses.length)];
            }, 5000);
        }
        
        if (operationalMode) {
            setInterval(() => {
                operationalMode.textContent = modes[Math.floor(Math.random() * modes.length)];
            }, 5000);
        }
    }
}

// Initialize the laboratory when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MachineTouchedLaboratory();
});
