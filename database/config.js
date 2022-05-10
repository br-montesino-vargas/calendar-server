const mongoose = require('mongoose');

const db = async () =>
{
	try
	{
		await mongoose.connect( process.env.DB_CNN,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});

		console.log('DB Online');
	}
	catch (error)
	{
		console.log(error);
		throw new error('Error a la hora de inicializar BD')
	}
}

module.exports = { db };