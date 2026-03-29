import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// 1. Light Extinction Simulator with Refined Centering
const LightExtinction = () => {
  const [depth, setDepth] = useState(200);
  const ref = useRef(null);

  const redOp = depth > 15 ? 0 : 1 - (depth/15);
  const orangeOp = depth > 30 ? 0 : 1 - (depth/30);
  const yellowOp = depth > 50 ? 0 : 1 - (depth/50);
  const greenOp = depth > 100 ? 0 : 1 - (depth/100);
  const blueOp = depth > 800 ? 0.2 : 1 - (depth/1000);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel"
      style={{ width: '100%', maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '3rem' }}
    >
      <h4 className="mono-reading" style={{ color: 'var(--bio-blue)', marginBottom: '30px', letterSpacing: '0.3em' }}>LIGHT EXTINCTION SIMULATOR</h4>
      
      <div style={{ display: 'flex', height: '12px', width: '100%', marginBottom: '30px', borderRadius: '6px', overflow: 'hidden', background: 'rgba(255,255,255,0.05)' }}>
         <div style={{ flex: 1, background: '#ff0000', opacity: redOp, transition: 'opacity 0.3s ease' }}/>
         <div style={{ flex: 1, background: '#ff7f00', opacity: orangeOp, transition: 'opacity 0.3s ease' }}/>
         <div style={{ flex: 1, background: '#ffff00', opacity: yellowOp, transition: 'opacity 0.3s ease' }}/>
         <div style={{ flex: 1, background: '#00ff00', opacity: greenOp, transition: 'opacity 0.3s ease' }}/>
         <div style={{ flex: 3, background: '#0000ff', opacity: blueOp, transition: 'opacity 0.3s ease' }}/>
      </div>

      <div className="mono-reading" style={{ marginBottom: '20px', fontSize: '12px', color: '#fff' }}>
        DEPTH: <span style={{ color: 'var(--bio-blue)' }}>{depth}M</span>
      </div>

      <input 
        type="range" min="0" max="1000" value={depth} onChange={(e) => setDepth(Number(e.target.value))}
        style={{ width: '100%', cursor: 'ew-resize', accentColor: 'var(--bio-blue)', marginBottom: '30px' }}
      />

      <div style={{ minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="body-narrow" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, maxWidth: '45ch' }}>
          {depth < 15 && "At the surface, water displays the full visible spectrum."}
          {depth >= 15 && depth < 50 && "By 15m, red light is absorbed. Blood turns green; the world begins to drain of warmth."}
          {depth >= 50 && depth < 200 && "Only high-energy blue and green wavelengths penetrate these depths."}
          {depth >= 200 && depth < 800 && "The Mesopelagic threshold. Only 1% of surface light remains."}
          {depth >= 800 && "Total extinction. Above 800m, only biological light exists."}
        </p>
      </div>
    </motion.div>
  );
};

