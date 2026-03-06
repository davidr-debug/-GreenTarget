import React, { useEffect, useState } from 'react';

const LoadingIndicator = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        '🔍 Buscando información pública de la empresa',
        '👤 Identificando ejecutivos y directivos clave',
        '🌱 Evaluando propensión a inversión verde',
        '✅ Generando perfiles de prospección'
    ];

    useEffect(() => {
        let timers = [];
        steps.forEach((_, index) => {
            const timer = setTimeout(() => {
                setActiveStep(index);
            }, index * 1800);
            timers.push(timer);
        });

        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div style={{
            textAlign: 'center',
            padding: '64px 24px'
        }}>
            <style>
                {`
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `}
            </style>
            <div style={{
                width: '48px',
                height: '48px',
                border: '3px solid var(--border)',
                borderTopColor: 'var(--accent)',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                margin: '0 auto 20px'
            }} />
            <p style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '15px',
                color: 'var(--muted)'
            }}>
                Analizando empresa...
            </p>
            <div style={{
                marginTop: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                maxWidth: '320px',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
                {steps.map((step, index) => (
                    <p key={index} style={{
                        fontSize: '13px',
                        color: activeStep >= index ? 'var(--accent)' : 'var(--muted)',
                        opacity: activeStep >= index ? 1 : 0,
                        animation: activeStep === index ? 'fadeIn 0.5s forwards' : 'none',
                        transition: 'color 0.3s, opacity 0.5s'
                    }}>
                        {step}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default LoadingIndicator;
