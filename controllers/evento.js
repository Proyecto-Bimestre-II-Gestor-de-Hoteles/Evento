const { response, request } = require('express');
const Evento = require('../models/evento');

const getEventos = async (req = request, res = response) => {
    const query = { estado: true };

    const listaEventos = await Promise.all([
        Evento.countDocuments(query),
        Evento.find(query)
    ]);

    res.json({
        msg: 'Mostrando eventos',
        listaEventos
    });
};

const postEvento = async (req = request, res = response) => {
    const { nombre, tipo, fecha, hora_inicio, hora_final, descripcion, habitacion } = req.body;
    const eventoGuardadoDB = new Evento({ nombre, tipo, fecha, hora_inicio, hora_final, descripcion, habitacion });

    await eventoGuardadoDB.save();

    res.json({
        msg: 'Evento agregado',
        eventoGuardadoDB
    });
};

const putEvento = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    const eventoEditado = await Evento.findByIdAndUpdate(id, resto, { new: true });

    res.json({
        msg: 'Evento modificado',
        id,
        eventoEditado
    });
};

const deleteEvento = async (req = request, res = response) => {
    const { id } = req.params;
    const eventoEliminado = await Evento.findByIdAndDelete(id, { new: true });
    res.json({
        msg: 'Evento eliminado',
        eventoEliminado
    });
};

module.exports = {
    getEventos,
    postEvento,
    putEvento,
    deleteEvento
};