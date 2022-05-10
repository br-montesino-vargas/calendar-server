const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { getEvents, addEvent, updateEvent, deleteEvent } = require('../controllers/_calendar');

const { reqValidator } = require('../middlewares/req-validator');
const { validateJWT } = require('../middlewares/validate-jwt');

const { isDate } = require('../helpers/isDate');

router.use( validateJWT );


router.get('/', getEvents );

router.post(
	'/',
	[
		check('title', 'El titulo es obligatorio').not().isEmpty(),
		check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
		check('end', 'La fecha de fin es obligatoria').custom( isDate ),

		reqValidator
	],
	addEvent
);

router.put('/:id', updateEvent );

router.delete('/:id', deleteEvent );


module.exports = router;