// 2. Migration Clock (Diel Vertical Migration) with Redesigned Alignment
const MigrationClock = () => {
  const ref = useRef(null);

  return (
    <div 
      ref={ref} 
      style={{ display: 'flex', flexDirection: 'column', gap: '60px', alignItems: 'center', width: '100%', margin: '4rem 0' }}
    >
       <div 
         style={{ width: '320px', height: '320px', borderRadius: '50%', border: '1px solid rgba(0,255,255,0.2)', position: 'relative', background: 'radial-gradient(circle, rgba(0,255,255,0.03) 0%, transparent 70%)' }}
       >
          {[0, 6, 12, 18].map((h) => (
             <div 
               key={h} 
               className="mono-reading" 
               style={{ position: 'absolute', top: h===0?'15px':(h===12?'auto':'50%'), bottom: h===12?'15px':'auto', left: h===18?'15px':(h===6?'auto':'50%'), right: h===6?'15px':'auto', transform: (h===0||h===12)?'translateX(-50%)':'translateY(-50%)', color: 'rgba(255,255,255,0.3)', fontSize: '10px' }}
             >
                {h.toString().padStart(2, '0')}:00
             </div>
          ))}
          
          {/* Sweeping Hand */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', top: '50%', left: '50%', width: '1px', height: '40%', background: 'var(--bio-blue)', transformOrigin: 'bottom center', transform: 'translateX(-50%) translateY(-100%)' }}
          >
             <div style={{ width: '6px', height: '6px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '-3px', left: '-2.5px', boxShadow: '0 0 10px var(--bio-blue)' }} />
          </motion.div>

          <div className="mono-reading" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#000', padding: '12px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '10px', letterSpacing: '4px' }}>
            DIEL CYCLE
          </div>
       </div>

       <div style={{ maxWidth: '800px', textAlign: 'center' }}>
          <h3 className="editorial-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '2rem' }}>The Deep Scattering Layer</h3>
          <p className="body-narrow" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: '3rem' }}>
             Every single night, the largest animal migration on Earth occurs. Trillions of zooplankton and lanternfish travel 1,000 meters upward to the surface to feed under the cover of darkness. 
          </p>
          <div 
            className="mono-reading" 
            style={{ borderLeft: '3px solid var(--bio-blue)', padding: '20px 0 20px 40px', color: 'var(--bio-blue)', textAlign: 'left', margin: '0 auto', maxWidth: '600px', fontSize: '1rem', lineHeight: 1.6 }}
          >
             "In WWII, US Navy sonar operators reported a 'false seafloor' at 300-500m. <br/>
             <span style={{ color: '#fff', opacity: 0.8 }}>It was billions of animals, swimming in formation."</span>
          </div>
       </div>
    </div>
  );
};

// 3. Trophic Web (Redesigned Proper Vertical Hierarchy)
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
      style={{ width: '100%', maxWidth: '900px', margin: '4rem auto', padding: '4rem 2rem' }}
    >
      <h4 className="mono-reading" style={{ color: 'var(--bio-blue)', marginBottom: '4rem', textAlign: 'center', letterSpacing: '0.4em' }}>TROPHIC PYRAMID FLOW</h4>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', position: 'relative' }}>
        
        {/* Central Flow Line */}
        <div style={{ position: 'absolute', top: '60px', bottom: '60px', width: '2px', background: 'linear-gradient(180deg, var(--bio-blue) 0%, transparent 100%)', zIndex: 0, opacity: 0.4 }} />

        {levels.map((level, i) => (
          <motion.div 
            key={level.name} 
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.8 }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              width: '100%', 
              justifyContent: 'center',
              gap: '40px',
              zIndex: 1,
              marginBottom: i === levels.length - 1 ? 0 : '40px'
            }}
          >
            <div style={{ width: '250px', textAlign: i % 2 === 0 ? 'right' : 'left', order: i % 2 === 0 ? 1 : 3 }}>
               <div className="mono-reading" style={{ color: 'var(--bio-blue)', fontSize: '10px', marginBottom: '8px' }}>{level.name}</div>
               <div style={{ color: '#fff', fontSize: '1rem', fontWeight: 600 }}>{level.items}</div>
            </div>

            <div style={{ 
              width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0,0,0,0.8)', 
              border: '1px solid var(--bio-blue)', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', fontSize: '2rem', order: 2,
              boxShadow: '0 0 20px rgba(0,255,255,0.1)'
            }}>
              {level.icon}
            </div>

            <div style={{ width: '250px', textAlign: i % 2 === 0 ? 'left' : 'right', order: i % 2 === 0 ? 3 : 1 }}>
               <div className="mono-reading" style={{ fontSize: '1.5rem', color: '#fff' }}>{level.energy}</div>
               <div className="mono-reading" style={{ fontSize: '8px', opacity: 0.4 }}>AVAILABLE ENERGY</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: '5rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
        <p className="body-narrow" style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', maxWidth: '60ch', margin: '0 auto' }}>
          Energy transfer efficiency is roughly 10%. For every 1kg of biomass at one level, 10kg of the level below is required. scavengers waiting for marine snow define survival here.
        </p>
      </div>
    </motion.div>
  );
};

const TwilightZone = () => {
  return (
    <section className="section-full" style={{ padding: '15vh 0' }}>
      <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 10vw' }}>
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
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
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="editorial-title" 
            style={{ fontSize: 'clamp(4rem, 12vw, 10rem)', lineHeight: 1 }}
          >
            The Twilight.
          </motion.h2>
        </div>

        <TrophicWeb />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem', alignItems: 'center' }}>
          <LightExtinction />
          <MigrationClock />
        </div>

      </div>
    </section>
  );
};

export default TwilightZone;
