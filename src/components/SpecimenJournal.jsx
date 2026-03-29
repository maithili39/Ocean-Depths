import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useJournal } from '../context/JournalContext';

const SpecimenJournal = () => {
  const { entries } = useJournal();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // Keyboard listener for 'J' key to open journal
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.key === 'j' || e.key === 'J') && !isOpen) {
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen]);

  // Icon is hidden; journal triggered via keyboard 'J' key
  return (
    <>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', top: 0, left: 0, bottom: 0, width: '400px', maxWidth: '100vw',
              background: 'rgba(5, 10, 15, 0.95)', backdropFilter: 'blur(20px)',
              borderRight: '1px solid rgba(255,255,255,0.1)', zIndex: 9999,
              padding: '40px 30px', overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '20px' }}>
              <div>
                <h3 className="editorial-title" style={{ fontSize: '2rem' }}>Field Journal</h3>
                <div className="mono-reading" style={{ opacity: 0.5 }}>CLASSIFIED OBSERVER LOG</div>
              </div>
              <button onClick={toggle} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
            </div>

            {entries.length === 0 ? (
              <p className="body-narrow" style={{ opacity: 0.5, fontStyle: 'italic', textAlign: 'center', marginTop: '50px' }}>
                Journal is empty. Log creatures during your descent.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {entries.map(e => (
                  <div key={e.id} style={{ position: 'relative', paddingLeft: '20px', borderLeft: '2px solid var(--accent-twilight)' }}>
                    <div className="mono-reading" style={{ fontSize: '0.7rem', color: 'var(--bio-blue)', marginBottom: '5px' }}>
                      {e.timestamp} · DEPTH: {e.depth}m
                    </div>
                    <div className="mono-reading" style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
                      {e.classification}
                    </div>
                    <p className="body-narrow" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                      {e.notes}
                    </p>
                  </div>
                ))}

                <button 
                  onClick={() => {
                     const text = entries.map(e => `[DEPTH ${e.depth}m] ${e.classification}`).join('\n');
                     navigator.clipboard.writeText(`MY ABYSS LOG:\n${text}`);
                     alert('Journal copied to clipboard!');
                  }}
                  className="mono-reading hover-target" 
                  style={{ marginTop: '40px', background: 'transparent', border: '1px solid var(--bio-blue)', padding: '15px', color: 'var(--bio-blue)', cursor: 'pointer' }}>
                  EXPORT JOURNAL
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SpecimenJournal;
