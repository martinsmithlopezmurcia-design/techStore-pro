const express        = require('express');
const mongoose       = require('mongoose');
const Orden          = require('../models/Orden');
const verificarToken = require('../middleware/auth');
const verificarAdmin = require('../middleware/admin');  // ← AGREGAR
const router         = express.Router();

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

// GET /api/ordenes/admin/todas — el admin ve TODAS las órdenes de todos los usuarios
// Declarada antes de "GET /" para no chocar con futuras rutas GET /:id
router.get('/admin/todas', verificarToken, verificarAdmin, async (req, res) => {
    try {
        const ordenes = await Orden
            .find({})
            .populate('usuario', 'nombre email')
            .populate('productos.producto', 'nombre precio')
            .sort({ createdAt: -1 });
        res.json(ordenes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PATCH /api/ordenes/:id/estado — el admin cambia el estado de una orden
const ESTADOS_VALIDOS = ['pendiente', 'procesando', 'enviado', 'entregado', 'PAGO_CONFIRMADO'];

router.patch('/:id/estado', verificarToken, verificarAdmin, async (req, res) => {
    try {
        const { estado } = req.body;

        if (!ESTADOS_VALIDOS.includes(estado)) {
            return res.status(400).json({ error: 'Estado inválido' });
        }

        const orden = await Orden.findByIdAndUpdate(
            req.params.id,
            { estado },
            { new: true }
        );

        if (!orden) return res.status(404).json({ error: 'Orden no encontrada' });
        res.json(orden);
    } catch (err) {
        res.status(400).json({ error: err.message });
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