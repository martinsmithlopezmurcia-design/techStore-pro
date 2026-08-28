const mongoose = require('mongoose');
const usuario = require('./Usuario');
const producto = require('./Producto');
const {Schema} = mongoose;

const ordenShema = new Schema({
    // ¿Quien hizo la orden? → referencia al _id de un usuario
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    // Arreglo de productos con cantidad 
    rpoductos: [{
        producto: {
            type:Schema.Types.ObjectId,
            ref: 'Producto'
        },
        cantidad: {type: Number, required: true, min: 1 }
    }],

    // total calculado en el frontend (o en una ruta)
    total: { type: Number, required: true},
    
    // Estado del ciclo de vida de la orden
    estado: {
        type: String,
        default: 'pendiente',
        enum: ['pendiente', 'procesando', 'enviando', 'entregado']
    }
}, { timestamps: true}); // agregar createAt y updateAt
const Orden = mongoose.model('orden, ordenShema');
module.exports = Orden;

