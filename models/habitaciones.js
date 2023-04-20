const {Schema, model} = require('mongoose')

const habitacionesSchema = Schema({
    numero_habitaciones:{
        type: String,
        required: [true, 'El numero de la habitacion es necesario']
    },
    disponibilidad: {
        type: Boolean,
        default:true
    },
    costo:{
        type: Number,
        required: [true, 'El costo es obligatorio']
    },
    hotel:{
        type: Schema.Types.ObjectId,
        ref: 'Hotele',
        required:[true, 'El hotel es obligatorio']
    },
    reservaciones:{
        type: Schema.Types.Number,
        ref: 'reservacione',
        default: 0
    }
})

module.exports = model('habitacione', habitacionesSchema)