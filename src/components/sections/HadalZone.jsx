import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

// 1. Who Has Been Here
const TrenchExplorers = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel"
      style={{ margin: '3rem 0' }}
    >
       <h4 className="mono-reading" style={{ color: 'var(--accent-hadal)', marginBottom: '2rem' }}>HUMAN PRESENCE COMPARISON</h4>
       <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
         <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="mono-reading" style={{ width: '250px' }}>Walked on the Moon</div>
            <div style={{ display: 'flex', gap: '8px' }}>{[...Array(12)].map((_,i)=><div key={i} style={{width:'8px',height:'8px',background:'#fff',borderRadius:'50%'}}/>)}</div>
            <div className="mono-reading" style={{ color: '#fff', marginLeft: '20px' }}>12</div>
         </div>
         <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="mono-reading" style={{ width: '250px' }}>Summited Everest</div>
            <div style={{ display: 'flex', gap: '8px' }}>{[...Array(20)].map((_,i)=><div key={i} style={{width:'8px',height:'8px',background:'rgba(255,255,255,0.3)',borderRadius:'50%'}}/>)}<span className="mono-reading" style={{marginLeft:'10px', opacity: 0.5}}>(×324)</span></div>
         </div>
         <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="mono-reading" style={{ width: '250px', color: 'var(--accent-hadal)' }}>Challenger Deep</div>
            <div style={{ display: 'flex', gap: '8px' }}>{[...Array(22)].map((_,i)=><div key={i} style={{width:'8px',height:'8px',background:'var(--accent-hadal)',borderRadius:'50%',boxShadow:`0 0 10px var(--accent-hadal)`}}/>)}</div>
            <div className="mono-reading" style={{ color: 'var(--accent-hadal)', marginLeft: '20px' }}>22</div>
         </div>
       </div>
    </motion.div>
  );
};

// 2. Scale Ruler
const DepthScaleRuler = () => {
  const data = [
    { name: 'Empire State', height: '443m', count: 'Stacked 24 times' },
    { name: 'Burj Khalifa', height: '828m', count: 'Stacked 13 times' },
    { name: 'Mount Everest', height: '8,849m', count: 'Submerged with 2km to spare' }
  ];

  return (
     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', margin: '4rem 0' }}>
       {data.map((d, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel"
            style={{ borderLeft: '3px solid var(--accent-hadal)' }}
          >
             <h4 className="mono-reading" style={{ color: 'var(--accent-hadal)', fontSize: '0.75rem', marginBottom: '1rem' }}>{d.name.toUpperCase()}</h4>
             <div className="mono-reading" style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#fff' }}>{d.height}</div>
             <p className="body-narrow" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>{d.count}</p>
          </motion.div>
       ))}
     </div>
  );
};

// 3. Creature Profile (3D Flip)
const SpecimenCard = () => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div 
      className="hover-target"
      onClick={() => setFlipped(!flipped)}
      style={{
        perspective: '1000px', width: '350px', height: '450px',
        margin: '60px auto', cursor: 'pointer'
      }}
    >
      <motion.div
         animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
         style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div style={{ position: 'absolute', inset: 0, background: '#e0e6ed', color: '#1a1f24', padding: '30px', backfaceVisibility: 'hidden', border: '1px solid #1a1f24', boxShadow: '10px 10px 30px rgba(0,0,0,0.8)' }}>
           <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', fontSize: '30px' }}>📌</div>
           <div className="mono-reading" style={{ fontSize: '0.7rem', color: '#1a1f24', opacity: 0.6, borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '10px', marginBottom: '20px' }}>SPECIMEN #4</div>
           
           <h3 className="editorial-title" style={{ fontSize: '2rem', marginBottom: '5px', color: '#1a1f24' }}>SNAILFISH</h3>
           <div style={{ fontStyle: 'italic', color: '#1a1f24', opacity: 0.8, marginBottom: '30px' }}>Pseudoliparis swirei</div>
           
           <div className="mono-reading" style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '10px', color: '#1a1f24' }}>
              <div>DEPTH: <span style={{fontWeight:'bold'}}>8,336m</span> (Record)</div>
              <div>LENGTH: <span style={{fontWeight:'bold'}}>28cm</span></div>
              <div style={{marginTop:'15px', color: '#1a1f24', opacity: 0.9}}>ADAPTATION:<br/>No swim bladder (would implode). Body is mostly water + TMAO antifreeze compound.</div>
           </div>
           
           <div style={{ position: 'absolute', bottom: '30px', fontStyle: 'italic', fontSize: '1.25rem', textAlign: 'center', width: 'calc(100% - 60px)', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '20px', color: '#1a1f24' }}>
             "Looks fragile. Is indestructible."
           </div>
        </div>
        {/* Back */}
        <div style={{ position: 'absolute', inset: 0, background: '#1a1f24', color: '#e0e6ed', padding: '30px', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', border: '1px solid #e0e6ed', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div className="mono-reading" style={{ fontSize: '0.7rem', letterSpacing: '2px', color: 'var(--accent-hadal)', marginBottom: '30px' }}>X-RAY ANATOMY / TMAO LEVELS</div>
           <svg width="200" height="100" viewBox="0 0 200 100">
              <path d="M 20 50 Q 100 0 180 50 Q 100 100 20 50 Z" fill="none" stroke="#e0e6ed" strokeWidth="2" strokeDasharray="4 4" opacity="0.5"/>
              <circle cx="150" cy="50" r="5" fill="#fff"/>
              <path d="M 40 50 L 140 50 M 60 35 L 60 65 M 80 25 L 80 75 M 100 20 L 100 80 M 120 25 L 120 75" fill="none" stroke="var(--accent-hadal)" strokeWidth="1"/>
           </svg>
           <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', fontFamily: 'monospace' }}>
             TMAO compound prevents proteins from crushing under extreme weight. The fish melts if brought to the surface.
           </div>
        </div>
      </motion.div>
    </div>
  );
};

