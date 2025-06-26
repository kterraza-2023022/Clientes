import React, { useEffect, useState } from 'react';
import '../css/ClienteForm.css'

export default function ClienteForm({ onSubmit, clienteEdit, cancel }) {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    telefono: '',
  });

  useEffect(() => {
    if (clienteEdit) {
      setForm({
        nombre: clienteEdit.nombre || '',
        correo: clienteEdit.correo || '',
        telefono: clienteEdit.telefono || '',
      });
    } else {
      setForm({
        nombre: '',
        correo: '',
        telefono: '',
      });
    }
  }, [clienteEdit]);

 const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="cliente-form">
      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        required
      />
      <input
        name="correo"
        placeholder="Correo"
        value={form.correo}
        onChange={handleChange}
        required
      />
      <input
        name="telefono"
        placeholder="Teléfono"
        value={form.telefono}
        onChange={handleChange}
        required
      />
      <button type="submit">Crear</button>
      <button type="button" onClick={cancel}>Cancelar</button>
    </form>
  );
}
