import { useState, useEffect } from 'react';
import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
} from '../../services/clienteService';

export function useCliente() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClientes = async () => {
  setLoading(true);
  try {
    const { data } = await getClientes();
    setClientes(data.clientes); // ✅ usar la propiedad correcta
  } catch (err) {
    console.error('Error al obtener clientes:', err);
    setError(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
    fetchClientes();
  }, []);


  const handleCreate = async (formData) => {
    await createCliente(formData);
    await fetchClientes();
  };

  const handleUpdate = async (id, formData) => {
    await updateCliente(id, formData);
    await fetchClientes();
  };

  const handleDelete = async (id) => {
    await deleteCliente(id);
    await fetchClientes();
  };

  

  return {
    clientes,
    loading,
    error,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
}
