const { Router } = require('express');
const { check } = require('express-validator');
const { getEventos, postEvento, putEvento, deleteEvento } = require('../controllers/evento');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', getEventos);

router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('tipo', 'El tipo debe ser un ID válido de MongoDB').isMongoId(),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    check('hora_inicio', 'La hora de inicio es obligatoria').not().isEmpty(),
    check('hora_final', 'La hora final es obligatoria').not().isEmpty(),
    check('habitacion', 'La habitación debe ser un ID válido de MongoDB').isMongoId().optional(),
    validarCampos
], postEvento);

router.put('/editar/:id', [
    check('id', 'No es un ID válido de MongoDB').isMongoId(),
    validarCampos
], putEvento);

router.delete('/eliminar/:id', [
    check('id', 'No es un ID válido de MongoDB').isMongoId(),
    validarCampos
], deleteEvento);

module.exports = router;