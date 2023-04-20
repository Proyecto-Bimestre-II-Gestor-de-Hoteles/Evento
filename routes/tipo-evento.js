const { Router } = require('express');
const { check } = require('express-validator');
const { postTipo } = require('../controllers/tipo-evento');
const { validarCampos } = require('../middlewares/validar-campos');
const { tieneRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/agregar',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    tieneRole('ADMIN_ROLE','DEVELOPER_ROLE'),
    validarCampos
], postTipo);

module.exports = router;