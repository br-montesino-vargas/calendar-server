const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { authRegister, authLogin, authRenew } = require('../controllers/_auth');

const { reqValidator } = require('../middlewares/req-validator');
const { validateJWT } = require('../middlewares/validate-jwt');

router.post(

	'/register',
	[
		check('name', 'El nombre es obligatorio').not().isEmpty(),

		check('email', 'El email es obligatorio').not().isEmpty(),
		check('email', 'Formato de email incorrecto').isEmail(),

		check('password', 'La contraseña es obligatoria').not().isEmpty(),
		check('password', 'La contraseña debe ser de mínimo 6 caracteres').isLength({ min: 6 }),

		reqValidator
	],
	authRegister
);

router.post(

	'/',
	[
		check('email', 'El email es obligatorio').not().isEmpty(),
		check('email', 'Formato de email incorrecto').isEmail(),

		check('password', 'La contraseña es obligatoria').not().isEmpty(),
		check('password', 'La contraseña debe ser de mínimo 6 caracteres').isLength({ min: 6 }),
		
		reqValidator
	],
	authLogin
);

router.get( '/renew', validateJWT, authRenew );

module.exports = router;