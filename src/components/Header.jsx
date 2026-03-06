import React from 'react';

const Header = () => {
    return (
        <header style={{ marginBottom: '56px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
                <div style={{
                    width: '36px',
                    height: '36px',
                    background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px'
                }}>⚡</div>
                <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: '20px',
                    letterSpacing: '-0.5px',
                    color: 'var(--text)'
                }}>Green<span style={{ color: 'var(--accent)' }}>Target</span></div>
            </div>

            <h1 style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(36px, 6vw, 58px)',
                lineHeight: 1.05,
                letterSpacing: '-2px',
                marginBottom: '16px'
            }}>
                Encuentra <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>decisores</em><br />
                en energías renovables
            </h1>

            <p style={{
                fontSize: '16px',
                color: 'var(--muted)',
                fontWeight: 300,
                maxWidth: '480px',
                lineHeight: 1.6
            }}>
                Ingresa una empresa y obtendrás los ejecutivos clave con mayor probabilidad de impulsar inversiones en energía limpia.
            </p>
        </header>
    );
};

export default Header;
