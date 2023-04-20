//Importaciones
const { response, request } = require('express');
//Importación del modelo
const DetalleCuenta = require('../models/detalleCuenta');


//------------------------- GET SERVICIOS
const getDetalleCuenta = async (req = request, res = response) => {

    //condiciones del get
    const query = { estado: true };

    const listaDetalleCuenta = await Promise.all([
        DetalleCuenta.countDocuments(query),
        DetalleCuenta.find(query)

    ]);

    res.json({
        msg: 'GET API - Get controlador Detalle Cuenta',
        listaDetalleCuenta
    });

}

// ---------------------- GET BY ID
const getDetalleCuentaById = async (req = request, res = response) => {

    //condiciones del get
    const { id } = req.params;

    const listaDetalleCuenta = await DetalleCuenta.findById(id);

    res.json({
        msg: 'GET API - Get controlador Detalle Cuenta By Id',
        listaDetalleCuenta
    });

}

// ------------------------ POST
const postDetalleCuenta = async (req = request, res = response) => {

    //Desestructuración
    const { costoHabitacion, eventosAsistidos } = req.body;

    const detalleCuentaGuardadaDB = new DetalleCuenta({
        //costoHabitacion, eventosAsistidos, servicios:req.usuario.id
        costoHabitacion, eventosAsistidos, servicios: ''
    });


    //Guardar en BD
    await detalleCuentaDB.save();

    res.json({
        msg: 'POST API - Post Detalle Cuenta',
        detalleCuentaGuardadaDB
    });

}

//------------------------ PUT
const putDetalleCuenta = async (req = request, res = response) => {

    const { id } = req.params;
    const { ...resto } = req.body;

    const detalleCuentaEditada = await DetalleCuenta.findByIdAndUpdate(id, resto);
    return res.json({
        msg: 'PUT API - Put Detalle Cuenta',
        detalleCuentaEditada
    });
}

//----------------------- DELETE
const deleteDetalleCuenta = async (req = request, res = response) => {

    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;

    //Eliminar fisicamente de la base de datos
    const detalleCuentaEliminada = await Servicios.findByIdAndDelete(id);

    return res.json({
        msg: 'DELETE API - Delete Detalle Cuenta',
        detalleCuentaEliminada
    });
}

module.exports = {
    getDetalleCuenta,
    getDetalleCuentaById,
    postDetalleCuenta,
    putDetalleCuenta,
    deleteDetalleCuenta
}