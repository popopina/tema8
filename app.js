  const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Se añade path para manejo de directorios
const app = express();
const PORT = process.env.PORT || 3000;

// Importar el router de dispositivos API
const deviceRouter = require('./routes/devices');
      
// URL de conexión a MongoDB (ajusta esto a tu entorno)
const MONGO_URI = 'mongodb://localhost:27017/evaluacionDB';

// --- 1 & 2. CONEXIÓN A LA BASE DE DATOS Y SERVICIO DE ARCHIVOS ---

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Conectado exitosamente a MongoDB');
    })
    .catch((error) => {
        console.error('❌ Error de conexión a MongoDB:', error);
    });

// Middleware para servir archivos estáticos (Implementa las peticiones GET para los recursos HTML)
// Ahora, al acceder a http://localhost:3000/, Express buscará index.html en el directorio 'public'.
app.use(express.static(path.join(__dirname, 'public')));
console.log('Servidor configurado para servir archivos estáticos desde /public');


// Middleware para parsear JSON (Necesario para las peticiones POST y PUT de la API)
app.use(express.json());

// --- USAR LAS RUTAS DE DISPOSITIVOS API ---
app.use('/api/devices', deviceRouter);

// --- 3. INICIO DEL SERVIDOR ---

app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
    console.log(`Página principal HTML: http://localhost:${PORT}/index.html`);
    console.log(`Ruta API: http://localhost:${PORT}/api/devices`);
});   