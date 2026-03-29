import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValueEvent } from 'framer-motion';

const CustomCursor = ({ scrollYProgress }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [trail, setTrail] = useState([]);
  
  const depthRef = useRef(0);

  // Bind depth without triggering component renders
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    depthRef.current = Math.round(v * 11034);
  });

  useEffect(() => {
    let t = [];
    const update = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      
      const target = e.target.closest('a, button, [role="button"], .hover-target, input[type="range"]');
      setHovering(!!target);

      // Trailing in logic only when deep
      if (depthRef.current > 1000 && depthRef.current < 10000) {
        t.push({ x: e.clientX, y: e.clientY, id: Date.now() });
        if (t.length > 3) t.shift();
        setTrail([...t]);
      } else {
         if (t.length > 0) { t = []; setTrail([]); }
      }
    };
    window.addEventListener('mousemove', update);
    return () => window.removeEventListener('mousemove', update);
  }, []);

  // Decay trail
  useEffect(() => {
    const i = setInterval(() => {
      setTrail(curr => (curr.length > 0 ? curr.slice(1) : []));
    }, 80);
    return () => clearInterval(i);
  }, []);

  // Sonar crosshair check (re-render triggered naturally by mouse moves here)
  const isSonarRange = depthRef.current > 1000 && depthRef.current < 4000;

  return (
    <>
      <AnimatePresence>
        {trail.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0.4, scale: 0.5 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', left: t.x - 4, top: t.y - 4,
              width: '8px', height: '8px', borderRadius: '50%',
              background: 'var(--bio-blue)', zIndex: 10000, pointerEvents: 'none',
              willChange: 'transform, opacity'
            }}
          />
        ))}
      </AnimatePresence>

      <motion.div
        animate={{
          x: pos.x - (hovering ? 20 : 4),
          y: pos.y - (hovering ? 20 : 4),
          width: hovering ? 40 : 8,
          height: hovering ? 40 : 8,
          background: hovering ? 'transparent' : 'rgba(255,255,255,0.5)',
          border: hovering ? '1px solid currentColor' : 'none'
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
        className="mono-reading" // Inherits accent color
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 10001, pointerEvents: 'none', borderRadius: '50%',
          color: 'var(--accent-current-zone)',
          willChange: 'transform'
        }}
      >
        {isSonarRange && !hovering && (
          <div style={{ position: 'absolute', inset: '-16px', border: '1px dashed currentColor', borderRadius: '50%', opacity: 0.3, animation: 'spin 4s linear infinite' }}/>
        )}
      </motion.div>

      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </>
  );
};

export default CustomCursor;
