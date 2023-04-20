const { response, request } = require("express");

const Reservacion = require("../models/reservacion");
const Habitacion = require("../models/habitaciones");

const getReservacion = async (req = request, res = response) => {
    //condiciones del get
    const query = { estado: true };

    const listaReservaciones = await Promise.all([
        Reservacion.countDocuments(query),
        Reservacion.find(query).populate("usuario", "nombre").populate("habitaciones"),
    ]);

    res.json({
        msg: "get Api - Controlador Reservacion",
        listaReservaciones,
    });
};

const postReservacion = async (req = request, res = response) => {
    const { entrada, salida, reservacion, habitaciones, cantidadReservas } = req.body;
    const reservaDB = await Reservacion.findOne({ reservacion });
    let total = 0;
    let totalFinal = 0;

    if (reservaDB) {
        return res.status(400).json({
            msg: `La reservación ${reservaDB.reservacion} ya existe.`,
        });
    }

    for (let i = 0; i < habitaciones.length; i++) {
        const cantidadxHabitacion = cantidadReservas[i];
        const listaReservas = habitaciones[i];
        const query = await Habitacion.findById(listaReservas);
        const precio = query.costo;
        const cantidad = parseInt(cantidadxHabitacion);
        total = precio * cantidad;
    }

    const data = {
        reservacion,
        entrada,
        salida,
        usuario: req.usuario._id,
        total: total,
    };

    const reservaciones = new Reservacion(data);
    reservaciones.habitaciones.push(...req.body.habitaciones);

    await reservaciones.save();

    
    const factura = {
        idReservacion: reservaciones._id,
        entrada: reservaciones.entrada,
        salida: reservaciones.salida,
        cantidadHabitaciones: habitaciones.length,
        total: reservaciones.total,
        usuario: req.usuario.id,
        fecha: new Date(),
    };

    res.status(201).json({ 
        msg: 'Reservación creada exitosamente',
        reservaciones,
        factura
    });
};

const putReservacion = async (req = request, res = response) => {
    const { id } = req.params;
    const { entrada, salida, reservacion, habitaciones, cantidadReservas, usuario, ...resto } = req.body;

    resto.reservacion = resto.reservacion.toUpperCase();
    resto.habitaciones = [...req.body.habitaciones];
    resto.entrada = entrada;
    resto.salida = salida;

    const reservacionEditada = await Reservacion.findByIdAndUpdate(id, resto, {
        new: true,
    });

    res.status(201).json(reservacionEditada);
};

const deleteReservacion = async (req = request, res = response) => {
    const { id } = req.params;
    const ReservacionEliminada = await Reservacion.findByIdAndDelete(id, { new: true });

    res.json({
        msg: "DELETE",
        ReservacionEliminada
    });
};

module.exports = {
    getReservacion,
    postReservacion,
    putReservacion,
    deleteReservacion
};