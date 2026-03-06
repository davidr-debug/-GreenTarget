# -GreenTarget (LinkedIn C-Level Scraper)

Agente de prospección de clientes que combina un backend en Node.js (Express + Playwright) para extraer ejecutivos C-Level de LinkedIn y un frontend en React (Vite) para visualizar los resultados.

## Estructura del Proyecto

- `/server`: API en Express que maneja el scraping con Playwright.
- `/src`: Frontend en React/Vite.

## Requisitos

- Node.js (v16+)
- Una cuenta de LinkedIn activa.

## Configuración

1. Clona el repositorio.
2. Ve a la carpeta `server/` y crea un archivo `.env` basado en `.env.example`:
   ```env
   LINKEDIN_EMAIL=tu_email@ejemplo.com
   LINKEDIN_PASSWORD=tu_password
   ```
3. Instala las dependencias en ambas carpetas:
   ```bash
   # En la raíz (frontend)
   npm install

   # En la carpeta server
   cd server
   npm install
   ```

## Ejecución

Para ver el proyecto funcionando, necesitas correr ambos procesos en terminales separadas:

### 1. Iniciar el Servidor (Backend)
```bash
cd server
node index.js
```

### 2. Iniciar el Frontend
```bash
npm run dev
```

## Seguridad

**IMPORTANTE**: Nunca subas tu archivo `.env` al repositorio. El archivo `.gitignore` ya está configurado para omitirlo.
