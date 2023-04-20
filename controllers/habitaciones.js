const {response, request} = require('express');
const Habitacion = require('../models/habitaciones');
const Hotel = require('../models/hotel');

const getHabitaciones = async(req = request, res = response) =>{
    const query = {estado:true};

    const listaHabitaciones = await Promise.all([
        Habitacion.countDocuments(query),
        Habitacion.find(query)
    ])

    res.json({
        msg : 'Mostrando Habitaciones',
        listaHabitaciones
    })
}


const postHabitacion = async(req = request, res = response) =>{
    const { numero_habitaciones, disponibilidad, costo, hotel, reservaciones } = req.body;
    const habitacionGuardadaDB = new Habitacion({numero_habitaciones, disponibilidad, costo, hotel, reservaciones});

    await habitacionGuardadaDB.save();

    res.json({
        msg: 'Habitacion agregada',
        numero_habitaciones, 
        disponibilidad, 
        costo, 
        hotel, 
        reservaciones
    })
}


const putHabitacion = async(req = request, res = response) =>{
    const {id} = req.params;
    const{_id, ...resto} = req.body;

    const habitacionEditada = await Habitacion.findByIdAndUpdate(id, resto, {new:true});

    res.json({
        msg: 'Habitacion modificada',
        id,
        habitacionEditada
    })
}


const deleteHabitacion = async(req = request, res = response) =>{
    const {id} = req.params;
    const habitacionEliminada = await Habitacion.findByIdAndDelete(id, {new:true});
    res.json({
        msg: 'Habitacion Eliminada',
        habitacionEliminada
    })
}


module.exports = {
    getHabitaciones,
    postHabitacion,
    putHabitacion,
    deleteHabitacion
}