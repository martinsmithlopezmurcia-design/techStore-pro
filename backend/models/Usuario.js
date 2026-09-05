// 1. Importar Mongoose
const mongoose = require('mongoose');

// 2. Schema del usuario
const usuarioSchema = new mongoose.Schema({
    nombre:   { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol:     {type: String,
                enum: ['admin', 'cliente'],
                default: 'cliente'},
    departamento:  { type: String, required: true },
    municipio:    { type: String, required: true},
});


// 3. Exportar el model
const usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = usuario;
