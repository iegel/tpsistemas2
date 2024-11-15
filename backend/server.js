const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error(err));

// Modelo de datos
const personSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  dni: String,
});

const Person = mongoose.model('Person', personSchema);

// Rutas CRUD
app.post('/api/persons', async (req, res) => {
  const { nombre, apellido, dni } = req.body;
  const newPerson = new Person({ nombre, apellido, dni });
  await newPerson.save();
  res.status(201).json(newPerson);
});

app.get('/api/persons', async (req, res) => {
  const persons = await Person.find();
  res.status(200).json(persons);
});

app.get('/api/persons/:id', async (req, res) => {
  const person = await Person.findById(req.params.id);
  res.status(200).json(person);
});

app.put('/api/persons/:id', async (req, res) => {
  const { nombre, apellido, dni } = req.body;
  const updatedPerson = await Person.findByIdAndUpdate(
    req.params.id,
    { nombre, apellido, dni },
    { new: true }
  );
  res.status(200).json(updatedPerson);
});

app.delete('/api/persons/:id', async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

// Usa el puerto definido en el archivo .env
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));

app.get('/', (req, res) => {
  res.send("Servidor backend está en funcionamiento.");
});