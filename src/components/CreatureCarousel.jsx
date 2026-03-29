// SECTION: CreatureCarousel — drag-based creature showcase
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const creatures = [
  {
    emoji: '🐟',
    name: 'Anglerfish',
    depth: '200m – 2000m',
    fact: 'Its bioluminescent lure dangles from its head like a lantern — a beacon of death in total darkness. Females are 60x larger than males, who fuse onto their bodies forever.',
    color: '#ff6b35',
  },
  {
    emoji: '🦑',
    name: 'Giant Squid',
    depth: '300m – 1000m',
    fact: 'With eyes the size of dinner plates — up to 30cm across — they are the largest eyes in the animal kingdom. They wield tentacles lined with razor-sharp hooks.',
    color: '#9c27b0',
  },
  {
    emoji: '🐍',
    name: 'Viperfish',
    depth: '250m – 5000m',
    fact: 'Its needle-like fangs are so long they cannot fit inside its mouth. It impales prey with its own body, swimming at high speed like a living spear.',
    color: '#00e5ff',
  },
  {
    emoji: '🪼',
    name: 'Barreleye Fish',
    depth: '400m – 800m',
    fact: 'Its transparent dome-shaped head reveals tubular eyes that rotate inside its skull — looking up through its forehead to spot prey silhouetted from above.',
    color: '#0ff5c8',
  },
  {
    emoji: '🦀',
    name: 'Yeti Crab',
    depth: '2200m – 2600m',
    fact: 'Discovered in 2005, this ghostly white crab farms bacteria on its own silky arm-hair, then harvests and eats them in the superheated vents of hydrothermal fields.',
    color: '#e0e0e0',
  },
];

const CreatureCarousel = () => {
  const [index, setIndex]   = useState(0);
  const dragRef             = useRef(null);

  const prev = () => setIndex(i => Math.max(0, i - 1));
  const next = () => setIndex(i => Math.min(creatures.length - 1, i + 1));

  const creature = creatures[index];

  return (
    <div style={{ width: '100%', maxWidth: '760px', margin: '0 auto', userSelect: 'none' }}>
      {/* Navigation arrows */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
        <button
          onClick={prev}
          disabled={index === 0}
          style={{
            background: 'none',
            border: '1px solid rgba(0,229,255,0.3)',
            color: index === 0 ? 'rgba(0,229,255,0.2)' : '#00e5ff',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            cursor: index === 0 ? 'not-allowed' : 'pointer',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s',
            flexShrink: 0,
          }}
          aria-label="Previous creature"
        >
          ←
        </button>

        {/* Card container with drag */}
        <div style={{ flex: 1, overflow: 'hidden', borderRadius: '16px' }} ref={dragRef}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) next();
              if (info.offset.x > 60)  prev();
            }}
            style={{
              background: `linear-gradient(135deg, rgba(10,22,40,0.8), rgba(2,8,16,0.95))`,
              border: `1px solid ${creature.color}33`,
              borderRadius: '16px',
              padding: '40px',
              boxShadow: `0 0 60px ${creature.color}18, inset 0 1px 0 ${creature.color}22`,
              backdropFilter: 'blur(16px)',
              cursor: 'grab',
            }}
            whileTap={{ cursor: 'grabbing' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', textAlign: 'center' }}>
              {/* Creature emoji */}
              <div style={{
                fontSize: '5rem',
                lineHeight: 1,
                filter: `drop-shadow(0 0 30px ${creature.color}aa)`,
                animation: 'floatUp 4s ease-in-out infinite',
              }}>
                {creature.emoji}
              </div>

              {/* Name */}
              <h3 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 700,
                color: creature.color,
                textShadow: `0 0 30px ${creature.color}88`,
                letterSpacing: '-0.01em',
              }}>
                {creature.name}
              </h3>

              {/* Depth badge */}
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.7rem',
                color: 'rgba(122,179,200,0.7)',
                letterSpacing: '0.15em',
                padding: '4px 14px',
                border: `1px solid ${creature.color}44`,
                borderRadius: '20px',
                textTransform: 'uppercase',
              }}>
                {creature.depth}
              </div>

              {/* Fact */}
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
                color: '#a8d4e0',
                lineHeight: 1.75,
                maxWidth: '520px',
                fontWeight: 300,
              }}>
                {creature.fact}
              </p>
            </div>
          </motion.div>
        </div>

        <button
          onClick={next}
          disabled={index === creatures.length - 1}
          style={{
            background: 'none',
            border: '1px solid rgba(0,229,255,0.3)',
            color: index === creatures.length - 1 ? 'rgba(0,229,255,0.2)' : '#00e5ff',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            cursor: index === creatures.length - 1 ? 'not-allowed' : 'pointer',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s',
            flexShrink: 0,
          }}
          aria-label="Next creature"
        >
          →
        </button>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '24px' }}>
        {creatures.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to creature ${i + 1}`}
            style={{
              width: i === index ? '24px' : '7px',
              height: '7px',
              borderRadius: '4px',
              background: i === index ? '#00e5ff' : 'rgba(0,229,255,0.25)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.35s ease',
              boxShadow: i === index ? '0 0 8px #00e5ff' : 'none',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CreatureCarousel;
