import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Componente de iconos SVG profesionales
const Icon = ({ name, className = "" }) => {
  const icons = {
    lock: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7c0-4.97-4.03-9-9-9zm0 2c3.87 0 7 3.13 7 7v7H5v-7c0-3.87 3.13-7 7-7z"/>
        <path d="M12 7c-1.66 0-3 1.34-3 3v2h6v-2c0-1.66-1.34-3-3-3z"/>
      </svg>
    ),
    shield: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
      </svg>
    ),
    cloud: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
      </svg>
    ),
    lightning: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
      </svg>
    ),
    mobile: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
      </svg>
    ),
    robot: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2s2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        <path d="M19 8h-2v3h2c1.1 0 2 .9 2 2v5c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-5c0-1.1.9-2 2-2h2V8H5c-1.1 0-2 .9-2 2v5c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2z"/>
        <circle cx="8" cy="13" r="1"/>
        <circle cx="16" cy="13" r="1"/>
      </svg>
    ),
    chart: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
      </svg>
    ),
    check: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    ),
    twitter: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
      </svg>
    ),
    linkedin: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    github: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    )
  };
  
  return icons[name] || null;
};

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Tu caja fuerte digital en la nube
            </h1>
            <p className="hero-subtitle">
              Almacenamiento seguro en Amazon Web Services con privacidad y seguridad absoluta. 
              Tu información personal protegida con la infraestructura más confiable del mundo.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="btn-primary">
                Comenzar gratis
              </Link>
              <Link to="/pricing" className="btn-primary btn-dark">
                Ver precios
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-icon">
              <Icon name="lock" className="hero-icon-svg" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">¿Por qué elegir Vault?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Icon name="shield" className="feature-icon-svg" />
              </div>
              <h3 className="feature-title">Seguridad de nivel bancario</h3>
              <p className="feature-description">Encriptación AES-256 y cumplimiento SOC 2 para proteger tus datos más sensibles.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Icon name="cloud" className="feature-icon-svg" />
              </div>
              <h3 className="feature-title">Infraestructura AWS</h3>
              <p className="feature-description">Alojado en Amazon Web Services, la plataforma más confiable y escalable del mundo.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Icon name="lock" className="feature-icon-svg" />
              </div>
              <h3 className="feature-title">Privacidad absoluta</h3>
              <p className="feature-description">Tu información es tuya. Acceso de extremo a extremo y control total sobre tus datos.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Icon name="lightning" className="feature-icon-svg" />
              </div>
              <h3 className="feature-title">Acceso instantáneo</h3>
              <p className="feature-description">Sube, descarga y gestiona tus archivos desde cualquier dispositivo, en cualquier momento.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Icon name="mobile" className="feature-icon-svg" />
              </div>
              <h3 className="feature-title">Multiplataforma</h3>
              <p className="feature-description">Accede desde tu computadora, tablet o smartphone con sincronización automática.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Icon name="robot" className="feature-icon-svg" />
              </div>
              <h3 className="feature-title">IA integrada</h3>
              <p className="feature-description">Chat con tus PDFs y análisis inteligente de documentos con tecnología de IA avanzada.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <div className="benefits-content">
            <div className="benefits-text">
              <h2 className="benefits-title">Beneficios que marcan la diferencia</h2>
              <ul className="benefits-list">
                <li className="benefit-item">
                  <Icon name="check" className="benefit-icon" />
                  <span>Sin límites de tamaño de archivo</span>
                </li>
                <li className="benefit-item">
                  <Icon name="check" className="benefit-icon" />
                  <span>Sincronización automática en tiempo real</span>
                </li>
                <li className="benefit-item">
                  <Icon name="check" className="benefit-icon" />
                  <span>Historial de versiones y recuperación</span>
                </li>
                <li className="benefit-item">
                  <Icon name="check" className="benefit-icon" />
                  <span>Compartir archivos de forma segura</span>
                </li>
                <li className="benefit-item">
                  <Icon name="check" className="benefit-icon" />
                  <span>Soporte técnico 24/7</span>
                </li>
                <li className="benefit-item">
                  <Icon name="check" className="benefit-icon" />
                  <span>Cumplimiento GDPR y CCPA</span>
                </li>
              </ul>
              <Link to="/register" className="btn-primary">
                Empezar ahora
              </Link>
            </div>
            <div className="benefits-visual">
              <div className="benefits-icon">
                <Icon name="chart" className="benefits-icon-svg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">¿Listo para proteger tus datos?</h2>
            <p className="cta-description">
              Únete a miles de usuarios que ya confían en Vault para almacenar 
              sus archivos más importantes de forma segura.
            </p>
                         <div className="cta-buttons">
               <Link to="/register" className="btn-primary">
                 Crear cuenta gratis
               </Link>
               <Link to="/pricing" className="btn-primary btn-dark">
                 Ver planes
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4 className="footer-title">Producto</h4>
              <ul className="footer-links">
                <li><Link to="/pricing">Precios</Link></li>
                <li><Link to="/security">Seguridad</Link></li>
                <li><Link to="/storage">Almacenamiento</Link></li>
                <li><Link to="/chat-ai">Chat IA</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Soporte</h4>
              <ul className="footer-links">
                <li><a href="#help">Centro de ayuda</a></li>
                <li><a href="#contact">Contacto</a></li>
                <li><a href="#status">Estado del servicio</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Legal</h4>
              <ul className="footer-links">
                <li><a href="#privacy">Privacidad</a></li>
                <li><a href="#terms">Términos</a></li>
                <li><a href="#cookies">Cookies</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Síguenos</h4>
              <div className="social-links">
                <a href="#twitter" aria-label="Twitter" className="social-link">
                  <Icon name="twitter" className="social-icon" />
                </a>
                <a href="#linkedin" aria-label="LinkedIn" className="social-link">
                  <Icon name="linkedin" className="social-icon" />
                </a>
                <a href="#github" aria-label="GitHub" className="social-link">
                  <Icon name="github" className="social-icon" />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">&copy; 2024 Vault. Tu caja fuerte digital en AWS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 