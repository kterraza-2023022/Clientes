import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCliente, updateCliente, deleteCliente } from '../services/clienteService';
import '../css/ClienteDetailPage.css'

export default function ClienteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [form, setForm] = useState({ nombre: '', correo: '', telefono: '' });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCliente();
  }, [id]);

  const fetchCliente = async () => {
  try {
    setLoading(true);
    const { data } = await getCliente(id);
    setCliente(data.cliente); // <--- usa data.cliente si viene anidado
    setForm({
      nombre: data.cliente.nombre,
      correo: data.cliente.correo,
      telefono: data.cliente.telefono,
    });
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
  }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateCliente(id, form);
      alert('Cliente actualizado correctamente');
      setEditMode(false);
      fetchCliente(); // refresca los datos
    } catch (err) {
      alert('Error al actualizar cliente');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Seguro que quieres eliminar este cliente?')) {
      try {
        await deleteCliente(id);
        alert('Cliente eliminado');
        navigate('/clientes'); // redirige a la lista
      } catch (err) {
        alert('Error al eliminar cliente');
        console.error(err);
      }
    }
  };

  if (loading) return <p>Cargando cliente...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;
  if (!cliente) return <p>Cliente no encontrado</p>;

  return (
    <div className="container-cliente-detail-page">
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Detalles del Cliente</h2>

      {editMode ? (
        <form onSubmit={handleUpdate}>
          <input name="nombre" value={form.nombre} onChange={handleChange} required />
          <input name="correo" value={form.correo} onChange={handleChange} required />
          <input name="telefono" value={form.telefono} onChange={handleChange} required />
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancelar</button>
        </form>
      ) : (
        <>
          <p><strong>Nombre:</strong> {cliente.nombre}</p>
          <p><strong>Correo:</strong> {cliente.correo}</p>
          <p><strong>Teléfono:</strong> {cliente.telefono}</p>
          <button onClick={() => setEditMode(true)}>Editar</button>
          <button onClick={handleDelete} style={{ color: '#ec1111' }}>Eliminar</button>
        </>
      )}

      <br />
      <button onClick={() => navigate('/clientes')}>Volver a la lista</button>
    </div>
    </div>
  );
}
