import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// 1. Light Extinction Simulator
const LightExtinction = () => {
  const [depth, setDepth] = useState(200);

  const redOp = depth > 15 ? 0 : 1 - (depth/15);
  const orangeOp = depth > 30 ? 0 : 1 - (depth/30);
  const yellowOp = depth > 50 ? 0 : 1 - (depth/50);
  const greenOp = depth > 100 ? 0 : 1 - (depth/100);
  const blueOp = depth > 800 ? 0.2 : 1 - (depth/1000);

  const lightPct = depth < 200 ? Math.round((1 - depth/200) * 100) : 0;
  const zone = depth < 200 ? 'EPIPELAGIC' : depth < 1000 ? 'MESOPELAGIC' : 'BATHYPELAGIC';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel"
      style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <h4 className="mono-reading" style={{ color: 'var(--bio-blue)', marginBottom: '25px', letterSpacing: '0.3em', fontSize: '10px' }}>LIGHT EXTINCTION SIMULATOR</h4>
      
      <div style={{ display: 'flex', height: '10px', width: '100%', marginBottom: '25px', borderRadius: '5px', overflow: 'hidden', background: 'rgba(255,255,255,0.03)' }}>
         <div style={{ flex: 1, background: '#ff0000', opacity: redOp, transition: 'opacity 0.3s' }}/>
         <div style={{ flex: 1, background: '#ff7f00', opacity: orangeOp, transition: 'opacity 0.3s' }}/>
         <div style={{ flex: 1, background: '#ffff00', opacity: yellowOp, transition: 'opacity 0.3s' }}/>
         <div style={{ flex: 1, background: '#00ff00', opacity: greenOp, transition: 'opacity 0.3s' }}/>
         <div style={{ flex: 3, background: '#0000ff', opacity: blueOp, transition: 'opacity 0.3s' }}/>
      </div>

      <div className="mono-reading" style={{ marginBottom: '15px', fontSize: '11px' }}>
        DEPTH: <span style={{ color: 'var(--bio-blue)' }}>{depth}M</span>
      </div>

      <input 
        type="range" min="0" max="1000" value={depth} onChange={(e) => setDepth(Number(e.target.value))}
        style={{ width: '100%', cursor: 'ew-resize', accentColor: 'var(--bio-blue)', marginBottom: '20px' }}
      />

      <div style={{ minHeight: '50px', marginBottom: '20px' }}>
        <p className="body-narrow" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
          {depth < 15 && "Full visible spectrum. All wavelengths present."}
          {depth >= 15 && depth < 50 && "Red light absorbed. Blood turns green at depth."}
          {depth >= 50 && depth < 200 && "Only blue & green wavelengths penetrate here."}
          {depth >= 200 && depth < 800 && "Mesopelagic threshold. 1% of surface light."}
          {depth >= 800 && "Total extinction. Only bioluminescence remains."}
        </p>
      </div>

      {/* Wavelength absorption data to fill the panel */}
      <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div>
            <div className="mono-reading" style={{ fontSize: '8px', opacity: 0.3, marginBottom: '4px' }}>LIGHT REMAINING</div>
            <div className="mono-reading" style={{ fontSize: '1.2rem', color: lightPct > 0 ? '#fff' : 'var(--bio-blue)' }}>{lightPct}%</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="mono-reading" style={{ fontSize: '8px', opacity: 0.3, marginBottom: '4px' }}>CURRENT ZONE</div>
            <div className="mono-reading" style={{ fontSize: '10px', color: 'var(--bio-blue)' }}>{zone}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px', fontSize: '8px', opacity: 0.4 }}>
          <span style={{ color: redOp > 0 ? '#ff4444' : 'rgba(255,255,255,0.2)', transition: 'color 0.3s' }}>RED {redOp > 0 ? '●' : '✕'}</span>
          <span style={{ color: orangeOp > 0 ? '#ff7f00' : 'rgba(255,255,255,0.2)', transition: 'color 0.3s' }}>ORG {orangeOp > 0 ? '●' : '✕'}</span>
          <span style={{ color: yellowOp > 0 ? '#ffff00' : 'rgba(255,255,255,0.2)', transition: 'color 0.3s' }}>YLW {yellowOp > 0 ? '●' : '✕'}</span>
          <span style={{ color: greenOp > 0 ? '#00ff00' : 'rgba(255,255,255,0.2)', transition: 'color 0.3s' }}>GRN {greenOp > 0 ? '●' : '✕'}</span>
          <span style={{ color: blueOp > 0.2 ? '#4444ff' : 'rgba(255,255,255,0.2)', transition: 'color 0.3s' }}>BLU {blueOp > 0.2 ? '●' : '✕'}</span>
        </div>
      </div>
    </motion.div>
  );
};

