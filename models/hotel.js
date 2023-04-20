const { Schema, model } = require('mongoose');

const HotelesSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre del hotel es obligatorio']
    },
    direccion: {
        type: String,
        required: [true, 'El direccion del hotel es obligatorio']
    },
    creador: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    administrador:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

module.exports = model('Hotele', HotelesSchema)