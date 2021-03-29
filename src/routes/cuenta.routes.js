const { Router } = require('express');
const router = Router();
const cuenta = require('../controllers/cuenta.controller');

router.get('/cuenta/:numero', cuenta.devolverCuenta);
router.get('/cuentas', cuenta.devolverCuentas);


module.exports = router;
