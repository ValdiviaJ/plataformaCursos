import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Play, 
  Video, 
  Tv, 
  History, 
  Send, 
  Users, 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff, 
  ScreenShare, 
  Disc,
  Clock,
  ArrowRight,
  Maximize2
} from 'lucide-react';

const mockVideos = [
  { id: 1, title: 'Instalación y Configuración del Entorno de React', duration: '15:24', views: '2,400', date: 'Hace 3 días' },
  { id: 2, title: 'Uso práctico de useState y useReducer', duration: '28:10', views: '1,890', date: 'Hace 2 días' },
  { id: 3, title: 'Introducción al Patrón Provider en React', duration: '22:45', views: '1,500', date: 'Ayer' }
];

const mockGrabaciones = [
  { id: 1, title: 'Clase en Vivo #1: Fundamentos de Componentes y Virtual DOM', date: '2026-05-20', duration: '1h 45m', size: '340 MB' },
  { id: 2, title: 'Clase en Vivo #2: Custom Hooks y Patrones Comunes', date: '2026-05-24', duration: '2h 10m', size: '420 MB' }
];

const initialChatMessages = [
  { id: 1, sender: 'Ana Maria', msg: '¡Buenas tardes profesor!', time: '18:30' },
  { id: 2, sender: 'Justo Valdivia', msg: '¿Se compartirá la grabación de la clase de hoy?', time: '18:31' },
  { id: 3, sender: 'Carlos Restrepo', msg: 'Sí, las suben automáticamente al terminar.', time: '18:31' },
  { id: 4, sender: 'Marta Diaz', msg: 'Hola, tengo una pregunta sobre useMemo.', time: '18:32' }
];

