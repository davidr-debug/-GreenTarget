import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { scrapeCLevel } from './linkedinService.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/scrape', async (req, res) => {
    const { company } = req.body;
    if (!company) {
        return res.status(400).json({ error: 'Falta el nombre de la empresa' });
    }

    const { LINKEDIN_EMAIL, LINKEDIN_PASSWORD } = process.env;
    if (!LINKEDIN_EMAIL || !LINKEDIN_PASSWORD) {
        return res.status(500).json({ error: 'Faltan credenciales de LinkedIn en el .env del servidor' });
    }

    try {
        console.log(`\nIniciando búsqueda avanzada en LinkedIn para: ${company}`);

        const executives = await scrapeCLevel(company, LINKEDIN_EMAIL, LINKEDIN_PASSWORD);

        // Formatear la respuesta para que el Frontend (React) la consuma
        const formattedResponse = {
            company: company,
            context: `Resultados avanzados extraídos desde LinkedIn para ${company}. Se identificaron perfiles C-Level clave.`,
            persons: executives.map((p, index) => {
                const lowerTitle = p.title.toLowerCase();
                let tags = [];
                let score = 85; // Base score más alta para resultados C-Level

                if (lowerTitle.includes('director') || lowerTitle.includes('vp') || lowerTitle.includes('chief') || lowerTitle.includes('ceo')) {
                    score += 10;
                    tags.push('Alta Dirección');
                }

                if (tags.length === 0) tags.push('C-Level');

                return {
                    name: p.name,
                    role: p.title,
                    score: Math.min(98, score - index),
                    rationale: `Ejecutivo C-Level identificado en ${company}. Perfil verificado por cargo.`,
                    tags: tags,
                    linkedin_hint: p.profileUrl
                };
            })
        };

        if (formattedResponse.persons.length === 0) {
            formattedResponse.persons.push({
                name: "Sin resultados exactos",
                role: "N/A",
                score: 0,
                rationale: "No se encontraron perfiles C-Level públicos con estos filtros.",
                tags: [],
                linkedin_hint: "Intenta ampliar tu red de contactos."
            });
        }

        res.json(formattedResponse);

    } catch (error) {
        console.error('Error durante el scraping:', error);
        res.status(500).json({ error: 'Error durante la extracción de datos: ' + error.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`\n🚀 Backend de Scraping escuchando en http://localhost:${PORT}`);
    console.log(`Esperando requests para extraer datos de LinkedIn...\n`);
});
