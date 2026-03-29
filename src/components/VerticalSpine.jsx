import { useOcean, ZONES } from '../context/OceanContext';
import { motion } from 'framer-motion';

const VerticalSpine = () => {
  const { currentDepth } = useOcean();
  const MAX_DEPTH = 11034;

  const getActiveZoneColor = () => {
    let current = ZONES[0];
    for (const z of ZONES) {
      if (currentDepth >= z.depth) current = z;
    }
    return current.color;
  };

  const activeColor = getActiveZoneColor();

  return (
    <div style={{
      position: 'fixed',
      left: '40px',
      top: '0',
      bottom: '0',
      width: '1px',
      background: 'rgba(255,255,255,0.05)',
      zIndex: 500,
      pointerEvents: 'none',
      display: 'none', // Block display on mobile
    }}>
      <style>{`
        @media (min-width: 1024px) {
          #vertical-spine { display: block !important; }
        }
      `}</style>
      <div id="vertical-spine" style={{ display: 'none', width: '100%', height: '100%', position: 'relative' }}>
        {/* The glowing progress line */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0, left: 0, width: '1px',
            background: `linear-gradient(to bottom, #00e5ff, ${activeColor})`,
            boxShadow: `0 0 10px ${activeColor}`,
          }}
          animate={{ height: `${(currentDepth / MAX_DEPTH) * 100}%` }}
          transition={{ duration: 0.1 }}
        />
        
        {/* The travel dot */}
        <motion.div
          style={{
            position: 'absolute',
            left: '-3px',
            width: '7px', height: '7px',
            borderRadius: '50%',
            background: activeColor,
            boxShadow: `0 0 15px ${activeColor}, 0 0 30px ${activeColor}`,
          }}
          animate={{ top: `calc(${(currentDepth / MAX_DEPTH) * 100}% - 3px)` }}
          transition={{ duration: 0.1 }}
        />

        {/* Labels branching off */}
        {ZONES.map((z, i) => {
          const isActive = currentDepth >= z.depth && (i === ZONES.length - 1 || currentDepth < ZONES[i+1].depth);
          return (
            <div
              key={z.id}
              style={{
                position: 'absolute',
                top: `${(z.depth / MAX_DEPTH) * 100}%`,
                left: '12px',
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.6rem',
                color: isActive ? z.color : 'rgba(255,255,255,0.2)',
                textShadow: isActive ? `0 0 10px ${z.color}88` : 'none',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                transform: 'translateY(-50%)',
                whiteSpace: 'nowrap',
                transition: 'color 0.4s, text-shadow 0.4s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div style={{
                width: isActive ? '12px' : '6px',
                height: '1px',
                background: isActive ? z.color : 'rgba(255,255,255,0.2)',
                transition: 'width 0.4s, background 0.4s',
              }}/>
              <span style={{ transform: 'rotate(90deg)', transformOrigin: 'left center', marginLeft: '10px' }}>
                {z.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerticalSpine;
