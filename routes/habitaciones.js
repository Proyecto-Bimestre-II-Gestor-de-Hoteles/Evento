const {Router} = require('express');
const {check} = require('express-validator');
const { getHabitaciones, postHabitacion, putHabitacion, deleteHabitacion } = require('../controllers/habitaciones');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/mostrar', [
    //validarJWT
], getHabitaciones)


router.post('/agregar', [
    //validarJWT,
    //validarCampos
], postHabitacion)


router.put('/editar', [
    //validarJWT,
    //validarCampos,
    check('id').isMongoId()
], putHabitacion)


router.delete('/delete', [
    //validarJWT,
], deleteHabitacion)


module.exports = router;