const express = require('express');
const Orden = require('../models/Orden');
const verificarToken = require('../middleware/auth');

const router = express.Router();

console.log('======================================');
console.log('📦 MODELO ORDEN CARGADO');
console.log('Orden:', Orden);
console.log('Orden.create:', Orden.create);
console.log('======================================');


// POST /api/ordenes
router.post('/', verificarToken, async (req, res) => {

    console.log('🔥🔥🔥 POST /api/ordenes RECIBIDO');

    try {

        console.log('req.body:', req.body);
        console.log('req.usuario:', req.usuario);
        console.log('Orden.create:', Orden.create);

        const { productos, total } = req.body;

        const nuevaOrden = await Orden.create({
            usuario: req.usuario.id,
            productos: productos,
            total: total
        });

        console.log('✅ ORDEN CREADA:', nuevaOrden);

        res.status(201).json(nuevaOrden);

    } catch (err) {

        console.error('❌ ERROR CREANDO ORDEN:', err);

        res.status(400).json({
            error: err.message
        });
    }
});


// GET /api/ordenes
router.get('/', verificarToken, async (req, res) => {

    try {

        const ordenes = await Orden
            .find({
                usuario: req.usuario.id
            })
            .populate('usuario', 'nombre email')
            .populate('productos.producto', 'nombre precio');

        res.json(ordenes);

    } catch (err) {

        console.error('❌ ERROR OBTENIENDO ORDENES:', err);

        res.status(500).json({
            error: err.message
        });
    }
});


module.exports = router;