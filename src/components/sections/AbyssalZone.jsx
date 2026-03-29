import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const PureCssMarineSnow = () => {
  const particles = Array.from({ length: 60 }, (_, i) => (
    <div
      key={i}
      style={{
        width: `${1 + (i % 3)}px`, height: `${1 + (i % 3)}px`,
        borderRadius: '50%', background: i % 3 === 0 ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)',
        left: `${(i * 13) % 100}vw`, animation: `floatDown ${10 + (i % 15)}s ${(i * 0.3) % 5}s infinite linear`,
        willChange: 'transform, opacity'
      }}
    />
  ));
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {particles}
      <style>{`
        @keyframes floatDown { 0% { transform: translateY(-5vh) translateX(0); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 0.8; } 100% { transform: translateY(110vh) translateX(30px); opacity: 0; } }
      `}</style>
    </div>
  );
};

// 1. Geological / Human Timeline
const GeologicalTimeline = () => {
  const [scale, setScale] = useState('geological');
  
  const geoEvents = [
    { year: '3.8 BYA', name: 'First Life', desc: 'Hydrothermal vents spark the first cells.' },
    { year: '540 MYA', name: 'Cambrian Explosion', desc: 'The ocean fills with complex life and hard shells.' },
    { year: '252 MYA', name: 'The Great Dying', desc: '96% of all ocean species go extinct globally.' },
    { year: '66 MYA', name: 'Asteroid Impact', desc: 'K-Pg extinction. Acidification reorganizes the food web.' },
    { year: '200 KYA', name: 'Homo Sapiens', desc: 'Humans appear. A microscopic sliver of Earth time.' },
    { year: 'TODAY', name: 'The Anthropocene', desc: 'Microplastics detected in 100% of abyssal samples.' }
  ];

  const humanEvents = [
    { year: '1858', name: 'First Cable', desc: 'The first Transatlantic telegraph cable is laid across the abyssal plain.' },
    { year: '1872', name: 'HMS Challenger', desc: 'First global marine research expedition. Discovers 4,700 new species.' },
    { year: '1960', name: 'Trieste', desc: 'Piccard and Walsh reach the bottom of Challenger Deep (10,911m).' },
    { year: '2012', name: 'Deepsea Challenger', desc: 'James Cameron completes the first solo dive to the trench floor.' },
    { year: '2020', name: 'Abyssal Mining', desc: 'Controversy begins over mineral extraction from polymetallic nodules.' },
    { year: '2024', name: 'Current Mission', desc: 'Modern autonomous landers continue to map the 95% unknown.' }
  ];

  const events = scale === 'geological' ? geoEvents : humanEvents;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.7 }}
      style={{ margin: '80px 0', padding: '60px 0', position: 'relative' }}
    >
      {/* Gradient line background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent 0%, var(--accent-abyssal) 50%, transparent 100%)', opacity: 0.5 }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
        <motion.h3 
          key={scale}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          className="mono-reading" 
          style={{ color: 'var(--accent-abyssal)', margin: 0, fontSize: '1.3rem', letterSpacing: '0.2em' }}
        >
          {scale.toUpperCase()} TIMELINE
        </motion.h3>
        <div style={{ display: 'flex', gap: '15px' }}>
           <motion.button 
             whileHover={{ scale: 1.05 }}
             onClick={() => setScale('human')}
             style={{ background: scale === 'human' ? 'var(--accent-abyssal)' : 'transparent', color: scale === 'human' ? '#000' : '#fff', border: '1px solid var(--accent-abyssal)', padding: '8px 20px', borderRadius: '3px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', transition: 'all 0.3s' }}
           >HUMAN</motion.button>
           <motion.button 
             whileHover={{ scale: 1.05 }}
             onClick={() => setScale('geological')}
             style={{ background: scale === 'geological' ? 'var(--accent-abyssal)' : 'transparent', color: scale === 'geological' ? '#000' : '#fff', border: '1px solid var(--accent-abyssal)', padding: '8px 20px', borderRadius: '3px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', transition: 'all 0.3s' }}
           >GEOLOGIC</motion.button>
        </div>
      </div>

      <motion.div 
        key={scale}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="glass-panel"
        style={{ overflowX: 'auto', paddingBottom: '2rem' }}
      >
        <div style={{ display: 'flex', width: '2000px', position: 'relative', minHeight: '200px', gap: '40px' }}>
           <div style={{ position: 'absolute', top: '30px', left: 0, width: '100%', height: '1px', background: 'var(--accent-abyssal)', opacity: 0.2 }}/>
           {events.map((ev, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{ flex: '0 0 220px', position: 'relative', paddingTop: '60px' }}
              >
                <motion.div 
                  whileHover={{ scale: 1.2 }}
                  style={{ position: 'absolute', top: '24px', left: '0px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-abyssal)', boxShadow: `0 0 15px var(--accent-abyssal)` }}
                />
                <div>
                  <div className="mono-reading" style={{ fontSize: '1rem', color: '#fff', marginBottom: '10px' }}>{ev.year}</div>
                  <div className="editorial-title" style={{ fontSize: '1.25rem', color: 'var(--accent-abyssal)', marginBottom: '15px' }}>{ev.name}</div>
                  <p className="body-narrow" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{ev.desc}</p>
                </div>
              </motion.div>
           ))}
        </div>
      </motion.div>
      
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent 0%, var(--accent-abyssal) 50%, transparent 100%)', opacity: 0.5 }} />
    </motion.div>
  );
};

// 2. Marine Snow Calculator
const SinkCalculator = () => {
  const [active, setActive] = useState(null);
  
  const items = [
    { title: 'WHALE CARCASS', rate: '250m/day', total: '24 days', obj: '🐳', desc: "Forms a 'whale fall'. Sustains a blind, localized ecosystem of bone-eating worms for up to 100 years.", color: '#ff9800' },
    { title: 'DEAD PLANKTON', rate: '100m/day', total: '60 days', obj: '❄️', desc: "The primary food source for the entire abyss. It looks like an endless, slow-motion blizzard.", color: '#ffb74d' },
    { title: 'PLASTIC BAG', rate: '50m/day', total: '120 days', obj: '🛍️', desc: "Will outlast the whale carcass by 400 years. Plastic has been found at 11,000m. It arrived before any human did.", color: '#ff6b6b' },
    { title: 'SAND GRAIN', rate: '800m/day', total: '7.5 days', obj: '·', desc: "Forms the abyssal plain. Average sediment depth is up to 800m thick, built grain by grain over 180 million years.", color: '#ffb74d' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.7 }}
      style={{ marginTop: '40px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)' }}
    >
       <motion.h4 
         initial={{ opacity: 0, y: 10 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.5 }}
         className="mono-reading" 
         style={{ color: 'var(--accent-abyssal)', marginBottom: '40px', fontSize: '1.3rem', letterSpacing: '0.2em' }}
       >
         GRAVITY SIMULATOR: MARINE SNOW
       </motion.h4>
       
       <div style={{ display: 'flex', gap: '60px', alignItems: active ? 'flex-start' : 'center' }}>
         <div style={{ flex: 1 }}>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '40px' }}>
              {items.map((i, idx) => (
                <motion.button 
                  key={i.title} 
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="hover-target"
                  style={{ 
                    background: active?.title === i.title ? `${i.color}20` : 'transparent', 
                    color: active?.title === i.title ? i.color : '#fff', 
                    border: `2px solid ${active?.title === i.title ? i.color : 'rgba(255,255,255,0.2)'}`, 
                    padding: '20px', 
                    fontFamily: 'var(--font-mono)', 
                    cursor: 'pointer', 
                    textAlign: 'left',
                    borderRadius: '4px',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s',
                    boxShadow: active?.title === i.title ? `0 0 20px ${i.color}40` : 'none'
                  }}
                >
                  {i.obj} {i.title}
                </motion.button>
              ))}
           </div>
           
           <AnimatePresence mode="wait">
              {active && (
                <motion.div 
                  key={active.title} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{ minHeight: '160px', paddingTop: '30px', borderTop: `2px solid ${active.color}50` }}
                >
                   <div style={{ display: 'flex', gap: '30px', marginBottom: '20px' }} className="mono-reading">
                      <motion.span 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ color: active.color, fontSize: '1.1rem', fontWeight: 600 }}
                      >
                        ↓ RATE: {active.rate}
                      </motion.span>
                      <motion.span 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{ color: '#ff9999', fontSize: '1.1rem', fontWeight: 600 }}
                      >
                        ⏱ TTB: {active.total}
                      </motion.span>
                   </div>
                   <motion.p 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.15 }}
                     className="body-narrow" 
                     style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}
                   >
                     {active.desc}
                   </motion.p>
                </motion.div>
              )}
           </AnimatePresence>
         </div>
         
         {/* Drop Chute Animation */}
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.3, duration: 0.6 }}
           animate={{ height: active ? 420 : 200 }}
           style={{ 
             position: 'relative', 
             width: '120px',
             flexShrink: 0,
             overflow: 'hidden'
           }}
         >
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              background: 'linear-gradient(180deg, transparent 0%, rgba(255,152,0,0.1) 100%)',
              borderLeft: '2px solid rgba(255,152,0,0.3)',
              borderRight: '2px solid rgba(255,152,0,0.3)',
              borderRadius: '4px',
              boxShadow: 'inset 0 0 30px rgba(255,152,0,0.05), 0 0 30px rgba(255,152,0,0.1)'
            }}/>
            
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', paddingTop: '5px' }}>
              6000m
            </div>
            
            {active && (
              <motion.div 
                key={active.title} 
                style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: '40px', zIndex: 5 }}
                animate={{ y: [0, 350] }}
                transition={{ duration: active.rate === '800m/day' ? 2 : (active.rate === '250m/day' ? 3 : (active.rate === '100m/day' ? 5 : 8)), repeat: Infinity }}
              >
                {active.obj}
              </motion.div>
            )}
            
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-abyssal)', paddingBottom: '5px', fontWeight: 600 }}>
              FLOOR
            </div>
         </motion.div>
       </div>
    </motion.div>
  );
};

