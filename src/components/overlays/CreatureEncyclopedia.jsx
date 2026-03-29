import { motion, AnimatePresence } from 'framer-motion';
import { useOcean, CREATURES_DATA } from '../../context/OceanContext';

const CreatureEncyclopedia = () => {
  const { activeCreature, setActiveCreature } = useOcean();

  const creature = activeCreature ? CREATURES_DATA[activeCreature] : null;

  return (
    <AnimatePresence>
      {creature && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCreature(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(5px)',
              zIndex: 10000,
            }}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0, bottom: 0, right: 0,
              width: '100%',
              maxWidth: '480px',
              background: 'linear-gradient(135deg, rgba(5,10,20,0.95), rgba(2,4,8,0.98))',
              borderLeft: `1px solid ${creature.color}44`,
              boxShadow: `-10px 0 50px rgba(0,0,0,0.5)`,
              zIndex: 10001,
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              overflowY: 'auto',
            }}
          >
            <button
              onClick={() => setActiveCreature(null)}
              style={{
                alignSelf: 'flex-end',
                background: 'none', border: 'none',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '1.5rem', cursor: 'pointer',
              }}
            >
              ✕
            </button>

            <div style={{
              fontSize: '8rem',
              lineHeight: 1,
              textAlign: 'center',
              filter: `drop-shadow(0 0 40px ${creature.color}88)`,
              animation: 'floatUp 4s ease-in-out infinite',
              marginTop: '20px',
            }}>
              {creature.emoji}
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.65rem',
                color: 'rgba(122,179,200,0.7)',
                letterSpacing: '0.15em',
                marginBottom: '8px',
                textTransform: 'uppercase',
              }}>
                {creature.scientific}
              </div>
              <h2 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '3rem',
                color: creature.color,
                textShadow: `0 0 20px ${creature.color}66`,
                lineHeight: 1.1,
              }}>
                {creature.name}
              </h2>
            </div>

            <div style={{
              display: 'flex', gap: '16px', marginTop: '16px',
              paddingBottom: '24px', borderBottom: `1px solid ${creature.color}22`
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Space Mono', fontSize: '0.55rem', color: 'rgba(122,179,200,0.5)', letterSpacing: '0.1em' }}>HABITAT (DEPTH)</div>
                <div style={{ fontFamily: 'Space Mono', fontSize: '1rem', color: '#e8f4f8' }}>{creature.depth}</div>
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'Space Mono', fontSize: '0.65rem', color: creature.color, letterSpacing: '0.1em', marginBottom: '8px' }}>SURVIVAL ADAPTATIONS</div>
              <p style={{ fontFamily: 'DM Sans', fontSize: '1rem', color: '#e8f4f8', lineHeight: 1.6, fontWeight: 300 }}>
                {creature.adaptations}
              </p>
            </div>

            <div>
              <div style={{ fontFamily: 'Space Mono', fontSize: '0.65rem', color: creature.color, letterSpacing: '0.1em', marginBottom: '8px' }}>ENCOUNTER LOG</div>
              <p style={{ fontFamily: 'DM Sans', fontSize: '1rem', color: '#a8d4e0', lineHeight: 1.6, fontWeight: 300, fontStyle: 'italic' }}>
                "{creature.fact}"
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreatureEncyclopedia;
