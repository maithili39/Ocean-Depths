import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ZoneTransitionCard = () => {
  const [transition, setTransition] = useState(null); // { name, depth, color }

  useEffect(() => {
    let lastZ = null;
    const handler = (e) => {
      const { current } = e.detail;
      if (lastZ && lastZ.id !== current.id && current.depth > 0) {
        // We crossed a boundary going down (mostly just care about triggering on change)
        setTransition(current);
        setTimeout(() => setTransition(null), 1800); // Hide after 1.8s
      }
      lastZ = current;
    };
    window.addEventListener('ocean-depth-change', handler);
    return () => window.removeEventListener('ocean-depth-change', handler);
  }, []);

  return (
    <AnimatePresence>
      {transition && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9990,
            background: 'rgba(2,8,16,0.85)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.9rem',
            color: transition.color,
            letterSpacing: '0.3em',
            marginBottom: '16px',
            textTransform: 'uppercase',
          }}>
            ENTERING
          </div>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '5rem',
            fontWeight: 700,
            color: '#fff',
            textShadow: `0 0 40px ${transition.color}88`,
            letterSpacing: '-0.02em',
          }}>
            {transition.name}
          </h2>
          <div style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.7)',
            marginTop: '20px',
          }}>
            <span style={{ color: transition.color }}>{transition.depth.toLocaleString()}m</span> BELOW SEA LEVEL
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ZoneTransitionCard;
