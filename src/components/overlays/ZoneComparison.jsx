import { motion, AnimatePresence } from 'framer-motion';
import { useOcean } from '../../context/OceanContext';

const ZONE_STATS = [
  { name: 'Sunlight',   depth: '0 - 200m',    pressure: '1 - 20',    temp: '20-30°C', light: '100 - 1%', species: '90%' },
  { name: 'Twilight',   depth: '200 - 1k',    pressure: '20 - 100',  temp: '4-8°C',   light: '< 1%',     species: '5%'  },
  { name: 'Midnight',   depth: '1k - 4k',     pressure: '100 - 400', temp: '2-4°C',   light: '0%',       species: '3%'  },
  { name: 'Abyssal',    depth: '4k - 6k',     pressure: '400 - 600', temp: '0-2°C',   light: '0%',       species: '1.5%'},
  { name: 'Hadal',      depth: '6k - 11k',    pressure: '600 - 1100',temp: '0-2°C',   light: '0%',       species: '<1%' }
];

const ZoneComparison = () => {
  const { showComparison, setShowComparison } = useOcean();

  return (
    <AnimatePresence>
      {showComparison && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           style={{
             position: 'fixed', inset: 0, zIndex: 10000,
             background: 'rgba(2,8,16,0.92)',
             backdropFilter: 'blur(10px)',
             display: 'flex', alignItems: 'center', justifyContent: 'center',
             padding: '20px'
           }}
           onClick={() => setShowComparison(false)}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(5,10,20,0.85)',
              border: '1px solid rgba(0,229,255,0.3)',
              borderRadius: '16px',
              padding: '40px',
              maxWidth: '900px', width: '100%',
              boxShadow: '0 0 60px rgba(0,229,255,0.1 5)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontFamily: 'Space Mono', color: '#0ff5c8', fontSize: '1rem', letterSpacing: '0.2em' }}>
                DATABASE // ZONE METRICS
              </h2>
              <button 
                onClick={() => setShowComparison(false)}
                style={{ background: 'none', border: 'none', color: '#00e5ff', cursor: 'pointer', fontSize: '1.5rem' }}
              >
                ✕
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'DM Sans', color: '#e8f4f8' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(0,229,255,0.3)', color: 'rgba(0,229,255,0.6)', fontFamily: 'Space Mono', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    <th style={{ padding: '16px 8px' }}>Zone</th>
                    <th style={{ padding: '16px 8px' }}>Depth (m)</th>
                    <th style={{ padding: '16px 8px' }}>Pressure (atm)</th>
                    <th style={{ padding: '16px 8px' }}>Temp</th>
                    <th style={{ padding: '16px 8px' }}>Sunlight</th>
                    <th style={{ padding: '16px 8px' }}>Total Marine Life</th>
                  </tr>
                </thead>
                <tbody>
                  {ZONE_STATS.map((z, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s', ':hover': { background: 'rgba(0,229,255,0.05)' }}}>
                      <td style={{ padding: '16px 8px', fontWeight: 500, color: '#00e5ff' }}>{z.name}</td>
                      <td style={{ padding: '16px 8px', fontFamily: 'Space Mono' }}>{z.depth}</td>
                      <td style={{ padding: '16px 8px', fontFamily: 'Space Mono' }}>{z.pressure}</td>
                      <td style={{ padding: '16px 8px' }}>{z.temp}</td>
                      <td style={{ padding: '16px 8px' }}>{z.light}</td>
                      <td style={{ padding: '16px 8px' }}>{z.species}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <p style={{ fontFamily: 'Space Mono', fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', marginTop: '20px', textAlign: 'center', letterSpacing: '0.1em' }}>
              DATA SOURCED FROM GLOBAL OCEANOGRAPHIC SENSORS
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ZoneComparison;
