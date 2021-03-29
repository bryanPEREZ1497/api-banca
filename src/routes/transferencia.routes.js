const { Router } = require('express');
const router = Router();
const transferencia = require('../controllers/transferencia.controller');

router.get('/transferencias', transferencia.devolverTransferencias);
router.post('/transferencias', transferencia.hacerTransferencia);

module.exports = router;
