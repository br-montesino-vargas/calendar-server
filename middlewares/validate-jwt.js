const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = ( req, res = response, next ) =>
{
	const token = req.header('X-TOKEN');

	if( !token )
	{
		return res.status(401).json(
		{
			ok: false,
			msg: 'No se encontro token en la petición'
		});
	}

	try
	{
		const { id, name } = jwt.verify( token, process.env.SECRET_JWT );

		req.id = id;
		req.name = name;
	}
	catch (error)
	{
		return res.status(401).json(
		{
			ok: false,
			msg: 'Token no válido'
		});
	}

	next();
}

module.exports = { validateJWT };