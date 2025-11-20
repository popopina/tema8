// 1. Importación de módulos utilizando la sintaxis moderna 'import' (ES Modules),
// compatible con la configuración "type": "module" de package.json.
import express from 'express';
import mongoose from 'mongoose'; 
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

// --- Configuración de Rutas de Archivos para ES Modules ---
// Estas líneas permiten obtener las rutas absolutas (__filename, __dirname)
// que son necesarias para que el servidor encuentre la carpeta 'public'.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicPath = join(__dirname, 'public');

// 2. Inicialización de la aplicación Express
const app = express();
// Puerto de escucha. Usa el puerto de entorno si existe (para Heroku), o 3000 por defecto.
const PORT = process.env.PORT || 3000; 

// 3. Implementación de peticiones GET para los recursos HTML

// Petición GET para la ruta raíz (/)
app.get('/', (req, res) => {
    try {
        // Leemos sincrónicamente el contenido del archivo index.html
        const htmlContent = readFileSync(join(publicPath, 'index.html'), 'utf-8');
        // Enviamos la respuesta: Estado 200 (OK), tipo 'html', con el contenido leído
        res.status(200).type('html').send(htmlContent);
    } catch (error) {
        // Captura y log de errores si no se encuentra el archivo
        console.error("ERROR: No se pudo servir index.html. Verifique la carpeta 'public' y su contenido. Mensaje:", error.message);
        res.status(500).send("Error interno del servidor al cargar la página de inicio.");
    }
});

// Petición GET para la ruta /about
app.get('/about', (req, res) => {
    try {
        // Leemos sincrónicamente el contenido del archivo about.html
        const htmlContent = readFileSync(join(publicPath, 'about.html'), 'utf-8');
        // Enviamos la respuesta
        res.status(200).type('html').send(htmlContent);
    } catch (error) {
        console.error("ERROR: No se pudo servir about.html. Verifique la carpeta 'public' y su contenido. Mensaje:", error.message);
        res.status(500).send("Error interno del servidor al cargar la página 'Acerca de'.");
    }
});


// 4. Arranque del servidor
app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(` Servidor Express escuchando en http://localhost:${PORT}`);
    console.log(` Rutas disponibles: / (Inicio) y /about (Acerca de)`);
    console.log(`======================================================\n`);
});