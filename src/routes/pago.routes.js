const { Router } = require('express');
const router = Router();
const pago = require('../controllers/pago.controller');
const {verifyToken,isModerator} = require('../middlewares/authJwt');

router.get('/pagos', pago.devolverPagos);
router.post('/hacer-pago',[verifyToken,isModerator], pago.hacerPago);


module.exports = router;
