// 1. Importar dependencias
const express = require('express')
const cors = require('cors')

// 2. crear la aplicacion y definir el puerto
const app = express();
const PORT = 3000;

// 3. activar middlewares
app.use(cors());
app.use(express.json());

//4. ruta GET/api/productos
app.get('/api/productos', (req, res) =>{
    const productos = require ('../frontend/data/productos.json');
    res.json(productos);
});

// 5. Ruta de prueba
app.get ('/', (req, res) => {
    res.json({mensaje: 'servidor techStore pro ✅'});
});

//6. Arrancar el servidor 
app.listen(PORT, () => {
    console.log(`Servidor en https://localhost:${PORT}`);
});