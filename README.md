# 🌟 MiCloud AI - Plataforma de Almacenamiento y Chat IA

Una plataforma moderna y segura que combina almacenamiento en la nube con inteligencia artificial para gestionar y analizar tus archivos.

## ✨ Características

- 🔒 **Almacenamiento Seguro**: Integración con AWS S3 para almacenamiento en la nube
- 🤖 **Chat IA Avanzado**: Análisis inteligente de documentos y archivos
- 💳 **Sistema de Pagos**: Integración con Stripe para planes de suscripción
- 🎨 **Diseño Moderno**: Interfaz espacial oscura con tema azul profesional
- 📱 **Responsive**: Optimizado para todos los dispositivos
- ⚡ **Rendimiento**: Construido con React y Webpack para máxima velocidad

## 🚀 Tecnologías Utilizadas

- **Frontend**: React 18, React Router DOM
- **Backend**: Node.js, Express
- **Almacenamiento**: AWS S3
- **Pagos**: Stripe
- **Build Tool**: Webpack 5
- **Estilos**: CSS3 con variables CSS personalizadas

## 📦 Instalación

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Cuenta de AWS (para S3)
- Cuenta de Stripe (para pagos)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/pablobarross/micloudAI.git
cd micloudAI
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Crea un archivo `.env` en la raíz del proyecto:
```env
AWS_ACCESS_KEY_ID=tu_access_key
AWS_SECRET_ACCESS_KEY=tu_secret_key
AWS_REGION=tu_region
STRIPE_SECRET_KEY=tu_stripe_key
```

4. **Ejecutar en modo desarrollo**
```bash
npm run dev-client
```

5. **Abrir en el navegador**
Ve a `http://localhost:3001`

## 🏗️ Scripts Disponibles

- `npm start` - Inicia el servidor de producción
- `npm run dev` - Inicia el servidor con nodemon
- `npm run dev-client` - Inicia el servidor de desarrollo con hot reload
- `npm run build` - Construye la aplicación para producción
- `npm run build:gh-pages` - Construye para GitHub Pages

## 📁 Estructura del Proyecto

```
micloudAI/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── pages/         # Páginas de la aplicación
│   └── styles/        # Estilos globales
├── public/            # Archivos estáticos
├── index.js           # Servidor Express
├── webpack.config.js  # Configuración de Webpack
└── package.json       # Dependencias y scripts
```

## 🎨 Páginas Principales

- **Home**: Página principal con características destacadas
- **Storage**: Gestión de archivos y almacenamiento
- **Chat AI**: Interfaz de chat con inteligencia artificial
- **Pricing**: Planes y precios de suscripción
- **Security**: Información sobre seguridad
- **Auth**: Sistema de autenticación

## 🔧 Configuración de AWS S3

1. Crea un bucket en AWS S3
2. Configura las políticas de CORS
3. Genera las credenciales de acceso
4. Actualiza las variables de entorno

## 💳 Configuración de Stripe

1. Crea una cuenta en Stripe
2. Obtén las claves de API
3. Configura los productos y precios
4. Actualiza las variables de entorno

## 🌐 Despliegue

### GitHub Pages
```bash
npm run build:gh-pages
git add docs/
git commit -m "Deploy to GitHub Pages"
git push origin master
```

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Sube la carpeta dist/ a Netlify
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Pablo Barros**
- GitHub: [@pablobarross](https://github.com/pablobarross)
- Email: p.b.a6802@gmail.com

## 🙏 Agradecimientos

- AWS por el almacenamiento en la nube
- Stripe por el procesamiento de pagos
- React por el framework de frontend
- La comunidad de desarrolladores por las herramientas open source

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub! 