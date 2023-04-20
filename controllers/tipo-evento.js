//! Importaciones Escenciales
const { response, request } = require('express');
const Tipo = require('../models/tipo-evento');




const postTipo = async (req = request, res = response) => {

    const { nombre } = req.body;

    const tipoDB = await Tipo.findOne({ nombre });
    // const productoDB = await Producto.findOne({ nombre: body.nombre });

    //validacion si el producto ya existe
    if (tipoDB) {
        return res.status(400).json({
            msg: `El tipo ${tipoDB.nombre}, ya existe en la DB`
        });
    } else {
        const data = {
            nombre,
            // usuario: _id,
        }

        const tipoEvento = await Tipo(data);

        //Guardar en DB
        await tipoEvento.save();

        res.status(201).json({
            msg: "POST API - POST TIPO-EVENTO",
            tipoEvento
        });
    }



}





module.exports = {
    postTipo
}
