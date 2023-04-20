const { response, request } = require('express');
//Importación del modelo
const Servicios = require('../models/servicios');

//------------------------- GET SERVICIOS -----------------
const getServicios = async (req = request, res = response) => {

    //condiciones del get
    const query = { estado: true };

    const listaServicios = await Promise.all([
        Servicios.countDocuments(query),
        Servicios.find(query)
           
    ]);
    
    res.json({
        msg: 'Lista de productos activos',
        listaServicios
    });

}
// ---------------------- GET BY ID ----------------------
const getServicioById = async (req = request, res = response) => {

    //condiciones del get
    const { id } = req.params;

    const listaServicios = await Servicios.findById(id);
    
    res.json({
        msg: 'Lista de productos activos',
        listaServicios
    });

}
// ------------------------ POST ---------------------------
const postSerivicos = async (req = request, res = response) => {
    //Desestructuración
    const { nombre, precio } = req.body;

    const servicioGuardadoDB = new Servicios({
        //nombre, precio, usuario:req.usuario.id
        nombre, precio, usuario:'641e8631f3251766b3b74281'
    });


    //Guardar en BD
    await servicioGuardadoDB.save();

    res.json({
        msg: 'Post Api - Post Servicos',
        servicioGuardadoDB
    });

}
//------------------------ PUT --------------------------
const putServicios = async (req = request, res = response) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    const servicioEditado = await Servicios.findByIdAndUpdate(id, resto);
    return res.json({
        msg: 'PUT editar Servicios',
        servicioEditado
    });
}
//----------------------- DELETE-----------------------------
const deleteServicio = async(req = request, res = response) => {
    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;

    //Eliminar cambiando el estado a false
    const servicioEliminado = await Servicios.findByIdAndDelete(id);

    return res.json({
        msg: 'DELETE eliminar SERVICIOS',
        servicioEliminado
    });
}

module.exports = {
    getServicios,
    postSerivicos,
    putServicios,
    deleteServicio,
    getServicioById
 }