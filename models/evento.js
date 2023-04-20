const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'tipo-evento'
    },
    fecha: {
        type: Date,
        required: true
    },
    hora_inicio: {
        type: String,
        required: true
    },
    hora_final: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    habitacion: {
        type: Schema.Types.ObjectId,
        ref: 'habitaciones'
    }
});

module.exports = model('Evento', EventoSchema);