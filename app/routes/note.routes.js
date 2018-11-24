module.exports = (app) => {
	const notes = require('../controller/note.controller.js');

	//membuat sebuah note
	app.post('/notes', notes.create);

	//mengambil kembali semua note
	app.get('/notes', notes.findAll);

	//mengambil satu note dengan berdasarkan id
	app.get('/notes/:noteId', notes.findOne);

	//memperbaharui note dengan berdasarkan id
	app.put('/notes/:noteId', notes.update);

	//menghapus note dengan berdasarkan id
	app.delete('/notes/:noteId', notes.delete);
}