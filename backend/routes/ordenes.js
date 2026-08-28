const express             = require('express')
const Orden               = require('../middleware/auth');
const verificarToken = require('../middleware/auth'); 
const usuario = require('../models/Usuario');
const producto = require('../models/Producto');
const router              = express.Router();

// POST / api/ordenes - crear una ordene
// El usuario logiado crea su propia orden
router.post('/',verificarToken,  async (req, res) => {
    try {
        const { productos, total } = req.body;
        const nuevaOrden =await Orden.create({
            usuario: req.usuario.id,
            productos,
            total
        });                 // 201 = Created
    } catch (err) {
        res.status(400).json({ error: err.message });          // 400 = datos invalidos 
    }
});

// GET  /api/ordenes - mis ordenes
// cada usuario ve solo sus propias ordenes 
//2, GET / - publico, sin token 
router.get('/', verificarToken, async (req, res) => {
    try{
        const ordenes = await orden
        .find({ usuario: req.usuario.id })
        .populate ('usuario', 'nombre email')
        .pupulate('productos.producto', 'nombre precio')
        res.json(ordenes);
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;