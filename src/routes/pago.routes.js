const { Router } = require('express');
const router = Router();
const pago = require('../controllers/pago.controller');

router.get('/pagos', pago.devolverPagos);

router.post('/hacer-pago', pago.hacerPago);


module.exports = router;
