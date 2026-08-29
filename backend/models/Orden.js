const mongoose = require('mongoose');

const { Schema } = mongoose;

const ordenSchema = new Schema(
    {
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true
        },

        productos: [
            {
                producto: {
                    type: Schema.Types.ObjectId,
                    ref: 'Producto',
                    required: true
                },

                cantidad: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ],

        total: {
            type: Number,
            required: true
        },

        estado: {
            type: String,
            default: 'pendiente',
            enum: [
                'pendiente',
                'procesando',
                'enviando',
                'entregado'
            ]
        }
    },
    {
        timestamps: true
    }
);

const Orden = mongoose.model('Orden', ordenSchema);

module.exports = Orden;