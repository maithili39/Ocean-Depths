import React, { createContext, useContext, useState, useMemo } from 'react';

// The 7 Zones
export const ZONES = [
  { id: 'surface',  name: 'Surface',       depth: 0,      maxDepth: 200,   color: '#00e5ff' },
  { id: 'sunlight', name: 'Sunlight Zone', depth: 200,    maxDepth: 1000,  color: '#00bcd4' },
  { id: 'twilight', name: 'Twilight Zone', depth: 1000,   maxDepth: 4000,  color: '#4fc3f7' },
  { id: 'midnight', name: 'Midnight Zone', depth: 4000,   maxDepth: 6000,  color: '#0ff5c8' },
  { id: 'abyssal',  name: 'Abyssal Zone',  depth: 6000,   maxDepth: 11000, color: '#ff9800' },
  { id: 'hadal',    name: 'Hadal Zone',    depth: 11000,  maxDepth: 11034, color: '#ff4444' },
  { id: 'finale',   name: 'Trench Floor',  depth: 11034,  maxDepth: 11034, color: '#ff0000' }
];

export const CREATURES_DATA = {
  anglerfish: {
    emoji: '🐟',
    name: 'Anglerfish',
    scientific: 'Melanocetus johnsonii',
    depth: '1,000m – 4,000m',
    fact: 'Its bioluminescent lure dangles from its head like a lantern — a beacon of death in total darkness. Females are 60x larger than males.',
    adaptations: 'Expandable stomach to eat prey twice its size.',
    color: '#ff6b35',
  },
  giantsquid: {
    emoji: '🦑',
    name: 'Giant Squid',
    scientific: 'Architeuthis dux',
    depth: '300m – 1,000m',
    fact: 'With eyes the size of dinner plates — up to 30cm across — they are the largest eyes in the animal kingdom.',
    adaptations: 'Razor-sharp beak and suckers lined with serrated rings.',
    color: '#9c27b0',
  },
  viperfish: {
    emoji: '🐍',
    name: 'Viperfish',
    scientific: 'Chauliodus sloani',
    depth: '250m – 5,000m',
    fact: 'Its needle-like fangs are so long they cannot fit inside its mouth. It impales prey with its own body.',
    adaptations: 'Hinged skull allows it to swallow massive prey whole.',
    color: '#00e5ff',
  },
  barreleye: {
    emoji: '🪼',
    name: 'Barreleye Fish',
    scientific: 'Macropinna microstoma',
    depth: '400m – 800m',
    fact: 'Its transparent dome-shaped head reveals tubular eyes that rotate inside its skull.',
    adaptations: 'Looks upward through its transparent head to spot prey silhouettes.',
    color: '#0ff5c8',
  },
  yeticrab: {
    emoji: '🦀',
    name: 'Yeti Crab',
    scientific: 'Kiwa hirsuta',
    depth: '2,200m – 2,600m',
    fact: 'Discovered in 2005, this ghostly white crab farms bacteria on its own silky arm-hair, then harvests and eats them.',
    adaptations: 'Chemosynthesis near superheated hydrothermal vents.',
    color: '#e0e0e0',
  },
  snailfish: {
    emoji: '🐡',
    name: 'Snailfish',
    scientific: 'Pseudoliparis swirei',
    depth: '6,000m – 8,000m',
    fact: 'The deepest known fish ever found, living at crushing depths that would shatter most bones.',
    adaptations: 'Lacks swim bladder, bones are highly flexible cartilage.',
    color: '#ffb3ba'
  }
};

const OceanContext = createContext();

export const OceanProvider = ({ children }) => {
  const [lightsOut, setLightsOut] = useState(false);
  const [activeCreature, setActiveCreature] = useState(null); // 'anglerfish', etc.
  const [showComparison, setShowComparison] = useState(false);
  const [showMap, setShowMap] = useState(false);
  
  // Shared depth state for overlays
  const [currentDepth, setCurrentDepth] = useState(0);

  const value = useMemo(() => ({
    lightsOut, setLightsOut,
    activeCreature, setActiveCreature,
    showComparison, setShowComparison,
    showMap, setShowMap,
    currentDepth, setCurrentDepth
  }), [lightsOut, activeCreature, showComparison, showMap, currentDepth]);

  return (
    <OceanContext.Provider value={value}>
      {children}
    </OceanContext.Provider>
  );
};

export const useOcean = () => useContext(OceanContext);
