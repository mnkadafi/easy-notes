const express = require('express');
const bodyParser = require('body-parser');

//buat aplikasi express
const app = express();

// parse permintaan jenis konten - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// parse permintaan jenis konten - apllication/json
app.use(bodyParser.json())

//konfigurasi database mongodb
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//Mengkoneksikan ke database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
	console.log("Berhasil terhubung dengan database");
}).catch(err => {
	console.log('Tidak bisa terhubung ke database, mengeluarkan...', err);
	process.exit();
});

// menentukan rute
app.get('/', (req, res) => {
	res.json({"message": "Welcome to EasyNotes Application. Take notes quickly. Organize and keep track of all your notes."});
});

//memerlkukan rute note
require('./app/routes/note.routes.js')(app);

//permintaan koneksi port
app.listen(3000, () => {
	console.log("Server berjalan pada port 3000");
});