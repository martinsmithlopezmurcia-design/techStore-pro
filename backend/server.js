// 1. Importar dependencias
require('dotenv').config();
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const producto = require ('./models/Producto');

// 2. crear la aplicacion y definir el puerto
const app = express();
const PORT = process.env.PORT || 3000;

// 3. activar middlewares
app.use(cors());
app.use(express.json());

// 4. Conectar a MongoDB Atalas ←NUEVO en s12
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('✅ conectado a MongoDBAtlas'))
.catch((err) => console.log('❌ Error de conexion:', err));

// 5. Ruta GET/api/productos- haora lee de MongoDB Atlas
app.get('/api/productoa', async (req, res) => {
    try {
        const productos = await producto.find();
        res.json(productos);
    }catch (err) {
        res.status(500).json({ error: 'Error al odtener productos' });
    }
});

// 6. Ruta de prueba
app.get ('/', (req, res) => {
    res.json({mensaje: 'servidor techStore pro ✅'});
});

//6. Arrancar el servidor 
app.listen(PORT, () => {
    console.log(`Servidor en https://localhost:${PORT}`);
});