// 2. Diel Migration Clock — Fixed Arm
const MigrationClock = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel"
      style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h4 className="mono-reading" style={{ color: 'var(--bio-blue)', marginBottom: '25px', letterSpacing: '0.3em', fontSize: '10px', alignSelf: 'flex-start' }}>DIEL VERTICAL MIGRATION</h4>
      
      <div style={{ width: '220px', height: '220px', borderRadius: '50%', border: '1px solid rgba(0,255,255,0.15)', position: 'relative', background: 'radial-gradient(circle, rgba(0,255,255,0.02) 0%, transparent 70%)', margin: '0 auto 25px auto' }}>
        {[0, 6, 12, 18].map((h) => (
          <div 
            key={h} className="mono-reading" 
            style={{ 
              position: 'absolute', 
              top: h===0?'10px':(h===12?'auto':'50%'), 
              bottom: h===12?'10px':'auto', 
              left: h===18?'10px':(h===6?'auto':'50%'), 
              right: h===6?'10px':'auto', 
              transform: (h===0||h===12)?'translateX(-50%)':'translateY(-50%)', 
              color: 'rgba(255,255,255,0.25)', fontSize: '9px' 
            }}
          >
            {h.toString().padStart(2, '0')}:00
          </div>
        ))}
        
        {/* Fixed Clock Arm — small, proper pivot from center */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ 
            position: 'absolute', 
            top: '50%', left: '50%', 
            width: '1px', height: '55px', 
            background: 'linear-gradient(to top, transparent, var(--bio-blue))',
            transformOrigin: '50% 0%',
            marginLeft: '-0.5px'
          }}
        >
          <div style={{ width: '4px', height: '4px', background: '#fff', borderRadius: '50%', position: 'absolute', bottom: '-2px', left: '-1.5px', boxShadow: '0 0 6px var(--bio-blue)' }} />
        </motion.div>

        {/* Center dot */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: '6px', height: '6px', background: 'var(--bio-blue)', borderRadius: '50%', transform: 'translate(-50%, -50%)', zIndex: 5 }} />

        <div className="mono-reading" style={{ position: 'absolute', top: '42%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '8px', letterSpacing: '3px', color: 'rgba(255,255,255,0.3)' }}>
          DIEL
        </div>
      </div>

      <p className="body-narrow" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textAlign: 'center', lineHeight: 1.5 }}>
        Every night, trillions of organisms migrate 1,000m to the surface to feed, then descend at dawn.
      </p>
    </motion.div>
  );
};

// 3. Trophic Web — Horizontal Layout
const TrophicWeb = () => {
  const levels = [
    { name: 'SURFACE EXPORT', items: 'Marine Snow / POC', energy: '100%', icon: '❄️' },
    { name: 'PRIMARY CONSUMERS', items: 'Zooplankton / Salps', energy: '10%', icon: '🦐' },
    { name: 'SECONDARY HUNTERS', items: 'Lanternfish / Squid', energy: '1%', icon: '🐟' },
    { name: 'TOP PREDATORS', items: 'Dragonfish / Sharks', energy: '0.1%', icon: '🐙' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="glass-panel"
      style={{ padding: '3rem 2.5rem' }}
    >
      <h4 className="mono-reading" style={{ color: 'var(--bio-blue)', marginBottom: '2.5rem', letterSpacing: '0.3em', fontSize: '10px' }}>TROPHIC PYRAMID</h4>
      
      {/* Horizontal flow */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', position: 'relative' }}>
        {/* Horizontal Flow Line */}
        <div style={{ position: 'absolute', top: '40px', left: '12%', right: '12%', height: '1px', background: 'linear-gradient(90deg, var(--bio-blue), rgba(0,255,255,0.05))', opacity: 0.3, zIndex: 0 }} />

        {levels.map((level, i) => (
          <motion.div 
            key={level.name} 
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            style={{ textAlign: 'center', zIndex: 1 }}
          >
            <div style={{ 
              width: '55px', height: '55px', borderRadius: '50%', background: 'rgba(0,0,0,0.6)', 
              border: '1px solid rgba(0,255,255,0.15)', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', fontSize: '1.4rem', margin: '0 auto 15px auto'
            }}>
              {level.icon}
            </div>
            <div className="mono-reading" style={{ color: 'var(--bio-blue)', fontSize: '8px', marginBottom: '6px', lineHeight: 1.3 }}>{level.name}</div>
            <div className="mono-reading" style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '4px' }}>{level.energy}</div>
            <div className="mono-reading" style={{ fontSize: '7px', opacity: 0.3, marginBottom: '8px' }}>ENERGY</div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>{level.items}</div>
            {i < levels.length - 1 && (
              <div style={{ position: 'absolute', top: '37px', left: `${(i + 1) * 25 - 2}%`, color: 'rgba(0,255,255,0.3)', fontSize: '10px' }}>→</div>
            )}
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '1.5rem' }}>
        <p className="body-narrow" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', maxWidth: '55ch' }}>
          Energy transfer efficiency is roughly 10%. For every 1kg of top predator biomass, 1,000kg of surface material was required.
        </p>
      </div>
    </motion.div>
  );
};

const TwilightZone = () => {
  return (
    <section className="section-full" style={{ padding: '10vh 10vw' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Title — Left Aligned */}
        <div style={{ marginBottom: '6rem' }}>
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mono-reading" 
            style={{ marginBottom: '1.5rem', letterSpacing: '0.4em', color: 'var(--accent-twilight)' }}
          >
            02 — MESOPELAGIC
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="editorial-title" 
            style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', lineHeight: 0.9 }}
          >
            The Twilight.
          </motion.h2>
        </div>

        {/* Row 1: Trophic Web full width */}
        <TrophicWeb />

        {/* Row 2: Two-column grid — Simulator Left, Clock Right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '5rem' }}>
          <LightExtinction />
          <MigrationClock />
        </div>

        {/* Deep Scattering Layer — Left-aligned editorial block */}
        <div style={{ marginTop: '6rem', maxWidth: '800px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="editorial-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
              The Deep Scattering Layer
            </h3>
            <p className="body-narrow" style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Every single night, the largest animal migration on Earth occurs. Trillions of zooplankton and lanternfish travel 1,000 meters upward to the surface to feed under the cover of darkness. 
            </p>
            <div 
              className="mono-reading" 
              style={{ borderLeft: '3px solid var(--bio-blue)', padding: '15px 0 15px 30px', color: 'var(--bio-blue)', fontSize: '0.95rem', lineHeight: 1.7 }}
            >
              "In WWII, US Navy sonar operators reported a 'false seafloor' at 300-500m. <br/>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>It was billions of animals, swimming in formation."</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default TwilightZone;
