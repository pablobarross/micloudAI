const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Almacenamiento temporal en memoria (en producción usar AWS S3)
let userFiles = [];
let chatHistory = [];

// Ruta principal con interfaz completa de Vault
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vault - Tu caja fuerte digital en AWS</title>
        <meta name="description" content="Almacenamiento seguro en la nube AWS. Tu caja fuerte digital con privacidad y seguridad absoluta.">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            :root {
                --primary-color: #3b82f6;
                --primary-dark: #2563eb;
                --primary-light: #60a5fa;
                --secondary-color: #10b981;
                --secondary-dark: #059669;
                --accent-color: #f59e0b;
                --background-dark: #0f172a;
                --background-card: #1e293b;
                --background-light: #334155;
                --text-primary: #f8fafc;
                --text-secondary: #cbd5e1;
                --text-muted: #64748b;
                --border-color: #475569;
                --success-color: #10b981;
                --error-color: #ef4444;
                --warning-color: #f59e0b;
                --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                --border-radius: 12px;
                --border-radius-sm: 8px;
                --border-radius-lg: 16px;
                --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: var(--background-dark);
                color: var(--text-primary);
                line-height: 1.6;
                font-size: 16px;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
            
            /* Header y Navegación */
            .header {
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(20px);
                padding: 1rem 2rem;
                box-shadow: var(--shadow-lg);
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 1000;
                border-bottom: 1px solid var(--border-color);
                transition: var(--transition);
            }
            
            .header-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .logo {
                font-size: 1.75rem;
                font-weight: 800;
                color: var(--primary-color);
                text-decoration: none;
                transition: var(--transition);
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .logo:hover {
                color: var(--primary-light);
                transform: translateY(-1px);
            }
            
            .nav-links {
                display: flex;
                gap: 2.5rem;
                align-items: center;
            }
            
            .nav-link {
                color: var(--text-secondary);
                text-decoration: none;
                font-weight: 500;
                font-size: 0.95rem;
                transition: var(--transition);
                cursor: pointer;
                position: relative;
                padding: 0.5rem 0;
            }
            
            .nav-link:hover {
                color: var(--primary-color);
            }
            
            .nav-link::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 0;
                height: 2px;
                background: var(--primary-color);
                transition: var(--transition);
            }
            
            .nav-link:hover::after {
                width: 100%;
            }
            
            .auth-buttons {
                display: flex;
                gap: 1rem;
                align-items: center;
            }
            
            .btn-login {
                background: transparent;
                color: var(--primary-color);
                padding: 0.75rem 1.5rem;
                border-radius: var(--border-radius-sm);
                text-decoration: none;
                font-weight: 600;
                font-size: 0.9rem;
                transition: var(--transition);
                border: 2px solid var(--primary-color);
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            
            .btn-login:hover {
                background: var(--primary-color);
                color: white;
                transform: translateY(-2px);
                box-shadow: var(--shadow-lg);
            }
            
            .btn-register {
                background: var(--primary-color);
                color: white;
                padding: 0.75rem 1.5rem;
                border-radius: var(--border-radius-sm);
                text-decoration: none;
                font-weight: 600;
                font-size: 0.9rem;
                transition: var(--transition);
                border: 2px solid var(--primary-color);
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            
            .btn-register:hover {
                background: var(--primary-dark);
                border-color: var(--primary-dark);
                transform: translateY(-2px);
                box-shadow: var(--shadow-lg);
            }
            
            .btn-register:active,
            .btn-login:active {
                transform: translateY(0);
            }
            
            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 2rem;
            }
            
            /* Hero Section */
            .hero {
                padding: 8rem 0 6rem;
                text-align: center;
                background: linear-gradient(135deg, var(--background-dark) 0%, var(--background-card) 100%);
                position: relative;
                overflow: hidden;
            }
            
            .hero::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
                pointer-events: none;
            }
            
            .hero-content {
                position: relative;
                z-index: 1;
            }
            
            .hero h1 {
                font-size: clamp(2.5rem, 5vw, 4rem);
                font-weight: 800;
                color: var(--text-primary);
                margin-bottom: 1.5rem;
                line-height: 1.1;
                letter-spacing: -0.02em;
            }
            
            .hero p {
                font-size: 1.25rem;
                color: var(--text-secondary);
                margin-bottom: 3rem;
                max-width: 700px;
                margin-left: auto;
                margin-right: auto;
                line-height: 1.7;
            }
            
            .hero-buttons {
                display: flex;
                gap: 1.5rem;
                justify-content: center;
                flex-wrap: wrap;
                margin-bottom: 3rem;
            }
            
            .btn-primary {
                background: var(--primary-color);
                color: white;
                padding: 1rem 2.5rem;
                border-radius: var(--border-radius);
                text-decoration: none;
                font-weight: 600;
                font-size: 1rem;
                transition: var(--transition);
                border: none;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                box-shadow: var(--shadow-md);
            }
            
            .btn-primary:hover {
                background: var(--primary-dark);
                transform: translateY(-3px);
                box-shadow: var(--shadow-xl);
            }
            
            .btn-primary:active {
                transform: translateY(-1px);
            }
            
            .btn-secondary {
                background: transparent;
                color: var(--primary-color);
                padding: 1rem 2.5rem;
                border-radius: var(--border-radius);
                text-decoration: none;
                font-weight: 600;
                font-size: 1rem;
                transition: var(--transition);
                border: 2px solid var(--primary-color);
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            
            .btn-secondary:hover {
                background: var(--primary-color);
                color: white;
                transform: translateY(-3px);
                box-shadow: var(--shadow-xl);
            }
            
            .btn-secondary:active {
                transform: translateY(-1px);
            }
            
            /* Tabs y Contenido Principal */
            .main-content {
                margin-top: 80px;
                padding: 2rem 0;
            }
            
            .tabs {
                display: flex;
                background: var(--background-card);
                border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
                overflow: hidden;
                box-shadow: var(--shadow-lg);
                margin: 2rem auto;
                max-width: 1200px;
                border: 1px solid var(--border-color);
            }
            
            .tab {
                flex: 1;
                padding: 1.5rem 1rem;
                text-align: center;
                background: var(--background-light);
                border: none;
                cursor: pointer;
                transition: var(--transition);
                font-weight: 600;
                color: var(--text-secondary);
                font-size: 0.95rem;
                position: relative;
                overflow: hidden;
            }
            
            .tab.active {
                background: var(--primary-color);
                color: white;
                box-shadow: inset 0 -3px 0 var(--primary-dark);
            }
            
            .tab:hover:not(.active) {
                background: var(--background-card);
                color: var(--primary-color);
                transform: translateY(-1px);
            }
            
            .tab:active {
                transform: translateY(0);
            }
            
            .content {
                background: var(--background-card);
                padding: 3rem;
                border-radius: 0 0 var(--border-radius-lg) var(--border-radius-lg);
                box-shadow: var(--shadow-lg);
                min-height: 600px;
                max-width: 1200px;
                margin: 0 auto;
                border: 1px solid var(--border-color);
                border-top: none;
            }
            
            .tab-content {
                display: none;
            }
            
            .tab-content.active {
                display: block;
            }
            
            .file-upload-area {
                border: 2px dashed #6b7280;
                border-radius: 16px;
                padding: 3rem;
                text-align: center;
                background: #4b5563;
                transition: all 0.3s ease;
                cursor: pointer;
                margin-bottom: 2rem;
            }
            
            .file-upload-area:hover {
                border-color: #d97706;
                background: #6b7280;
            }
            
            .file-upload-area.dragover {
                border-color: #d97706;
                background: #6b7280;
                transform: scale(1.02);
            }
            
            .upload-icon {
                font-size: 3rem;
                color: #64748b;
                margin-bottom: 1rem;
            }
            
            .file-list {
                background: #4b5563;
                border-radius: 12px;
                padding: 1.5rem;
                margin-top: 2rem;
            }
            
            .file-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
                background: #6b7280;
                border-radius: 8px;
                margin-bottom: 0.5rem;
                box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                transition: all 0.2s ease;
            }
            
            .file-item:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
            
            .file-info {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .file-icon {
                font-size: 1.5rem;
                color: #d97706;
            }
            
            .file-actions {
                display: flex;
                gap: 0.5rem;
            }
            
            .btn-small {
                padding: 0.5rem 1rem;
                border-radius: 6px;
                text-decoration: none;
                font-weight: 500;
                font-size: 0.875rem;
                transition: all 0.2s ease;
                border: none;
                cursor: pointer;
            }
            
            .btn-download {
                background: #059669;
                color: white;
            }
            
            .btn-download:hover {
                background: #059669;
            }
            
            .btn-delete {
                background: #ef4444;
                color: white;
            }
            
            .btn-delete:hover {
                background: #dc2626;
            }
            
            .chat-container {
                height: 400px;
                border: 1px solid #6b7280;
                border-radius: 12px;
                overflow-y: auto;
                padding: 1.5rem;
                margin-bottom: 1.5rem;
                background: #4b5563;
            }
            
            .message {
                margin-bottom: 1rem;
                padding: 1rem;
                border-radius: 12px;
                max-width: 80%;
            }
            
            .user-message {
                background: #d97706;
                color: white;
                margin-left: auto;
            }
            
            .ai-message {
                background: #6b7280;
                color: #f9fafb;
                border: 1px solid #9ca3af;
            }
            
            .input-group {
                display: flex;
                gap: 1rem;
                margin-bottom: 1rem;
            }
            
            input, textarea, select {
                padding: 0.875rem;
                border: 1px solid #6b7280;
                border-radius: 8px;
                font-size: 1rem;
                flex: 1;
                transition: border-color 0.2s ease;
                background: #4b5563;
                color: #f9fafb;
            }
            
            input:focus, textarea:focus, select:focus {
                outline: none;
                border-color: #d97706;
                box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1);
            }
            
            .pricing-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                margin-top: 2rem;
            }
            
            .pricing-card {
                background: #4b5563;
                border: 2px solid #6b7280;
                border-radius: 16px;
                padding: 2rem;
                text-align: center;
                transition: all 0.3s ease;
                position: relative;
            }
            
            .pricing-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                border-color: #d97706;
            }
            
            .pricing-card.featured {
                border-color: #d97706;
                background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
            }
            
            .plan-name {
                font-size: 1.5rem;
                font-weight: 700;
                color: #f9fafb;
                margin-bottom: 0.5rem;
            }
            
            .plan-price {
                font-size: 3rem;
                font-weight: 800;
                color: #d97706;
                margin-bottom: 1rem;
            }
            
            .plan-features {
                list-style: none;
                margin: 1.5rem 0;
            }
            
            .plan-features li {
                padding: 0.5rem 0;
                color: #d1d5db;
            }
            
            .plan-features li:before {
                content: "✓";
                color: #059669;
                font-weight: bold;
                margin-right: 0.5rem;
            }
            
            .stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
            }
            
            .stat-card {
                background: linear-gradient(135deg, #d97706, #b45309);
                color: white;
                padding: 1.5rem;
                border-radius: 12px;
                text-align: center;
            }
            
            .stat-number {
                font-size: 2rem;
                font-weight: 700;
                margin-bottom: 0.5rem;
            }
            
            .loading {
                text-align: center;
                color: #d97706;
                font-style: italic;
                padding: 2rem;
            }
            
            /* Badges y Estados */
            .badge {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                border-radius: 50px;
                font-size: 0.875rem;
                font-weight: 600;
                margin: 0.5rem;
                transition: var(--transition);
            }
            
            .security-badge {
                background: rgba(16, 185, 129, 0.1);
                color: var(--success-color);
                border: 1px solid rgba(16, 185, 129, 0.2);
            }
            
            .aws-badge {
                background: rgba(245, 158, 11, 0.1);
                color: var(--warning-color);
                border: 1px solid rgba(245, 158, 11, 0.2);
            }
            
            .badge:hover {
                transform: translateY(-1px);
                box-shadow: var(--shadow-sm);
            }
            
            /* Formularios y Validaciones */
            .form-group {
                margin-bottom: 1.5rem;
            }
            
            .form-label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 500;
                color: var(--text-primary);
                font-size: 0.9rem;
            }
            
            .form-input {
                width: 100%;
                padding: 0.875rem 1rem;
                border: 2px solid var(--border-color);
                border-radius: var(--border-radius-sm);
                font-size: 1rem;
                transition: var(--transition);
                background: var(--background-light);
                color: var(--text-primary);
            }
            
            .form-input:focus {
                outline: none;
                border-color: var(--primary-color);
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }
            
            .form-input.error {
                border-color: var(--error-color);
                box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
            }
            
            .form-input.success {
                border-color: var(--success-color);
                box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
            }
            
            .form-error {
                color: var(--error-color);
                font-size: 0.875rem;
                margin-top: 0.5rem;
                display: flex;
                align-items: center;
                gap: 0.25rem;
            }
            
            .form-success {
                color: var(--success-color);
                font-size: 0.875rem;
                margin-top: 0.5rem;
                display: flex;
                align-items: center;
                gap: 0.25rem;
            }
            
            /* Loading States */
            .loading {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--text-muted);
                font-style: italic;
            }
            
            .spinner {
                width: 16px;
                height: 16px;
                border: 2px solid var(--border-color);
                border-top: 2px solid var(--primary-color);
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .btn-loading {
                position: relative;
                color: transparent !important;
            }
            
            .btn-loading::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 16px;
                height: 16px;
                margin: -8px 0 0 -8px;
                border: 2px solid transparent;
                border-top: 2px solid currentColor;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            /* Footer */
            .footer {
                background: var(--background-card);
                border-top: 1px solid var(--border-color);
                padding: 3rem 0 2rem;
                margin-top: 4rem;
            }
            
            .footer-content {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 2rem;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 2rem;
            }
            
            .footer-section h3 {
                color: var(--text-primary);
                font-size: 1.1rem;
                font-weight: 600;
                margin-bottom: 1rem;
            }
            
            .footer-section p,
            .footer-section a {
                color: var(--text-secondary);
                text-decoration: none;
                font-size: 0.9rem;
                line-height: 1.6;
                transition: var(--transition);
            }
            
            .footer-section a:hover {
                color: var(--primary-color);
            }
            
            .footer-links {
                list-style: none;
            }
            
            .footer-links li {
                margin-bottom: 0.5rem;
            }
            
            .footer-bottom {
                border-top: 1px solid var(--border-color);
                margin-top: 2rem;
                padding-top: 2rem;
                text-align: center;
                color: var(--text-muted);
                font-size: 0.875rem;
            }
            
            .social-links {
                display: flex;
                gap: 1rem;
                margin-top: 1rem;
            }
            
            .social-link {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                background: var(--background-light);
                border-radius: 50%;
                color: var(--text-secondary);
                text-decoration: none;
                transition: var(--transition);
            }
            
            .social-link:hover {
                background: var(--primary-color);
                color: white;
                transform: translateY(-2px);
            }
            
            /* Responsive Design */
            @media (max-width: 1024px) {
                .container {
                    padding: 0 1.5rem;
                }
                
                .content {
                    padding: 2rem;
                }
            }
            
            @media (max-width: 768px) {
                .header {
                    padding: 1rem;
                }
                
                .nav-links {
                    display: none;
                }
                
                .hero {
                    padding: 6rem 0 4rem;
                }
                
                .hero h1 {
                    font-size: 2.5rem;
                }
                
                .hero p {
                    font-size: 1.1rem;
                }
                
                .hero-buttons {
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }
                
                .tabs {
                    flex-direction: column;
                    border-radius: var(--border-radius);
                }
                
                .tab {
                    border-radius: 0;
                }
                
                .tab:first-child {
                    border-radius: var(--border-radius) var(--border-radius) 0 0;
                }
                
                .tab:last-child {
                    border-radius: 0 0 var(--border-radius) var(--border-radius);
                }
                
                .content {
                    border-radius: var(--border-radius);
                    margin-top: 0;
                    padding: 1.5rem;
                }
                
                .pricing-grid {
                    grid-template-columns: 1fr;
                }
                
                .footer-content {
                    grid-template-columns: 1fr;
                    text-align: center;
                }
                
                .social-links {
                    justify-content: center;
                }
            }
            
            /* Modales */
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
                z-index: 2000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: var(--transition);
            }
            
            .modal.show {
                opacity: 1;
                visibility: visible;
            }
            
            .modal-content {
                background: var(--background-card);
                border-radius: var(--border-radius-lg);
                padding: 2rem;
                max-width: 400px;
                width: 90%;
                position: relative;
                box-shadow: var(--shadow-xl);
                border: 1px solid var(--border-color);
                transform: scale(0.9);
                transition: var(--transition);
            }
            
            .modal.show .modal-content {
                transform: scale(1);
            }
            
            .close {
                position: absolute;
                top: 1rem;
                right: 1.5rem;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--text-muted);
                transition: var(--transition);
            }
            
            .close:hover {
                color: var(--text-primary);
            }
            
            .modal h2 {
                margin-bottom: 1.5rem;
                color: var(--text-primary);
                font-size: 1.5rem;
                font-weight: 600;
            }
            
            @media (max-width: 480px) {
                .hero h1 {
                    font-size: 2rem;
                }
                
                .hero p {
                    font-size: 1rem;
                }
                
                .btn-primary,
                .btn-secondary {
                    padding: 0.875rem 2rem;
                    font-size: 0.9rem;
                }
                
                .content {
                    padding: 1rem;
                }
                
                .modal-content {
                    padding: 1.5rem;
                    margin: 1rem;
                }
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="header-content">
                <a href="#" class="logo" onclick="goHome()">
                    <span style="font-size: 1.5rem;">🔐</span>
                    <span>Vault</span>
                </a>
                <div class="nav-links">
                    <span class="nav-link" onclick="showTab('info')">Información</span>
                    <span class="nav-link" onclick="showTab('pricing')">Precios</span>
                    <span class="nav-link" onclick="showTab('storage')">Almacenamiento</span>
                    <span class="nav-link" onclick="showTab('chat')">Chat IA</span>
                    <span class="nav-link" onclick="showTab('security')">Seguridad</span>
                </div>
                <div class="auth-buttons">
                    <button class="btn-login" onclick="showLoginModal()">Iniciar Sesión</button>
                    <button class="btn-register" onclick="showRegisterModal()">Registrarse</button>
                </div>
            </div>
        </div>
        
        <div class="hero">
            <div class="container">
                <div class="hero-content">
                    <h1>Tu caja fuerte digital en AWS</h1>
                    <p>Almacenamiento seguro en la nube con privacidad y seguridad absoluta. Infraestructura escalable en Amazon Web Services para proteger tus datos más importantes.</p>
                    <div style="margin-bottom: 2rem;">
                        <span class="badge security-badge">🔐 Encriptación AES-256</span>
                        <span class="badge aws-badge">☁️ Powered by AWS S3</span>
                    </div>
                    <div class="hero-buttons">
                        <button class="btn-primary" onclick="showTab('storage')">Comenzar gratis</button>
                        <button class="btn-secondary" onclick="showTab('pricing')">Ver precios</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="container">
            <div class="tabs">
                <button class="tab active" onclick="showTab('info')">📋 Información</button>
                <button class="tab" onclick="showTab('pricing')">💰 Precios</button>
                <button class="tab" onclick="showTab('storage')">📁 Almacenamiento</button>
                <button class="tab" onclick="showTab('chat')">🤖 Chat IA</button>
                <button class="tab" onclick="showTab('security')">🔒 Seguridad</button>
            </div>
            
            <div class="content">
                <!-- Información -->
                <div id="info" class="tab-content active">
                    <h2>🔐 Tu caja fuerte digital en AWS</h2>
                    <p>Bienvenido a Vault, la solución más segura para almacenar tus archivos en la nube. Con tecnología de Amazon Web Services y encriptación militar AES-256, tus datos están protegidos como nunca antes.</p>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 2rem;">
                        <div style="background: #4b5563; padding: 2rem; border-radius: 12px; border: 1px solid #6b7280;">
                            <h3>🔒 Seguridad Absoluta</h3>
                            <p>Encriptación AES-256, cumplimiento SOC 2, y múltiples capas de protección para tus archivos más importantes.</p>
                        </div>
                        
                        <div style="background: #4b5563; padding: 2rem; border-radius: 12px; border: 1px solid #6b7280;">
                            <h3>☁️ Infraestructura AWS</h3>
                            <p>Utilizamos Amazon Web Services S3, la infraestructura más confiable y escalable del mundo para tu almacenamiento.</p>
                        </div>
                        
                        <div style="background: #4b5563; padding: 2rem; border-radius: 12px; border: 1px solid #6b7280;">
                            <h3>⚡ Acceso 24/7</h3>
                            <p>Garantizamos acceso a tus archivos 24/7 con una disponibilidad del 99.9% desde cualquier dispositivo.</p>
                        </div>
                        
                        <div style="background: #4b5563; padding: 2rem; border-radius: 12px; border: 1px solid #6b7280;">
                            <h3>🤖 IA Avanzada</h3>
                            <p>Chat con tus PDFs usando inteligencia artificial para analizar y extraer información de tus documentos.</p>
                        </div>
                        
                        <div style="background: #4b5563; padding: 2rem; border-radius: 12px; border: 1px solid #6b7280;">
                            <h3>💰 Precios Justos</h3>
                            <p>Planes flexibles desde $5/mes con almacenamiento ilimitado y todas las características de seguridad incluidas.</p>
                        </div>
                        
                        <div style="background: #4b5563; padding: 2rem; border-radius: 12px; border: 1px solid #6b7280;">
                            <h3>🌍 Múltiples Regiones</h3>
                            <p>Tus datos se replican automáticamente en múltiples regiones de AWS para máxima redundancia y velocidad.</p>
                        </div>
                    </div>
                </div>
                
                <!-- Almacenamiento de Archivos -->
                <div id="storage" class="tab-content">
                     <h2>📁 Tu almacenamiento seguro en AWS</h2>
                     <p>Sube, gestiona y protege tus archivos con la infraestructura más confiable del mundo.</p>
                     
                     <div class="stats">
                         <div class="stat-card">
                             <div class="stat-number" id="totalFiles">0</div>
                             <div>Archivos almacenados</div>
                         </div>
                         <div class="stat-card">
                             <div class="stat-number" id="totalStorage">0 GB</div>
                             <div>Espacio utilizado</div>
                         </div>
                         <div class="stat-card">
                             <div class="stat-number" id="uptime">99.9%</div>
                             <div>Disponibilidad AWS</div>
                         </div>
                     </div>
                     
                     <div class="file-upload-area" id="uploadArea" onclick="document.getElementById('fileInput').click()">
                         <div class="upload-icon">📤</div>
                         <h3>Sube tus archivos de forma segura</h3>
                         <p>Arrastra archivos aquí o haz clic para seleccionar</p>
                         <p style="font-size: 0.875rem; color: #64748b; margin-top: 1rem;">
                             <strong>Seguro:</strong> Encriptación AES-256 • AWS S3 • 99.9% disponibilidad
                         </p>
                     </div>
                     
                     <input type="file" id="fileInput" multiple style="display: none;" onchange="handleFileUpload(event)">
                     
                     <div class="file-list" id="fileList">
                         <h3>📋 Tus archivos</h3>
                         <div id="filesContainer">
                             <p style="text-align: center; color: #64748b; padding: 2rem;">
                                 No hay archivos subidos aún. ¡Comienza subiendo tu primer archivo!
                             </p>
                         </div>
                     </div>
                </div>
                
                <!-- Chat IA -->
                <div id="chat" class="tab-content">
                    <h2>🤖 Chat con tus PDFs por IA</h2>
                    <p>Característica avanzada: Conversa con tus documentos PDF usando inteligencia artificial.</p>
                    
                    <div class="chat-container" id="chatContainer">
                        <div class="message ai-message">
                            ¡Hola! Soy tu asistente de IA para documentos. Sube un PDF y podremos analizarlo juntos.
                        </div>
                    </div>
                    
                    <div class="input-group">
                        <input type="text" id="chatInput" placeholder="Haz una pregunta sobre tu documento..." onkeypress="handleChatKeyPress(event)">
                        <button class="btn-primary" onclick="sendMessage()">Enviar</button>
                    </div>
                </div>
                
                <!-- Precios -->
                <div id="pricing" class="tab-content">
                    <h2>💰 Planes de almacenamiento seguro</h2>
                    <p>Elige el plan perfecto para tus necesidades de almacenamiento en la nube AWS.</p>
                    
                    <div class="pricing-grid">
                        <div class="pricing-card">
                            <div class="plan-name">Básico</div>
                            <div class="plan-price">$5<span style="font-size: 1rem;">/mes</span></div>
                            <ul class="plan-features">
                                <li>10 GB de almacenamiento</li>
                                <li>Encriptación AES-256</li>
                                <li>Backup automático</li>
                                <li>Soporte por email</li>
                                <li>Acceso desde cualquier dispositivo</li>
                            </ul>
                            <button class="btn-primary" onclick="selectPlan('basic')">Empieza ahora</button>
                        </div>
                        
                        <div class="pricing-card featured">
                            <div class="plan-name">Pro</div>
                            <div class="plan-price">$8<span style="font-size: 1rem;">/mes</span></div>
                            <ul class="plan-features">
                                <li>100 GB de almacenamiento</li>
                                <li>Encriptación AES-256</li>
                                <li>Backup automático</li>
                                <li>Chat IA con PDFs</li>
                                <li>Soporte prioritario</li>
                                <li>Compartir archivos</li>
                            </ul>
                            <button class="btn-primary" onclick="selectPlan('pro')">Empieza ahora</button>
                        </div>
                        
                        <div class="pricing-card">
                            <div class="plan-name">Ejecutivo</div>
                            <div class="plan-price">$15<span style="font-size: 1rem;">/mes</span></div>
                            <ul class="plan-features">
                                <li>1 TB de almacenamiento</li>
                                <li>Encriptación AES-256</li>
                                <li>Backup automático</li>
                                <li>Chat IA ilimitado</li>
                                <li>Soporte 24/7</li>
                                <li>Colaboración en equipo</li>
                                <li>API personalizada</li>
                            </ul>
                            <button class="btn-primary" onclick="selectPlan('executive')">Empieza ahora</button>
                        </div>
                    </div>
                </div>
                
                <!-- Seguridad -->
                <div id="security" class="tab-content">
                    <h2>🔒 Seguridad y privacidad absoluta</h2>
                    <p>Tu confianza es nuestra prioridad. Conoce cómo protegemos tus datos en AWS.</p>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 2rem;">
                        <div style="background: #4b5563; padding: 2rem; border-radius: 12px; border: 1px solid #6b7280;">
                            <h3>🔐 Encriptación AES-256</h3>
                            <p>Todos tus archivos están encriptados con el estándar militar AES-256, tanto en tránsito como en reposo.</p>
                        </div>
                        
                        <div style="background: #4b5563; padding: 2rem; border-radius: 12px; border: 1px solid #6b7280;">
                            <h3>☁️ Infraestructura AWS</h3>
                            <p>Utilizamos Amazon Web Services S3, la infraestructura más confiable y escalable del mundo.</p>
                        </div>
                        
                        <div style="background: #4b5563; padding: 2rem; border-radius: 12px; border: 1px solid #6b7280;">
                            <h3>🛡️ Cumplimiento SOC 2</h3>
                            <p>Cumplimos con los más altos estándares de seguridad y auditoría de la industria.</p>
                        </div>
                        
                        <div style="background: #4b5563; padding: 2rem; border-radius: 12px; border: 1px solid #6b7280;">
                            <h3>⚡ 99.9% Disponibilidad</h3>
                            <p>Garantizamos acceso a tus archivos 24/7 con una disponibilidad del 99.9%.</p>
                        </div>
                        
                        <div style="background: #4b5563; padding: 2rem; border-radius: 12px; border: 1px solid #6b7280;">
                            <h3>🔍 Auditoría continua</h3>
                            <p>Monitoreamos constantemente nuestra infraestructura para detectar y prevenir amenazas.</p>
                        </div>
                        
                        <div style="background: #4b5563; padding: 2rem; border-radius: 12px; border: 1px solid #6b7280;">
                            <h3>🌍 Múltiples regiones</h3>
                            <p>Tus datos se replican automáticamente en múltiples regiones de AWS para máxima redundancia.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <footer class="footer">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>🔐 Vault</h3>
                    <p>Tu caja fuerte digital en AWS. Almacenamiento seguro en la nube con privacidad y seguridad absoluta.</p>
                    <div class="social-links">
                        <a href="#" class="social-link" title="Twitter">📱</a>
                        <a href="#" class="social-link" title="LinkedIn">💼</a>
                        <a href="#" class="social-link" title="GitHub">🐙</a>
                        <a href="#" class="social-link" title="Email">✉️</a>
                    </div>
                </div>
                
                <div class="footer-section">
                    <h3>Producto</h3>
                    <ul class="footer-links">
                        <li><a href="#" onclick="showTab('storage')">Almacenamiento</a></li>
                        <li><a href="#" onclick="showTab('chat')">Chat IA</a></li>
                        <li><a href="#" onclick="showTab('security')">Seguridad</a></li>
                        <li><a href="#" onclick="showTab('pricing')">Precios</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Soporte</h3>
                    <ul class="footer-links">
                        <li><a href="#">Centro de ayuda</a></li>
                        <li><a href="#">Documentación</a></li>
                        <li><a href="#">Contacto</a></li>
                        <li><a href="#">Estado del servicio</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Legal</h3>
                    <ul class="footer-links">
                        <li><a href="#">Términos de servicio</a></li>
                        <li><a href="#">Política de privacidad</a></li>
                        <li><a href="#">Cookies</a></li>
                        <li><a href="#">Cumplimiento</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2024 Vault. Todos los derechos reservados. Construido con ❤️ y AWS.</p>
            </div>
        </footer>
        
        <!-- Modales de autenticación -->
        <div id="loginModal" class="modal" style="display: none;">
            <div class="modal-content">
                <span class="close" onclick="closeModal('loginModal')">&times;</span>
                <h2>Iniciar Sesión</h2>
                <form id="loginForm" onsubmit="handleLogin(event)">
                    <div class="form-group">
                        <label class="form-label" for="loginEmail">Email</label>
                        <input type="email" id="loginEmail" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="loginPassword">Contraseña</label>
                        <input type="password" id="loginPassword" class="form-input" required>
                    </div>
                    <button type="submit" class="btn-primary" style="width: 100%;">Iniciar Sesión</button>
                </form>
            </div>
        </div>
        
        <div id="registerModal" class="modal" style="display: none;">
            <div class="modal-content">
                <span class="close" onclick="closeModal('registerModal')">&times;</span>
                <h2>Crear Cuenta</h2>
                <form id="registerForm" onsubmit="handleRegister(event)">
                    <div class="form-group">
                        <label class="form-label" for="registerName">Nombre completo</label>
                        <input type="text" id="registerName" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="registerEmail">Email</label>
                        <input type="email" id="registerEmail" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="registerPassword">Contraseña</label>
                        <input type="password" id="registerPassword" class="form-input" required minlength="8">
                    </div>
                    <button type="submit" class="btn-primary" style="width: 100%;">Crear Cuenta</button>
                </form>
            </div>
        </div>
        
        <script>
            // Variables globales
            let startTime = Date.now();
            let fileCount = 0;
            let totalStorage = 0;
            let chatCount = 0;
            let userFiles = [];
            let isAuthenticated = false;
            
            // Inicialización
            document.addEventListener('DOMContentLoaded', function() {
                updateStats();
                setInterval(updateStats, 1000);
                
                // Smooth scroll para navegación
                document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                    anchor.addEventListener('click', function (e) {
                        e.preventDefault();
                        const target = document.querySelector(this.getAttribute('href'));
                        if (target) {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    });
                });
                
                // Cerrar modales al hacer clic fuera
                window.addEventListener('click', function(event) {
                    if (event.target.classList.contains('modal')) {
                        event.target.style.display = 'none';
                    }
                });
            });
            
            // Actualizar estadísticas
            function updateStats() {
                const totalFilesEl = document.getElementById('totalFiles');
                const totalStorageEl = document.getElementById('totalStorage');
                
                if (totalFilesEl) totalFilesEl.textContent = fileCount;
                if (totalStorageEl) totalStorageEl.textContent = totalStorage.toFixed(1) + ' GB';
            }
            
            // Navegación de pestañas mejorada
            function showTab(tabName) {
                // Ocultar todas las pestañas
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.querySelectorAll('.tab').forEach(tab => {
                    tab.classList.remove('active');
                });
                
                // Mostrar pestaña seleccionada
                const targetTab = document.getElementById(tabName);
                if (targetTab) {
                    targetTab.classList.add('active');
                    
                    // Scroll suave a la sección
                    setTimeout(() => {
                        targetTab.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 100);
                }
                
                // Activar la pestaña correspondiente
                const tabButton = document.querySelector('.tab[onclick*="' + tabName + '"]');
                if (tabButton) {
                    tabButton.classList.add('active');
                }
            }
            
            // Función para ir al home
            function goHome() {
                showTab('info');
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            
            // Funciones de modales
            function showLoginModal() {
                const modal = document.getElementById('loginModal');
                modal.style.display = 'flex';
                setTimeout(() => modal.classList.add('show'), 10);
            }
            
            function showRegisterModal() {
                const modal = document.getElementById('registerModal');
                modal.style.display = 'flex';
                setTimeout(() => modal.classList.add('show'), 10);
            }
            
            function closeModal(modalId) {
                const modal = document.getElementById(modalId);
                modal.classList.remove('show');
                setTimeout(() => modal.style.display = 'none', 300);
            }
            
            // Funciones de autenticación mejoradas
            function handleLogin(event) {
                event.preventDefault();
                const form = event.target;
                const button = form.querySelector('button[type="submit"]');
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                // Mostrar loading
                button.classList.add('btn-loading');
                button.textContent = 'Iniciando sesión...';
                
                // Simular validación
                setTimeout(() => {
                    if (email && password) {
                        isAuthenticated = true;
                        showSuccessMessage('¡Inicio de sesión exitoso!');
                        closeModal('loginModal');
                        updateAuthUI();
                    } else {
                        showErrorMessage('Por favor, completa todos los campos');
                    }
                    
                    // Restaurar botón
                    button.classList.remove('btn-loading');
                    button.textContent = 'Iniciar Sesión';
                }, 1500);
            }
            
            function handleRegister(event) {
                event.preventDefault();
                const form = event.target;
                const button = form.querySelector('button[type="submit"]');
                const name = document.getElementById('registerName').value;
                const email = document.getElementById('registerEmail').value;
                const password = document.getElementById('registerPassword').value;
                
                // Mostrar loading
                button.classList.add('btn-loading');
                button.textContent = 'Creando cuenta...';
                
                // Simular validación
                setTimeout(() => {
                    if (name && email && password.length >= 8) {
                        isAuthenticated = true;
                        showSuccessMessage('¡Cuenta creada exitosamente!');
                        closeModal('registerModal');
                        updateAuthUI();
                    } else {
                        showErrorMessage('Por favor, completa todos los campos correctamente');
                    }
                    
                    // Restaurar botón
                    button.classList.remove('btn-loading');
                    button.textContent = 'Crear Cuenta';
                }, 1500);
            }
            
            function updateAuthUI() {
                const authButtons = document.querySelector('.auth-buttons');
                if (isAuthenticated) {
                    authButtons.innerHTML = '<span style="color: var(--success-color); margin-right: 1rem;">✅ Conectado</span><button class="btn-login" onclick="logout()">Cerrar Sesión</button>';
                }
            }
            
            function logout() {
                isAuthenticated = false;
                showSuccessMessage('Sesión cerrada');
                updateAuthUI();
                location.reload();
            }
            
            // Funciones de mensajes
            function showSuccessMessage(message) {
                showNotification(message, 'success');
            }
            
            function showErrorMessage(message) {
                showNotification(message, 'error');
            }
            
            function showNotification(message, type) {
                const notification = document.createElement('div');
                notification.className = 'notification ' + type;
                const bgColor = type === 'success' ? 'var(--success-color)' : 'var(--error-color)';
                notification.style.position = 'fixed';
                notification.style.top = '20px';
                notification.style.right = '20px';
                notification.style.padding = '1rem 1.5rem';
                notification.style.borderRadius = 'var(--border-radius-sm)';
                notification.style.color = 'white';
                notification.style.fontWeight = '500';
                notification.style.zIndex = '3000';
                notification.style.transform = 'translateX(100%)';
                notification.style.transition = 'var(--transition)';
                notification.style.background = bgColor;
                notification.textContent = message;
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.transform = 'translateX(0)';
                }, 100);
                
                setTimeout(() => {
                    notification.style.transform = 'translateX(100%)';
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 3000);
            }
            
            // Manejo de archivos
            function handleFileUpload(event) {
                const files = event.target.files;
                for (let file of files) {
                    uploadFile(file);
                }
            }
            
            function uploadFile(file) {
                // Simular carga de archivo a AWS S3
                const fileSize = (file.size / (1024 * 1024 * 1024)).toFixed(2); // GB
                const fileItem = {
                    name: file.name,
                    size: fileSize,
                    type: file.type,
                    uploadedAt: new Date()
                };
                
                userFiles.push(fileItem);
                fileCount++;
                totalStorage += parseFloat(fileSize);
                
                displayFiles();
                updateStats();
                
                // Aquí se conectaría con AWS S3 API
                console.log('Archivo subido a AWS S3:', file.name);
            }
            
            function displayFiles() {
                const container = document.getElementById('filesContainer');
                
                if (userFiles.length === 0) {
                    container.innerHTML = '<p style="text-align: center; color: #64748b; padding: 2rem;">No hay archivos subidos aún. ¡Comienza subiendo tu primer archivo!</p>';
                    return;
                }
                
                container.innerHTML = userFiles.map((file, index) => 
                    '<div class="file-item">' +
                        '<div class="file-info">' +
                            '<div class="file-icon">📄</div>' +
                            '<div>' +
                                '<div style="font-weight: 600;">' + file.name + '</div>' +
                                '<div style="font-size: 0.875rem; color: #64748b;">' + file.size + ' GB • ' + file.uploadedAt.toLocaleDateString() + '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="file-actions">' +
                            '<button class="btn-small btn-download" onclick="downloadFile(' + index + ')">Descargar</button>' +
                            '<button class="btn-small btn-delete" onclick="deleteFile(' + index + ')">Eliminar</button>' +
                        '</div>' +
                    '</div>'
                ).join('');
            }
            
            function downloadFile(index) {
                const file = userFiles[index];
                // Aquí se conectaría con AWS S3 para descargar
                alert('Descargando ' + file.name + ' desde AWS S3...');
                console.log('Descargando desde AWS S3:', file.name);
            }
            
            function deleteFile(index) {
                const file = userFiles[index];
                if (confirm('¿Estás seguro de que quieres eliminar ' + file.name + '?')) {
                    totalStorage -= parseFloat(file.size);
                    userFiles.splice(index, 1);
                    fileCount--;
                    displayFiles();
                    updateStats();
                    
                    // Aquí se conectaría con AWS S3 para eliminar
                    console.log('Archivo eliminado de AWS S3:', file.name);
                }
            }
            
            // Chat IA
            function sendMessage() {
                const input = document.getElementById('chatInput');
                const message = input.value.trim();
                
                if (message) {
                    addMessage(message, 'user');
                    input.value = '';
                    
                    // Simular respuesta de IA
                    setTimeout(() => {
                        const aiResponse = generateAIResponse(message);
                        addMessage(aiResponse, 'ai');
                        chatCount++;
                    }, 1000);
                }
            }
            
            function handleChatKeyPress(event) {
                if (event.key === 'Enter') {
                    sendMessage();
                }
            }
            
            function addMessage(text, sender) {
                const container = document.getElementById('chatContainer');
                const messageDiv = document.createElement('div');
                messageDiv.className = 'message ' + sender + '-message';
                messageDiv.textContent = text;
                container.appendChild(messageDiv);
                container.scrollTop = container.scrollHeight;
            }
            
            function generateAIResponse(userMessage) {
                const responses = [
                    "Basándome en el análisis de tu documento, puedo decirte que...",
                    "Según la información en tu PDF, la respuesta es...",
                    "He revisado el contenido y puedo confirmar que...",
                    "Basándome en los datos del documento, mi análisis sugiere...",
                    "Según la información proporcionada en el archivo...",
                    "He procesado el contenido y puedo explicarte que...",
                    "Basándome en el análisis del documento, la conclusión es...",
                    "Según los datos en tu archivo, puedo ayudarte con..."
                ];
                
                return responses[Math.floor(Math.random() * responses.length)] + 
                       " " + userMessage.split(' ').slice(0, 3).join(' ') + "...";
            }
            
            // Selección de planes
            function selectPlan(plan) {
                const plans = {
                    basic: { name: 'Básico', price: 5 },
                    pro: { name: 'Pro', price: 8 },
                    executive: { name: 'Ejecutivo', price: 15 }
                };
                
                const selectedPlan = plans[plan];
                
                // Aquí se conectaría con Stripe/MercadoPago para procesar el pago
                alert('Redirigiendo a la pasarela de pagos para el plan ' + selectedPlan.name + ' (' + selectedPlan.price + '/mes)...');
                console.log('Conectando con pasarela de pagos para plan:', selectedPlan.name);
                
                // Ejemplo de integración con Stripe:
                // stripe.redirectToCheckout({
                //     lineItems: [{ price: 'price_' + plan, quantity: 1 }],
                //     mode: 'subscription',
                //     successUrl: window.location.origin + '/success',
                //     cancelUrl: window.location.origin + '/cancel'
                // });
            }
            
            // Drag and drop para archivos
            const uploadArea = document.getElementById('uploadArea');
            
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            });
            
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('dragover');
            });
            
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                
                const files = e.dataTransfer.files;
                for (let file of files) {
                    uploadFile(file);
                }
            });
        </script>
    </body>
    </html>
  `);
});

// API endpoints para AWS S3
app.get('/api/status', (req, res) => {
  res.json({
    status: 'success',
    message: 'Vault está funcionando correctamente',
    timestamp: new Date().toISOString(),
    uptime: Math.floor((Date.now() - startTime) / 1000),
    features: ['Almacenamiento AWS S3', 'Chat IA con PDFs', 'Encriptación AES-256', 'Backup automático']
  });
});

// Endpoint para subir archivos a AWS S3
app.post('/api/upload', (req, res) => {
  // Aquí se implementaría la lógica de AWS S3
  // const { file } = req.body;
  // s3.upload({
  //   Bucket: 'vault-storage',
  //   Key: file.name,
  //   Body: file.buffer,
  //   ContentType: file.mimetype
  // }).promise();
  
  res.json({ 
    success: true, 
    message: 'Archivo subido exitosamente a AWS S3',
    url: 'https://vault-storage.s3.amazonaws.com/' + req.body.filename
  });
});

// Endpoint para descargar archivos de AWS S3
app.get('/api/download/:filename', (req, res) => {
  // Aquí se implementaría la lógica de descarga desde AWS S3
  // s3.getObject({
  //   Bucket: 'vault-storage',
  //   Key: req.params.filename
  // }).createReadStream().pipe(res);
  
  res.json({ 
    success: true, 
    message: 'Descarga iniciada desde AWS S3',
    filename: req.params.filename
  });
});

// Endpoint para procesar pagos con Stripe
app.post('/api/subscribe', (req, res) => {
  // Aquí se implementaría la integración con Stripe
  // const { plan, token } = req.body;
  // stripe.subscriptions.create({
  //   customer: customer.id,
  //   items: [{ price: plan }],
  //   payment_behavior: 'default_incomplete',
  //   expand: ['latest_invoice.payment_intent']
  // });
  
  res.json({ 
    success: true, 
    message: 'Suscripción procesada exitosamente',
    plan: req.body.plan
  });
});

const startTime = Date.now();

// Iniciar el servidor
app.listen(PORT, () => {
  console.log('🔒 Vault ejecutándose en http://localhost:' + PORT);
  console.log('📁 Almacenamiento AWS S3: http://localhost:' + PORT);
  console.log('🤖 Chat IA: http://localhost:' + PORT);
  console.log('💰 Precios: http://localhost:' + PORT);
  console.log('🔒 Seguridad: http://localhost:' + PORT);
}); 