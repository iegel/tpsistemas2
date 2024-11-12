import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', apellido: '', dni: '' });
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    try {
      const response = await axios.get('https://4df0-181-80-210-133.ngrok-free.app/api/persons');
      setPersons(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedId) {
        // Actualiza la persona
        const response = await axios.put(`https://4df0-181-80-210-133.ngrok-free.app/api/persons/${selectedId}`, formData);
        setPersons(persons.map(person => (person._id === selectedId ? response.data : person)));
        setSelectedId(null);
      } else {
        // Crea una nueva persona
        const response = await axios.post('https://4df0-181-80-210-133.ngrok-free.app/api/persons', formData);
        setPersons([...persons, response.data]);
      }
      setFormData({ nombre: '', apellido: '', dni: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id) => {
    const person = persons.find(p => p._id === id);
    setFormData(person);
    setSelectedId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://4df0-181-80-210-133.ngrok-free.app/api/persons/${id}`);
      setPersons(persons.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>CRUD de Personas</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} />
        <input type="text" placeholder="Apellido" value={formData.apellido} onChange={e => setFormData({ ...formData, apellido: e.target.value })} />
        <input type="text" placeholder="DNI" value={formData.dni} onChange={e => setFormData({ ...formData, dni: e.target.value })} />
        <button type="submit">{selectedId ? 'Actualizar' : 'Agregar'}</button>
      </form>
      <ul>
        {persons.map(person => (
          <li key={person._id}>
            {person.nombre} {person.apellido} - {person.dni}
            <button onClick={() => handleEdit(person._id)}>Editar</button>
            <button onClick={() => handleDelete(person._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
