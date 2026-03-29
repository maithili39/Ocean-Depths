import { motion, AnimatePresence } from 'framer-motion';
import { useOcean } from '../../context/OceanContext';

const DeepSeaMap = () => {
  const { showMap, setShowMap } = useOcean();

  return (
    <AnimatePresence>
      {showMap && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           style={{
             position: 'fixed', inset: 0, zIndex: 10000,
             background: 'rgba(0,0,0,0.95)',
             display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
           }}
        >
          {/* Header */}
          <div style={{ position: 'absolute', top: '40px', width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 40px', zIndex: 10 }}>
            <h2 style={{ fontFamily: 'Space Mono', color: '#0ff5c8', fontSize: '1rem', letterSpacing: '0.2em' }}>
              GEOGRAPHIC PLOT // DRAG TO EXPLORE
            </h2>
            <button 
              onClick={() => setShowMap(false)}
              style={{ background: 'none', border: 'none', color: '#00e5ff', cursor: 'pointer', fontSize: '1.5rem' }}
            >
              ✕
            </button>
          </div>

          {/* Map Container */}
          <div style={{
            width: '80vw', height: '70vh',
            border: '1px solid rgba(0,229,255,0.3)',
            borderRadius: '16px',
            overflow: 'hidden',
            position: 'relative',
            background: '#01050a',
            cursor: 'grab',
            boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)'
          }}>
            <motion.div
              drag
              dragConstraints={{ top: -600, left: -800, right: 300, bottom: 300 }}
              style={{
                width: '200vw', height: '200vh',
                background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.05) 0%, transparent 80%)',
                position: 'relative',
              }}
            >
              {/* Scan grid */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'linear-gradient(rgba(0,229,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.05) 1px, transparent 1px)',
                backgroundSize: '100px 100px'
              }}/>

              {/* Map Features Array */}
              {[
                { x: '40%', y: '40%', label: 'MARIANA TRENCH (11,034m)', color: '#ff4444' },
                { x: '60%', y: '30%', label: 'MID-ATLANTIC RIDGE', color: '#00e5ff' },
                { x: '75%', y: '60%', label: 'HYDROTHERMAL VENT FIELD', color: '#0ff5c8' },
                { x: '20%', y: '70%', label: 'TONGA TRENCH (10,800m)', color: '#ff9800' },
              ].map((f, i) => (
                <div key={i} style={{ position: 'absolute', left: f.x, top: f.y, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '8px', height: '8px', background: f.color, borderRadius: '50%', boxShadow: `0 0 15px ${f.color}` }}/>
                  <span style={{ fontFamily: 'Space Mono', fontSize: '0.6rem', color: f.color, letterSpacing: '0.15em' }}>{f.label}</span>
                </div>
              ))}

              {/* Topographic Lines (SVG) */}
              <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }}>
                <path d="M 100 500 Q 500 100 800 600 T 1500 400" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
                <path d="M 200 600 Q 600 200 900 700 T 1600 500" fill="none" stroke="#00e5ff" strokeWidth="1" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeepSeaMap;
