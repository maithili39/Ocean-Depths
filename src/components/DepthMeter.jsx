// SECTION: DepthMeter — sticky depth gauge that tracks scroll position
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MAX_DEPTH = 11000;

const zones = [
  { label: 'SURFACE',       depth: 0,     color: '#00e5ff' },
  { label: 'TWILIGHT ZONE', depth: 1000,  color: '#00bcd4' },
  { label: 'MIDNIGHT ZONE', depth: 4000,  color: '#0ff5c8' },
  { label: 'ABYSSAL PLAIN', depth: 6000,  color: '#ff9800' },
  { label: 'HADAL ZONE',    depth: 11000, color: '#ff4444' },
];

const DepthMeter = () => {
  const { scrollYProgress } = useScroll();
  const [depth, setDepth] = useState(0);
  const [zone, setZone]   = useState(zones[0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    return scrollYProgress.on('change', v => {
      const d = Math.round(v * MAX_DEPTH);
      setDepth(d);
      // Find current zone
      let current = zones[0];
      for (const z of zones) {
        if (d >= z.depth) current = z;
      }
      setZone(current);
    });
  }, [scrollYProgress]);

  const fillPercent = (depth / MAX_DEPTH) * 100;
  const isDeep = depth >= 6000;

  if (isMobile) {
    // Mobile: top bar
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '8px 20px',
        background: 'rgba(2,8,16,0.85)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${isDeep ? 'rgba(255,68,68,0.4)' : 'rgba(0,229,255,0.2)'}`,
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        <span style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.65rem',
          color: isDeep ? '#ff4444' : '#00e5ff',
          letterSpacing: '0.1em',
          textShadow: isDeep ? '0 0 10px #ff4444' : '0 0 10px #00e5ff',
        }}>
          ▼ {depth.toLocaleString()}m
        </span>
        <div style={{ flex: 1, height: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: '1px' }}>
          <motion.div
            style={{
              height: '100%',
              borderRadius: '1px',
              background: isDeep
                ? 'linear-gradient(90deg, #ff9800, #ff4444)'
                : 'linear-gradient(90deg, #00e5ff, #0ff5c8)',
              boxShadow: isDeep ? '0 0 6px #ff4444' : '0 0 6px #00e5ff',
            }}
            animate={{ width: `${fillPercent}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <span style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.6rem',
          color: 'rgba(122,179,200,0.6)',
          letterSpacing: '0.08em',
          whiteSpace: 'nowrap',
        }}>
          {zone.label}
        </span>
      </div>
    );
  }

  // Desktop: right sidebar gauge
  return (
    <div style={{
      position: 'fixed',
      right: '28px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      userSelect: 'none',
    }}>
      {/* Depth number */}
      <div style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '0.65rem',
        color: isDeep ? '#ff4444' : '#00e5ff',
        textAlign: 'center',
        letterSpacing: '0.05em',
        textShadow: isDeep
          ? '0 0 12px rgba(255,68,68,0.8)'
          : '0 0 12px rgba(0,229,255,0.7)',
        transition: 'color 0.5s, text-shadow 0.5s',
        writingMode: 'horizontal-tb',
        lineHeight: 1.3,
      }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>
          {depth.toLocaleString()}
        </span>
        <br />
        <span style={{ opacity: 0.7 }}>m</span>
      </div>

      {/* Vertical gauge track */}
      <div style={{
        width: '2px',
        height: '140px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '1px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            background: isDeep
              ? 'linear-gradient(to top, #ff4444, #ff9800)'
              : 'linear-gradient(to top, #00e5ff, #0ff5c8)',
            boxShadow: isDeep ? '0 0 6px #ff4444' : '0 0 6px #00e5ff',
            borderRadius: '1px',
          }}
          animate={{ height: `${fillPercent}%` }}
          transition={{ duration: 0.15 }}
        />
      </div>

      {/* Zone label vertical */}
      <div style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '0.55rem',
        color: isDeep ? 'rgba(255,68,68,0.7)' : 'rgba(0,229,255,0.55)',
        writingMode: 'vertical-rl',
        letterSpacing: '0.12em',
        marginTop: '4px',
        textTransform: 'uppercase',
        transition: 'color 0.5s',
        maxHeight: '100px',
        overflow: 'hidden',
      }}>
        {zone.label}
      </div>
    </div>
  );
};

export default DepthMeter;
