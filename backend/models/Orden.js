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
                'entregado',
                'PAGO_CONFIRMADO'
            ]
        },
          // Datos de Wompi — se llenan solo cuando el pago fue aprobado
        wompiTransactionId: { type: String },
        wompiReference:     { type: String }
    },
    {
        timestamps: true
    }
);

const Orden = mongoose.model('Orden', ordenSchema);

module.exports = Orden;