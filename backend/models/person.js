const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  dni: { type: String, required: true },
});

module.exports = mongoose.model('Person', personSchema);
