import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// Componente de icono SVG profesional
const LockIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7c0-4.97-4.03-9-9-9zm0 2c3.87 0 7 3.13 7 7v7H5v-7c0-3.87 3.13-7 7-7z"/>
    <path d="M12 7c-1.66 0-3 1.34-3 3v2h6v-2c0-1.66-1.34-3-3-3z"/>
  </svg>
);

const Navbar = ({ isAuthenticated, user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <LockIcon className="logo-icon" />
          <span>Vault</span>
        </Link>

        <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/pricing" className="nav-link">Precios</Link>
          <Link to="/security" className="nav-link">Seguridad</Link>
          {isAuthenticated && (
            <>
              <Link to="/storage" className="nav-link">Almacenamiento</Link>
              <Link to="/chat-ai" className="nav-link">Chat IA</Link>
            </>
          )}
        </div>

        <div className="navbar-auth">
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-greeting">Hola, {user?.name || 'Usuario'}</span>
              <button onClick={onLogout} className="btn-logout">
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-login">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="btn-register">
                Registrarse
              </Link>
            </div>
          )}
        </div>

        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 