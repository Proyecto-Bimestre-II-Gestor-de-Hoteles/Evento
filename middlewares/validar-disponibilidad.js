const { request, response } = require("express");
const Habitacion = require("../models/habitaciones");

const validarStock = async (req = request, res = response, next) => {
  const { habitaciones } = req.body;

  for (let i = 0; i < habitaciones.length; i++) {
    const habitacion = habitaciones[i];
    const habitacionDisponible = await Habitacion.findById(habitacion);

    if (habitacionDisponible) {
      if (habitacionDisponible.disponible === false) {
        return res.status(400).json({
          msg: `No hay habitacion disponible en este momento.`,
        });
      }
    }
  }

  next();
};

module.exports = {
  validarStock,
};
