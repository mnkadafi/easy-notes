const Note = require('../models/note.models.js');

//membuat dan menyimpan sebuah note
exports.create = (req, res) => {
	//memvalidasi permintaan
	if(!req.body.content){
		return res.status(404).send({
			message : "Konten Catatan tidak boleh kosong"
		});
	}

	//membuat sebuah note
	const note = new Note({
		title: req.body.title || "Untitled Content",
		content: req.body.content
	});

	//menyimpan note kedalam database
	note.save()
	.then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message : err.message || "Beberapa kesalahan terjadi saat membuat Catatan."
		});
	});
};

//mendapatkan kembali dan mengembalikan semua note dari database
exports.findAll = (req, res) => {
	Note.find()
	.then(notes => {
		res.send(notes);
	}).catch(err => {
		res.status(500).send({
			message : err.message || "Beberapa kesalahan terjadi saat membuat Catatan."
		});
	});
};

//mencari satu note berdasarkan id
exports.findOne = (req, res) => {
	Note.findById(req.params.noteId)
	.then(note => {
		if(!note) {
			return res.status(404).send({
				message : "Catatan tidak ditemukan dengan ID " + req.params.noteId
			});
		}
		res.send(note);
	}).catch(err => {
		if(err.kind === 'ObjectId'){
			return res.status(404).send({
				message : "Catatan tidak ditemukan dengan ID " + req.params.noteId
			});
		}
		return res.status(500).send({
			message : "Error mengembalikan catatan dengan ID " + req.params.noteId
		});
	});
};

//memperbaharui note sesuai permintaan dengan berdasarkan id
exports.update = (req, res) => {
	//memvalidasi permintaan
	if(!req.body.content){
		return res.status(400).send({
			message : "Konten Catatan tidak boleh kosong"
		});
	}

	//mencari note dan memperbaharui nya sesuai dengan permintaan inputan konten
	Note.findByIdAndUpdate(req.params.noteId, {
		title : req.body.title || "Untitled Note",
		content : req.body.content
	}, {new : true})
	.then(note => {
		if(!note){
			return res.status(404).send({
				message : "Catatan tidak ditemukan dengan ID " + req.params.noteId
			});
		}
		res.send(note);
	}).catch(err => {
		if(err.kind === 'ObjectId'){
			return res.status(404).send({
				message : "Catatan tidak ditemukan dengan ID " + req.params.noteId
			});
		}
		return res.status(500).send({
			message : "Error ketika memperbaharui note dengan ID " + req.params.noteId
		});
	});
};

//menghapus note dengan berdasarkan id
exports.delete = (req, res) => {
	Note.findByIdAndRemove(req.params.noteId)
	.then(note => {
		if(!note){
			return res.status(404).send({
				message : "Catatan tidak ditemukan berdasarkan ID " + req.params.noteId
			});
		}
		res.send({ message: "Catatan berhasil dihapus"});
	}).catch(err => {
		if(err.kind === 'ObjectId' || err.name === 'NotFound'){
			return res.status(404).send({
				message : "Catatan tidak ditemukan berdasarkan ID " + req.params.noteId
			});
		}

		return res.status(500).send({
			message : "Tidak bisa menghapus note dengan ID " + req.params.noteId
		});
	});
};