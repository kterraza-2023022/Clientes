import React from 'react';
import '../css/ClienteList.css';

export default function ClienteList({ clientes = [], onView }) {
  if (!clientes.length) return <p>No hay clientes registrados.</p>;

  return (
    <div className="cliente-list">
      {clientes.map((cliente) => (
        <div className="cliente-card" key={cliente.id}>
          <h3>{cliente.nombre}</h3>
          <p><strong>Correo:</strong> {cliente.correo}</p>
          <p><strong>Teléfono:</strong> {cliente.telefono}</p>
          <button onClick={() => onView(cliente)}>Ver más</button>
        </div>
      ))}
    </div>
  );
}
