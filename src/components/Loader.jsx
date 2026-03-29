import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  'INITIATING DESCENT SEQUENCE...',
  'DEPTH: 0m',
  'PRESSURE: 1 ATM',
  'STATUS: READY'
];

const Loader = ({ onComplete }) => {
  const [lineDone, setLineDone] = useState(false);
  const [msgIdx, setMsgIdx] = useState(-1);

  useEffect(() => {
    const t = setTimeout(() => setLineDone(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!lineDone) return;
    const deltas = [1000, 2200, 3400, 4600]; 
    const timeouts = deltas.map((delay, i) => setTimeout(() => setMsgIdx(i), delay));
    const finish = setTimeout(() => { onComplete(); }, 6000);
    return () => { timeouts.forEach(clearTimeout); clearTimeout(finish); };
  }, [lineDone, onComplete]);

  return (
    <div style={{
      width: '100vw', height: '100vh', background: '#000000', 
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{ position: 'relative', width: '300px', height: '1px', marginBottom: '24px' }}>
        <svg width="300" height="1">
          <motion.line
            x1="0" y1="0.5" x2="300" y2="0.5"
            stroke="#ffffff" strokeWidth="1"
            initial={{ strokeDasharray: 300, strokeDashoffset: 300 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <AnimatePresence>
          {lineDone && (
            <motion.div
               initial={{ opacity: 0.8, scale: 0 }}
               animate={{ opacity: 0, scale: 40 }}
               transition={{ duration: 1, ease: 'easeOut' }}
               style={{
                 position: 'absolute', right: 0, top: 'calc(50% - 1px)',
                 width: '2px', height: '2px', borderRadius: '50%',
                 background: '#ffffff', boxShadow: '0 0 10px #fff'
               }}
            />
          )}
        </AnimatePresence>
      </div>

      <div style={{ width: '300px', textAlign: 'left', minHeight: '80px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {messages.map((ms, i) => (
          <div key={i} style={{ height: '14px', position: 'relative', overflow: 'hidden' }}>
            {msgIdx >= i && (
               <div style={{
                 fontFamily: 'Share Tech Mono, monospace', fontSize: '10px',
                 color: '#ffffff', letterSpacing: '0.15em',
                 whiteSpace: 'nowrap', overflow: 'hidden',
                 animation: 'typewriter 1s steps(40, end) forwards'
               }}>
                 {ms}
               </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
