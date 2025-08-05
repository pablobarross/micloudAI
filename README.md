# 🔒 Vault - Tu caja fuerte digital en AWS

Una plataforma de almacenamiento seguro en la nube construida con Node.js, Express y Amazon Web Services S3.

## 🚀 Características principales

### 📁 Almacenamiento seguro en AWS S3
- **Encriptación AES-256** en tránsito y en reposo
- **Infraestructura AWS** con 99.9% de disponibilidad
- **Backup automático** y replicación en múltiples regiones
- **Drag & Drop** para subir archivos fácilmente

### 🤖 Chat IA con PDFs
- **Análisis inteligente** de documentos PDF
- **Conversación natural** con tus archivos
- **Extracción de información** automática

### 💰 Planes de suscripción
- **Básico**: $5/mes - 10 GB
- **Pro**: $8/mes - 100 GB + Chat IA
- **Ejecutivo**: $15/mes - 1 TB + Funciones avanzadas

### 🔒 Seguridad y privacidad
- **Cumplimiento SOC 2**
- **Auditoría continua** de seguridad
- **Múltiples regiones** de AWS
- **Acceso controlado** y logs de actividad

## 🛠️ Tecnologías utilizadas

- **Backend**: Node.js, Express
- **Almacenamiento**: Amazon Web Services S3
- **Pagos**: Stripe / MercadoPago
- **Seguridad**: Helmet, CORS, Encriptación AES-256
- **Frontend**: HTML5, CSS3, JavaScript vanilla

## 🚀 Cómo ejecutar la aplicación

### Prerrequisitos
- Node.js instalado en tu sistema
- npm (viene con Node.js)
- Cuenta de AWS con acceso a S3
- Cuenta de Stripe para procesamiento de pagos

### Pasos para ejecutar

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   ```bash
   # Crear archivo .env
   AWS_ACCESS_KEY_ID=tu_access_key
   AWS_SECRET_ACCESS_KEY=tu_secret_key
   AWS_REGION=us-east-1
   AWS_S3_BUCKET=vault-storage
   STRIPE_SECRET_KEY=tu_stripe_secret_key
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

4. **Ejecutar en modo producción:**
   ```bash
   npm start
   ```

5. **Abrir en el navegador:**
   - Ve a: http://localhost:3000

## 📁 Estructura del proyecto

```
vault/
├── index.js              # Servidor principal y rutas
├── package.json          # Configuración y dependencias
├── package-lock.json     # Lock file de dependencias
├── README.md             # Este archivo
└── .env                  # Variables de entorno (crear)
```

## 🔧 Configuración de AWS S3

### 1. Crear bucket S3
```bash
aws s3 mb s3://vault-storage
```

### 2. Configurar políticas de bucket
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::vault-storage/*"
        }
    ]
}
```

### 3. Habilitar encriptación del servidor
- Ir a Properties > Default encryption
- Seleccionar "Enable server-side encryption"
- Elegir "AWS managed key (SSE-S3)"

## 💳 Configuración de pagos

### Stripe
```javascript
// En index.js, descomentar y configurar:
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
```

### MercadoPago (alternativa)
```javascript
// Instalar: npm install mercadopago
const mercadopago = require('mercadopago');
mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});
```

## 🔒 Seguridad

### Encriptación
- Todos los archivos se encriptan con AES-256
- Las claves se gestionan de forma segura
- Comunicación HTTPS obligatoria

### Autenticación
- Implementar JWT para autenticación
- Middleware de autorización
- Rate limiting para prevenir abuso

### Auditoría
- Logs de todas las operaciones
- Monitoreo de acceso
- Alertas de seguridad

## 📊 API Endpoints

### Archivos
- `POST /api/upload` - Subir archivo a S3
- `GET /api/download/:filename` - Descargar archivo
- `DELETE /api/files/:filename` - Eliminar archivo
- `GET /api/files` - Listar archivos del usuario

### Pagos
- `POST /api/subscribe` - Crear suscripción
- `POST /api/webhook/stripe` - Webhook de Stripe
- `GET /api/plans` - Obtener planes disponibles

### Chat IA
- `POST /api/chat` - Enviar mensaje al chat
- `POST /api/upload-pdf` - Subir PDF para análisis

## 🚀 Despliegue

### Heroku
```bash
heroku create vault-app
heroku config:set AWS_ACCESS_KEY_ID=tu_key
heroku config:set AWS_SECRET_ACCESS_KEY=tu_secret
git push heroku main
```

### AWS EC2
```bash
# Instalar PM2
npm install -g pm2

# Iniciar aplicación
pm2 start index.js --name vault

# Configurar para iniciar automáticamente
pm2 startup
pm2 save
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 📈 Monitoreo y métricas

### CloudWatch (AWS)
- Métricas de S3
- Logs de aplicación
- Alertas automáticas

### Health Checks
- `GET /health` - Estado del servidor
- `GET /api/status` - Estado de servicios

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

- **Email**: soporte@vault.com
- **Documentación**: https://docs.vault.com
- **Issues**: https://github.com/tu-usuario/vault/issues

---

**🔒 Vault** - Tu caja fuerte digital en AWS. Seguridad, confianza y escalabilidad en la nube. 