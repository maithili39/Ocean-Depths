import { useRef } from 'react';
import { motion, useTransform, useMotionValueEvent } from 'framer-motion';

const DepthGauge = ({ scrollYProgress, accentColor }) => {
  const depthRef = useRef(null);
  const atmRef = useRef(null);
  const tempRef = useRef(null);

  // Directly pipe motion values to the DOM to prevent re-renders
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!depthRef.current) return;
    
    const d = Math.round(v * 11034);
    const atm = Math.round(1 + (d / 10));
    const temp = Math.max(2, Math.round(28 - (d / 200)));

    depthRef.current.textContent = `DEPTH: ${d.toString().padStart(4, '0')}m`;
    atmRef.current.textContent = `PRESSURE: ${atm.toString().padStart(3, '0')} ATM`;
    tempRef.current.textContent = `TEMP: ${temp > 0 ? '+' : ''}${temp}°C`;
  });

  const needleRotation = useTransform(scrollYProgress, [0, 1], [-120, 120]);

  return (
    <div style={{
      position: 'fixed', right: '30px', top: '30px', zIndex: 40,
      display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
      pointerEvents: 'none', opacity: 0.55
    }}>
      {/* SVG Analog Gauge */}
      <div style={{
        width: '74px', height: '74px', borderRadius: '50%',
        background: 'rgba(10,10,13,0.4)', border: '1.5px solid rgba(34,37,42,0.5)',
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3), 0 5px 15px rgba(0,0,0,0.2)',
        position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <svg width="60" height="60" viewBox="0 0 60 60" style={{ position: 'absolute' }}>
           {[...Array(13)].map((_, i) => (
             <line 
               key={i} x1="30" y1="4" x2="30" y2="8" stroke="rgba(255,255,255,0.15)" strokeWidth="1"
               transform={`rotate(${i * 20 - 120} 30 30)`}
             />
           ))}
        </svg>

        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(68,76,85,0.5)', zIndex: 10, boxShadow: '0 0 4px rgba(0,0,0,0.3)' }}/>
        
        {/* Needle Transform - Hardware Accelerated */}
        <motion.div
           style={{
             position: 'absolute', inset: 0,
             rotate: needleRotation,
             willChange: 'transform'
           }}
        >
           <motion.div style={{
             position: 'absolute', top: '10px', left: 'calc(50% - 1px)',
             width: '2px', height: '24px', backgroundColor: accentColor,
             boxShadow: `0 0 4px var(--accent-current-zone)`,
             opacity: 0.6
           }}/>
        </motion.div>
      </div>

      <div className="crt-flicker" style={{
        marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
        gap: '4px'
      }}>
        <div ref={depthRef} className="mono-reading" style={{ opacity: 0.5, fontSize: '0.75rem' }}>DEPTH: 0000m</div>
        <div ref={atmRef} className="mono-reading" style={{ opacity: 0.4, fontSize: '0.75rem' }}>PRESSURE: 001 ATM</div>
        <div ref={tempRef} className="mono-reading" style={{ opacity: 0.4, fontSize: '0.75rem' }}>TEMP: +28°C</div>
      </div>
    </div>
  );
};

export default DepthGauge;
