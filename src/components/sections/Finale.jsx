import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BurstOverlay = ({ onDone }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
      style={{ position: 'fixed', inset: 0, zIndex: 9950, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.85)', cursor: 'pointer' }}
      onClick={onDone}
    >
      <motion.div
        initial={{ scale: 0, opacity: 1 }} animate={{ scale: 10, opacity: 0 }} transition={{ duration: 1, ease: 'easeOut' }}
        style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle, #0ff5c8 0%, rgba(0,229,255,0.3) 50%, transparent 70%)' }}
      />
      {[...Array(60)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: Math.cos((i/60)*360 * Math.PI/180) * (100+Math.random()*200), y: Math.sin((i/60)*360 * Math.PI/180) * (100+Math.random()*200), opacity: 0, scale: 0 }}
          transition={{ duration: 0.8 + Math.random(), ease: 'easeOut' }}
          style={{ position: 'absolute', width: '8px', height: '8px', borderRadius: '50%', background: i%2===0 ? '#0ff5c8' : '#00e5ff', boxShadow: '0 0 10px #0ff5c8' }}
        />
      ))}
    </motion.div>
  );
};

const PlasticBag = () => (
  <motion.div
    initial={{ y: 0 }} animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    style={{ position: 'absolute', bottom: '10%', left: '10%', opacity: 0.4, filter: 'blur(1px)' }}
    className="non-glowing"
  >
    <svg width="60" height="80" viewBox="0 0 60 80" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" strokeWidth="1">
      <path d="M10,80 L50,80 L55,20 L40,0 L30,10 L20,0 L5,20 Z" />
    </svg>
    <div style={{ fontFamily: 'Space Mono', fontSize: '0.4rem', color: 'rgba(255,255,255,0.5)', position: 'absolute', top: '-15px', whiteSpace: 'nowrap' }}>
      // ANTHROPOCENE DETECTED
    </div>
  </motion.div>
);

const Finale = () => {
  const [burst, setBurst] = useState(false);

  return (
    <section
      id="finale"
      style={{
        minHeight: '100vh',
        background: '#000000',
        padding: 'clamp(80px,12vh,140px) clamp(20px,6vw,80px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden', gap: '40px'
      }}
    >
      <div style={{ position: 'absolute', top: '20px', left: '20px', fontFamily: 'Space Mono', fontSize: '0.6rem', color: '#ff0000', zIndex: 10 }}>
        // 11,034m: MARIANA TRENCH FLOOR
      </div>

      <PlasticBag />

      <AnimatePresence>
        {burst && <BurstOverlay onDone={() => setBurst(false)} />}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }} style={{ zIndex: 2, textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(2rem, 5.5vw, 4rem)', fontWeight: 600, color: '#e8f4f8', letterSpacing: '-0.01em', marginBottom: '30px' }}>
          You've reached the bottom of the world.
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', margin: '0 auto', textAlign: 'left', borderLeft: '2px solid #ff4444', paddingLeft: '20px' }}>
          <p style={{ fontFamily: 'DM Sans', fontSize: '1rem', color: 'rgba(232,244,248,0.65)' }}>Only 3 people have descended to the Challenger Deep.</p>
          <p style={{ fontFamily: 'DM Sans', fontSize: '1rem', color: 'rgba(232,244,248,0.65)' }}>More humans have walked on the moon.</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.5 }} style={{ zIndex: 2, textAlign: 'center', marginTop: '40px' }}>
        <button
          onClick={() => setBurst(true)}
          style={{ width: '110px', height: '110px', borderRadius: '50%', border: '2px solid rgba(15,245,200,0.5)', background: 'radial-gradient(circle at 35% 35%, rgba(15,245,200,0.3), rgba(0,229,255,0.08) 60%, transparent)', cursor: 'pointer', animation: 'orbPulse 3s ease-in-out infinite', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'radial-gradient(circle, #0ff5c8, rgba(0,229,255,0.4) 60%, transparent)', boxShadow: '0 0 20px #0ff5c8, 0 0 50px rgba(15,245,200,0.3)' }}/>
        </button>
        <p style={{ fontFamily: 'Space Mono', fontSize: '0.55rem', color: 'rgba(15,245,200,0.6)', marginTop: '20px', letterSpacing: '0.2em' }}>CLICK TO DETONATE BIOLUMINESCENCE</p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ marginTop: '60px', background: 'transparent', border: '1px solid rgba(0,229,255,0.3)', color: '#00e5ff', fontFamily: 'Space Mono', fontSize: '0.7rem', letterSpacing: '0.2em', padding: '14px 32px', borderRadius: '40px', cursor: 'pointer', transition: 'all 0.3s' }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,229,255,0.1)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,229,255,0.2)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
      >
        ↑ RESURFACE
      </motion.button>
    </section>
  );
};

export default Finale;
