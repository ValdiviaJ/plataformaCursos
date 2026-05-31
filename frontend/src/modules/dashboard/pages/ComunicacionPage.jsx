import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  MessageSquare, 
  MessagesSquare, 
  Send, 
  Megaphone, 
  Plus, 
  Heart, 
  MessageCircle, 
  Pin,
  Bell,
  Search,
  Check
} from 'lucide-react';

const initialForumPosts = [
  { 
    id: 1, 
    author: 'Justo Valdivia', 
    avatar: 'J',
    title: '¿Cómo solucionar el error de dependencias de Caddy y Laravel 11?', 
    desc: 'Tengo un error de "Connection refused" al intentar montar el docker container en local usando FrankenPHP. ¿A alguien más le ha pasado esto?', 
    likes: 12, 
    comments: 5,
    tag: 'Docker & Caddy',
    pinned: true
  },
  { 
    id: 2, 
    author: 'Dra. Ana Restrepo', 
    avatar: 'A',
    title: 'Anuncio: Publicación de calificaciones del Módulo 2', 
    desc: 'Ya pueden verificar sus calificaciones y notas de la última tarea en el panel de calificaciones. Cualquier reclamo por bandeja interna.', 
    likes: 24, 
    comments: 2,
    tag: 'Notas',
    pinned: false
  }
];

const mockContacts = [
  { id: 1, name: 'Dr. Carlos Mendoza', role: 'Instructor', lastMsg: 'Tu tarea sobre Hooks es excelente.', unread: 1 },
  { id: 2, name: 'Soporte CodeMaster', role: 'Soporte', lastMsg: 'Su factura fue enviada.', unread: 0 },
  { id: 3, name: 'Dra. Ana Restrepo', role: 'Instructor', lastMsg: 'Nos vemos en clase en vivo.', unread: 0 }
];

const initialChatHistory = [
  { sender: 'instructor', text: 'Hola, vi tu entrega de React Avanzado. ¿Tienes alguna duda sobre useState?', time: '14:20' },
  { sender: 'user', text: 'Hola Carlos. Sí, no me queda claro cuándo preferir useReducer sobre useState.', time: '14:22' },
  { sender: 'instructor', text: 'Generalmente se prefiere useReducer cuando tienes un objeto de estado complejo con múltiples transiciones que dependen del estado anterior.', time: '14:25' }
];

const initialAnnouncements = [
  { id: 1, title: 'Mantenimiento del Servidor programado', content: 'El día 2 de Junio de 02:00 a 04:00 AM realizaremos mejoras en los servidores. El servicio podría interrumpirse.', date: 'Hoy' },
  { id: 2, title: 'Nueva Masterclass: Deploy con Docker y Render', content: 'Este sábado a las 10:00 AM tendremos una sesión en vivo de despliegues avanzados.', date: 'Ayer' }
];

