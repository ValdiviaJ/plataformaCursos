import React, { useState } from 'react';
import { 
  Award, 
  Download, 
  QrCode, 
  CheckCircle, 
  FileCheck, 
  Sparkles,
  Lock
} from 'lucide-react';

const certificates = [
  { id: 1, name: 'Fundamentos de React y Componentes', course: 'React Avanzado', date: '2026-05-20', code: 'CERT-RX-87612', status: 'issued' },
  { id: 2, name: 'Bases de Datos Relacionales con PostgreSQL', course: 'Bases de Datos Avanzadas', date: '2026-05-25', code: 'CERT-PG-44391', status: 'issued' },
  { id: 3, name: 'Node.js & Express: API REST con Clean Architecture', course: 'Node.js', date: 'Pendiente', code: 'N/A', status: 'locked' }
];

const CertificadosPage = () => {
  const [selectedCert, setSelectedCert] = useState(certificates[0]);
  const [showQRModal, setShowQRModal] = useState(false);

  const handleDownload = (certName) => {
    alert(`Generando y descargando PDF para: ${certName}\n¡Verificación de código QR y firma digital incrustadas correctamente!`);
  };

  return (
    <div className="flex flex-col gap-6 animate-in">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-dark-900 pb-4">
        <div>
          <h1 className="section-title text-2xl font-black">Certificaciones y Logros</h1>
          <p className="text-sm text-dark-400">Descarga tus certificados con validación por código QR y firmas digitales.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Certs List */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <span className="text-xs font-bold text-dark-450 uppercase tracking-wider">Tus Certificaciones</span>
          {certificates.map(cert => (
            <button 
              key={cert.id}
              disabled={cert.status === 'locked'}
              onClick={() => setSelectedCert(cert)}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${cert.status === 'locked' ? 'bg-dark-900/30 border-dark-850 opacity-55 cursor-not-allowed' : selectedCert.id === cert.id ? 'bg-primary-500/10 border-primary-500 text-primary-400' : 'bg-dark-900/50 border-dark-800 hover:border-dark-750 text-dark-200'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${cert.status === 'locked' ? 'bg-dark-800 text-dark-500' : 'bg-primary-500/15 text-primary-400'}`}>
                  {cert.status === 'locked' ? <Lock className="w-4 h-4" /> : <Award className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-bold text-xs line-clamp-1">{cert.name}</h4>
                  <p className="text-[10px] text-dark-500 mt-0.5">{cert.course}</p>
                </div>
              </div>
              {cert.status === 'issued' && <ChevronRight className="w-4 h-4 shrink-0 text-dark-550" />}
            </button>
          ))}
        </div>

        {/* Right Column: PDF Preview Canvas */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {selectedCert ? (
            <div className="flex flex-col gap-4">
              {/* Virtual Certificate Box */}
              <div className="w-full aspect-[1.414/1] bg-dark-900 rounded-2xl border border-dark-800 p-8 md:p-12 relative flex flex-col items-center justify-between text-center overflow-hidden">
                {/* Visual Borders */}
                <div className="absolute inset-4 border border-dark-800/80 rounded-xl pointer-events-none" />
                <div className="absolute inset-6 border border-primary-500/10 rounded-lg pointer-events-none" />
                
                {/* Logo or Badge */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center shadow-glow">
                    <Award className="text-white w-6 h-6" />
                  </div>
                  <span className="font-display font-black text-xs tracking-widest text-primary-400">CODEMASTER PLATFORM</span>
                </div>

                {/* Main certificate info */}
                <div className="flex flex-col gap-3 my-4">
                  <span className="text-[10px] tracking-wider text-dark-400 uppercase font-semibold">Certificado de Finalización otorgado a:</span>
                  <h2 className="font-display text-lg md:text-2xl font-black text-white bg-gradient-to-r from-white via-dark-200 to-white bg-clip-text text-transparent">
                    Justo Valdivia
                  </h2>
                  <p className="text-[11px] text-dark-400 max-w-md mx-auto leading-normal">
                    Por haber completado satisfactoriamente los requisitos del curso práctico y evaluaciones de <span className="font-bold text-white">"{selectedCert.name}"</span>, con una carga horaria de 20 horas académicas.
                  </p>
                </div>

                {/* Footer QR, Date & Signature */}
                <div className="w-full flex justify-between items-end border-t border-dark-850 pt-4 mt-2">
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-[8px] text-dark-500 font-bold uppercase">FECHA EMISIÓN</span>
                    <span className="text-[10px] text-white font-semibold">{selectedCert.date}</span>
                  </div>

                  <div className="flex flex-col items-center gap-1.5 cursor-pointer hover:opacity-85" onClick={() => setShowQRModal(true)}>
                    <QrCode className="w-8 h-8 text-white" />
                    <span className="text-[7px] text-dark-500 font-bold uppercase">VERIFICAR CÓDIGO QR</span>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[9px] font-serif text-accent-400 italic">Carlos Mendoza</span>
                    <span className="text-[8px] text-dark-500 font-bold uppercase">DIRECTOR ACADÉMICO</span>
                  </div>
                </div>
              </div>

              {/* Actions below Canvas */}
              <div className="flex gap-4 justify-end">
                <button 
                  onClick={() => setShowQRModal(true)}
                  className="btn-secondary py-2.5 px-5 text-sm flex items-center gap-2"
                >
                  <QrCode className="w-4 h-4" /> Validar QR
                </button>
                <button 
                  onClick={() => handleDownload(selectedCert.name)}
                  className="btn-primary py-2.5 px-5 text-sm flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Descargar PDF
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-dark-500 glass-card">
              Selecciona una certificación aprobada de la izquierda para ver su previsualización.
            </div>
          )}
        </div>
      </div>

      {/* QR Validation Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-4">
          <div className="glass-card w-full max-w-sm p-6 flex flex-col gap-4 border-primary-500/30 text-center items-center">
            <QrCode className="w-24 h-24 text-white" />
            <h3 className="font-bold text-white text-base mt-2">Verificación de Firma</h3>
            <p className="text-xs text-dark-400 leading-normal">
              Este certificado está registrado y validado electrónicamente en la blockchain de CodeMaster con el ID único:
            </p>
            <code className="bg-dark-900 border border-dark-850 px-3 py-1.5 rounded-lg text-xs font-mono text-primary-400">{selectedCert.code}</code>
            
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 py-2 px-4 rounded-xl mt-2 w-full justify-center">
              <CheckCircle className="w-4 h-4" /> CERTIFICADO AUTÉNTICO
            </div>

            <button 
              onClick={() => setShowQRModal(false)}
              className="btn-secondary py-2 px-6 text-xs font-bold mt-4 w-full"
            >
              Cerrar Validación
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ChevronRight = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export default CertificadosPage;
