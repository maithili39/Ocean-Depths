import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yContent = useTransform(scrollYProgress, [0, 1], ['0vh', '15vh']);

  return (
    <section 
      ref={ref} 
      className="section-full"
      style={{
        background: 'radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.05), transparent 50%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        animation: 'surfaceCaustics 20s infinite alternate linear',
        backgroundImage: 'radial-gradient(ellipse at center, rgba(72,202,228,0.1) 0%, transparent 60%)',
        backgroundSize: '200% 200%'
      }}
    >
      <motion.div style={{ y: yContent, display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', gap: '6vw', padding: '0 5vw' }}>
        
        {/* Left Side: Text Content - Centered */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ flex: 1, position: 'relative', zIndex: 10 }}
        >
           <h1 className="editorial-title" style={{
             fontSize: 'clamp(80px, 12vw, 180px)',
             lineHeight: 0.95,
             letterSpacing: '-0.02em',
             marginBottom: '20px'
           }}>
             ABYSS
           </h1>
           
           {/* Etymology Section - Enhanced */}
           <motion.div 
             initial={{ opacity: 0, y: -15 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2, duration: 0.6 }}
             style={{
               display: 'flex', alignItems: 'center', gap: '15px',
               marginBottom: '40px',
               position: 'relative'
             }}
           >
             {/* Left accent line */}
             <motion.div
               initial={{ scaleX: 0 }}
               animate={{ scaleX: 1 }}
               transition={{ delay: 0.35, duration: 0.5 }}
               style={{
                 width: '30px', height: '2px',
                 background: 'linear-gradient(90deg, rgba(0,255,255,0.5) 0%, rgba(0,255,255,0.8) 100%)',
                 boxShadow: '0 0 10px 0 rgba(0,255,255,0.6)'
               }}
             />
             
             {/* Etymology content */}
             <motion.div style={{
               fontFamily: 'var(--font-mono)',
               fontSize: 'clamp(0.8rem, 1.1vw, 1rem)',
               color: 'var(--accent-surface)',
               textTransform: 'uppercase',
               letterSpacing: '0.3em',
               fontWeight: 500,
               textShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
             }}>
               <span style={{ color: 'rgba(255,255,255,0.6)' }}>●</span>
               <span style={{ margin: '0 12px', color: 'rgba(255,255,255,0.4)' }}>│</span>
               <span style={{ fontStyle: 'italic', letterSpacing: '0.15em' }}>uh-bis</span>
               <span style={{ margin: '0 12px', color: 'rgba(255,255,255,0.4)' }}>·</span>
               <span style={{ fontSize: '0.9em', color: 'rgba(255,255,255,0.65)' }}>noun</span>
             </motion.div>
             
             {/* Right accent line */}
             <motion.div
               initial={{ scaleX: 0 }}
               animate={{ scaleX: 1 }}
               transition={{ delay: 0.4, duration: 0.5 }}
               style={{
                 width: '30px', height: '2px',
                 background: 'linear-gradient(90deg, rgba(0,255,255,0.8) 0%, rgba(0,255,255,0.5) 100%)',
                 boxShadow: '0 0 10px 0 rgba(0,255,255,0.6)'
               }}
             />
           </motion.div>
           
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.3, duration: 0.7 }}
             className="body-narrow" 
             style={{
               fontSize: 'clamp(1.1rem, 1.3vw, 1.4rem)', 
               color: 'rgba(255,255,255,0.75)',
               marginBottom: '50px', 
               maxWidth: '38ch',
               fontStyle: 'italic', 
               lineHeight: '1.8',
               position: 'relative',
               paddingLeft: '20px',
               borderLeft: '3px solid rgba(0,180,216,0.4)',
               paddingRight: '20px'
             }}
           >
             A deep or seemingly bottomless chasm. The region of the global ocean floor, perpetually devoid of light, where pressure transforms the physical world.
           </motion.p>

           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4, duration: 0.6 }}
             style={{
               display: 'flex',
               alignItems: 'center',
               gap: '18px',
               marginBottom: '20px',
               position: 'relative'
             }}
           >
             {/* Top accent bar */}
             <motion.div
               initial={{ scaleX: 0 }}
               animate={{ scaleX: 1 }}
               transition={{ delay: 0.55, duration: 0.4 }}
               style={{
                 height: '2px',
                 flex: 1,
                 background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)'
               }}
             />
             
             <motion.div 
               style={{
                 fontFamily: 'var(--font-body)', 
                 textTransform: 'uppercase',
                 letterSpacing: '0.4em', 
                 fontSize: '0.95rem',
                 color: 'rgba(255,255,255,0.9)', 
                 whiteSpace: 'nowrap',
                 fontWeight: 600
               }}
             >
               AN OCEAN DESCENT IN SEVEN ACTS
             </motion.div>
             
             <motion.div
               initial={{ scaleX: 0 }}
               animate={{ scaleX: 1 }}
               transition={{ delay: 0.55, duration: 0.4 }}
               style={{
                 height: '2px',
                 flex: 1,
                 background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)'
               }}
             />
           </motion.div>
           
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5, duration: 0.6 }}
             style={{
               fontFamily: 'var(--font-mono)', 
               fontSize: '0.75rem',
               letterSpacing: '0.2em', 
               color: 'rgba(255,255,255,0.55)',
               display: 'flex',
               gap: '18px',
               alignItems: 'center'
             }}
           >
             <span style={{ display: 'inline-block', width: '20px', height: '1px', background: 'rgba(255,255,255,0.3)' }} />
             <span>00°N 142°E</span>
             <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
             <span>PACIFIC OCEAN</span>
             <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
             <span style={{ color: 'rgba(0,180,216,0.6)' }}>CURRENT ERA</span>
             <span style={{ display: 'inline-block', width: '20px', height: '1px', background: 'rgba(255,255,255,0.3)' }} />
           </motion.div>
        </motion.div>

        {/* Right Side: Breathing surface - Enhanced */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ flex: 1, position: 'relative', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
           {/* Radial glow backdrop */}
           <motion.div
             style={{
               position: 'absolute',
               width: '480px',
               height: '480px',
               background: 'radial-gradient(circle, rgba(0,255,255,0.15) 0%, transparent 70%)',
               borderRadius: '50%',
               filter: 'blur(40px)',
               zIndex: 1
             }}
             animate={{
               boxShadow: [
                 '0 0 40px rgba(0,255,255,0.3)',
                 '0 0 80px rgba(0,255,255,0.5)',
                 '0 0 40px rgba(0,255,255,0.3)'
               ]
             }}
             transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
           />

           {/* Breathing orbs - Enhanced */}
           {[...Array(5)].map((_, i) => (
             <motion.div
               key={i}
               style={{
                 position: 'absolute',
                 width: `${160 + i*45}px`,
                 height: `${160 + i*45}px`,
                 background: `radial-gradient(ellipse at 30% 30%, rgba(72, 202, 228, ${0.1 + (0.015 * i)}), rgba(0, 255, 255, ${0.02 + (0.008 * i)}))`,
                 mixBlendMode: 'screen',
                 border: `1px solid rgba(0,180,216,${0.15 + (0.05 * i)})`,
                 borderRadius: '50%',
                 boxShadow: `0 0 ${20 + i*5}px rgba(0,180,216,${0.1 + (0.03 * i)})`,
                 zIndex: 5 - i
               }}
               animate={{
                 borderRadius: [
                   `${40 + Math.random()*25}% ${60 - Math.random()*25}% ${50 + Math.random()*25}% ${70 - Math.random()*25}%`,
                   `${55 - Math.random()*20}% ${45 + Math.random()*20}% ${65 - Math.random()*20}% ${55 + Math.random()*20}%`,
                   `${40 + Math.random()*25}% ${60 - Math.random()*25}% ${50 + Math.random()*25}% ${70 - Math.random()*25}%`
                 ],
                 boxShadow: [
                   `0 0 ${20 + i*5}px rgba(0,180,216,${0.1 + (0.03 * i)})`,
                   `0 0 ${25 + i*8}px rgba(0,255,255,${0.2 + (0.05 * i)})`,
                   `0 0 ${20 + i*5}px rgba(0,180,216,${0.1 + (0.03 * i)})`
                 ]
               }}
               transition={{
                 duration: 16 + i*3.5, repeat: Infinity, ease: 'easeInOut'
               }}
             />
           ))}
        </motion.div>
      </motion.div>



      {/* Custom Vertical Scroll Indicator */}
      <div style={{ position: 'absolute', bottom: 0, right: '10vw', width: '1px', height: '140px', background: 'rgba(255,255,255,0.1)' }}>
        <motion.div
           animate={{ y: [0, 140] }}
           transition={{ duration: 2.2, ease: [0.55, 0, 1, 0.45], repeat: Infinity }}
           style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-surface)', marginLeft: '-2px' }}
        />
      </div>
    </section>
  );
};

export default Hero;