// 4. Final Data Wall
const FinalDataWall = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  const lines = [
    "95% of the ocean remains unexplored.",
    "Better maps of Mars exist than our own ocean floor.",
    "It regulates our climate, produces our oxygen.",
    "The Mariana Trench contains:",
    "— Plastic bags",
    "— The Mariana snailfish",
    "— Silence",
    "It was here before us. It will be here after."
  ];

  return (
    <div ref={ref} style={{ margin: '15vh auto', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '3rem', textAlign: 'center', alignItems: 'center' }}>
       {lines.map((line, i) => (
         <motion.div
           key={i}
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: inView ? (i === lines.length - 1 ? 1 : 0.6) : 0, y: inView ? 0 : 30 }}
           transition={{ delay: i * 0.4, duration: 1.2, ease: 'easeOut' }}
           className={i === lines.length - 1 ? "editorial-title" : "body-narrow"}
           style={{ 
             fontSize: i === lines.length - 1 ? 'clamp(3rem, 6vw, 5rem)' : '1.3rem', 
             color: i === lines.length - 1 ? '#fff' : 'rgba(255,255,255,0.7)',
             marginTop: i === lines.length - 1 ? '3rem' : '0',
             textAlign: 'center',
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center'
           }}
         >
           {line}
         </motion.div>
       ))}
    </div>
  );
};

const HadalZone = ({ scrollYProgress }) => {
  // Pure DOM ref manipulation for final depth counter - Zero React Render Jank!
  const finalCounterRef = useRef(null);
  
  if (finalCounterRef.current) {
     scrollYProgress.on("change", (latest) => {
        if (!finalCounterRef.current) return;
        const mappedDepth = Math.min(11034, Math.max(6000, 6000 + ((latest - 0.8) * 25000)));
        if (mappedDepth > 6000) {
           finalCounterRef.current.textContent = Math.round(mappedDepth).toLocaleString() + 'm';
        }
     });
  }

  return (
    <section style={{ position: 'relative', width: '100%', padding: '15vh 10vw 0 10vw', overflow: 'hidden' }}>
      
      {/* Vantablack Background Override */}
      <div style={{ position: 'absolute', inset: 0, background: '#000000', zIndex: -1 }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        {/* Title */}
        <div style={{ marginBottom: '10vh' }}>
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mono-reading" 
            style={{ color: 'var(--accent-hadal)', marginBottom: '20px', letterSpacing: '0.35em', fontSize: 'clamp(0.75rem, 1vw, 0.95rem)', fontWeight: 600, textShadow: '0 0 15px rgba(100,200,255,0.3)' }}
          >
            05 — HADOPELAGIC
          </motion.div>
          <h2 className="editorial-title" style={{ fontSize: 'clamp(50px, 8vw, 120px)', lineHeight: 0.9 }}>The Trench.</h2>
        </div>

        <DepthScaleRuler />
        
        <div style={{ display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap' }}>
           <div style={{ flex: 1, minWidth: '400px' }}>
              <h3 className="editorial-title" style={{ fontSize: '3rem', marginBottom: '20px' }}>Final Frontier</h3>
              <p className="body-narrow" style={{ fontSize: '1.4rem', color: '#e0e6ed', lineHeight: 1.6 }}>
                 We are inside the tectonic scars of the Earth. The pressure here is over 1,000 times standard atmospheric level. It would crush a standard nuclear submarine like a tin can. And yet... life persists.
              </p>
              <TrenchExplorers />
           </div>
           
           <div style={{ flex: 1 }}>
              <SpecimenCard />
           </div>
        </div>

        <FinalDataWall />

        {/* 11,034m Final Destination Marker - Refined for zero extra space */}
        <div style={{ width: '100%', height: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          
          <div style={{ 
            fontSize: '15vw', fontFamily: 'var(--font-mono)', fontWeight: 'bold', 
            color: 'rgba(255,255,255,0.03)', position: 'absolute', top: '10vh', zIndex: 0 
          }} ref={finalCounterRef}>
             11,034m
          </div>

          <div 
             className="hover-target"
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
             style={{
               width: '50px', height: '50px', background: '#fff', borderRadius: '50%',
               boxShadow: '0 0 50px #fff, 0 0 100px rgba(255,255,255,0.4)', cursor: 'pointer', zIndex: 10,
               display: 'flex', justifyContent: 'center', alignItems: 'center',
               color: '#000', transition: 'transform 0.3s'
             }}
          >
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 19V5M5 12l7-7 7 7"/>
             </svg>
          </div>
          
          <div className="mono-reading" style={{ marginTop: '25px', color: '#fff', letterSpacing: '4px', zIndex: 10, fontSize: '10px' }}>EXIT ABYSS</div>
        </div>
      </div>
    </section>
  );
};

export default HadalZone;
