const { Schema, model } = require('mongoose');

const ReservacionesSchema = Schema({
    reservacion: {
        type: String,
        required: [true, 'El nombre de la reservacion es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    entrada: {
        type: Date,
        required: [true, 'Indique hora de entrada']
    },
    salida: {
        type: Date,
        required: [true, 'Indique hora de salida']
    },
    habitaciones: [{
        type: Schema.Types.ObjectId,
        ref: 'Habitacion',
        default: null
    }],
    total: {
        type: Number,
        default: 0
    },
});


module.exports = model('Reservacion', ReservacionesSchema);