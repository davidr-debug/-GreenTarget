import { chromium } from 'playwright';

// Títulos C-Level a buscar
const C_LEVEL_TITLES = [
    'CEO', 'Chief Executive Officer',
    'CFO', 'Chief Financial Officer',
    'COO', 'Chief Operating Officer',
    'CTO', 'Chief Technology Officer',
    'CMO', 'Chief Marketing Officer',
    'CIO', 'Chief Information Officer',
    'CISO', 'Chief Information Security Officer',
    'CPO', 'Chief Product Officer',
    'CRO', 'Chief Revenue Officer',
    'CDO', 'Chief Data Officer',
    'CLO', 'Chief Legal Officer',
    'CHRO', 'Chief Human Resources Officer',
    'CSO', 'Chief Strategy Officer',
    'CCO', 'Chief Communications Officer',
    'VP', 'Vice President',
    'SVP', 'Senior Vice President',
    'EVP', 'Executive Vice President',
    'Managing Director',
    'President',
    'Founder', 'Co-Founder', 'Cofundador', 'Fundador',
    'Director General', 'Director Ejecutivo',
    'Director de Tecnología', 'Director Financiero',
    'Director de Operaciones', 'Director Comercial',
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function isCLevel(title) {
    if (!title) return false;
    const upper = title.toUpperCase();
    return C_LEVEL_TITLES.some((t) => upper.includes(t.toUpperCase()));
}

export async function scrapeCLevel(companyName, email, password) {
    console.log(`🚀 Iniciando scrapeCLevel para: ${companyName}`);
    
    // Lista extendida de términos para buscar en la pestaña People
    const searchTerms = ['CEO', 'Presidente', 'Director', 'Vicepresidente', 'Chief', 'Gerente', 'Founder'];
    
    const browser = await chromium.launch({
        headless: false, // Mantener visible para depuración
        slowMo: 100,
    });

    const context = await browser.newContext({
        viewport: { width: 1366, height: 900 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        locale: 'es-ES'
    });

    const page = await context.newPage();
    const allCLevelResults = [];

    try {
        // 1. Login
        console.log('🔑 Intentando login en LinkedIn...');
        await page.goto('https://www.linkedin.com/login', { waitUntil: 'domcontentloaded' });
        await page.fill('#username', email);
        await page.fill('#password', password);
        await page.click('button[type="submit"]');

        try {
            await page.waitForURL('**/feed/**', { timeout: 20000 });
            console.log('✅ Login exitoso.');
        } catch (e) {
            console.log('⚠️ Esperando verificación manual o carga lenta...');
            await page.waitForURL('**/feed/**', { timeout: 60000 }).catch(() => null);
        }

        // 2. Buscar Empresa (obtener slug)
        console.log(`🔍 Buscando slug de la empresa: ${companyName}`);
        const encodedEmpresa = encodeURIComponent(companyName);
        await page.goto(`https://www.linkedin.com/search/results/companies/?keywords=${encodedEmpresa}`, { waitUntil: 'domcontentloaded' });
        await delay(4000);

        const companySelectors = [
            'a.app-aware-link[href*="/company/"]',
            '.entity-result__title-text a',
            'span.entity-result__title-text a'
        ];

        let companySlug = '';
        for (const sel of companySelectors) {
            try {
                const link = page.locator(sel).first();
                const href = await link.getAttribute('href');
                if (href && href.includes('/company/')) {
                    const match = href.match(/\/company\/([^/?#]+)/);
                    if (match) {
                        companySlug = match[1];
                        console.log(`🏢 Slug encontrado: ${companySlug}`);
                        break;
                    }
                }
            } catch (e) { /* continuar */ }
        }

        if (!companySlug) {
            companySlug = companyName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            console.log(`ℹ️ Slug no detectado, usando fallback: ${companySlug}`);
        }

        // 3. Buscar en Pestaña People
        for (const term of searchTerms) {
            if (allCLevelResults.length >= 15) break;

            const peopleUrl = `https://www.linkedin.com/company/${companySlug}/people/?keywords=${encodeURIComponent(term)}`;
            console.log(`🎯 Buscando "${term}" en: ${peopleUrl}`);
            
            await page.goto(peopleUrl, { waitUntil: 'domcontentloaded' });
            await delay(5000); // Esperar a que carguen las tarjetas dinámicas

            const pageResults = await page.evaluate(() => {
                const items = [];
                // Selectores variados para tarjetas de personas en la pestaña People
                const cardSelectors = [
                    'div.org-people-profile-card',
                    '.org-people-view-module__profile-card',
                    'li.org-people-profile-card__profile-card-spacing',
                    '.artdeco-entity-lockup'
                ];
                
                let cards = [];
                cardSelectors.forEach(sel => {
                    const found = document.querySelectorAll(sel);
                    if (found.length > 0) cards = [...cards, ...found];
                });

                // Si no hay cards con selectores específicos, buscar cualquier link a perfil /in/
                if (cards.length === 0) {
                    cards = Array.from(document.querySelectorAll('a[href*="/in/"]')).map(a => a.closest('div, li')).filter(el => el);
                }

                const uniqueCards = [...new Set(cards)];

                uniqueCards.forEach((card) => {
                    const nameEl = card.querySelector('.org-people-profile-card__profile-title, .artdeco-entity-lockup__title, [class*="title"]');
                    const subtitleEl = card.querySelector('.org-people-profile-card__subtitle, .artdeco-entity-lockup__subtitle, [class*="subtitle"]');
                    const profileLinkEl = card.querySelector('a[href*="/in/"]');

                    const name = nameEl ? nameEl.textContent.trim() : '';
                    const title = subtitleEl ? subtitleEl.textContent.trim() : '';
                    const profileUrl = profileLinkEl ? profileLinkEl.href.split('?')[0] : '';

                    if (name && name.length > 1 && profileUrl && !items.find(i => i.profileUrl === profileUrl)) {
                        items.push({ name, title, profileUrl });
                    }
                });
                return items;
            });

            console.log(`   ✅ Encontrados ${pageResults.length} perfiles potenciales.`);

            for (const res of pageResults) {
                if (isCLevel(res.title)) {
                    if (!allCLevelResults.find(r => r.profileUrl === res.profileUrl)) {
                        allCLevelResults.push(res);
                        console.log(`      ⭐ Agregado: ${res.name} (${res.title})`);
                    }
                }
            }
        }

        console.log(`🏁 Búsqueda finalizada. Total C-Level: ${allCLevelResults.length}`);
        return allCLevelResults;

    } catch (err) {
        console.error('❌ Error en scrapeCLevel:', err.message);
        throw err;
    } finally {
        await browser.close();
    }
}
