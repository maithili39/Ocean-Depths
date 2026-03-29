// SECTION: FlipCard — 3D hover flip card
const FlipCard = ({ front, back, icon }) => (
  <div
    className="flip-card-wrapper"
    style={{
      perspective: '1000px',
      width: '100%',
      maxWidth: '280px',
      height: '200px',
      cursor: 'pointer',
    }}
  >
    <div
      className="flip-card-inner"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.7s cubic-bezier(0.4,0.2,0.2,1)',
      }}
    >
      {/* Front */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backfaceVisibility: 'hidden',
        background: 'rgba(10,22,40,0.6)',
        border: '1px solid rgba(0,229,255,0.2)',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '14px',
        padding: '24px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(0,229,255,0.1)',
      }}>
        <div style={{
          fontSize: '2.4rem',
          filter: 'drop-shadow(0 0 12px rgba(0,229,255,0.7))',
          lineHeight: 1,
        }}>
          {icon}
        </div>
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '1rem',
          fontWeight: 500,
          color: '#e8f4f8',
          textAlign: 'center',
          letterSpacing: '0.02em',
        }}>
          {front}
        </p>
        <div style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.6rem',
          color: 'rgba(0,229,255,0.5)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>
          HOVER TO REVEAL
        </div>
      </div>

      {/* Back */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)',
        background: 'linear-gradient(135deg, rgba(0,229,255,0.1), rgba(15,245,200,0.05))',
        border: '1px solid rgba(0,229,255,0.35)',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 40px rgba(0,229,255,0.1), inset 0 1px 0 rgba(0,229,255,0.2)',
        gap: '10px',
      }}>
        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '1.05rem',
          color: '#00e5ff',
          textAlign: 'center',
          fontWeight: 400,
          fontStyle: 'italic',
          lineHeight: 1.55,
        }}>
          {back}
        </p>
      </div>
    </div>

    <style>{`
      .flip-card-wrapper:hover .flip-card-inner {
        transform: rotateY(180deg);
      }
    `}</style>
  </div>
);

export default FlipCard;
