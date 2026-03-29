import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Light Penetration Ring
const LightSimulator = ({ depth }) => {
  const opacity = Math.max(0, 1 - (depth / 200));
  
  return (
    <div style={{ position: 'relative', width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div 
        animate={{ opacity: opacity, scale: 0.8 + (opacity * 0.2) }}
        style={{ 
          width: '80px', height: '80px', borderRadius: '50%', 
          background: 'radial-gradient(circle, #fff700 0%, transparent 70%)',
          filter: 'blur(20px)', position: 'absolute'
        }}
      />
      <div style={{ color: '#fff', zIndex: 1, textAlign: 'center' }}>
        <div style={{ fontSize: '9px', opacity: 0.4, letterSpacing: '0.1em' }}>SURFACE LIGHT</div>
        <div className="mono-reading" style={{ fontSize: '1.5rem' }}>{Math.round(opacity * 100)}%</div>
      </div>
      <svg width="180" height="180" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
        <circle cx="90" cy="90" r="80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <motion.circle 
          cx="90" cy="90" r="80" fill="none" stroke="var(--accent-surface)" strokeWidth="2"
          strokeDasharray="502"
          animate={{ strokeDashoffset: 502 - (502 * opacity) }}
        />
      </svg>
    </div>
  );
};

const SunlightZone = () => {
  return (
    <section style={{ position: 'relative', width: '100%', padding: '10vh 10vw 0 10vw' }}>

      {/* 01: The Last Light — Left/Right Grid */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', marginBottom: '10vh' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '60px', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mono-reading" style={{ color: 'var(--accent-current-zone)', marginBottom: '20px', letterSpacing: '0.4em' }}>
              01 — EPIPELAGIC
            </div>
            <h2 className="editorial-title" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: 0.9, marginBottom: '1.5rem' }}>
               The Last Light.
            </h2>
            <p className="body-narrow" style={{ fontSize: '1.3rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '50ch' }}>
               This is the only layer of the ocean where plants can grow. Over 90% of all marine life lives here, fueled by the energy of a thousand suns.
            </p>
            
            <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
               <div className="glass-panel" style={{ padding: '15px 20px' }}>
                  <div className="mono-reading" style={{ fontSize: '8px', opacity: 0.4, marginBottom: '6px' }}>MAX DEPTH</div>
                  <div className="mono-reading" style={{ fontSize: '1.4rem', color: '#fff' }}>200<span style={{fontSize:'11px', opacity:0.4}}>M</span></div>
               </div>
               <p style={{ opacity: 0.5, fontSize: '0.85rem', maxWidth: '220px', lineHeight: 1.5 }}>
                  Beyond this point, photosynthesis becomes impossible.
               </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}
          >
            <LightSimulator depth={50} />
            <div className="mono-reading" style={{ fontSize: '9px', letterSpacing: '3px', color: 'rgba(255,255,255,0.2)' }}>
               LIGHT MONITOR
            </div>
          </motion.div>
        </div>
      </div>

      {/* 02: Phytoplankton — Reverse Grid (Visual Left, Text Right) */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', marginBottom: '10vh' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '60px', alignItems: 'center' }}>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ position: 'relative', height: '250px' }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ y: [0, -80], opacity: [0, 0.5, 0], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 4 }}
                style={{ 
                  position: 'absolute', left: `${10 + Math.random() * 80}%`, bottom: '0',
                  width: `${4 + Math.random() * 10}px`, height: `${4 + Math.random() * 10}px`,
                  borderRadius: '50%', border: '1px solid rgba(72,202,228,0.3)', background: 'rgba(72,202,228,0.05)'
                }}
              />
            ))}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ padding: '30px', background: 'rgba(255,255,255,0.02)', borderRadius: '50%', border: '1px solid rgba(72,202,228,0.08)' }}>
                <div style={{ width: '60px', height: '60px', background: 'var(--accent-current-zone)', borderRadius: '50%', filter: 'blur(15px)', opacity: 0.3 }} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="editorial-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.2rem' }}>The Lungs of Earth</h3>
            <p className="body-narrow" style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', maxWidth: '45ch', lineHeight: 1.6 }}>
               Phytoplankton produce 50-80% of the world's oxygen. Every second breath you take comes from these microscopic organisms floating in the Sunlight Zone.
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
               <div className="glass-panel" style={{ padding: '1.2rem 1.5rem' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-current-zone)', marginBottom: '4px' }}>80<span style={{fontSize:'1.2rem'}}>%</span></div>
                  <div className="mono-reading" style={{ fontSize: '8px', opacity: 0.4 }}>GLOBAL O₂ PRODUCTION</div>
               </div>
               <div className="glass-panel" style={{ padding: '1.2rem 1.5rem' }}>
                 <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-current-zone)', marginBottom: '4px' }}>1ST</div>
                 <div className="mono-reading" style={{ fontSize: '8px', opacity: 0.4 }}>FOOD CHAIN LINK</div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 03: The Thermocline — Compact Centered Divider */}
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', padding: '8vh 0' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mono-reading" style={{ color: 'var(--accent-current-zone)', letterSpacing: '0.4em', marginBottom: '15px', fontSize: '0.75rem' }}>
            THE PHYSICAL TRANSITION
          </div>
          <h3 className="editorial-title" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: '#fff', marginBottom: '18px', lineHeight: 1 }}>
            The Thermocline
          </h3>
          <p className="body-narrow" style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '55ch', margin: '0 auto 2rem auto' }}>
            Temperature plummets here—from 20°C at the surface to near 1°C in the depths. A sharp boundary between two worlds.
          </p>

          <div style={{ position: 'relative', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: '3px',
                background: 'linear-gradient(90deg, #ff6b35, #f7931e, #48cae4, #0096c7, #003d82)',
                borderRadius: '2px', transformOrigin: 'left'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '8px', opacity: 0.3, letterSpacing: '0.1em' }}>SURFACE</div>
                <div className="mono-reading" style={{ fontSize: '11px', color: '#ff6b35' }}>20°C</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '8px', opacity: 0.3, letterSpacing: '0.1em' }}>ABYSSAL</div>
                <div className="mono-reading" style={{ fontSize: '11px', color: 'var(--bio-blue)' }}>1°C</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default SunlightZone;
