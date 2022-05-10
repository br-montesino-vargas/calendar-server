const { response } = require('express');

const Evento = require('../models/Evento');

/**
	* Metodo que obtiene los eventos del usuario.
*/
const getEvents = async ( req, res = response ) =>
{
	const eventos = await Evento.find().populate('user', 'name');

	res.status(200).json(
	{
		ok : true,
		eventos
	});
};

/**
	* Metodo que agrega un nuevo evento.
*/
const addEvent = async ( req, res = response ) =>
{
	const evento = new Evento( req.body );

	try
	{
		evento.user = req.id;

		const response = await evento.save();

		res.status(201).json(
		{
			ok: true,
			evento: response
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
	* Metodo que actualiza un evento.
*/
const updateEvent = async ( req, res = response ) =>
{
	const IDEVENTO = req.params.id;
	const id = req.id;

	try
	{
		const evento = await Evento.findById( IDEVENTO );

		if( !evento )
		{
			return res.status(404).json(
			{
				ok: false,
				msg: 'Evento no existe'
			});
		}

		if( evento.user.toString() !== id )
		{
			return res.status(401).json(
			{
				ok: false,
				msg: 'No tiene las credenciales para editar este evento'
			});
		}

		const dataEvento = { ...req.body, user: id };

		const response = await Evento.findByIdAndUpdate( IDEVENTO, dataEvento, { new: true } );

		res.status(201).json(
		{
			ok: true,
			evento: response
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
	* Metodo que elimina un evento.
*/
const deleteEvent = async ( req, res = response ) =>
{
	const IDEVENTO = req.params.id;
	const id = req.id;

	try
	{
		const evento = await Evento.findById( IDEVENTO );

		if( !evento )
		{
			return res.status(404).json(
			{
				ok: false,
				msg: 'Evento no existe'
			});
		}

		if( evento.user.toString() !== id )
		{
			return res.status(401).json(
			{
				ok: false,
				msg: 'No tiene las credenciales para eliminar este evento'
			});
		}

		await Evento.findByIdAndDelete( IDEVENTO );

		res.status(200).json(
		{
			ok : true
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

module.exports = { getEvents, addEvent, updateEvent, deleteEvent };