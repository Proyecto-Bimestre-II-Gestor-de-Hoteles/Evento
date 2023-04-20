const { Router } = require('express');
const { check } = require('express-validator');
const { getServicios, postSerivicos, putServicios, deleteServicio,getServicioById } = require('../controllers/servicios');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get('/' ,getServicios);

router.get('/ById/:id' ,getServicioById);

router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    validarCampos,
] ,postSerivicos);

router.put('/editar/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    validarCampos,
] ,putServicios);

router.delete('/eliminar/:id' ,deleteServicio);

module.exports = router;
