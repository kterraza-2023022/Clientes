import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClientes } from '../services/clienteService';
import ClienteList from '../components/ClienteList';
import ClienteForm from '../components/ClienteForm';
import { createCliente } from '../services/clienteService';
import '../css/ClientePage.css'

export default function ClientePage() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const fetchClientes = async () => {
    setLoading(true);
    try {
      const { data } = await getClientes();
      setClientes(data.clientes);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleCreate = async (formData) => {
    try {
      await createCliente(formData);
      alert('Cliente creado correctamente');
      setShowForm(false);
      fetchClientes(); // refrescar lista
    } catch (err) {
      alert('Error al crear cliente');
      console.error(err);
    }
  };

  return (
  <div className="full-width-wrapper">


    <div className="clientes-wrapper">
      <h1>Clientes Registrados</h1>

      {!showForm && (
        <button onClick={() => setShowForm(true)}>Registrar nuevo cliente</button>
      )}

      {showForm && (
  <>
    <ClienteForm onSubmit={handleCreate} cancel={() => setShowForm(false)} />
  </>
)}


      {loading && <p>Cargando clientes...</p>}
      {error && <p style={{ color: 'blue' }}>Error: {error.message}</p>}

      <ClienteList
        clientes={[...clientes].reverse()}
        onView={(cliente) => navigate(`/cliente/${cliente.id}`)}
      />
    </div>
  </div>
);

}
