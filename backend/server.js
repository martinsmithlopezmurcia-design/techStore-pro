// ======================================================
// 1. IMPORTAR DEPENDENCIAS
// ======================================================

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


// ======================================================
// 2. IMPORTAR RUTAS
// ======================================================

const authRoutes = require('./routes/auth');
const productosRoutes = require('./routes/productos');
const ordenesRoutes = require('./routes/ordenes');


// ======================================================
// 3. CREAR APLICACIÓN
// ======================================================

const app = express();

const PORT = process.env.PORT || 3000;


// ======================================================
// 4. MIDDLEWARES
// ======================================================

app.use(cors());

app.use(express.json());


// ======================================================
// 5. CONECTAR A MONGODB ATLAS
// ======================================================

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ conectado a MongoDB Atlas');
    })
    .catch((err) => {
        console.error('❌ Error de conexión:', err);
    });


// ======================================================
// 6. RUTA PRINCIPAL
// ======================================================

app.get('/', (req, res) => {
    res.json({
        mensaje: 'servidor TechStore Pro ✅'
    });
});


// ======================================================
// 7. RUTAS
// ======================================================

app.use('/api/auth', authRoutes);

app.use('/api/productos', productosRoutes);

app.use('/api/ordenes', ordenesRoutes);


// ======================================================
// 8. INICIAR SERVIDOR
// ======================================================

app.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
});
