import React from 'react';

const COLORS = [
    ['#3ddc84', '#0a2e1a'], ['#00b4d8', '#001a22'], ['#f4c542', '#2a1e00'],
    ['#c084fc', '#1a0a2e'], ['#fb923c', '#2e1200'], ['#38bdf8', '#001a26']
];

const PersonCard = ({ person, index }) => {
    const [fg, bg] = COLORS[index % COLORS.length];
    const initials = (person.name || '?').split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
    const score = parseInt(person.score) || 50;

    // Decide score class logic inline without pure CSS classes for the circle if preferred, 
    // but to match CSS we can use inline styles
    let scoreBg, scoreColor, scoreShadow;
    if (score >= 75) {
        scoreBg = 'rgba(61,220,132,0.15)';
        scoreColor = 'var(--accent)';
        scoreShadow = '0 0 0 2px rgba(61,220,132,0.3)';
    } else if (score >= 50) {
        scoreBg = 'rgba(244,197,66,0.15)';
        scoreColor = 'var(--accent3)';
        scoreShadow = '0 0 0 2px rgba(244,197,66,0.3)';
    } else {
        scoreBg = 'rgba(255,107,107,0.15)';
        scoreColor = 'var(--danger)';
        scoreShadow = '0 0 0 2px rgba(255,107,107,0.3)';
    }

    return (
        <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '28px',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            gap: '20px',
            alignItems: 'start',
            transition: 'border-color 0.2s, transform 0.2s',
            animation: `slideUp 0.4s ease both`,
            animationDelay: `${index * 0.1}s`
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(61,220,132,0.3)';
                e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'none';
            }}>
            <style>
                {`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (max-width: 600px) {
            .person-card-responsive { grid-template-columns: auto 1fr !important; }
            .score-badge-responsive { display: none !important; }
          }
        `}
            </style>

            <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: '20px',
                flexShrink: 0,
                background: bg,
                color: fg
            }}>
                {initials}
            </div>

            <div style={{ minWidth: 0 }}>
                <p style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: '18px',
                    marginBottom: '4px'
                }}>
                    {person.name || 'Sin nombre'}
                </p>
                <p style={{
                    fontSize: '14px',
                    color: 'var(--accent2)',
                    fontWeight: 500,
                    marginBottom: '12px'
                }}>
                    {person.role || ''}
                </p>
                <p style={{
                    fontSize: '14px',
                    color: '#a8c5ad',
                    lineHeight: 1.6,
                    fontWeight: 300
                }}>
                    {person.rationale || ''}
                </p>

                <div style={{
                    display: 'flex',
                    gap: '8px',
                    marginTop: '12px',
                    flexWrap: 'wrap'
                }}>
                    {(person.tags || []).map((tag, ti) => {
                        const isGreen = ti % 3 === 0;
                        const isBlue = ti % 3 === 1;

                        let tagBg, tagColor;
                        if (isGreen) {
                            tagBg = 'rgba(61,220,132,0.12)'; tagColor = 'var(--accent)';
                        } else if (isBlue) {
                            tagBg = 'rgba(0,180,216,0.12)'; tagColor = 'var(--accent2)';
                        } else {
                            tagBg = 'rgba(244,197,66,0.12)'; tagColor = 'var(--accent3)';
                        }

                        return (
                            <span key={ti} style={{
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: 500,
                                letterSpacing: '0.3px',
                                background: tagBg,
                                color: tagColor
                            }}>
                                {tag}
                            </span>
                        );
                    })}
                </div>

                {person.linkedin_hint && (
                    <p style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)' }}>
                        🔗 LinkedIn: <em style={{ fontStyle: 'italic' }}>{person.linkedin_hint}</em>
                    </p>
                )}
            </div>

            <div className="score-badge-responsive" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexShrink: 0
            }}>
                <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: '16px',
                    position: 'relative',
                    background: scoreBg,
                    color: scoreColor,
                    boxShadow: scoreShadow
                }}>
                    {score}
                </div>
                <p style={{
                    fontSize: '10px',
                    color: 'var(--muted)',
                    marginTop: '6px',
                    textAlign: 'center',
                    letterSpacing: '0.5px'
                }}>
                    Score
                </p>
            </div>
        </div>
    );
};

export default PersonCard;
