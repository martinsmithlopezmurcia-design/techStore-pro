// 1. Importar dependencias
require('dotenv').config();
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const Producto = require ('./models/Producto');

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
        const Productos = await producto.find();
        res.json(productos);
    }catch (err) {
        res.status(500).json({ error: 'Error al odtener productos' });
    }
});

// 6. ruta POST /api/productos - crear un produto nuevo ← AGREGAR aqui
app.post('/api/Productos', async (req, res) => {
    try {
        const nuevoProducto = await Producto.create(req.body); // toma el JSON del body
        res.status(201).json(nuevoProducto);                   // 201 = Created
    } catch (err) {
        res.status(400).json({ error: err.message });          // 400 = datos invalidos 
    }
});

// 7. Ruta PUT /api/productos/:id - actualizar un prducto
app.put('/api/productos/:id', async (req, res) => {
    try {
        const actualizado = await Producto.findByIdAndUpdate(
            req.params.id,   // _id de MOngoDB que viene de la URL
            req.body,        // campos nuevos que vienen en el body
            { new: true}     // retorna el documento YA actualizado
        );
        if (!actualizado) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(actualizado);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
});

// 8. Ruta DELETE /api/productos/:id - eliminar un producto
app.delete('/api/productos/:id', async (req, res)=> {
    try {
        const eliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json({ mensaje: 'Producto eliminado correctamente', eliminado});
    } catch(err) {
        res.status(400).json({ error: err.message});
    }
});

// 9. Ruta de prueba
app.get ('/', (req, res) => {
    res.json({mensaje: 'servidor techStore pro ✅'});
});

//10. Arrancar el servidor 
app.listen(PORT, () => {
    console.log(`Servidor en https://localhost:${PORT}`);
});

