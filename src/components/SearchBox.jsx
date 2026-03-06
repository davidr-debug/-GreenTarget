import React, { useState } from 'react';

const SearchBox = ({ onSearch, isLoading }) => {
    const [company, setCompany] = useState('');

    const handleSearch = () => {
        if (company.trim()) {
            onSearch(company.trim());
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '32px',
            marginBottom: '48px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
                opacity: 0.5
            }} />

            <span style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '12px',
                display: 'block'
            }}>
                Empresa objetivo
            </span>

            <div style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'stretch',
                flexWrap: 'wrap'
            }}>
                <div style={{ flex: 1, position: 'relative', minWidth: '200px' }}>
                    <svg style={{
                        position: 'absolute',
                        left: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--muted)',
                        pointerEvents: 'none'
                    }} width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ej: Cemex, Banorte, PEMEX, Walmart México..."
                        autoComplete="off"
                        style={{
                            width: '100%',
                            padding: '16px 16px 16px 48px',
                            background: 'var(--surface2)',
                            border: '1px solid var(--border)',
                            borderRadius: '12px',
                            color: 'var(--text)',
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'border-color 0.2s, box-shadow 0.2s',
                            boxSizing: 'border-box'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'var(--accent)';
                            e.target.style.boxShadow = '0 0 0 3px rgba(61,220,132,0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'var(--border)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>
                <button
                    onClick={handleSearch}
                    disabled={isLoading || !company.trim()}
                    style={{
                        padding: '16px 28px',
                        background: 'var(--accent)',
                        color: '#0a0f0d',
                        border: 'none',
                        borderRadius: '12px',
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        fontSize: '15px',
                        cursor: isLoading || !company.trim() ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap',
                        opacity: isLoading || !company.trim() ? 0.5 : 1,
                        transform: 'none'
                    }}
                    onMouseEnter={(e) => {
                        if (!isLoading && company.trim()) {
                            e.target.style.background = '#5eeaa0';
                            e.target.style.transform = 'translateY(-1px)';
                            e.target.style.boxShadow = '0 8px 24px rgba(61,220,132,0.25)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'var(--accent)';
                        e.target.style.transform = 'none';
                        e.target.style.boxShadow = 'none';
                    }}
                >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                    Analizar
                </button>
            </div>

            <p style={{
                marginTop: '12px',
                fontSize: '13px',
                color: 'var(--muted)'
            }}>
                Empresas de cualquier sector · <strong style={{ color: 'var(--accent)', fontWeight: 500 }}>Powered by Claude AI + Web Search</strong>
            </p>
        </div>
    );
};

export default SearchBox;
