// SECTION: ParticleField — bioluminescent floating particles
import { useMemo } from 'react';

const ParticleField = ({ count = 25, style = {} }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 1.5,
      delay: `${Math.random() * 12}s`,
      duration: `${Math.random() * 10 + 12}s`,
      drift: `${(Math.random() - 0.5) * 80}px`,
      color: Math.random() > 0.5 ? '#00e5ff' : '#0ff5c8',
      opacity: Math.random() * 0.6 + 0.2,
    }));
  }, [count]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
        ...style,
      }}
    >
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            opacity: p.opacity,
            '--drift': p.drift,
            animation: `particleFloat ${p.duration} ${p.delay} infinite linear`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleField;
