const { Router } = require('express');
const router = Router();
const authControllers = require('../controllers/auth.controllers');
const { checkDuplicateUsernameOrEmail, checkRolesExisted } = require('../middlewares/verifySignUp');

router.post('/signup',[checkDuplicateUsernameOrEmail,checkRolesExisted],authControllers.signUp);
router.post('/signin',authControllers.signIn);

module.exports = router;
