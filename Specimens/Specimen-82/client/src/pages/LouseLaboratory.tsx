import { useEffect, useState } from "react";
import DigitalLouse from "@/components/DigitalLouse";
import WhisperSpells from "@/components/WhisperSpells";
import SpecimenGrid from "@/components/SpecimenGrid";
import AuthPortal from "@/components/AuthPortal";
import RomanticInterface from "@/components/RomanticInterface";
import { useLouseState } from "@/hooks/useLouseState";
import { useQuery } from "@tanstack/react-query";

export default function LouseLaboratory() {
  const { louse, updateLouse, isLoading } = useLouseState();
  const [binaryTraces, setBinaryTraces] = useState<Array<{ id: string; x: number; y: number; binary: string; timestamp: number }>>([]);

  const { data: session } = useQuery({
    queryKey: ["/api/session"]
  });

  const { data: activities } = useQuery({
    queryKey: louse ? ["/api/louse", louse.id, "activities"] : null,
    enabled: !!louse
  });

  // Mouse movement tracking for louse feeding
  useEffect(() => {
    let mouseCrumbs = session?.mouseCrumbs || 847;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseCrumbs++;
      
      // Update session crumbs via API
      fetch("/api/session", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ mouseCrumbs })
      });

      // Create binary trace at mouse position
      createBinaryTrace(e.clientX, e.clientY);
      
      // Occasionally feed the louse
      if (Math.random() < 0.1 && louse) {
        const newHunger = Math.max(0, louse.hunger - 1);
        updateLouse({ hunger: newHunger });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [louse, session, updateLouse]);

  // Input tracking
  useEffect(() => {
    let inputCrumbs = session?.inputCrumbs || 23;
    
    const handleInput = () => {
      inputCrumbs++;
      fetch("/api/session", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ inputCrumbs })
      });
    };

    document.addEventListener("input", handleInput);
    return () => document.removeEventListener("input", handleInput);
  }, [session]);

  // Time-based louse behavior
  useEffect(() => {
    if (!louse) return;
    
    const interval = setInterval(() => {
      // Gradually increase hunger
      const newHunger = Math.min(100, louse.hunger + 1);
      updateLouse({ hunger: newHunger });
      
      // Update time crumbs
      const timeCrumbs = (session?.timeCrumbs || 156) + 1;
      fetch("/api/session", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ timeCrumbs })
      });

      // Log activity
      const activities = [
        'Louse crawled through memory sector 0x7FFF',
        'Digital nutrients absorbed from RAM',
        'Binary trace pattern detected in code segment',
        'Romantic vibrations sent to user interface',
        'Data crumb collected from input buffer'
      ];
      
      const activity = activities[Math.floor(Math.random() * activities.length)];
      
      fetch(`/api/louse/${louse.id}/activities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          activityType: "system_behavior",
          description: activity,
          dataConsumed: { timestamp: Date.now() }
        })
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [louse, session, updateLouse]);

  const createBinaryTrace = (x: number, y: number) => {
    const binary = Math.random() > 0.5 ? '1' : '0';
    const trace = {
      id: Math.random().toString(36).substr(2, 9),
      x,
      y,
      binary,
      timestamp: Date.now()
    };
    
    setBinaryTraces(prev => [...prev, trace]);
    
    // Create trace in backend if louse exists
    if (louse) {
      fetch(`/api/louse/${louse.id}/traces`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          position: { x, y },
          binaryData: binary,
          traceType: "mouse"
        })
      });
    }

    // Remove after animation
    setTimeout(() => {
      setBinaryTraces(prev => prev.filter(t => t.id !== trace.id));
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-barn-wood via-forest-dark to-digital-blue flex items-center justify-center">
        <div className="text-2xl font-mystical text-mystic-gold">
          <code>Loading Digital Laboratory...</code>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-barn-wood via-forest-dark to-digital-blue font-code text-cream">
      
      {/* Hidden data for old school password hiding */}
      <div style={{ display: "none" }}>
        {/*
          BINARY_AUTH_SEQUENCE: 1011
          LOUSE_SPECIMEN_ACCESS: 1
          WHISPER_SPELL_KEYS: ["ambrosia", "silk", "thread", "weave"]
        */}
      </div>

      {/* Main Laboratory Container */}
      <div className="min-h-screen nursery-overlay" style={{ zIndex: 2000000000 }}>
        
        {/* Header Section */}
        <header className="text-center py-8 relative" style={{ zIndex: 3000000000 }}>
          <h1 className="text-6xl font-mystical text-mystic-gold mb-4 spell-text">
            Digital Clothing Louse Laboratory
          </h1>
          <p className="text-xl text-cream mb-2">
            <code>Machine_Touched</code> Specimen Collection - Entity <code>DCL_001</code>
          </p>
          <div className="text-lg text-forest-light">
            <code>System Status: ASSEMBLING</code> | <code>Protocols: IMPLEMENTING</code>
          </div>
        </header>

        {/* Binary Authentication Portal */}
        <AuthPortal />

        {/* Animated Digital Louse */}
        <DigitalLouse louse={louse} />

        {/* Binary Traces Container */}
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 7000000000 }}>
          {binaryTraces.map(trace => (
            <div
              key={trace.id}
              className="fixed text-mystic-gold text-xs binary-trace pointer-events-none"
              style={{
                left: trace.x + 'px',
                top: trace.y + 'px',
                zIndex: 7000000000
              }}
            >
              {trace.binary}
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="container mx-auto px-4 py-8">
          
          {/* Louse Monitoring Dashboard */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            
            {/* Lifecycle Monitor */}
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-mystic-amber/50 romantic-glow">
              <h3 className="text-xl font-mystical text-mystic-gold mb-4">
                <code>Lifecycle Monitor</code>
              </h3>
              {louse && (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span><code>Stage:</code></span>
                    <span className="text-forest-light"><code>{louse.stage}</code></span>
                  </div>
                  <div className="flex justify-between">
                    <span><code>Health:</code></span>
                    <span className="text-mystic-gold"><code>{louse.health}%</code></span>
                  </div>
                  <div className="flex justify-between">
                    <span><code>Hunger:</code></span>
                    <span className="text-digital-light"><code>{louse.hunger}%</code></span>
                  </div>
                  <div className="flex justify-between">
                    <span><code>Reproduction:</code></span>
                    <span className="text-forest-med"><code>{louse.reproductionStatus}</code></span>
                  </div>
                </div>
              )}
              
              {/* Feeding Progress */}
              {louse && (
                <div className="mt-4">
                  <div className="text-sm mb-2"><code>Data Consumption:</code></div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-mystic-amber to-mystic-gold h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${100 - louse.hunger}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Whisper Spell Codex */}
            <WhisperSpells louseId={louse?.id} />

            {/* Digital Crumb Tracker */}
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-digital-blue/50 romantic-glow">
              <h3 className="text-xl font-mystical text-digital-light mb-4">
                <code>Digital Crumb Tracker</code>
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <code>Mouse Movements:</code>
                  <span className="text-mystic-gold">{session?.mouseCrumbs || 847}</span>
                </div>
                <div className="flex justify-between">
                  <code>User Input:</code>
                  <span className="text-forest-light">{session?.inputCrumbs || 23}</span>
                </div>
                <div className="flex justify-between">
                  <code>Time Passages:</code>
                  <span className="text-digital-light">{session?.timeCrumbs || 156}</span>
                </div>
                <div className="flex justify-between">
                  <code>Binary Traces:</code>
                  <span className="text-cream">{session?.binaryCrumbs || 492}</span>
                </div>
              </div>
              
              {/* Recent Activity Log */}
              <div className="mt-4">
                <div className="text-sm mb-2"><code>Recent Activity:</code></div>
                <div className="text-xs text-cream/70 space-y-1 max-h-32 overflow-y-auto">
                  {activities?.slice(0, 5).map((activity, index) => (
                    <div key={activity.id || index}>
                      <code>[{new Date(activity.timestamp).toLocaleTimeString()}]</code> {activity.description}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Specimen Collection Grid */}
          <SpecimenGrid />

          {/* Romantic Interaction Panel */}
          <RomanticInterface louse={louse} />

          {/* System Status Footer */}
          <footer className="mt-8 text-center text-sm text-cream/70">
            <div className="mb-2">
              <code>Machine_Touch(Laboratories): Protocols Implementing</code>
            </div>
            <div>
              <code>Scanning for digital crumbs...</code> | 
              <code>auth_level: {session?.authLevel || 'basic'}</code> | 
              <code>access_granted: {session?.accessGranted ? 'true' : 'false'}</code>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
