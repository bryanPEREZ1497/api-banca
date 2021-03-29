const { Router } = require('express');
const router = Router();
const perfil = require('../controllers/perfil.controller');

router.get('/devolver-cedula/:id', perfil.devolverCedula);
// router.get('/perfil/:cedula', perfil.devolverPerfil);
router.get('/perfil/:id', perfil.devolverPerfilId);
router.get('/perfiles', perfil.devolverPerfiles);
router.put('/perfil/:cedula', perfil.actualizarPerfil);
module.exports = router;
