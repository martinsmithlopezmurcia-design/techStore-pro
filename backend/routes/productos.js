// 1. Importar dependencias
const  express               = require('express')
const  Producto              = require('../models/Producto');
const verificarToken        = require('../middleware/auth');
const verificarAdmin         = require('../middleware/admin');
const producto = require('../models/Producto');
const  router                = express.Router();

//2, GET / - publico, sin token 
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find(); // <-- Corregido a 'Producto' con mayúscula
        res.json(productos);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener productos' }); // <-- Corregido 'res' y ortografía
    }
});

// 2b. GET /:id - solo productos por su _id (piblico, no requiere token)
// Ejemplo de URL: GET http://locahost:3000/api/productos/64a1b2c3d4e5f6a7b8c9d0e1
router.get('/:id', async (req, res) => {
    try { 
        // req.params.id lee el valor que llega en la URL despues de /api/productos/ 
        const producto = await Producto.findById(req.params.id); 
        
        // si MongoDB no encontro nada con es _id, producto es null → 404 
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json(producto); // 200 OK - devuelve el objeto producto 

    } catch (error) {
        // El catch atrapa el CastError de mongoose cuando el _id tiene formato invalido
        // (cualquier texto que no sea un OdjectId de 24 caracteres hexadecimales)
        res.status(400).json({ error: 'Producto no encontrado' });
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