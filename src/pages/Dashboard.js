import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Bienvenido de vuelta, {user?.name || 'Usuario'}</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Almacenamiento</h3>
            <p>Gestiona tus archivos</p>
            <Link to="/storage" className="btn-card">Ir a almacenamiento</Link>
          </div>
          <div className="dashboard-card">
            <h3>Chat IA</h3>
            <p>Conversa con tus documentos</p>
            <Link to="/chat-ai" className="btn-card">Ir a chat IA</Link>
          </div>
          <div className="dashboard-card">
            <h3>Plan actual</h3>
            <p>{user?.plan || 'Básico'}</p>
            <Link to="/pricing" className="btn-card">Ver planes</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 