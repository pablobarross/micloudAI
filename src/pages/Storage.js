import React, { useState } from 'react';
import './Storage.css';

// Componente de iconos SVG profesionales
const Icon = ({ name, className = "" }) => {
  const icons = {
    image: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
      </svg>
    ),
    download: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
      </svg>
    ),
    delete: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
      </svg>
    ),
    upload: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
      </svg>
    ),
    folder: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
      </svg>
    ),
    file: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"/>
      </svg>
    )
  };
  
  return icons[name] || null;
};

const Storage = ({ user }) => {
  const [files, setFiles] = useState([
    { id: 1, name: 'documento-importante.pdf', size: '2.5 MB', type: 'pdf', uploaded: '2024-01-15' },
    { id: 2, name: 'presentacion-proyecto.pptx', size: '15.2 MB', type: 'presentation', uploaded: '2024-01-14' },
    { id: 3, name: 'imagen-perfil.jpg', size: '850 KB', type: 'image', uploaded: '2024-01-13' },
    { id: 4, name: 'datos-empresa.xlsx', size: '3.1 MB', type: 'spreadsheet', uploaded: '2024-01-12' }
  ]);

  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const storageStats = {
    used: 21.65,
    total: 100,
    percentage: 21.65
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setUploading(true);
      // Simular carga
      setTimeout(() => {
        const newFile = {
          id: Date.now(),
          name: files[0].name,
          size: `${(files[0].size / 1024 / 1024).toFixed(1)} MB`,
          type: 'file',
          uploaded: new Date().toISOString().split('T')[0]
        };
        setFiles([newFile, ...files]);
        setUploading(false);
      }, 2000);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload({ target: { files: e.dataTransfer.files } });
    }
  };

  const deleteFile = (fileId) => {
    setFiles(files.filter(file => file.id !== fileId));
  };

  const downloadFile = (fileName) => {
    // Simular descarga
    console.log(`Descargando: ${fileName}`);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'image':
        return <Icon name="image" className="file-type-icon" />;
      case 'pdf':
      case 'presentation':
      case 'spreadsheet':
      default:
        return <Icon name="file" className="file-type-icon" />;
    }
  };

  return (
    <div className="storage">
      {/* Header Section */}
      <section className="storage-header">
        <div className="container">
          <h1 className="storage-title">Almacenamiento</h1>
          <p className="storage-subtitle">
            Gestiona tus archivos de forma segura en la nube de AWS
          </p>
        </div>
      </section>

      {/* Storage Stats */}
      <section className="storage-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <h3 className="stat-title">Espacio usado</h3>
              <div className="stat-value">{storageStats.used} GB</div>
              <div className="stat-label">de {storageStats.total} GB</div>
            </div>
            <div className="stat-card">
              <h3 className="stat-title">Archivos</h3>
              <div className="stat-value">{files.length}</div>
              <div className="stat-label">archivos subidos</div>
            </div>
            <div className="stat-card">
              <h3 className="stat-title">Última actividad</h3>
              <div className="stat-value">Hoy</div>
              <div className="stat-label">subida de archivos</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="storage-progress">
            <div className="progress-header">
              <span className="progress-label">Uso de almacenamiento</span>
              <span className="progress-percentage">{storageStats.percentage}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${storageStats.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="upload-section">
        <div className="container">
          <div className={`upload-area ${dragActive ? 'drag-active' : ''}`}
               onDragEnter={handleDrag}
               onDragLeave={handleDrag}
               onDragOver={handleDrag}
               onDrop={handleDrop}>
            <Icon name="upload" className="upload-icon" />
            <h3 className="upload-title">Subir archivos</h3>
            <p className="upload-description">
              Arrastra y suelta archivos aquí o haz clic para seleccionar
            </p>
            <input
              type="file"
              id="file-upload"
              className="file-input"
              onChange={handleFileUpload}
              multiple
            />
            <label htmlFor="file-upload" className="upload-button">
              Seleccionar archivos
            </label>
            {uploading && (
              <div className="upload-progress">
                <div className="upload-spinner"></div>
                <span>Subiendo archivos...</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Files List */}
      <section className="files-section">
        <div className="container">
          <div className="files-header">
            <h2 className="files-title">Mis archivos</h2>
            <div className="files-actions">
              <button className="btn-secondary">Ordenar por fecha</button>
            </div>
          </div>

          {files.length === 0 ? (
            <div className="empty-state">
              <Icon name="folder" className="empty-icon" />
              <h3 className="empty-title">No hay archivos</h3>
              <p className="empty-description">
                Sube tu primer archivo para comenzar a usar Vault
              </p>
            </div>
          ) : (
            <div className="files-grid">
              {files.map((file) => (
                <div key={file.id} className="file-card">
                  <div className="file-info">
                    <div className="file-icon">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="file-details">
                      <h4 className="file-name">{file.name}</h4>
                      <p className="file-meta">
                        {file.size} • Subido el {file.uploaded}
                      </p>
                    </div>
                  </div>
                  <div className="file-actions">
                    <button 
                      className="btn-action download"
                      onClick={() => downloadFile(file.name)}
                      title="Descargar"
                    >
                      <Icon name="download" className="action-icon" />
                    </button>
                    <button 
                      className="btn-action delete"
                      onClick={() => deleteFile(file.id)}
                      title="Eliminar"
                    >
                      <Icon name="delete" className="action-icon" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Storage; 