const { Router } = require('express');
const { check } = require('express-validator');
const { postHotel, getHoteles, getHotelesCliente, putHotel, deleteHotel } = require('../controllers/hotel');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar',[
    validarJWT,
    tieneRole('ADMIN_ROLE', 'DEVELOPER_ROLE'),
    validarCampos
],getHoteles)

router.get('/mostrarHoteles',getHotelesCliente)


router.post('/agregar',[
    validarJWT,
    tieneRole('DEVELOPER_ROLE'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('direccion', 'La direccion es obligatoria').not().isEmpty(),
    validarCampos
], postHotel);

router.put('/editar/:id',[
    validarJWT,
    tieneRole('DEVELOPER_ROLE', 'ADMIN_ROLE'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('direccion', 'La direccion es obligatoria').not().isEmpty(),
    check('administrador', 'El administrador es obligatoria').not().isEmpty(),
    check('administrador', 'El administrador seleccionado no existe dentro de la base de datos').isMongoId(),
    validarCampos
], putHotel);

router.delete('/eliminar/:id',[
    validarJWT,
    tieneRole('DEVELOPER_ROLE', 'ADMIN_ROLE'),
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    validarCampos
], deleteHotel)

module.exports = router;