// 3. Abyssal Desert Infographic
const DataInfographic = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  const stats = [
    { label: "AREA COVERED", val: "54%", sub: "Of Earth's entire surface area.", color: '#ff9800' },
    { label: "AVERAGE TEMP", val: "2°C", sub: "Stable for 34 million years.", color: '#ffb74d' },
    { label: "SEDIMENT DEPTH", val: "800m", sub: "Soft, calcium-based oozes.", color: '#ffa726' },
    { label: "HUMAN TRASH", val: "100%", sub: "Found in all sampled sites.", color: '#ff6b6b' }
  ];

  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.7 }}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', marginTop: '6rem' }}
    >
       {stats.map((s, i) => (
         <motion.div 
           key={i} 
           initial={{ opacity: 0, x: -30 }} 
           animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -30 }} 
           transition={{ delay: i * 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
           className="glass-panel hover-target"
           style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left', position: 'relative', overflow: 'hidden' }}
         >
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: s.color, opacity: 0.3 }} />
            <div className="mono-reading" style={{ fontSize: '0.75rem', color: s.color, opacity: 0.8, letterSpacing: '0.1em' }}>{s.label}</div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: (i * 0.2) + 0.3, duration: 0.4 }}
              className="mono-reading" 
              style={{ fontSize: '2.5rem', color: '#fff', lineHeight: 1, textShadow: `0 0 20px ${s.color}40`, display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {s.val}
            </motion.div>
            
            <p className="body-narrow" style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{s.sub}</p>
         </motion.div>
       ))}
    </motion.div>
  );
};