const ClasesPage = () => {
  const { tipo } = useParams(); // 'videos', 'en-vivo', 'grabaciones'
  
  // Audio/Video control toggles
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [sharingScreen, setSharingScreen] = useState(false);
  const [recording, setRecording] = useState(false);

  // Live Chat state
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const [newMsg, setNewMsg] = useState('');

  // Handle send message
  const handleSendMsg = (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    const msgObj = {
      id: Date.now(),
      sender: 'Tú (Admin)',
      msg: newMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages([...chatMessages, msgObj]);
    setNewMsg('');
  };

  // Simulate incoming messages periodically during Live Class
  useEffect(() => {
    if (tipo !== 'en-vivo') return;
    const users = ['Diego', 'Lucía', 'Alberto', 'Paula'];
    const msgs = [
      '¡Qué buen ejemplo!',
      '¿Podría repetir el paso anterior por favor?',
      'Excelente explicación.',
      'Me quedó súper claro, gracias.',
      '¿Recomienda usar Redux en 2026?'
    ];

    const interval = setInterval(() => {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
      const date = new Date();
      
      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          sender: randomUser,
          msg: randomMsg,
          time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 12000);

    return () => clearInterval(interval);
  }, [tipo]);

  return (
    <div className="flex flex-col gap-6 animate-in">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-dark-900 pb-4">
        <div>
          <h1 className="section-title text-2xl font-black capitalize">
            {tipo === 'videos' ? 'Biblioteca de Videos' : tipo === 'en-vivo' ? 'Clase en Vivo Transmitiendo' : 'Grabaciones de Clases'}
          </h1>
          <p className="text-sm text-dark-400">
            {tipo === 'videos' ? 'Gestiona la biblioteca de contenido grabado para lecciones.' : tipo === 'en-vivo' ? 'Monitorea o únete a la videoconferencia activa.' : 'Revisa las clases en vivo grabadas previamente.'}
          </p>
        </div>
      </div>

      {/* Render sub-views */}
      {tipo === 'videos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockVideos.map(video => (
            <div key={video.id} className="glass-card-hover overflow-hidden flex flex-col">
              <div className="aspect-video bg-gradient-to-tr from-slate-900 to-indigo-950/80 flex items-center justify-center relative group">
                <Play className="w-12 h-12 text-white/40 group-hover:text-primary-400 group-hover:scale-110 transition-all cursor-pointer" />
                <span className="absolute bottom-2.5 right-2.5 bg-black/80 px-2 py-0.5 rounded text-xs text-white font-bold">{video.duration}</span>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-bold text-white text-sm line-clamp-2 leading-snug">{video.title}</h3>
                <div className="flex justify-between text-xs text-dark-500 font-semibold mt-1">
                  <span>{video.views} Visualizaciones</span>
                  <span>{video.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tipo === 'en-vivo' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stream Player Mockup */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="aspect-video rounded-2xl bg-gradient-to-tr from-dark-950 via-indigo-950/60 to-dark-950 border border-primary-500/20 relative overflow-hidden flex flex-col items-center justify-center">
              {/* Simulated active stream */}
              <div className="absolute top-4 left-4 bg-red-650 text-white font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 animate-pulse shadow-glow">
                <span className="w-2 h-2 rounded-full bg-white" />
                TRANSMITIENDO EN VIVO
              </div>
              
              <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded-lg text-xs text-white font-semibold flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-primary-400" />
                <span>84 espectadores</span>
              </div>

              {/* Main Stream Canvas */}
              {sharingScreen ? (
                <div className="flex flex-col items-center justify-center gap-3">
                  <ScreenShare className="w-16 h-16 text-primary-400 animate-bounce" />
                  <p className="text-sm font-semibold text-white">Compartiendo tu pantalla principal...</p>
                </div>
              ) : camOn ? (
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center font-bold text-white text-3xl shadow-glow">
                  C
                </div>
              ) : (
                <CameraOff className="w-16 h-16 text-dark-600" />
              )}

              {/* Control Panel (Bottom) */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-4 border border-dark-800">
                <button 
                  onClick={() => setMicOn(!micOn)}
                  className={`p-2.5 rounded-full transition-all ${micOn ? 'bg-dark-800 text-white hover:bg-dark-750' : 'bg-red-500/20 text-red-400'}`}
                >
                  {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>
                <button 
                  onClick={() => setCamOn(!camOn)}
                  className={`p-2.5 rounded-full transition-all ${camOn ? 'bg-dark-800 text-white hover:bg-dark-750' : 'bg-red-500/20 text-red-400'}`}
                >
                  {camOn ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
                </button>
                <button 
                  onClick={() => setSharingScreen(!sharingScreen)}
                  className={`p-2.5 rounded-full transition-all ${sharingScreen ? 'bg-primary-500 text-white hover:bg-primary-600' : 'bg-dark-800 text-white hover:bg-dark-750'}`}
                >
                  <ScreenShare className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setRecording(!recording)}
                  className={`p-2.5 rounded-full transition-all ${recording ? 'bg-red-500 text-white animate-pulse' : 'bg-dark-800 text-white hover:bg-dark-750'}`}
                  title={recording ? 'Detener grabación' : 'Grabar clase'}
                >
                  <Disc className="w-5 h-5" />
                </button>
                <button className="p-2.5 rounded-full bg-dark-800 text-white hover:bg-dark-750">
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center bg-dark-900/40 p-4 rounded-xl border border-dark-850">
              <div>
                <h3 className="font-bold text-white text-base">Clase 3.3: Masterclass Hooks y Performance</h3>
                <p className="text-xs text-dark-400 mt-0.5">Organizado por: Administrador CodeMaster</p>
              </div>
              <span className="text-xs text-primary-400 font-bold uppercase tracking-wider">React Avanzado</span>
            </div>
          </div>

          {/* Chat Side panel */}
          <div className="glass-card flex flex-col h-[400px] lg:h-[auto] border-dark-800">
            <div className="p-4 border-b border-dark-800 flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">Chat del Stream</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>

            {/* Chat message listing */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 min-h-[250px]">
              {chatMessages.map(msg => (
                <div key={msg.id} className="flex flex-col gap-0.5 text-xs">
                  <div className="flex items-center gap-1.5 justify-between">
                    <span className="font-bold text-white">{msg.sender}</span>
                    <span className="text-[10px] text-dark-500">{msg.time}</span>
                  </div>
                  <p className="text-dark-300 leading-relaxed bg-dark-900/50 p-2 rounded-lg border border-dark-850 mt-0.5">{msg.msg}</p>
                </div>
              ))}
            </div>

            {/* Chat Send */}
            <form onSubmit={handleSendMsg} className="p-4 border-t border-dark-800 flex gap-2">
              <input 
                type="text" 
                placeholder="Escribe un mensaje..."
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                className="flex-1 bg-dark-900 border border-dark-800 text-xs rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary-500"
              />
              <button type="submit" className="p-2 bg-primary-600 hover:bg-primary-550 text-white rounded-xl">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {tipo === 'grabaciones' && (
        <div className="flex flex-col gap-4">
          {mockGrabaciones.map(rec => (
            <div key={rec.id} className="glass-card-hover p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400 shrink-0">
                  <History className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base leading-snug">{rec.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-dark-500 font-semibold mt-1">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {rec.date}</span>
                    <span>•</span>
                    <span>Duración: {rec.duration}</span>
                    <span>•</span>
                    <span>Tamaño: {rec.size}</span>
                  </div>
                </div>
              </div>
              <button className="btn-primary py-2 px-5 text-sm w-full sm:w-auto flex items-center justify-center gap-1.5 self-stretch sm:self-auto">
                <Play className="w-4 h-4" /> Ver Grabación
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClasesPage;
