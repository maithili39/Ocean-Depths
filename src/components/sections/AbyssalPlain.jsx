import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import PressureSlider from '../PressureSlider';
import { useOcean } from '../../context/OceanContext';

const SedimentDrift = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }} className="non-glowing">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: '-10vh', x: `${Math.random()*100}vw`, opacity: 0 }}
          animate={{ y: '110vh', x: `calc(${Math.random()*100}vw + ${Math.random()*200 - 100}px)`, opacity: [0, 0.8, 0] }}
          transition={{ duration: 15 + Math.random()*20, repeat: Infinity, delay: Math.random()*10, ease: 'linear' }}
          style={{
            position: 'absolute',
            width: `${Math.random()*3 + 1}px`, height: `${Math.random()*3 + 1}px`,
            background: 'rgba(255,255,255,0.4)', borderRadius: '50%',
            filter: 'blur(1px)'
          }}
        />
      ))}
    </div>
  );
};

const GiantSquidSilhouette = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yPos = useTransform(scrollYProgress, [0, 1], ['500px', '-300px']); // Parallax up as user scrolls down
  const { setActiveCreature } = useOcean();

  return (
    <motion.div
      ref={ref}
      style={{
        position: 'absolute', right: '-10%', width: '40vw', y: yPos,
        opacity: 0.15, zIndex: 0, cursor: 'pointer', filter: 'blur(3px)'
      }}
      onClick={() => setActiveCreature('giantsquid')}
      className="non-glowing"
    >
      <svg viewBox="0 0 400 600" fill="#00e5ff">
        {/* Mantle */}
        <path d="M 200 50 C 150 150 120 250 150 350 L 200 400 L 250 350 C 280 250 250 150 200 50 Z" />
        {/* Arms/Tentacles */}
        {[10,30,50,-10,-30,-50].map((offset, i) => (
           <path key={i} d={`M ${200+offset} 380 Q ${200+(offset*2)} 500 ${200+(offset*3)} 600`} stroke="#00e5ff" strokeWidth="15" fill="none"/>
        ))}
      </svg>
    </motion.div>
  );
};

const facts = [
  { stat: '60%', label: 'of Earth\'s Surface', detail: 'The abyssal plain is a vast underwater desert.' },
  { stat: '400', label: 'Atmospheres', detail: 'Crushing pressure equivalent to a jumbo jet on your chest.' },
  { stat: '0°C', label: 'Temperature', detail: 'Water hovers just above freezing.' },
  { stat: 'Marine', label: 'Snow', detail: 'Sediment of dead organisms slowly drifts down for months.' }
];

const AbyssalPlain = () => {
  return (
    <section
      id="abyssal"
      className="pressure-vignette scanlines"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #010408 0%, #010204 50%, #000102 100%)',
        padding: 'clamp(80px,12vh,140px) clamp(20px,6vw,80px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        position: 'relative', overflow: 'hidden', gap: '60px'
      }}
    >
      <div style={{ position: 'absolute', top: '20px', left: '20px', fontFamily: 'Space Mono', fontSize: '0.6rem', color: '#ff9800', zIndex: 10 }}>
        // 4000-6000m: ABYSSOPELAGIC ZONE
      </div>

      <SedimentDrift />
      <GiantSquidSilhouette />

      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ textAlign: 'center', zIndex: 2 }}>
        <h2 className="glitch" data-text="ABYSSOPELAGIC" style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#ff9800', letterSpacing: '0.05em', marginBottom: '16px' }}>
          ABYSSOPELAGIC
        </h2>
        <p style={{ fontFamily: 'DM Sans', fontSize: '1.1rem', color: 'rgba(232,244,248,0.5)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.75, fontWeight: 300 }}>
          Flat. Silent. Immense. The abyssal plain covers over half of Earth's surface. A desert of sediment kilometres deep — and almost entirely unknown.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ zIndex: 2, width: '100%', maxWidth: '520px' }}>
        <PressureSlider />
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', width: '100%', maxWidth: '880px', zIndex: 2 }}>
        {facts.map((f, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }} style={{ background: 'rgba(5,10,20,0.7)', border: '1px solid rgba(255,152,0,0.15)', borderRadius: '14px', padding: '28px 24px', backdropFilter: 'blur(10px)' }}>
            <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '3rem', fontWeight: 700, color: '#ff9800', marginBottom: '6px' }}>{f.stat}</div>
            <div style={{ fontFamily: 'Space Mono', fontSize: '0.65rem', color: 'rgba(255,152,0,0.6)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>{f.label}</div>
            <p style={{ fontFamily: 'DM Sans', fontSize: '0.9rem', color: 'rgba(232,244,248,0.6)', lineHeight: 1.65 }}>{f.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AbyssalPlain;
