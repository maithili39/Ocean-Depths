import { useEffect, useState, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useOcean, ZONES } from '../context/OceanContext';

const MAX_DEPTH = 11034;

const SubmarineHUD = () => {
  const { scrollYProgress, setCurrentDepth } = useOcean(); // Wait, useOcean doesn't have scrollYProgress. It has setCurrentDepth.
  const { scrollYProgress: framerScroll } = useScroll();
  const [depth, setDepth] = useState(0);
  const [zone, setZone]   = useState(ZONES[0]);
  
  // State for WASD mini-sub
  const [subPos, setSubPos] = useState({ x: 0, y: 0 });
  const subContainerRef = useRef(null);

  useEffect(() => {
    return framerScroll.on('change', v => {
      // Small math curve to make the early zones scroll slower and abyss faster
      // Let's keep it linear for now to match exactly 0-11034
      const d = Math.round(v * MAX_DEPTH);
      setDepth(d);
      
      let current = ZONES[0];
      for (const z of ZONES) {
        if (d >= z.depth) current = z;
      }
      setZone(current);
      // Wait, OceanContext doesn't expose framerScroll, so we handle it here and push depth to context
      // Note: React state warning if updating context inside render curve.
      // Easiest is to let context know the depth via an effect.
      const ev = new CustomEvent('ocean-depth-change', { detail: { d, current } });
      window.dispatchEvent(ev);
    });
  }, [framerScroll]);

  const atm = Math.round(1 + (depth / 10)); // 1 atm per 10m
  const temp = Math.max(2, Math.round(20 - (depth / 300))); // Rough estimate

  // Mini-sub WASD logic
  useEffect(() => {
    const handleKey = (e) => {
      const step = 8;
      setSubPos(prev => {
        let { x, y } = prev;
        if (e.key === 'w' || e.key === 'ArrowUp') y -= step;
        if (e.key === 's' || e.key === 'ArrowDown') y += step;
        if (e.key === 'a' || e.key === 'ArrowLeft') x -= step;
        if (e.key === 'd' || e.key === 'ArrowRight') x += step;
        
        // Clamp to parent container loosely
        x = Math.max(-100, Math.min(100, x));
        y = Math.max(-150, Math.min(150, y));
        return { x, y };
      });
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      {/* ── TOP RIGHT HUD ── */}
      <div style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '12px',
        pointerEvents: 'none',
      }}>
        {/* Sonar Sweep */}
        <div style={{
          width: '60px', height: '60px',
          borderRadius: '50%',
          border: '1px solid rgba(0,229,255,0.3)',
          position: 'relative',
          overflow: 'hidden',
          background: 'rgba(2,8,16,0.6)',
          backdropFilter: 'blur(4px)',
          boxShadow: '0 0 15px rgba(0,0,0,0.5)',
        }}>
          {/* Sweep line */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              top: 0, left: '30px',
              width: '30px', height: '30px',
              background: 'conic-gradient(from 0deg, rgba(0,229,255,0.8), transparent 60deg)',
              transformOrigin: 'bottom left',
            }}
          />
          <div style={{ position: 'absolute', inset: '5px', border: '1px dashed rgba(0,229,255,0.1)', borderRadius: '50%' }}/>
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: '4px', height: '4px', background: '#0ff5c8', borderRadius: '50%', transform: 'translate(-50%,-50%)', boxShadow: '0 0 8px #0ff5c8' }}/>
        </div>

        {/* Digital Readouts */}
        <div style={{
          background: 'rgba(2,8,16,0.7)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(0,229,255,0.2)',
          borderRadius: '8px',
          padding: '12px 16px',
          fontFamily: 'Space Mono, monospace',
          color: zone.color,
          textAlign: 'right',
          textShadow: `0 0 8px ${zone.color}66`,
          transition: 'color 0.5s',
        }}>
          <div style={{ fontSize: '0.65rem', color: 'rgba(122,179,200,0.6)', marginBottom: '4px' }}>TELEMETRY</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{depth.toLocaleString()}m</div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '0.7rem', marginTop: '6px' }}>
            <span>{atm} ATM</span>
            <span>{temp}°C</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT MINI-MAP ── */}
      <div 
        ref={subContainerRef}
        style={{
        position: 'fixed',
        right: '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        height: '400px',
        width: '40px',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 1000,
        pointerEvents: 'none',
      }}>
        {/* Track */}
        <div style={{
          width: '2px',
          height: '100%',
          background: 'rgba(255,255,255,0.1)',
          position: 'relative',
        }}>
          {/* Filled bar */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0, left: 0, width: '100%',
              background: `linear-gradient(to bottom, #00e5ff, ${zone.color})`,
              boxShadow: `0 0 10px ${zone.color}`,
            }}
            animate={{ height: `${(depth / MAX_DEPTH) * 100}%` }}
            transition={{ duration: 0.1 }}
          />

          {/* Submersible Navigator (Interactive) */}
          <motion.div
            animate={{ x: subPos.x, y: subPos.y }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{
              position: 'absolute',
              top: `${(depth / MAX_DEPTH) * 100}%`,
              left: '-14px',
              width: '30px', height: '30px',
              transform: 'translateY(-50%)',
              filter: `drop-shadow(0 0 10px ${zone.color})`,
            }}
          >
            <svg viewBox="0 0 24 24" fill={zone.color} opacity="0.9">
              <path d="M18,12 C18,10.3 16.7,9 15,9 L9,9 C7.3,9 6,10.3 6,12 C6,13.7 7.3,15 9,15 L15,15 C16.7,15 18,13.7 18,12 Z M20,11 L22,11 L22,13 L20,13 L20,11 Z M6,8 L6,6 L10,6 L10,8 L6,8 Z"/>
            </svg>
          </motion.div>
        </div>

        {/* Zone Markers */}
        <div style={{ position: 'absolute', top: 0, left: '-30px', height: '100%' }}>
          {ZONES.map((z, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: `${(z.depth / MAX_DEPTH) * 100}%`,
              right: 0,
              width: '8px', height: '2px',
              background: z.color,
              opacity: 0.6,
            }}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default SubmarineHUD;