const AbyssalZone = () => {
  return (
    <section style={{ position: 'relative', padding: '15vh 10vw', overflow: 'hidden' }}>
      <PureCssMarineSnow />
      
      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mono-reading" 
          style={{ color: 'var(--accent-abyssal)', marginBottom: '5vh', textAlign: 'left', letterSpacing: '0.35em', fontSize: 'clamp(0.75rem, 1vw, 0.95rem)', fontWeight: 600, textShadow: '0 0 15px rgba(255,152,0,0.3)' }}
        >
          04 — ABYSSOPELAGIC
        </motion.div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }} 
          whileInView={{ y: 0, opacity: 1 }} 
          viewport={{ once: true, amount: 0.2 }} 
          transition={{ duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ maxWidth: '900px', margin: '0 0 15vh 0', textAlign: 'left' }}
        >
           <h2 className="editorial-title" style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', marginBottom: '1.5rem', lineHeight: 0.9 }}>
             The Desert.
           </h2>
           <p className="body-narrow" style={{ margin: '0', maxWidth: '50ch', fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)' }}>
             The abyssal plain covers over half of our planet. It is an endless desert of soft sediment kilometres deep. Life here moves slowly, patiently waiting for the detritus of the world falling from above.
           </p>
        </motion.div>

        <DataInfographic />
        
        <GeologicalTimeline />
        <SinkCalculator />
      </div>
    </section>
  );
};

export default AbyssalZone;
