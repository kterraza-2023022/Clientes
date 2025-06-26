import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css'

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="container-home-page">
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bienvenido a la Gestión de Clientes</h1>
      <button onClick={() => navigate('/clientes')}>Ver Clientes</button>
    </div>
    </div>
  );
}
