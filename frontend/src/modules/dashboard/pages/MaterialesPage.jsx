import React, { useState } from 'react';
import { 
  FileText, 
  Folder, 
  Search, 
  Download, 
  Plus, 
  Trash2, 
  FileArchive, 
  Image, 
  BookOpen, 
  Info,
  FolderOpen
} from 'lucide-react';

const initialFiles = [
  { id: 1, name: 'Guia_Estudio_React_Hooks.pdf', type: 'pdf', size: '2.4 MB', folder: 'React Avanzado', date: '2026-05-20' },
  { id: 2, name: 'Arquitectura_Limpia_Express.pdf', type: 'pdf', size: '3.1 MB', folder: 'Node.js', date: '2026-05-22' },
  { id: 3, name: 'Slides_DataScience_Python.pptx', type: 'ppt', size: '8.5 MB', folder: 'Data Science', date: '2026-05-24' },
  { id: 4, name: 'React_Avanzado_Boilerplate.zip', type: 'zip', size: '15.2 MB', folder: 'React Avanzado', date: '2026-05-25' },
  { id: 5, name: 'CheatSheet_SQL_Postgres.png', type: 'image', size: '1.2 MB', folder: 'Bases de Datos', date: '2026-05-26' }
];

const folders = ['React Avanzado', 'Node.js', 'Data Science', 'Bases de Datos', 'General'];

const MaterialesPage = () => {
  const [files, setFiles] = useState(initialFiles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('All');
  
  // File Upload state simulation
  const [dragActive, setDragActive] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);

  const handleDownload = (fileName) => {
    alert(`Descargando archivo: ${fileName}\n¡Descarga simulada de manera exitosa!`);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar este recurso?')) {
      setFiles(files.filter(f => f.id !== id));
    }
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (!fileToUpload) return;

    const newFile = {
      id: Date.now(),
      name: fileToUpload,
      type: fileToUpload.split('.').pop() || 'pdf',
      size: '1.5 MB',
      folder: 'General',
      date: new Date().toISOString().split('T')[0]
    };

    setFiles([newFile, ...files]);
    setFileToUpload(null);
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder = selectedFolder === 'All' || file.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-6 h-6 text-red-400" />;
      case 'zip':
        return <FileArchive className="w-6 h-6 text-amber-500" />;
      case 'image':
      case 'png':
      case 'jpg':
        return <Image className="w-6 h-6 text-emerald-400" />;
      default:
        return <FileText className="w-6 h-6 text-primary-400" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-dark-900 pb-4">
        <div>
          <h1 className="section-title text-2xl font-black">Biblioteca Digital y Materiales</h1>
          <p className="text-sm text-dark-400">Sube, organiza y distribuye PDFs, diapositivas y guías para tus estudiantes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left column: Folders filter & Upload */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="glass-card p-5">
            <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-primary-400" /> Carpetas
            </h3>
            <div className="flex flex-col gap-1.5">
              <button 
                onClick={() => setSelectedFolder('All')}
                className={`w-full text-left py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-between transition-all ${selectedFolder === 'All' ? 'bg-primary-500/10 text-primary-400' : 'text-dark-400 hover:bg-dark-900/50 hover:text-white'}`}
              >
                <span>Todos los Recursos</span>
                <span className="bg-dark-800 py-0.5 px-2 rounded-full text-[10px] text-dark-300 font-bold">{files.length}</span>
              </button>
              {folders.map(fold => {
                const count = files.filter(f => f.folder === fold).length;
                return (
                  <button 
                    key={fold}
                    onClick={() => setSelectedFolder(fold)}
                    className={`w-full text-left py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-between transition-all ${selectedFolder === fold ? 'bg-primary-500/10 text-primary-400' : 'text-dark-400 hover:bg-dark-900/50 hover:text-white'}`}
                  >
                    <span className="truncate flex items-center gap-2"><Folder className="w-3.5 h-3.5 shrink-0" /> {fold}</span>
                    <span className="bg-dark-800 py-0.5 px-2 rounded-full text-[10px] text-dark-300 font-bold shrink-0">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick upload card */}
          <div className="glass-card p-5 border-dashed border-dark-600/60">
            <h3 className="font-bold text-white text-sm mb-3">Subir Recurso</h3>
            <form onSubmit={handleFileUpload} className="flex flex-col gap-3">
              <input 
                type="text" 
                placeholder="Nombre.pdf o Archivo.zip" 
                value={fileToUpload || ''}
                onChange={(e) => setFileToUpload(e.target.value)}
                className="w-full bg-dark-900 border border-dark-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary-500"
              />
              <button 
                type="submit" 
                disabled={!fileToUpload}
                className="btn-primary py-2 text-xs font-bold w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Subir Archivo
              </button>
            </form>
          </div>
        </div>

        {/* Right column: Files list */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-dark-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar materiales por nombre..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-dark-800 rounded-xl text-sm"
            />
          </div>

          <div className="glass-card overflow-hidden">
            <div className="p-4 border-b border-dark-800 flex justify-between items-center bg-dark-900/10">
              <span className="text-xs font-bold text-dark-400">Nombre del Recurso</span>
              <span className="text-xs font-bold text-dark-400">Acciones</span>
            </div>
            
            <div className="divide-y divide-dark-850">
              {filteredFiles.length > 0 ? (
                filteredFiles.map(file => (
                  <div key={file.id} className="p-4 flex items-center justify-between hover:bg-dark-900/10 transition-all">
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.type)}
                      <div>
                        <h4 className="font-bold text-white text-sm break-all">{file.name}</h4>
                        <div className="flex gap-3 text-xs text-dark-500 font-semibold mt-0.5">
                          <span>{file.size}</span>
                          <span>•</span>
                          <span className="text-primary-400">{file.folder}</span>
                          <span>•</span>
                          <span>Sube: {file.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleDownload(file.name)}
                        className="p-2 border border-dark-750 hover:bg-primary-500/10 hover:border-primary-500 text-dark-350 hover:text-primary-400 rounded-lg transition-all"
                        title="Descargar archivo"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(file.id)}
                        className="p-2 border border-dark-750 hover:bg-red-500/10 hover:border-red-500 text-dark-350 hover:text-red-400 rounded-lg transition-all"
                        title="Eliminar archivo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-dark-500">
                  No se encontraron archivos en esta carpeta o criterio de búsqueda.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialesPage;
