// 1. Importar dependencias
require('dotenv').config();
const express             = require('express')
const cors                = require('cors')
const mongoose            = require('mongoose');
const Producto            = require ('./models/Producto');
const authRoutes          = require('./routes/auth');
const verificarToken      = require('./middleware/auth')
const productosRoutes     = require('./routes/productos');
const ordenesRoutes       = require('./routes/ordenes')

// 2. crear la aplicacion y definir el puerto
const app = express();
const PORT = process.env.PORT || 3000;

// 3. activar middlewares
app.use(cors());
app.use(express.json());

// 4. Conectar a MongoDB Atalas ←NUEVO en s12
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ conectado a MongoDBAtlas'))
.catch((err) => console.log('❌ Error de conexion:', err));



// 9. Ruta de prueba
app.get ('/', (req, res) => {
    res.json({mensaje: 'servidor techStore pro ✅'});
});

//10. Arrancar el servidor 
app.listen(PORT, () => {
    console.log(`Servidor en https://localhost:${PORT}`);
});

// 11. Rutas de autentificacion ← NUEVO S14
app.use('/api/auth', authRoutes);

// 12. Rutas de productos 
app.use('/api/productos', productosRoutes);

// 13. Rutas de ordenes
app.use('/api/ordenes', ordenesRoutes);    