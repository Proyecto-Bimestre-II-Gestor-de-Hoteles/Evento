const { Schema, model } = require('mongoose');

const TipoSchema = Schema({

    nombre: {
        type: String,
        required: true
    }
})

module.exports = model('tipo-evento', TipoSchema)