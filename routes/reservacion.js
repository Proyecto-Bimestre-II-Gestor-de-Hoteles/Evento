const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarStock } = require("../middlewares/validar-disponibilidad");
const { tieneRole } = require("../middlewares/validar-roles");
const { existeReservaPorId } = require("../helpers/db-validators");
const { getReservacion, putReservacion, deleteReservacion, postReservacion } = require("../controllers/reservacion");

const router = Router();

router.get("/mostrar", getReservacion);

router.post("/agregarReserva",[
    validarJWT,
    check("reservacion", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
    validarStock,
  ],postReservacion);

router.put("/editar/:id",[
    validarJWT,
    tieneRole(""),
    check("reservacion", "El nombre es obligatorio").not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaPorId ),
    validarCampos,
  ],putReservacion);

router.delete("/eliminarCarrito/:id", [
    validarJWT,
    tieneRole(""),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeReservaPorId ),
    validarCampos,
], deleteReservacion);

module.exports = router;