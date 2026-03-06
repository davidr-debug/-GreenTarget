import { useState } from 'react';
import Header from './components/Header';
import SearchBox from './components/SearchBox';
import LoadingIndicator from './components/LoadingIndicator';
import ResultsList from './components/ResultsList';
import { analyzeCompany } from './services/api';

function App() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [results, setResults] = useState(null);

    const handleSearch = async (companyName) => {
        setLoading(true);
        setError(null);
        setResults(null);

        try {
            const data = await analyzeCompany(companyName);
            setResults(data);
        } catch (err) {
            setError(err.message || 'Error al procesar la solicitud. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container" style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '900px',
            margin: '0 auto',
            padding: '60px 24px 80px'
        }}>
            <Header />
            <SearchBox onSearch={handleSearch} isLoading={loading} />

            {loading && <LoadingIndicator />}

            {error && (
                <div className="error-box" style={{
                    background: 'rgba(255,107,107,0.08)',
                    border: '1px solid rgba(255,107,107,0.25)',
                    borderRadius: '12px',
                    padding: '20px 24px',
                    color: 'var(--danger)',
                    fontSize: '14px',
                    marginBottom: '32px'
                }}>
                    ⚠️ {error}
                </div>
            )}

            {results && <ResultsList data={results} />}

            {results && (
                <p className="disclaimer" style={{
                    marginTop: '48px',
                    paddingTop: '24px',
                    borderTop: '1px solid var(--border)',
                    fontSize: '12px',
                    color: 'var(--muted)',
                    textAlign: 'center',
                    lineHeight: '1.6'
                }}>
                    ⚠️ Información generada con IA para prospección comercial. Verificar datos antes de contactar.<br />
                    GreenTarget usa Claude AI con búsqueda web en tiempo real.
                </p>
            )}
        </div>
    );
}

export default App;
