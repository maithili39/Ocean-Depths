import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EchoSounder = () => {
  const [pings, setPings] = useState([]);

  useEffect(() => {
    let pingId = 0;
    const handleClick = (e) => {
      // Don't ping if clicking a button/link
      if (e.target.closest('button, a, input, [role="button"]')) return;
      
      const newPing = { id: pingId++, x: e.clientX, y: e.clientY };
      setPings(p => [...p, newPing]);
      
      // Remove ping after animation
      setTimeout(() => {
        setPings(p => p.filter(ping => ping.id !== newPing.id));
      }, 2000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 900, pointerEvents: 'none' }}>
      <AnimatePresence>
        {pings.map(ping => (
          <motion.div
            key={ping.id}
            initial={{ scale: 0, opacity: 0.8, borderWidth: '10px' }}
            animate={{ scale: 12, opacity: 0, borderWidth: '0px' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: ping.y,
              left: ping.x,
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              borderStyle: 'solid',
              borderColor: '#0ff5c8',
              boxShadow: 'inset 0 0 10px #0ff5c8, 0 0 20px rgba(15,245,200,0.5)',
              transformOrigin: 'center center',
              marginLeft: '-50px',
              marginTop: '-50px',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default EchoSounder;
