import React, { useEffect, useRef } from 'react';
import PersonCard from './PersonCard';

const ResultsList = ({ data }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [data]);

    if (!data) return null;

    return (
        <div ref={containerRef} style={{ animation: 'fadeIn 0.5s forwards' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: '28px',
                flexWrap: 'wrap',
                gap: '12px'
            }}>
                <div>
                    <p style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: '13px',
                        fontWeight: 600,
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        color: 'var(--muted)'
                    }}>Resultados para</p>
                    <p style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: '24px',
                        fontWeight: 800,
                        color: 'var(--text)',
                        marginTop: '4px'
                    }}>
                        {data.company}
                    </p>
                </div>
                <div style={{
                    background: 'var(--surface2)',
                    border: '1px solid var(--border)',
                    borderRadius: '20px',
                    padding: '6px 16px',
                    fontSize: '13px',
                    color: 'var(--muted)'
                }}>
                    <strong style={{ color: 'var(--accent)', fontWeight: 'bold' }}>
                        {data.persons?.length || 0}
                    </strong> decisores identificados
                </div>
            </div>

            {data.context && (
                <div style={{
                    background: 'var(--surface2)',
                    border: '1px solid var(--border)',
                    borderLeft: '3px solid var(--accent)',
                    borderRadius: '12px',
                    padding: '20px 24px',
                    marginBottom: '32px',
                    fontSize: '14px',
                    color: '#a8c5ad',
                    lineHeight: 1.7,
                    fontWeight: 300
                }}>
                    <strong style={{ color: 'var(--text)', fontWeight: 500 }}>Contexto:</strong> {data.context}
                </div>
            )}

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
            }}>
                {(data.persons || []).map((person, index) => (
                    <PersonCard key={index} person={person} index={index} />
                ))}
            </div>
        </div>
    );
};

export default ResultsList;