const ComunicacionPage = () => {
  const { tipo } = useParams(); // 'foros', 'mensajes', 'anuncios'
  const [posts, setPosts] = useState(initialForumPosts);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);

  // New Forum Post State
  const [showAddPost, setShowAddPost] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Messages Chat state
  const [activeContact, setActiveContact] = useState(mockContacts[0]);
  const [chatLog, setChatLog] = useState(initialChatHistory);
  const [msgInput, setMsgInput] = useState('');

  // New Announcement
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnDesc, setNewAnnDesc] = useState('');
  const [showAddAnn, setShowAddAnn] = useState(false);

  const handleAddPost = (e) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;
    
    const post = {
      id: Date.now(),
      author: 'Tú (Admin)',
      avatar: 'T',
      title: newTitle,
      desc: newDesc,
      likes: 0,
      comments: 0,
      tag: 'General',
      pinned: false
    };

    setPosts([post, ...posts]);
    setNewTitle('');
    setNewDesc('');
    setShowAddPost(false);
  };

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnTitle || !newAnnDesc) return;

    const ann = {
      id: Date.now(),
      title: newAnnTitle,
      content: newAnnDesc,
      date: 'Ahora mismo'
    };

    setAnnouncements([ann, ...announcements]);
    setNewAnnTitle('');
    setNewAnnDesc('');
    setShowAddAnn(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!msgInput.trim()) return;

    setChatLog([...chatLog, { sender: 'user', text: msgInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setMsgInput('');
  };

  return (
    <div className="flex flex-col gap-6 animate-in">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-dark-900 pb-4">
        <div>
          <h1 className="section-title text-2xl font-black capitalize">
            {tipo === 'foros' ? 'Foro de Discusión' : tipo === 'mensajes' ? 'Bandeja de Mensajería' : 'Anuncios del Sistema'}
          </h1>
          <p className="text-sm text-dark-400">
            {tipo === 'foros' ? 'Comparte dudas, inicia debates y ayuda a tus compañeros.' : tipo === 'mensajes' ? 'Chatea en tiempo real con docentes y soporte técnico.' : 'Comunicados importantes e informaciones académicas.'}
          </p>
        </div>
      </div>

      {tipo === 'foros' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-dark-450 uppercase tracking-wider">Hilos más recientes</span>
              <button onClick={() => setShowAddPost(true)} className="btn-primary py-2 px-4 text-xs font-bold flex items-center gap-1">
                <Plus className="w-4 h-4" /> Crear Hilo
              </button>
            </div>

            {posts.map(post => (
              <div key={post.id} className="glass-card-hover p-5 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center font-bold text-white text-xs">
                      {post.avatar}
                    </div>
                    <div>
                      <span className="font-bold text-white text-sm">{post.author}</span>
                      <span className="text-[10px] text-dark-500 block mt-0.5">Publicado recientemente</span>
                    </div>
                  </div>
                  {post.pinned && <span className="text-primary-400 text-xs font-bold flex items-center gap-1 uppercase tracking-wider"><Pin className="w-3 h-3 rotate-45" /> Anclado</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <span className="badge bg-dark-900 border border-dark-800 text-[10px] self-start py-0.5 px-2">{post.tag}</span>
                  <h3 className="font-bold text-white text-base leading-snug">{post.title}</h3>
                  <p className="text-xs text-dark-350 leading-relaxed">{post.desc}</p>
                </div>

                <div className="flex gap-4 border-t border-dark-850 pt-3 text-xs text-dark-500 font-bold">
                  <button className="hover:text-primary-400 flex items-center gap-1"><Heart className="w-4 h-4" /> {post.likes} Me gusta</button>
                  <button className="hover:text-primary-400 flex items-center gap-1"><MessageCircle className="w-4 h-4" /> {post.comments} Comentarios</button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick forum guidelines */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="glass-card p-5">
              <h3 className="font-bold text-white text-sm mb-3">Normas de la Comunidad</h3>
              <ul className="text-xs text-dark-450 flex flex-col gap-2 list-disc pl-4">
                <li>Sé amable y respetuoso.</li>
                <li>Usa títulos claros que describan tu problema.</li>
                <li>No compartas credenciales ni contraseñas.</li>
                <li>Utiliza bloques de código para mostrar sintaxis.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {tipo === 'mensajes' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contacts list */}
          <div className="md:col-span-1 glass-card overflow-hidden flex flex-col">
            <div className="p-4 border-b border-dark-800 bg-dark-900/10">
              <h3 className="font-bold text-white text-sm">Mensajes directos</h3>
            </div>
            <div className="divide-y divide-dark-850 overflow-y-auto">
              {mockContacts.map(c => (
                <button 
                  key={c.id} 
                  onClick={() => setActiveContact(c)}
                  className={`w-full text-left p-4 hover:bg-dark-900/10 transition-all flex justify-between items-center ${activeContact.id === c.id ? 'bg-primary-500/5' : ''}`}
                >
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center font-bold text-white text-sm">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">{c.name}</h4>
                      <p className="text-[10px] text-dark-500 mt-0.5">{c.role}</p>
                      <p className="text-[11px] text-dark-400 mt-1 truncate max-w-[140px]">{c.lastMsg}</p>
                    </div>
                  </div>
                  {c.unread > 0 && <span className="w-5 h-5 rounded-full bg-primary-500 text-[10px] font-bold text-white flex items-center justify-center">{c.unread}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Chat dialog */}
          <div className="md:col-span-2 glass-card flex flex-col h-[400px] border-dark-800">
            <div className="p-4 border-b border-dark-800 flex justify-between items-center bg-dark-900/10">
              <div>
                <h3 className="font-bold text-white text-sm">{activeContact.name}</h3>
                <span className="text-[10px] text-dark-500 font-semibold">{activeContact.role}</span>
              </div>
            </div>

            <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-3">
              {chatLog.map((chat, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col gap-1 max-w-[80%] ${chat.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                >
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${chat.sender === 'user' ? 'bg-primary-600 text-white rounded-tr-none' : 'bg-dark-900 border border-dark-850 text-dark-200 rounded-tl-none'}`}>
                    {chat.text}
                  </div>
                  <span className="text-[9px] text-dark-500 px-1">{chat.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-dark-800 flex gap-2">
              <input 
                type="text" 
                placeholder="Escribe tu mensaje..."
                value={msgInput}
                onChange={(e) => setMsgInput(e.target.value)}
                className="flex-grow bg-dark-900 border border-dark-800 text-xs rounded-xl px-4 py-2.5 text-white focus:outline-none"
              />
              <button type="submit" className="p-2.5 bg-primary-600 hover:bg-primary-550 text-white rounded-xl">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {tipo === 'anuncios' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-dark-450 uppercase tracking-wider">Tablón de Anuncios</span>
              <button onClick={() => setShowAddAnn(true)} className="btn-primary py-2 px-4 text-xs font-bold flex items-center gap-1">
                <Plus className="w-4 h-4" /> Nuevo Anuncio
              </button>
            </div>

            {announcements.map(ann => (
              <div key={ann.id} className="glass-card p-5 border-l-4 border-l-primary-500">
                <div className="flex justify-between items-start gap-3">
                  <h3 className="font-bold text-white text-base leading-snug">{ann.title}</h3>
                  <span className="text-xs text-dark-500 shrink-0 font-semibold">{ann.date}</span>
                </div>
                <p className="text-xs text-dark-350 mt-2.5 leading-relaxed">{ann.content}</p>
              </div>
            ))}
          </div>

          {/* Side stats / recent alerts */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="glass-card p-5">
              <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-primary-400" /> Alertas
              </h3>
              <p className="text-xs text-dark-400 leading-normal">
                Los anuncios importantes también son notificados automáticamente vía correo a todos los estudiantes inscritos.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Add Forum Post Modal */}
      {showAddPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="glass-card w-full max-w-md p-6 flex flex-col gap-4 border-primary-500/30">
            <div className="flex justify-between items-center border-b border-dark-800 pb-3">
              <h2 className="text-lg font-bold text-white">Nuevo Hilo de Discusión</h2>
              <button onClick={() => setShowAddPost(false)} className="text-dark-400 hover:text-white">
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>
            
            <form onSubmit={handleAddPost} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-dark-400 font-semibold uppercase">Título de la Duda o Debate</label>
                <input 
                  type="text"
                  required
                  placeholder="Ej. Error con createToken en Laravel"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="input-field py-2 px-3 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-dark-400 font-semibold uppercase">Descripción detallada</label>
                <textarea 
                  required
                  rows="4"
                  placeholder="Explica a detalle tu duda u opinión..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="input-field py-2 px-3 text-sm bg-dark-800"
                />
              </div>

              <div className="flex items-center gap-3 justify-end border-t border-dark-800 pt-4 mt-2">
                <button type="button" onClick={() => setShowAddPost(false)} className="btn-secondary py-2 px-4 text-xs font-bold">
                  Cancelar
                </button>
                <button type="submit" className="btn-primary py-2 px-4 text-xs font-bold">
                  Publicar Hilo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Announcement Modal */}
      {showAddAnn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="glass-card w-full max-w-md p-6 flex flex-col gap-4 border-primary-500/30">
            <div className="flex justify-between items-center border-b border-dark-800 pb-3">
              <h2 className="text-lg font-bold text-white">Publicar Nuevo Anuncio</h2>
              <button onClick={() => setShowAddAnn(false)} className="text-dark-400 hover:text-white">
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>
            
            <form onSubmit={handleAddAnnouncement} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-dark-400 font-semibold uppercase">Título del Comunicado</label>
                <input 
                  type="text"
                  required
                  placeholder="Ej. Lanzamiento del curso de Kubernetes"
                  value={newAnnTitle}
                  onChange={(e) => setNewAnnTitle(e.target.value)}
                  className="input-field py-2 px-3 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-dark-400 font-semibold uppercase">Detalle del Anuncio</label>
                <textarea 
                  required
                  rows="4"
                  placeholder="Contenido oficial del anuncio..."
                  value={newAnnDesc}
                  onChange={(e) => setNewAnnDesc(e.target.value)}
                  className="input-field py-2 px-3 text-sm bg-dark-800"
                />
              </div>

              <div className="flex items-center gap-3 justify-end border-t border-dark-800 pt-4 mt-2">
                <button type="button" onClick={() => setShowAddAnn(false)} className="btn-secondary py-2 px-4 text-xs font-bold">
                  Cancelar
                </button>
                <button type="submit" className="btn-primary py-2 px-4 text-xs font-bold">
                  Enviar Anuncio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComunicacionPage;
