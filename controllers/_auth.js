const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const Usuario = require('../models/Usuario');


/**
	* Metodo que registra un nuevo usuario.
*/
const authRegister = async ( req, res = response ) =>
{
	const { email, password } = req.body;

	try
	{
		let usuario = await Usuario.findOne({ email });

		if( usuario )
		{
			return res.status(400).json(
			{
				ok: false,
				msg: 'El email ya esta registrado'
			});
		}

		usuario = new Usuario( req.body );

		// Encriptar password

		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync( password, salt );

		await usuario.save();

		// Generar JWT
		const token = await generateJWT( usuario.id, usuario.name );
	
		res.status(201).json(
		{
			ok : true,
			id : usuario.id,
			name: usuario.name,
			token
		});
	}
	catch (error)
	{
		res.status(500).json(
		{
			ok : false,
			msg : "Ah ocurrido un error, favor contactarse con el administrador."
		});
	}

};

/**
	* Metodo que autentica al usuario.
*/
const authLogin = async ( req, res = response ) =>
{
	const { email, password } = req.body;

	try
	{
		const usuario = await Usuario.findOne({ email });

		if( !usuario )
		{
			return res.status(400).json(
			{
				ok: false,
				msg: 'Email y/o contraseña invalido'
			});
		}

		// Validar pasword
		const validPass = bcrypt.compareSync( password, usuario.password );

		if( !validPass )
		{
			return res.status(400).json(
			{
				ok: false,
				msg: 'Email y/o contraseña invalido'
			});
		}

		// Generar JWT
		const token = await generateJWT( usuario.id, usuario.name );

		res.status(201).json(
		{
			ok : true,
			id : usuario.id,
			name: usuario.name,
			token
		});
	}
	catch (error)
	{
		res.status(500).json(
		{
			ok : false,
			msg : "Ah ocurrido un error, favor contactarse con el administrador."
		});
	}
};

/**
	* Metodo que renueva el JWT.
*/
const authRenew = async ( req, res = response ) =>
{
	const { id, name } = req;

	const token = await generateJWT( id, name );

	res.json(
	{
		ok : true,
		id,
		name,
		token
	});
};

module.exports = { authRegister, authLogin, authRenew };