import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useJournal } from '../../context/JournalContext';

// 1. Encounter Log Module
const EncounterLog = () => {
  const { logEntry, entries } = useJournal();
  
  const creatures = [
    { id: 'c1', name: 'ARCHITEUTHIS DUX', common: 'Giant Squid', depth: 2340, len: '13m', glow: 'ACTIVE', notes: 'Engaged in combat with sperm whale.' },
    { id: 'c2', name: 'MELANOCETUS JOHNSONII', common: 'Humpback Anglerfish', depth: 1560, len: '15cm', glow: 'ESCA ACTIVE', notes: 'Lure pulsing rhythmically. Pitch black body.' },
    { id: 'c3', name: 'VAMPYROTEUTHIS INFERNALIS', common: 'Vampire Squid', depth: 850, len: '30cm', glow: 'PHOTOPHORES ACTIVE', notes: 'Inverted into defense posture.' }
  ];

  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState('hidden'); // hidden, observed, logged
  const current = creatures[idx];

  const handleLog = () => {
    logEntry(current.id, current.name, current.depth, current.notes);
    setPhase('logged');
  };

  const handleWithdraw = () => {
    setPhase('hidden');
    setIdx((idx + 1) % creatures.length); // Next creature
  };

  const isAlreadyLogged = entries.some(e => e.id === current.id);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass-panel"
      style={{ width: '400px', fontFamily: 'var(--font-mono)' }}
    >
      <div style={{ borderBottom: '1px dashed var(--accent-midnight)', paddingBottom: '10px', marginBottom: '20px', color: 'var(--accent-midnight)' }}>
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━<br/>
        CONTACT REPORT — {new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})} UTC<br/>
        BEARING: 247°  DEPTH: {current.depth}m<br/>
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      </div>

      <div style={{ position: 'relative', height: '180px', marginBottom: '20px' }}>
        <AnimatePresence mode="wait">
          {phase === 'hidden' && (
            <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <div style={{ width: '100px', height: '100px', border: '1px solid var(--accent-midnight)', borderRadius: '50%', position: 'relative' }}>
                 <div style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', height: '1px', background: 'var(--accent-midnight)', transformOrigin: 'left center', animation: 'radarSweep 2s linear infinite' }}/>
                 <div style={{ position: 'absolute', top: '30%', left: '60%', width: '4px', height: '4px', background: '#fff', borderRadius: '50%', boxShadow: '0 0 5px #fff', animation: 'ping 2s infinite' }}/>
               </div>
            </motion.div>
          )}

          {phase !== 'hidden' && (
            <motion.div key="data" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ color: '#fff' }}>
              <div>CLASSIFICATION: <span style={{ color: 'var(--accent-midnight)' }}>{current.name}</span></div>
              <div style={{ opacity: 0.5, fontSize: '0.8rem', marginBottom: '10px' }}>({current.common})</div>
              <div>ESTIMATED LENGTH: {current.len}</div>
              <div>BIOLUMINESCENCE: <span style={{ color: current.glow.includes('ACTIVE') ? 'var(--bio-blue)' : '#fff' }}>{current.glow}</span></div>
              
              {phase === 'logged' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} style={{ marginTop: '15px', padding: '10px', background: 'rgba(0, 180, 216, 0.1)', borderLeft: '2px solid var(--accent-midnight)', color: 'var(--accent-midnight)' }}>
                  [LOGGED] {current.notes}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{ borderTop: '1px dashed var(--accent-midnight)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        {phase === 'hidden' ? (
          <button onClick={() => setPhase('observed')} className="hover-target" style={{ flex: 1, background: 'var(--accent-midnight)', color: '#000', border: 'none', padding: '10px', cursor: 'pointer', fontFamily: 'inherit' }}>[OBSERVE]</button>
        ) : (
          <>
            <button onClick={handleLog} disabled={phase==='logged' || isAlreadyLogged} className="hover-target" style={{ flex: 1, background: 'transparent', border: '1px solid var(--accent-midnight)', color: (phase==='logged'||isAlreadyLogged) ? 'rgba(255,255,255,0.2)' : 'var(--accent-midnight)', padding: '10px', cursor: (phase==='logged'||isAlreadyLogged)?'not-allowed':'pointer', fontFamily: 'inherit', marginRight: '10px' }}>
              [LOG{phase==='logged'||isAlreadyLogged ? 'GED' : ''}]
            </button>
            <button onClick={handleWithdraw} className="hover-target" style={{ flex: 1, background: 'transparent', border: '1px dashed #ff4444', color: '#ff4444', padding: '10px', cursor: 'pointer', fontFamily: 'inherit' }}>[WITHDRAW]</button>
          </>
        )}
      </div>
      <style>{`@keyframes radarSweep { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </motion.div>
  );
};

// 2. Pressure Body Simulator
const PressureBody = () => {
  const [pDepth, setPDepth] = useState(0);

  // Math for deformation
  const lungScaleX = Math.max(0.2, 1 - (pDepth / 4000));
  const lungScaleY = Math.max(0.3, 1 - (pDepth / 3000));
  const bodySkews = pDepth > 2000 ? `skewX(${Math.sin(pDepth)*5}deg)` : 'none';
  const atm = Math.round(1 + (pDepth / 10));

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="glass-panel"
      style={{ display: 'flex', gap: '40px' }}
    >
       {/* Body Outline */}
       <div style={{ width: '150px', position: 'relative', transform: bodySkews, transition: 'transform 0.1s linear' }}>
          <svg width="150" height="300" viewBox="0 0 100 200">
             {/* Human Outline */}
             <path d="M 50 10 C 60 10 65 20 65 30 C 65 40 55 45 50 45 C 45 45 35 40 35 30 C 35 20 40 10 50 10 Z 
                      M 35 45 L 20 60 L 20 120 M 65 45 L 80 60 L 80 120 M 35 45 L 65 45 L 65 110 L 55 200 M 35 45 L 35 110 L 45 200"
                   fill="none" stroke={pDepth > 1000 ? "#ff4444" : "#fff"} strokeWidth="2"
                   style={{ transition: 'stroke 0.3s' }}
             />
             {/* Lungs */}
             <g style={{ transform: `scale(${lungScaleX}, ${lungScaleY})`, transformOrigin: '50px 60px', transition: 'transform 0.1s linear' }}>
               <ellipse cx="42" cy="65" rx="8" ry="15" fill={pDepth > 2000 ? "#ff4444" : "var(--bio-blue)"} opacity="0.8"/>
               <ellipse cx="58" cy="65" rx="8" ry="15" fill={pDepth > 2000 ? "#ff4444" : "var(--bio-blue)"} opacity="0.8"/>
             </g>
             {/* Nitrogen Alert */}
             {pDepth >= 40 && <circle cx="50" cy="25" r="5" fill="#ff4444" animation="ping 1s infinite"/>}
          </svg>
       </div>

       {/* Controls & Data */}
       <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h4 className="mono-reading" style={{ marginBottom: '20px' }}>PHYSIOLOGICAL STRESS SIMULATOR</h4>
          
          <input 
             type="range" min="0" max="4000" value={pDepth} onChange={e => setPDepth(Number(e.target.value))}
             style={{ width: '100%', marginBottom: '10px', accentColor: pDepth > 1000 ? '#ff4444' : '#fff' }}
          />
          <div className="mono-reading" style={{ display: 'flex', justifyContent: 'space-between', color: pDepth>1000?'#ff4444':'#fff' }}>
            <span>{pDepth}m</span>
            <span>{atm} ATM</span>
          </div>

          <div style={{ marginTop: '30px', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {pDepth >= 10 && <div style={{color:'#fff'}}>&gt; 10m: Ears pop. Pressure has doubled.</div>}
            {pDepth >= 30 && <div style={{color:'#ffaa00'}}>&gt; 30m: Nitrogen narcosis risk begins.</div>}
            {pDepth >= 214 && <div style={{color:'#ff4444'}}>&gt; 214m: Deepest human freedive ever recorded (2023).</div>}
            {pDepth >= 1000 && <div style={{color:'#ff0000'}}>&gt; 1000m: Instantaneous ribcage collapse.</div>}
            {pDepth >= 4000 && <div style={{color:'var(--bio-blue)'}}>&gt; 4000m: Only 3 crewed vehicles have reached this depth.</div>}
          </div>
       </div>
    </motion.div>
  );
};

// 3. Bioluminescence Encyclopedia
const BioluminescenceEncyclopedia = () => {
  const [active, setActive] = useState(null);
  const specimens = [
    { id: 'vamp', name: 'Vampire Squid', sci: 'Vampyroteuthis infernalis', glow: 'Deep blue-violet', mech: 'Photophores along body', fact: 'Can invert its body like an umbrella when threatened. The last of its kind.', power: 'Umbrella Inversion' },
    { id: 'comb', name: 'Comb Jelly', sci: 'Ctenophora', glow: 'Rainbow iridescence', mech: 'Cilia plates', fact: 'Not actually bioluminescent via chemical reaction, but scatters light through moving cilia.', power: 'Light Scattering' },
    { id: 'angler', name: 'Anglerfish', sci: 'Melanocetus', glow: 'Neon Green', mech: 'Symbiotic bacteria', fact: 'The glowing lure is called an esca. Only females have them.', power: 'Lure Mimicry' }
  ];

  return (
    <div style={{ marginTop: '10vh', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '60px' }}>
      <h3 className="editorial-title" style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Bioluminescence Encyclopedia</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {specimens.map(s => (
          <motion.div 
            key={s.id} 
            whileHover={{ scale: 1.02 }}
            onClick={() => setActive(active?.id === s.id ? null : s)}
            className="hover-target"
            style={{ 
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', 
              padding: '20px', cursor: 'pointer', position: 'relative', overflow: 'hidden'
            }}
          >
            <div style={{ width: '40px', height: '40px', background: s.glow.toLowerCase().includes('green') ? '#00ffff' : (s.glow.toLowerCase().includes('violet') ? '#8a2be2' : '#fff'), borderRadius: '50%', filter: 'blur(10px)', opacity: 0.6, marginBottom: '15px' }}/>
            <div className="mono-reading" style={{ fontSize: '1.1rem' }}>{s.name}</div>
            <div className="mono-reading" style={{ fontSize: '0.7rem', opacity: 0.5 }}>{s.sci}</div>
            
            <AnimatePresence>
              {active?.id === s.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: 'hidden', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}
                >
                  <div className="mono-reading" style={{ fontSize: '0.8rem', color: 'var(--accent-midnight)', marginBottom: '10px' }}>MECHANISM: {s.mech}</div>
                  <p className="body-narrow" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>{s.fact}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Main Component
const MidnightZone = () => {
  const canvasRef = useRef(null);

  // Background ping canvas (kept intact for performance)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let rings = [];
    
    const resize = () => { canvas.width = window.innerWidth; canvas.height = canvas.parentElement.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    
    let animationFrame;
    const ping = (x, y) => rings.push({ x, y, r: 0, opacity: 1 });
    const int = setInterval(() => { ping(canvas.width / 2, Math.random() * canvas.height); }, 6000);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rings = rings.filter(r => r.opacity > 0.01);
      
      rings.forEach(ring => {
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 255, 255, ${ring.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ring.r += 6; 
        ring.opacity *= 0.98;
      });
      animationFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animationFrame); clearInterval(int); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section style={{ minHeight: '180vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.3 }}/>
      
      <div style={{ position: 'relative', zIndex: 10, padding: '15vh 10vw' }}>
        
        {/* Title Block */}
        <div style={{ marginBottom: '15vh' }}>
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mono-reading" 
            style={{ color: 'var(--accent-midnight)', marginBottom: '20px', letterSpacing: '0.35em', fontSize: 'clamp(0.75rem, 1vw, 0.95rem)', fontWeight: 600, textShadow: '0 0 15px rgba(0,150,199,0.3)' }}
          >
            03 — BATHYPELAGIC
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="editorial-title" 
            style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', color: 'var(--accent-midnight)', textShadow: '0 0 30px rgba(0, 180, 216, 0.2)' }}
          >
            Total Darkness.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-narrow" 
            style={{ fontSize: '1.25rem', marginTop: '2rem' }}
          >
            No sunlight has ever reached here. Pressure stops becoming a number and starts becoming a physical character.
          </motion.p>
        </div>

        {/* Modules Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(400px, 1.2fr)', gap: '10vw' }}>
           <div>
             <h3 className="editorial-title" style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Deep Sea Encounters</h3>
             <EncounterLog />
           </div>
           
           <div>
             <h3 className="editorial-title" style={{ fontSize: '2.5rem', marginBottom: '30px' }}>The Weight of Water</h3>
             <PressureBody />
           </div>
        </div>

        <BioluminescenceEncyclopedia />

      </div>
    </section>
  );
};

export default MidnightZone;
