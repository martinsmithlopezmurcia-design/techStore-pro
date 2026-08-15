// Importar  Mongoose para usar Dhamay model
const { default: mongoose } = require('mongoose');
const mmongoose = require('mongoose');

// Schema: define los campos de cada socumento en Atlas 
const productoSchema = new mongoose.Schema({
    id:              {type:Number, require: true}, // numero (1, 2, 3, 4......)
    icono:           {type:String, require: true}, // emoji del producto
    nombre:          {type:String, require: true}, // nombre del producto
    descripcion:     {type:String, require: true}, // texto descriptivo
    precio:          {type:String, require: true}, // "8.999.000 - texto, no numero"
    imagen:          {type:String, require: true}, //ruta de la imagen

});

// Crea el model - Mongoose busca la coleccion 'productos9en Atlas
const producto = mongoose.model('producto', productoSchema);

// Exportar para poder usarlo en server.js
module.exports = producto;