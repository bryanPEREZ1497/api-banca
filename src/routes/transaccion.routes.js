const { Router } = require('express');
const router = Router();
const transaccion = require('../controllers/transaccion.controller');

router.get('/transacciones', transaccion.devolverTransacciones);

module.exports = router;
