const { Router } = require('express');
const router = Router();
const cliente = require('../controllers/cliente.controller');

router.get('/clientes', cliente.devolverClientes);
router.get('/cliente/:id/cuentas', cliente.devolverCuentasDeCliente);
router.get('/cliente/:id/cuenta/:numero', cliente.mostrarMovimientosDeCuenta);
router.get('/cliente/:id/perfil', cliente.mostrarDatosDePerfil);



module.exports = router;
