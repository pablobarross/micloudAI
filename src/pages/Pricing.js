import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Pricing.css';

// Componente de iconos SVG profesionales
const Icon = ({ name, className = "" }) => {
  const icons = {
    check: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" strokeWidth="2.5"/>
      </svg>
    ),
    ai: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    storage: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" strokeWidth="2.5"/>
      </svg>
    ),
         support: (
       <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
         <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" strokeWidth="2.5"/>
       </svg>
     ),
     devices: (
       <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
         <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" strokeWidth="2.5"/>
       </svg>
     )
   };
   
   return icons[name] || null;
 };

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Básico',
      price: billingCycle === 'monthly' ? '5' : '50',
      period: billingCycle === 'monthly' ? 'mes' : 'año',
      savings: billingCycle === 'yearly' ? 'Ahorra $10' : null,
      aiFeature: 'Chat IA básico con archivos',
      storage: '10 GB de almacenamiento expandible',
      devices: '1 dispositivo',
      support: 'Soporte por email',
      popular: false,
      color: 'basic'
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? '8' : '80',
      period: billingCycle === 'monthly' ? 'mes' : 'año',
      savings: billingCycle === 'yearly' ? 'Ahorra $16' : null,
      aiFeature: 'Chat IA avanzado con PDFs',
      storage: '100 GB de almacenamiento expandible',
      devices: '3 dispositivos',
      support: 'Soporte prioritario',
      popular: true,
      color: 'pro'
    },
    {
      name: 'Ejecutivo',
      price: billingCycle === 'monthly' ? '15' : '150',
      period: billingCycle === 'monthly' ? 'mes' : 'año',
      savings: billingCycle === 'yearly' ? 'Ahorra $30' : null,
      aiFeature: 'Chat IA completo con todos los archivos',
      storage: '500 GB de almacenamiento expandible',
      devices: '5 dispositivos',
      support: 'Soporte 24/7',
      popular: false,
      color: 'executive'
    }
  ];

  return (
    <div className="pricing">
      {/* Header */}
      <section className="pricing-header">
        <div className="container">
          <h1 className="pricing-title">Planes simples y transparentes</h1>
          <p className="pricing-subtitle">Elige el plan que mejor se adapte a tus necesidades</p>
          
                     {/* Billing Toggle */}
           <div className="billing-toggle">
             <button 
               className={`billing-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
               onClick={() => setBillingCycle('monthly')}
             >
               Mensual
             </button>
             <button 
               className={`billing-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
               onClick={() => setBillingCycle('yearly')}
             >
               Anual
             </button>
           </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pricing-cards">
        <div className="container">
          <div className="pricing-grid">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`pricing-card ${plan.popular ? 'popular' : ''} ${plan.color}`}
              >
                {plan.popular && <div className="popular-badge">Más popular</div>}
                
                <div className="plan-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="price">
                    <span className="currency">$</span>
                    <span className="amount">{plan.price}</span>
                    <span className="period">/{plan.period}</span>
                    {plan.savings && <span className="savings-badge">{plan.savings}</span>}
                  </div>
                </div>

                {/* AI Feature Highlight */}
                <div className="ai-feature">
                  <Icon name="check" className="ai-icon" />
                  <span className="ai-text">{plan.aiFeature}</span>
                </div>

                                 {/* Essential Features */}
                 <div className="essential-features">
                   <div className="feature-item">
                     <Icon name="check" className="feature-icon" />
                     <span className="feature-text">{plan.storage}</span>
                   </div>
                   <div className="feature-item">
                     <Icon name="check" className="feature-icon" />
                     <span className="feature-text">{plan.devices}</span>
                   </div>
                   <div className="feature-item">
                     <Icon name="check" className="feature-icon" />
                     <span className="feature-text">{plan.support}</span>
                   </div>
                 </div>

                <Link 
                  to="/register" 
                  className={`btn-plan ${plan.popular ? 'btn-popular' : ''}`}
                >
                  Seleccionar
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="pricing-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">¿Listo para empezar?</h2>
            <p className="cta-description">
              Comienza con 14 días de prueba gratuita. Sin compromisos.
            </p>
            <Link to="/register" className="btn-primary">
              Crear cuenta gratis
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing; 