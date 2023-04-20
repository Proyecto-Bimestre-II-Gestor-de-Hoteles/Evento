//! Importaciones Escenciales
const { response, request } = require('express');
const Hotel = require('../models/hotel');

const getHoteles = async (req = request, res = response) => {

    const query = { estado: true };

    const hoteles = await Promise.all([
        Hotel.countDocuments(query),
        Hotel.find(query)
        .populate('creador','nombre , rol')
        .populate('administrador', 'nombre , rol')
    ]);

    res.json({
        msg: 'get Api - Controlador Usuario',
        hoteles
    });

}

//MOSTRAR LOS HOTELES A CLIENTES SOLO CON LOS CAMPOS DE NOMBRE, DIRECCION, ESTADO
//EL ESTADO SE MUESTRA YA QUE EN FORNT END TENGO PLANEADO HACER QUE SE MUESTRE UN MENSAJE
    //DE 'NO DISPONIBLE' CUANDO EL HOTEL ESTE CON ESTADO:FALSE
const getHotelesCliente = async (req = request, res = response) => {

    const query = { estado: true };

    const hoteles = await Promise.all([
        Hotel.countDocuments(),
        Hotel.find({},{nombre: 1, direccion: 1, estado : true  } )
    ]);

    res.json({
        msg: 'get Api - Controlador Usuario',
        hoteles
    });

}



const postHotel = async (req = request, res = response) => {

    const {  creador, estado, ...body } = req.body;

    // const hotelDB = await Hotel.findOne({ nombre });
    const hotelDB = await Hotel.findOne({ nombre: body.nombre.toUpperCase() });

    //validacion si el producto ya existe
    if (hotelDB) {
        return res.status(400).json({
            msg: `El hotel ${hotelDB.nombre}, ya existe en la DB`
        });
    } else {
        const data = {
            ...body,
            nombre: body.nombre.toUpperCase(),
            creador: req.usuario._id,
        }

        const hoteles = await Hotel(data);

        //Guardar en DB
        await hoteles.save();

        res.status(201).json({
            msg: "POST API - POST Hotel",
            hoteles
        });
    }
}

const putHotel = async (req = request, res = response) => {

    const { id } = req.params;
    const { creador, ...restoData } = req.body;
    const hotelDB = await Hotel.findOne({ nombre: restoData.nombre.toUpperCase() });

    if (hotelDB) {
        return res.status(400).json({
            msg: `El hotel ${hotelDB.nombre}, ya existe en la DB`
        });
    }
    if (restoData.nombre) {
        restoData.nombre = restoData.nombre.toUpperCase();
    }

    const hotelActualizado = await Hotel.findByIdAndUpdate(id, restoData, { new: true });

    res.status(201).json({
        msg: 'PUT HOTELES',
        hotelActualizado: hotelActualizado
    })
}

const deleteHotel = async (req = request, res = response) => {

    const { id } = req.params;
    //Eliminar fisicamente de la DB
    //const productoEliminado = await Producto.findByIdAndDelete( id );

    //Eliminar por el estado:false
    const hotelEliminado = await Hotel.findByIdAndUpdate(id, { estado: false }, { new: true });


    res.json({
        msg: 'DELETE',
        //productoEliminado,
        hotelEliminado: hotelEliminado
    })

}




module.exports = {
    postHotel,
    getHoteles,
    getHotelesCliente,
    putHotel,
    deleteHotel
}
