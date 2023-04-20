//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { getDetalleCuenta, postDetalleCuenta, pustDetalleCuenta, deleteDetalleCuenta, getDetalleCuentaById } = require('../controllers/detalleCuenta');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', getDetalleCuenta);

router.get('/ById/:id', getDetalleCuentaById);

router.post('/agregar', [
    check('costoHabitacion', 'El costo de habitación es obligatorio').not().isEmpty(),
    check('eventosAsistidos', 'El evento asistido es obligatorio').not().isEmpty(),
    validarCampos,
], postDetalleCuenta);

router.put('/editar/:id', [
    check('costoHabitacion', 'El costo de habitación es obligatorio').not().isEmpty(),
    check('eventosAsistido', 'El eventos asistido es obligatorio').not().isEmpty(),
    validarCampos,
], pustDetalleCuenta);

router.delete('/eliminar/:id', deleteDetalleCuenta);

module.exports = router;