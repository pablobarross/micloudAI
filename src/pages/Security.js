import React from 'react';
import './Security.css';

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
    )
  };
  
  return icons[name] || null;
};

const Security = () => {
  const securityFeatures = [
    {
      icon: 'lock',
      title: 'Encriptación AES-256',
      description: 'Tus archivos están protegidos con el estándar de encriptación más avanzado del mundo, utilizado por bancos y gobiernos.',
      details: [
        'Encriptación de extremo a extremo',
        'Claves de 256 bits',
        'Algoritmo AES certificado'
      ]
    },
    {
      icon: 'shield',
      title: 'Cumplimiento SOC 2',
      description: 'Cumplimos con los más altos estándares de seguridad y privacidad, auditados regularmente por terceros independientes.',
      details: [
        'Auditorías anuales',
        'Certificación SOC 2 Type II',
        'Cumplimiento GDPR y CCPA'
      ]
    },
    {
      icon: 'cloud',
      title: 'Infraestructura AWS',
      description: 'Alojado en Amazon Web Services, la plataforma más confiable y segura del mundo, con 99.99% de disponibilidad.',
      details: [
        'Centros de datos redundantes',
        'Backup automático',
        'Monitoreo 24/7'
      ]
    },
    {
      icon: 'lightning',
      title: '99.9% Disponibilidad',
      description: 'Garantizamos que tus archivos estén siempre disponibles cuando los necesites, con un tiempo de actividad excepcional.',
      details: [
        'SLA garantizado',
        'Recuperación rápida',
        'Soporte técnico dedicado'
      ]
    }
  ];

  const securityStats = [
    { value: '256-bit', label: 'Encriptación AES' },
    { value: '99.99%', label: 'Tiempo de actividad' },
    { value: 'SOC 2', label: 'Certificación' },
    { value: '24/7', label: 'Monitoreo' }
  ];

  return (
    <div className="security">
      {/* Header Section */}
      <section className="security-header">
        <div className="container">
          <h1 className="security-title">Seguridad y Privacidad</h1>
          <p className="security-subtitle">
            Tu información está protegida con los más altos estándares de seguridad del mundo
          </p>
        </div>
      </section>

      {/* Security Stats */}
      <section className="security-stats">
        <div className="container">
          <div className="stats-grid">
            {securityStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="security-features">
        <div className="container">
          <h2 className="section-title">Características de Seguridad</h2>
          <div className="features-grid">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <Icon name={feature.icon} className="feature-icon-svg" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <ul className="feature-details">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="detail-item">
                      <span className="detail-bullet"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="compliance">
        <div className="container">
          <div className="compliance-content">
            <div className="compliance-text">
              <h2 className="compliance-title">Cumplimiento y Certificaciones</h2>
              <p className="compliance-description">
                Vault cumple con los más altos estándares de seguridad y privacidad, 
                garantizando que tus datos estén protegidos según las regulaciones internacionales.
              </p>
              <div className="compliance-list">
                <div className="compliance-item">
                  <h4>GDPR (Reglamento General de Protección de Datos)</h4>
                  <p>Cumplimiento completo con las regulaciones europeas de protección de datos personales.</p>
                </div>
                <div className="compliance-item">
                  <h4>CCPA (California Consumer Privacy Act)</h4>
                  <p>Respetamos los derechos de privacidad de los consumidores de California.</p>
                </div>
                <div className="compliance-item">
                  <h4>ISO 27001</h4>
                  <p>Certificación internacional para sistemas de gestión de seguridad de la información.</p>
                </div>
              </div>
            </div>
            <div className="compliance-visual">
              <div className="certification-badges">
                <div className="badge gdpr">GDPR</div>
                <div className="badge ccpa">CCPA</div>
                <div className="badge iso">ISO 27001</div>
                <div className="badge soc2">SOC 2</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="privacy">
        <div className="container">
          <h2 className="section-title">Tu Privacidad es Nuestra Prioridad</h2>
          <div className="privacy-grid">
            <div className="privacy-card">
              <h3 className="privacy-title">Sin acceso a tus datos</h3>
              <p className="privacy-description">
                Utilizamos encriptación de extremo a extremo, lo que significa que ni siquiera 
                nuestro equipo puede acceder al contenido de tus archivos.
              </p>
            </div>
            <div className="privacy-card">
              <h3 className="privacy-title">Control total</h3>
              <p className="privacy-description">
                Tú tienes control completo sobre tus datos. Puedes eliminarlos en cualquier 
                momento y exportarlos cuando quieras.
              </p>
            </div>
            <div className="privacy-card">
              <h3 className="privacy-title">Sin publicidad</h3>
              <p className="privacy-description">
                No vendemos tus datos a terceros ni mostramos publicidad basada en tu contenido. 
                Tu información es solo tuya.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="security-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">¿Listo para proteger tus datos?</h2>
            <p className="cta-description">
              Únete a miles de usuarios que ya confían en Vault para almacenar 
              sus archivos más importantes de forma segura.
            </p>
            <div className="cta-buttons">
              <a href="/register" className="btn-primary">
                Comenzar gratis
              </a>
              <a href="/pricing" className="btn-outline">
                Ver planes
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Security; 