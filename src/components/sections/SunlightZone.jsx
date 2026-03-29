import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// 1. Live Ocean Data Widget - (Removed per user request)

// Flip counter helper
const FlipDigit = ({ val }) => (
  <div style={{ position: 'relative', width: '30px', height: '40px', background: '#222', borderRadius: '4px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', fontWeight: 'bold', color: '#fff', border: '1px solid #444' }}>
    <motion.div key={val} initial={{ y: 40 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
      {val}
    </motion.div>
  </div>
);

const DepthCounter = ({ depth }) => {
  const digits = depth.toString().padStart(4, '0').split('');
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {digits.map((d, i) => <FlipDigit key={i} val={d} />)}
      <span style={{ alignSelf: 'flex-end', marginLeft: '5px', fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' }}>M</span>
    </div>
  );
};

// 2. Photosynthesis Simulator
const LightSimulator = ({ depth }) => {
  const opacity = Math.max(0, 1 - (depth / 200));
  const scale = 0.8 + (opacity * 0.2);
  
  return (
    <div style={{ position: 'relative', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div 
        animate={{ opacity: opacity, scale: scale }}
        style={{ 
          width: '100px', height: '100px', borderRadius: '50%', 
          background: 'radial-gradient(circle, #fff700 0%, transparent 70%)',
          filter: 'blur(20px)',
          position: 'absolute'
        }}
      />
      <div style={{ color: '#fff', zIndex: 1, textAlign: 'center' }}>
        <div style={{ fontSize: '10px', opacity: 0.5 }}>SURFACE LIGHT</div>
        <div className="mono-reading">{Math.round(opacity * 100)}%</div>
      </div>
      <svg width="200" height="200" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
        <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <motion.circle 
          cx="100" cy="100" r="90" fill="none" stroke="var(--accent-surface)" strokeWidth="2"
          strokeDasharray="565"
          animate={{ strokeDashoffset: 565 - (565 * opacity) }}
        />
      </svg>
    </div>
  );
};

const SunlightZone = ({ scrollYProgress }) => {
  return (
    <section style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Sensor Widget Removed */}
      
      {/* 01: The Last Light */}
      <div style={{ width: '100%', minHeight: '100vh', position: 'relative', padding: '8vh 5vw 6vh 5vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '1200px', width: '100%', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'center' }}>
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
           >
             <div className="mono-reading" style={{ color: 'var(--accent-current-zone)', marginBottom: '20px', letterSpacing: '0.4em' }}>
               01 — EPIPELAGIC
             </div>
             <h2 className="editorial-title" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: 0.9, marginBottom: '2rem' }}>
                The Last Light.
             </h2>
             <p className="body-narrow" style={{ fontSize: '1.5rem', color: '#e0e6ed', lineHeight: 1.5, marginBottom: '2.5rem' }}>
                This is the only layer of the ocean where plants can grow. Over 90% of all marine life lives here, fueled by the energy of a thousand suns.
             </p>
             
             <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                <div className="glass-panel" style={{ padding: '20px' }}>
                   <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '10px' }}>MAX DEPTH</div>
                   <div className="mono-reading" style={{ fontSize: '1.5rem', color: '#fff' }}>200<span style={{fontSize:'12px', opacity:0.5}}>M</span></div>
                </div>
                <div style={{ opacity: 0.6, fontSize: '0.9rem', maxWidth: '250px' }}>
                   Known as the Sunlight Zone. Beyond this point, photosynthesis becomes impossible.
                </div>
             </div>
           </motion.div>

           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
              <LightSimulator depth={50} />
              <div className="mono-reading" style={{ fontSize: '12px', letterSpacing: '2px', color: 'rgba(255,255,255,0.3)' }}>
                 LIGHT PENETRATION MONITOR
              </div>
           </div>
        </div>
      </div>

      {/* 02: Phytoplankton Infographic */}
      <div style={{ width: '100%', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10vh 5vw' }}>
         <div style={{ width: '100%', maxWidth: '1100px', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '100px', alignItems: 'center' }}>
            <div style={{ position: 'relative', height: '300px' }}>
               {/* Decorative Bubble grid */}
               {[...Array(12)].map((_, i) => (
                 <motion.div 
                   key={i}
                   animate={{ 
                     y: [0, -100], 
                     opacity: [0, 0.6, 0],
                     scale: [0.5, 1, 0.5]
                   }}
                   transition={{ 
                     duration: 3 + Math.random() * 4, 
                     repeat: Infinity, 
                     delay: Math.random() * 5 
                   }}
                   style={{ 
                     position: 'absolute', 
                     left: `${Math.random() * 100}%`, 
                     bottom: '0',
                     width: `${5 + Math.random() * 15}px`,
                     height: `${5 + Math.random() * 15}px`,
                     borderRadius: '50%',
                     border: '1px solid rgba(72,202,228,0.4)',
                     background: 'rgba(72,202,228,0.05)'
                   }}
                 />
               ))}
               <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '50%', border: '1px solid rgba(72,202,228,0.1)', boxShadow: '0 0 40px rgba(72,202,228,0.05)' }}>
                     <div style={{ width: '80px', height: '80px', background: 'var(--accent-current-zone)', borderRadius: '50%', filter: 'blur(20px)', opacity: 0.4 }} />
                  </div>
               </div>
            </div>

            <div>
               <h3 className="editorial-title" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>The Lungs of Earth</h3>
               <p className="body-narrow" style={{ fontSize: '1.3rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem' }}>
                  Phytoplankton produce **50-80% of the world's oxygen**. Every second breath you take comes from these microscopic organisms floating in the Sunlight Zone.
               </p>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                     <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-current-zone)', marginBottom: '5px' }}>80<span style={{fontSize:'1.5rem'}}>%</span></div>
                     <div className="mono-reading" style={{ fontSize: '9px', opacity: 0.5 }}>GLOBAL O2 PRODUCTION</div>
                  </div>
                  <div className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-current-zone)', marginBottom: '5px' }}>1ST</div>
                    <div className="mono-reading" style={{ fontSize: '9px', opacity: 0.5 }}>LINK IN FOOD CHAIN</div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* 03: The Atmosphere Transition - NEW Refined Thermocline */}
      <div style={{ position: 'relative', width: '100%', padding: '15vh 5vw' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(0.7rem, 0.85vw, 0.95rem)',
              color: 'var(--accent-current-zone)',
              letterSpacing: '0.4em',
              marginBottom: '20px',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600
            }}
          >
            The Physical Transition
          </motion.div>

          <motion.h3 
            className="editorial-title" 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: '#fff', marginBottom: '24px', lineHeight: 1 }}
          >
            The Thermocline
          </motion.h3>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.25 }}
            style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '60ch', margin: '0 auto 3rem auto' }}
          >
            Temperature plummets here—from 20°C at the surface to near 1°C in the depths. A sharp boundary between two worlds where the sun's energy fades and the ocean changes profoundly.
          </motion.p>

          <div style={{ position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: '4px',
                background: 'linear-gradient(90deg, #ff6b35 0%, #f7931e 25%, #48cae4 50%, #0096c7 75%, #003d82 100%)',
                borderRadius: '2px',
                boxShadow: '0 0 30px rgba(72,202,228,0.2)',
                transformOrigin: 'left'
              }}
            />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '9px', opacity: 0.4, letterSpacing: '0.1em' }}>SURFACE</div>
                <div className="mono-reading" style={{ fontSize: '12px', color: '#ff6b35' }}>20°C</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '9px', opacity: 0.4, letterSpacing: '0.1em' }}>ABYSSAL</div>
                <div className="mono-reading" style={{ fontSize: '12px', color: 'var(--bio-blue)' }}>1°C</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Zone Boundary Removed as requested */}

    </section>
  );
};

export default SunlightZone;
