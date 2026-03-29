import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';

import Loader from './components/Loader';
import DepthGauge from './components/DepthGauge';
import CustomCursor from './components/CustomCursor';

import Hero from './components/sections/Hero';
import SunlightZone from './components/sections/SunlightZone';
import TwilightZone from './components/sections/TwilightZone';
import MidnightZone from './components/sections/MidnightZone';
import AbyssalZone from './components/sections/AbyssalZone';
import HadalZone from './components/sections/HadalZone';

import { JournalProvider } from './context/JournalContext';
import SpecimenJournal from './components/SpecimenJournal';

const App = () => {
  const [loading, setLoading] = useState(true);
  
  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.6, 0.8, 1],
    ['#0d4f6e', '#0a3d54', '#061e35', '#030d1f', '#020810', '#010305']
  );

  const accentColor = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.6, 0.8, 1],
    ['#48cae4', '#0096c7', '#00b4d8', '#90e0ef', '#caf0f8', '#ffffff']
  );

  return (
    <JournalProvider>
      <SpecimenJournal />
      
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{ position: 'fixed', inset: 0, zIndex: 10000 }}
          >
            <Loader onComplete={() => setLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <CustomCursor scrollYProgress={scrollYProgress} />
      <DepthGauge scrollYProgress={scrollYProgress} accentColor={accentColor} />

      <motion.div style={{ backgroundColor, '--accent-current-zone': accentColor }}>
         {!loading && (
           <>
             <Hero />
             <SunlightZone scrollYProgress={scrollYProgress} />
             <TwilightZone prefersReduced={prefersReduced} />
             <MidnightZone />
             <AbyssalZone />
             <HadalZone scrollYProgress={scrollYProgress} />
           </>
         )}
      </motion.div>
    </JournalProvider>
  );
};

export default App;
