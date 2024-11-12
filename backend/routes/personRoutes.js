const express = require('express');
const Person = require('../models/person');
const router = express.Router();

router.post('/', async (req, res) => {
  const newPerson = new Person(req.body);
  await newPerson.save();
  res.status(201).json(newPerson);
});

router.get('/', async (req, res) => {
  const persons = await Person.find();
  res.status(200).json(persons);
});

router.get('/:id', async (req, res) => {
  const person = await Person.findById(req.params.id);
  res.status(200).json(person);
});

router.put('/:id', async (req, res) => {
  const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedPerson);
});

router.delete('/:id', async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
