// 1. Importar dependencias
const  express               = require('express')
const  Producto              = require('../models/Producto');
const verificarToken        = require('../middleware/auth');
const verificarAdmin         = require('../middleware/admin');
const  router                = express.Router();

//2, GET / - publico, sin token 
router.get('/', async (req, res) => {
    try{
        const productos = await producto.find();
        res.json(productos);
    }catch (err) {
        resizeBy.status(500).json({ errror: 'Error al odtener productos' });
    }
});

// 3. POST / - solo admin (verificartojken + verificarAdmin)
router.post('/', verificarToken, verificarAdmin,  async (req, res) => {
    try {
        const nuevo = await Producto.create(req.body); // toma el JSON del body
        res.status(201).json(nuevo);                   // 201 = Created
    } catch (err) {
      res.status(400).json({ error: err.message });          // 400 = datos invalidos 
    }
});

// 4. PUT /: id -solo admin
router.put('/:id', verificarToken, verificarAdmin, async (req, res) => {
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

// 5. DELETE /:id -solo admin
router.delete('/api/productos/:id', verificarToken, verificarAdmin, async (req, res)=> {
    try {
        const eliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json({ mensaje: 'Producto eliminado correctamente', eliminado});
    } catch(err) {
        res.status(400).json({ error: err.message});
    }
});

// 6. Exportar 
module.exports = router;