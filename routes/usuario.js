const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios,  putUsuario, deleteUsuario, putPerfilUsuario, deletePerfilUsuario, postCliente, postAdmin, postDev, getClientes, getAdmin, getUsuario } = require('../controllers/usuario');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrarU',[
    validarJWT,
    validarCampos
], getUsuario);

router.get('/mostrar',[
    validarJWT,
    tieneRole('DEVELOPER_ROLE'),
    validarCampos
], getUsuarios);

router.get('/mostrarClientes',[
    validarJWT,
    tieneRole('DEVELOPER_ROLE', 'ADMIN_ROLE'),
    validarCampos
], getClientes);

router.get('/mostrarAdmin',[
    validarJWT,
    tieneRole('DEVELOPER_ROLE','ADMIN_ROLE'),
    validarCampos
], getAdmin);



router.post('/agregarCliente', [
    // validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    // esRoleValido,
    validarCampos,
] ,postCliente);

router.post('/agregarAdmin', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    tieneRole('DEVELOPER_ROLE','ADMIN_ROLE'),

    // esRoleValido,
    validarCampos,
] ,postAdmin);

router.post('/agregarDev', [
    // validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    // esRoleValido,
    validarCampos,
] ,postDev);

router.put('/editar/:id', [
    validarJWT,
    tieneRole('ADMIN_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom(  esRoleValido ),
    // validarCampos
] ,putUsuario);

router.put('/editarPerfil/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos,
    tieneRole('CLIENT_ROLE')
] ,putPerfilUsuario);

router.delete('/eliminarPerfil/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    tieneRole('CLIENT_ROLE'),
    validarCampos
] ,deletePerfilUsuario);

router.delete('/eliminar/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
] ,deleteUsuario);

module.exports = router;