const { request, response } = require('express');

const tieneRole = (...roles) => {
    return (req = request, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            })

        }
        next();
    }
}

const esAdminRole = async (req = request, res = response, next) => {

    //Si no viene el usuario
    const userId = req.user.id;
    const user = await Usuario.findById(userId);
    if (!user || user.role !== 'ADMIN_ROLE') {
        throw new Error('El usuario no tiene permisos de administrador');
    }

}
module.exports = {
    tieneRole,
    esAdminRole
}