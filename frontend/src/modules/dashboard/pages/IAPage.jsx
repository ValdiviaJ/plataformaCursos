import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  BrainCircuit, 
  TrendingDown, 
  Compass, 
  ArrowRight, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

const recommendedCourses = [
  { id: 1, title: 'Cloud Computing & AWS Architect', match: '96% afinidad', reason: 'Por tu interés en microservicios y backend.' },
  { id: 2, title: 'Ciberseguridad y Pentesting de APIs', match: '89% afinidad', reason: 'Excelente combinación con tus conocimientos de Express y Node.js.' }
];

const initialMessages = [
  { sender: 'ai', text: '¡Hola! Soy tu Tutor Virtual de CodeMaster. Puedo explicarte conceptos de programación, revisar código o sugerir rutas de aprendizaje. ¿En qué te puedo ayudar hoy? 🚀', time: '18:40' }
];

const IAPage = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputVal, setInputVal] = useState('');
  const [typing, setTyping] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = {
      sender: 'user',
      text: inputVal,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setTyping(true);

    // Simulate AI response trigger
    setTimeout(() => {
      let aiText = 'Interesante pregunta. En React, es fundamental entender el ciclo de vida de los componentes para evitar renders innecesarios. ¿Te gustaría ver un ejemplo práctico de optimización con useMemo o useCallback?';
      
      if (inputVal.toLowerCase().includes('token') || inputVal.toLowerCase().includes('laravel')) {
        aiText = 'Para autenticar una API con Laravel Sanctum, debes emitir tokens usando:\n\n`$token = $user->createToken("auth_token")->plainTextToken;` \n\nEsto genera una cadena segura que el cliente enviará en las cabeceras HTTP como Bearer Token.';
      } else if (inputVal.toLowerCase().includes('docker') || inputVal.toLowerCase().includes('caddy')) {
        aiText = 'FrankenPHP utiliza un servidor web integrado Caddy. Tu archivo `Caddyfile` en la raíz se encarga de redireccionar todas las peticiones entrantes a `public/index.php`. Asegúrate de mapear el puerto 80 del contenedor al puerto local deseado en tu `docker-compose.yml`.';
      }

      const aiMsg = {
        sender: 'ai',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 animate-in">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-dark-900 pb-4">
        <div>
          <h1 className="section-title text-2xl font-black">Asistente y Analítica IA</h1>
          <p className="text-sm text-dark-400">Interactúa con el Tutor IA personalizado y consulta predicciones predictivas de rendimiento académico.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chatbot column */}
        <div className="lg:col-span-2 glass-card flex flex-col h-[500px] border-primary-500/20">
          <div className="p-4 border-b border-dark-800 flex items-center justify-between bg-dark-900/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center shadow-glow">
                <Bot className="text-white w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                  Tutor Virtual CodeMaster <Sparkles className="w-3.5 h-3.5 text-accent-400" />
                </h3>
                <span className="text-[10px] text-emerald-400 font-bold uppercase">En línea (IA activa)</span>
              </div>
            </div>
          </div>

          {/* Messages list */}
          <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col gap-1 max-w-[85%] ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
              >
                <div className={`p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-primary-600 text-white rounded-tr-none shadow-glow' : 'bg-dark-900 border border-dark-850 text-dark-200 rounded-tl-none'}`}>
                  {msg.text}
                </div>
                <span className="text-[9px] text-dark-500 px-1">{msg.time}</span>
              </div>
            ))}
            {typing && (
              <div className="self-start bg-dark-900 border border-dark-850 p-3 rounded-2xl rounded-tl-none text-xs text-dark-400 animate-pulse flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-primary-400 animate-bounce" /> Escribiendo respuesta...
              </div>
            )}
          </div>

          {/* Input field */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-dark-800 flex gap-2">
            <input 
              type="text" 
              placeholder="Pregúntame algo, ej: ¿Cómo configuro Laravel Sanctum?"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-grow bg-dark-900 border border-dark-800 text-xs rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500"
            />
            <button type="submit" className="p-3 bg-primary-600 hover:bg-primary-550 text-white rounded-xl shadow-glow">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Analytics and Predictions Column */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Dropout / Risk Predictor */}
          <div className="glass-card p-5">
            <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4 text-emerald-400" /> Analítica Predictiva IA
            </h3>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-dark-400 font-semibold">Riesgo de deserción:</span>
                <span className="text-xs text-emerald-400 font-black">Muy Bajo (4%)</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill bg-emerald-500" style={{ width: '4%' }} />
              </div>
              
              <div className="bg-emerald-950/20 border border-emerald-800/30 p-3.5 rounded-xl text-xs text-emerald-350 leading-normal flex gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Tu constancia en las lecciones y cuestionarios te sitúa en el percentil superior.</span>
              </div>
            </div>
          </div>

          {/* AI Route Course Recommendations */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-dark-450 uppercase tracking-wider flex items-center gap-1">
              <Compass className="w-4 h-4 text-primary-400" /> Cursos sugeridos por IA
            </span>
            {recommendedCourses.map(course => (
              <div key={course.id} className="glass-card p-4 flex flex-col gap-2 border-l-4 border-l-accent-500">
                <div className="flex justify-between items-center gap-2">
                  <h4 className="font-bold text-white text-xs leading-snug">{course.title}</h4>
                  <span className="text-[10px] text-accent-400 font-bold shrink-0">{course.match}</span>
                </div>
                <p className="text-[10px] text-dark-450 leading-relaxed">{course.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IAPage;
