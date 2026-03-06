export async function analyzeCompany(company) {
    try {
        const response = await fetch("http://localhost:3001/api/scrape", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ company })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error en el servidor de extracción');
        }

        return data;
    } catch (error) {
        console.error("Error fetching from local backend:", error);
        throw new Error(error.message || "Error al conectar con el servidor de LinkedIn. ¿Está corriendo en el puerto 3001?");
    }
}
