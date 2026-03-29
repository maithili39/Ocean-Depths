import { useState, useEffect } from 'react';

const InstrumentOverlay = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key.toLowerCase() === 'i') setActive(prev => !prev);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  if (!active) return null;

  return (
    <>
      {/* 
        This is pure CSS magic requested by the user.
        A fixed overlay that applies a hardware-accelerated backdrop-filter.
        It converts the entire React vDOM underneath into a green Soviet CRT monitor
        without re-rendering a single component.
      */}
      <div 
        style={{
          position: 'fixed', inset: 0, zIndex: 99999, pointerEvents: 'none',
          backdropFilter: 'contrast(1.2) brightness(0.8)',
          opacity: 0.95
        }}
      />
      
      {/* Scanline additive overlay */}
      <div 
        style={{
          position: 'fixed', inset: 0, zIndex: 100000, pointerEvents: 'none',
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.02))',
          backgroundSize: '100% 2px, 3px 100%',
          opacity: 0.2,
          mixBlendMode: 'overlay'
        }}
      />

      {/* Dynamic Glow / Bleed based on Section Accent */}
      <div 
        style={{
          position: 'fixed', inset: 0, zIndex: 100001, pointerEvents: 'none',
          boxShadow: 'inset 0 0 100px var(--accent-current-zone)',
          opacity: 0.15,
          background: 'radial-gradient(circle, transparent 70%, rgba(0,0,0,0.4) 110%)'
        }}
      />
 
      <div style={{
          position: 'fixed', top: '20px', left: '20px', zIndex: 100002, pointerEvents: 'none',
          color: 'var(--accent-current-zone)', fontFamily: 'Share Tech Mono', fontSize: '10px',
          textShadow: '0 0 5px var(--accent-current-zone)', width: '220px', lineHeight: '1.4', borderLeft: '1px solid var(--accent-current-zone)', paddingLeft: '15px'
        }}
      >
        <div style={{ animation: 'blink 0.2s 5', fontWeight: 'bold' }}>INSTRUMENT PANEL V2.04 [CONNECTED]</div>
        <div style={{ opacity: 0.7 }}>TELEMETRY STREAM: NOMINAL</div>
        <div style={{ opacity: 0.7 }}>SURFACE COMMS: STANDBY</div>
        <div style={{ opacity: 0.7 }}>HULL INTEGRITY: 100%</div>
        <div style={{ marginTop: '15px' }}>SECTION DATA SYNCED...</div>
        <div style={{ marginTop: '5px', fontSize: '14px', letterSpacing: '2px' }}>████████░░ 78%</div>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </>
  );
};

export default InstrumentOverlay;
