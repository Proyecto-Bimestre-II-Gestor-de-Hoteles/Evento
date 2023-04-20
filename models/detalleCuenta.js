const { Schema, model } = require('mongoose');

const DetalleCuentaSchema = Schema({
    costoHabitacion: {
        type: Numbre,
        required: [true, 'El costo de habitación es obligatorio']
    },

    eventosAsistidos: {
        type: String,
        required: [true, 'El evento asistido es obligatorio']
    },
    servicios: {
        type: Schema.Types.ObjectId,
        ref: 'Servicios',
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
});


module.exports = model('DetalleCuenta', DetalleCuentaSchema);