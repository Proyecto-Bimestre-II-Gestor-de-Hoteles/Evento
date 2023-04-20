const { Schema, model } = require('mongoose');

const ServicioSchema = Schema({
    nombre: {
        type: String,
        required: [true , 'El nombre del servicio es obligatorio']
    },
    
    precio: {
        type: Number,
        required: [true , 'El precio del servicio es obligatorio']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
});


module.exports = model('Servicio', ServicioSchema);
