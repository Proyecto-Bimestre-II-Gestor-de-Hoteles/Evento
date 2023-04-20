const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');


const getUsuario = async (req = request, res = response) => {

    const query = req.usuario._id;

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    res.json({
        msg: 'get Api - Controlador Usuario',
        listaUsuarios
    });

}



//SOLO EL DEVELOPER PUEDE VER A TODOS LOS USUARIOS DE LA DB
const getUsuarios = async (req = request, res = response) => {

    const query = { estado: true };

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    res.json({
        msg: 'get Api - Controlador Usuario',
        listaUsuarios
    });

}

//MOSTRAR SOLO LOS USUARIOS CON EL ROL CLIENTE
const getClientes = async (req = request, res = response) => {

    const query = { estado: true, rol : 'CLIENT_ROLE' };

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    res.json({
        msg: 'get Api - Controlador Usuario',
        listaUsuarios
    });

}

//MOSTRAR SOLO LOS USUARIOS QUE TENGAN EL ROL ADMIN
const getAdmin = async (req = request, res = response) => {

    const query = { estado: true, rol : 'ADMIN_ROLE' };

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    res.json({
        msg: 'get Api - Controlador Usuario',
        listaUsuarios
    });

}

//AGREGAR UN USUARIO CON EL ROL PREDETERMINADO DE CLIENTE
const postCliente = async (req = request, res = response) => {

    const { nombre, correo, password, rol = 'CLIENT_ROLE' } = req.body;
    const usuarioGuardadoDB = new Usuario({ nombre, correo, password, rol });

    const salt = bcrypt.genSaltSync();
    usuarioGuardadoDB.password = bcrypt.hashSync(password, salt);

    await usuarioGuardadoDB.save();

    res.json({
        msg: 'Post Api - Post Usuario',
        usuarioGuardadoDB
    });

}

//AGREGAR UN USUARIO CON EL ROL PREDETERMINADO DE ADMIN
const postAdmin = async (req = request, res = response) => {

    const { nombre, correo, password, rol = 'ADMIN_ROLE' } = req.body;
    const usuarioGuardadoDB = new Usuario({ nombre, correo, password, rol });

    const salt = bcrypt.genSaltSync();
    usuarioGuardadoDB.password = bcrypt.hashSync(password, salt);

    await usuarioGuardadoDB.save();

    res.json({
        msg: 'Post Api - Post Usuario',
        usuarioGuardadoDB
    });

}

//AGREGAR UN USUARIO CON EL ROL PREDETERMINADO DE DEVELOPER
const postDev = async (req = request, res = response) => {

    const { nombre, correo, password, rol = 'DEVELOPER_ROLE' } = req.body;
    const usuarioGuardadoDB = new Usuario({ nombre, correo, password, rol });

    const salt = bcrypt.genSaltSync();
    usuarioGuardadoDB.password = bcrypt.hashSync(password, salt);

    await usuarioGuardadoDB.save();

    res.json({
        msg: 'Post Api - Post Usuario',
        usuarioGuardadoDB
    });

}



const putUsuario = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, img, estado, google, ...resto } = req.body;

    if (resto.password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT editar user',
        usuarioEditado
    });
}

const putPerfilUsuario = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, img, estado, google, rol, ...resto } = req.body;

    const idGuardado = req.usuario.id;
    if (idGuardado != id) {
        return res.status(401).json({
            msg: 'Solo puede modificar su propio perfil'
        })
    }

    if (resto.password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT editar user',
        usuarioEditado
    });
}

const deletePerfilUsuario = async (req = request, res = response) => {
    const { id } = req.params;

    const usuarioEliminado = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE eliminar user',
        usuarioEliminado
    });
}

const deleteUsuario = async (req = request, res = response) => {
    const { id } = req.params;

    const usuarioEliminado = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE eliminar user',
        usuarioEliminado
    });
}

module.exports = {
    getUsuarios,
    postCliente,
    postAdmin,
    postDev,
    putUsuario,
    deleteUsuario,
    putPerfilUsuario,
    deletePerfilUsuario,
    getAdmin,
    getClientes,
    getUsuario
}