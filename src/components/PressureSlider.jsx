// SECTION: PressureSlider — SVG submarine deformation simulator
import { useState } from 'react';

const PressureSlider = () => {
  const [pressure, setPressure] = useState(0);

  // Map 0-100 slider to 0-600 atm
  const atm = Math.round(pressure * 6);
  const depth = Math.round(pressure * 60);

  // Deformation values
  const scaleY = 1 - (pressure / 100) * 0.55;
  const scaleX = 1 + (pressure / 100) * 0.30;
  const opacity = 1 - (pressure / 100) * 0.4;
  const cracksOpacity = pressure > 40 ? (pressure - 40) / 60 : 0;
  const glowIntensity = pressure > 60 ? (pressure - 60) / 40 : 0;

  const getColor = () => {
    if (pressure < 33)  return '#00e5ff';
    if (pressure < 66)  return '#ff9800';
    return '#ff4444';
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '32px',
      width: '100%',
      maxWidth: '480px',
      margin: '0 auto',
    }}>
      {/* SVG Submarine */}
      <div style={{
        position: 'relative',
        height: '180px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <svg
          width="280"
          height="140"
          viewBox="0 0 280 140"
          style={{
            transform: `scaleY(${scaleY}) scaleX(${scaleX})`,
            transition: 'transform 0.15s ease',
            filter: pressure > 70
              ? `drop-shadow(0 0 ${glowIntensity * 20}px rgba(255,68,68,0.8))`
              : 'drop-shadow(0 4px 20px rgba(0,229,255,0.3))',
            opacity,
          }}
        >
          {/* Body hull */}
          <ellipse cx="140" cy="75" rx="110" ry="38" fill="#1a3a5c" stroke="#00e5ff" strokeWidth="1.5"/>

          {/* Conning tower */}
          <rect x="108" y="34" width="50" height="32" rx="6" fill="#142d4a" stroke="#00e5ff" strokeWidth="1"/>

          {/* Periscope */}
          <rect x="135" y="14" width="6" height="22" rx="3" fill="#00e5ff" opacity="0.8"/>
          <circle cx="138" cy="12" r="5" fill="none" stroke="#00e5ff" strokeWidth="1.5"/>

          {/* Propeller */}
          <circle cx="252" cy="75" r="12" fill="none" stroke="#7ab3c8" strokeWidth="1.5"/>
          <line x1="252" y1="63" x2="252" y2="87" stroke="#7ab3c8" strokeWidth="2"/>
          <line x1="240" y1="75" x2="264" y2="75" stroke="#7ab3c8" strokeWidth="2"/>

          {/* Porthole windows */}
          <circle cx="100" cy="75" r="10" fill="#051020" stroke="#00e5ff" strokeWidth="1.2"/>
          <circle cx="100" cy="75" r="5" fill="rgba(0,229,255,0.15)"/>
          <circle cx="140" cy="75" r="10" fill="#051020" stroke="#00e5ff" strokeWidth="1.2"/>
          <circle cx="140" cy="75" r="5" fill="rgba(0,229,255,0.15)"/>
          <circle cx="180" cy="75" r="10" fill="#051020" stroke="#00e5ff" strokeWidth="1.2"/>
          <circle cx="180" cy="75" r="5" fill="rgba(0,229,255,0.15)"/>

          {/* Damage cracks */}
          {cracksOpacity > 0 && (
            <g opacity={cracksOpacity} stroke="#ff4444" strokeWidth="1" fill="none">
              <path d="M80,65 L90,72 L85,80"/>
              <path d="M160,55 L168,68 L163,78"/>
              <path d="M200,65 L210,74 L205,84"/>
              {pressure > 70 && <path d="M120,45 L125,58 L130,50"/>}
              {pressure > 85 && <path d="M50,70 L60,78 L55,85"/>}
            </g>
          )}

          {/* Bubble trail */}
          {[...Array(4)].map((_, i) => (
            <circle
              key={i}
              cx={28 + i * 8}
              cy={70 + (i % 2 === 0 ? -8 : 8)}
              r={2 + i * 0.5}
              fill="none"
              stroke="rgba(0,229,255,0.4)"
              strokeWidth="0.8"
            />
          ))}
        </svg>

        {/* Implosion flash */}
        {pressure === 100 && (
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,68,68,0.6), transparent 70%)',
            animation: 'pulseGlow 0.5s infinite',
          }}/>
        )}
      </div>

      {/* Pressure readings */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        width: '100%',
      }}>
        {[
          { label: 'PRESSURE', value: `${atm} atm`, color: getColor() },
          { label: 'DEPTH',    value: `${depth}0 m`, color: '#7ab3c8' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{
            background: 'rgba(10,22,40,0.6)',
            border: `1px solid ${color}33`,
            borderRadius: '10px',
            padding: '14px 20px',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.6rem',
              color: 'rgba(122,179,200,0.6)',
              letterSpacing: '0.15em',
              marginBottom: '6px',
            }}>{label}</div>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.6rem',
              color,
              fontWeight: 700,
              textShadow: `0 0 15px ${color}66`,
            }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Slider */}
      <div style={{ width: '100%' }}>
        <input
          type="range"
          min="0"
          max="100"
          value={pressure}
          onChange={e => setPressure(+e.target.value)}
          aria-label="Pressure simulator"
          style={{
            width: '100%',
            height: '4px',
            appearance: 'none',
            background: `linear-gradient(90deg, ${getColor()} ${pressure}%, rgba(255,255,255,0.1) ${pressure}%)`,
            borderRadius: '2px',
            outline: 'none',
            cursor: 'pointer',
          }}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10px',
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.6rem',
          color: 'rgba(122,179,200,0.5)',
        }}>
          <span>0 atm</span>
          <span style={{ color: getColor(), fontWeight: 700 }}>
            {pressure === 0 ? 'DRAG TO INCREASE PRESSURE' :
             pressure < 33  ? 'MILD PRESSURE' :
             pressure < 66  ? '⚠ HIGH PRESSURE' :
             pressure < 90  ? '🔴 CRITICAL' : '💥 IMPLOSION ZONE'}
          </span>
          <span>600 atm</span>
        </div>
      </div>

      {/* Slider thumb CSS */}
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: ${getColor()};
          box-shadow: 0 0 12px ${getColor()};
          cursor: pointer;
          border: 2px solid rgba(255,255,255,0.3);
          transition: background 0.3s, box-shadow 0.3s;
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: ${getColor()};
          box-shadow: 0 0 12px ${getColor()};
          cursor: pointer;
          border: 2px solid rgba(255,255,255,0.3);
        }
      `}</style>
    </div>
  );
};

export default PressureSlider;
