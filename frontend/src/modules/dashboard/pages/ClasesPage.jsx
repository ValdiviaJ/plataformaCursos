import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { cursoService } from '../../../services/cursoService';
import { claseService } from '../../../services/claseService';
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
  Maximize2,
  VideoOff,
  Plus,
  CircleDot
} from 'lucide-react';

const ClasesPage = () => {
  const { tipo } = useParams(); // 'videos', 'en-vivo', 'grabaciones'
  const { user } = useAuth();
  const navigate = useNavigate();
  const userRole = user?.role || user?.rol || 'estudiante';
  const isAdminOrInstructor = userRole === 'admin' || userRole === 'instructor';

  // Active Live Class State
  const [activeClass, setActiveClass] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Live creation state (Instructor)
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [liveTitle, setLiveTitle] = useState('');

  // Audio/Video control toggles
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(false);
  const [sharingScreen, setSharingScreen] = useState(false);

  // Browser Streams
  const [cameraStream, setCameraStream] = useState(null);
  const [screenStream, setScreenStream] = useState(null);

  // Video Refs
  const mainVideoRef = useRef(null);
  const pipVideoRef = useRef(null);

  // Local Recording (For both Student and Instructor)
  const [localRecording, setLocalRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  // Live Chat state
  const [chatMessages, setChatMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  // Grabaciones state
  const [grabaciones, setGrabaciones] = useState([]);

  // Fetch initial info
  useEffect(() => {
    setLoading(true);
    claseService.getActiveClass().then(res => {
      setActiveClass(res);
      if (res) {
        setSharingScreen(res.is_sharing_screen);
        setCamOn(res.is_cam_on);
      }
      setLoading(false);
    });

    if (isAdminOrInstructor) {
      cursoService.getCursos().then(res => {
        setCourses(res);
        if (res.length > 0) setSelectedCourseId(res[0].id);
      });
    }

    if (tipo === 'grabaciones') {
      claseService.getRecordings().then(res => {
        setGrabaciones(res);
      });
    }
  }, [tipo, isAdminOrInstructor]);

  // Poll class status and chat messages
  useEffect(() => {
    if (!activeClass || tipo !== 'en-vivo') return;

    // Load initial messages
    claseService.getChat(activeClass.id).then(msgs => setChatMessages(msgs));

    const interval = setInterval(() => {
      // Sync chat
      claseService.getChat(activeClass.id).then(msgs => setChatMessages(msgs));
      
      // Sync active class status (sharing screen, cam, active check)
      claseService.getActiveClass().then(res => {
        if (!res) {
          // Class ended
          stopAllStreams();
          setActiveClass(null);
          alert('La clase en vivo ha finalizado.');
          navigate('/dashboard/clases/grabaciones');
        } else {
          setActiveClass(res);
          // If student, sync camera and screen share status from database
          if (!isAdminOrInstructor) {
            setSharingScreen(res.is_sharing_screen);
            setCamOn(res.is_cam_on);
          }
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [activeClass, tipo, isAdminOrInstructor]);

  // Handle camera stream setup
  useEffect(() => {
    const handleCamera = async () => {
      if (camOn && isAdminOrInstructor) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: micOn });
          setCameraStream(stream);
        } catch (err) {
          console.error('Error sharing camera:', err);
          setCamOn(false);
        }
      } else {
        if (cameraStream) {
          cameraStream.getTracks().forEach(track => track.stop());
          setCameraStream(null);
        }
      }
    };
    handleCamera();
  }, [camOn]);

  // Update video element sources when streams or sharing state changes
  useEffect(() => {
    if (sharingScreen) {
      if (screenStream && mainVideoRef.current) {
        mainVideoRef.current.srcObject = screenStream;
      }
      if (camOn && cameraStream && pipVideoRef.current) {
        pipVideoRef.current.srcObject = cameraStream;
      }
    } else {
      if (camOn && cameraStream && mainVideoRef.current) {
        mainVideoRef.current.srcObject = cameraStream;
      }
    }
  }, [sharingScreen, screenStream, camOn, cameraStream]);

  // Sync state to backend when toggles occur (Instructor only)
  const syncLiveStatus = (newScreenShare, newCamOn) => {
    if (isAdminOrInstructor && activeClass) {
      claseService.updateClassStatus(newScreenShare, newCamOn).catch(err => console.error(err));
    }
  };

  const handleToggleCam = () => {
    const nextState = !camOn;
    setCamOn(nextState);
    syncLiveStatus(sharingScreen, nextState);
  };

  const handleToggleScreenShare = async () => {
    if (!sharingScreen) {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        setScreenStream(stream);
        setSharingScreen(true);
        syncLiveStatus(true, camOn);

        // Detect manual end share from browser
        stream.getVideoTracks()[0].onended = () => {
          setSharingScreen(false);
          if (stream) stream.getTracks().forEach(t => t.stop());
          setScreenStream(null);
          syncLiveStatus(false, camOn);
        };
      } catch (err) {
        console.error('Error sharing screen:', err);
      }
    } else {
      if (screenStream) {
        screenStream.getTracks().forEach(t => t.stop());
        setScreenStream(null);
      }
      setSharingScreen(false);
      syncLiveStatus(false, camOn);
    }
  };

  const stopAllStreams = () => {
    if (cameraStream) cameraStream.getTracks().forEach(t => t.stop());
    if (screenStream) screenStream.getTracks().forEach(t => t.stop());
    setCameraStream(null);
    setScreenStream(null);
  };

  // Local Recording Implementation (For both Students and Instructors)
  const handleToggleLocalRecording = () => {
    if (!localRecording) {
      // Start local recording
      let streamToRecord = null;

      // Capture stream from main video element
      if (mainVideoRef.current) {
        if (mainVideoRef.current.captureStream) {
          streamToRecord = mainVideoRef.current.captureStream();
        } else if (mainVideoRef.current.mozCaptureStream) {
          streamToRecord = mainVideoRef.current.mozCaptureStream();
        }
      }

      if (!streamToRecord) {
        alert('No se pudo iniciar la grabación: No hay señal de video activa en pantalla.');
        return;
      }

      recordedChunksRef.current = [];
      const options = { mimeType: 'video/webm;codecs=vp9,opus' };
      
      try {
        const recorder = new MediaRecorder(streamToRecord, options);
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
          }
        };

        recorder.onstop = () => {
          const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = `clase-grabada-${activeClass?.titulo || 'codemaster'}.webm`;
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }, 100);
        };

        recorder.start(1000); // collect 1s of data chunks
        setLocalRecording(true);
      } catch (err) {
        console.error('Recorder error:', err);
        alert('Error al iniciar el grabador local.');
      }
    } else {
      // Stop local recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      setLocalRecording(false);
    }
  };

  // Handle send message
  const handleSendMsg = (e) => {
    e.preventDefault();
    if (!newMsg.trim() || !activeClass) return;

    claseService.postChatMessage(activeClass.id, newMsg)
      .then(savedMsg => {
        setChatMessages(prev => [...prev, savedMsg]);
        setNewMsg('');
      })
      .catch(err => console.error(err));
  };

  // Start live class (Instructor)
  const handleStartLive = (e) => {
    e.preventDefault();
    if (!selectedCourseId || !liveTitle.trim()) return;

    setLoading(true);
    claseService.startClass(selectedCourseId, liveTitle)
      .then(res => {
        setActiveClass(res);
        setCamOn(true); // turn camera on
        syncLiveStatus(false, true);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  // End live class (Instructor)
  const handleEndLive = () => {
    if (!window.confirm('¿Está seguro de finalizar la clase en vivo? Se guardará una grabación automáticamente.')) return;

    setLoading(true);
    claseService.endClass()
      .then(() => {
        stopAllStreams();
        setCamOn(false);
        setSharingScreen(false);
        setLocalRecording(false);
        setActiveClass(null);
        navigate('/dashboard/clases/grabaciones');
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col gap-6 animate-in">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-dark-900 pb-4">
        <div>
          <h1 className="section-title text-2xl font-black capitalize">
            {tipo === 'videos' ? 'Biblioteca de Videos' : tipo === 'en-vivo' ? 'Clase en Vivo' : 'Grabaciones de Clases'}
          </h1>
          <p className="text-sm text-dark-400">
            {tipo === 'videos' 
              ? 'Biblioteca de contenido complementario en video.' 
              : tipo === 'en-vivo' 
                ? 'Monitorea o únete a la videoconferencia de clases activas.' 
                : 'Revisa el catálogo de transmisiones en vivo grabadas anteriormente.'
            }
          </p>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-dark-400">Cargando información de clases...</div>
      ) : (
        <>
          {/* Sub-view: VIDEOS */}
          {tipo === 'videos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: 1, title: 'Instalación y Configuración del Entorno de React', duration: '15:24', views: '2,400', date: 'Hace 3 días', gradient: 'from-blue-600 to-indigo-900' },
                { id: 2, title: 'Uso práctico de useState y useReducer', duration: '28:10', views: '1,890', date: 'Hace 2 días', gradient: 'from-emerald-600 to-teal-900' },
                { id: 3, title: 'Introducción al Patrón Provider en React', duration: '22:45', views: '1,500', date: 'Ayer', gradient: 'from-purple-600 to-indigo-900' }
              ].map(video => (
                <div key={video.id} className="glass-card-hover overflow-hidden flex flex-col">
                  <div className={`aspect-video bg-gradient-to-tr ${video.gradient} flex items-center justify-center relative group`}>
                    <Play className="w-12 h-12 text-white/60 group-hover:text-primary-400 group-hover:scale-110 transition-all cursor-pointer" />
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

          {/* Sub-view: LIVE (EN-VIVO) */}
          {tipo === 'en-vivo' && (
            <>
              {activeClass ? (
                /* LIVE CLASS ACTIVE */
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 flex flex-col gap-4">
                    {/* Stream Video Container */}
                    <div className="aspect-video rounded-2xl bg-black border border-primary-500/20 relative overflow-hidden flex flex-col items-center justify-center shadow-lg">
                      <div className="absolute top-4 left-4 bg-red-650 text-white font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 animate-pulse shadow-glow z-20">
                        <span className="w-2 h-2 rounded-full bg-white" />
                        TRANSMITIENDO EN VIVO
                      </div>

                      {/* Main Display Element (Webcam or Shared Screen) */}
                      {(camOn || sharingScreen) ? (
                        <>
                          <video 
                            ref={mainVideoRef}
                            autoPlay 
                            playsInline 
                            muted={isAdminOrInstructor} // Mute instructor self to prevent echo
                            className="w-full h-full object-contain z-10"
                          />
                          
                          {/* FLOATING PICTURE-IN-PICTURE WEBCAM OVERLAY (when sharing screen) */}
                          {sharingScreen && camOn && (
                            <div className="absolute bottom-16 right-4 w-40 md:w-52 aspect-video rounded-xl bg-dark-900 border-2 border-primary-500 shadow-xl overflow-hidden z-20">
                              <video 
                                ref={pipVideoRef}
                                autoPlay 
                                playsInline 
                                muted={isAdminOrInstructor}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-3 text-dark-500 z-10">
                          <VideoOff className="w-16 h-16 text-dark-600" />
                          <p className="text-sm font-semibold">Señal de video apagada</p>
                        </div>
                      )}

                      {/* Control Panel (Both Student and Instructor buttons) */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/85 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-4 border border-dark-800 z-20">
                        {/* Instructor Controls */}
                        {isAdminOrInstructor ? (
                          <>
                            <button 
                              onClick={() => setMicOn(!micOn)}
                              className={`p-2.5 rounded-full transition-all ${micOn ? 'bg-dark-800 text-white hover:bg-dark-750' : 'bg-red-500/20 text-red-400'}`}
                              title={micOn ? 'Apagar Micrófono' : 'Encender Micrófono'}
                            >
                              {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                            </button>
                            <button 
                              onClick={handleToggleCam}
                              className={`p-2.5 rounded-full transition-all ${camOn ? 'bg-dark-800 text-white hover:bg-dark-750' : 'bg-red-500/20 text-red-400'}`}
                              title={camOn ? 'Apagar Cámara' : 'Encender Cámara'}
                            >
                              {camOn ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
                            </button>
                            <button 
                              onClick={handleToggleScreenShare}
                              className={`p-2.5 rounded-full transition-all ${sharingScreen ? 'bg-primary-500 text-white hover:bg-primary-600' : 'bg-dark-800 text-white hover:bg-dark-750'}`}
                              title={sharingScreen ? 'Detener Compartir Pantalla' : 'Compartir Pantalla'}
                            >
                              <ScreenShare className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={handleEndLive}
                              className="p-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white"
                              title="Finalizar Clase"
                            >
                              <Disc className="w-5 h-5" />
                            </button>
                          </>
                        ) : (
                          /* Student recording control button */
                          <button 
                            onClick={handleToggleLocalRecording}
                            className={`px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 transition-all ${
                              localRecording 
                                ? 'bg-red-600 text-white animate-pulse' 
                                : 'bg-dark-800 text-dark-300 hover:text-white'
                            }`}
                            title={localRecording ? 'Detener Grabación Local' : 'Grabar Clase Localmente'}
                          >
                            <CircleDot className="w-4 h-4 text-red-500" />
                            <span>{localRecording ? 'Grabando...' : 'Grabar Clase'}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Class Details Card */}
                    <div className="flex justify-between items-center bg-dark-900/40 p-4 rounded-xl border border-dark-850">
                      <div>
                        <h3 className="font-bold text-white text-base">{activeClass.titulo}</h3>
                        <p className="text-xs text-dark-400 mt-0.5">Organizado por: {activeClass.user?.name || 'Instructor'}</p>
                      </div>
                      <span className="text-xs text-primary-400 font-bold uppercase tracking-wider">{activeClass.course?.titulo}</span>
                    </div>
                  </div>

                  {/* Chat Panel */}
                  <div className="glass-card flex flex-col h-[450px] border-dark-800">
                    <div className="p-4 border-b border-dark-800 flex items-center justify-between">
                      <h3 className="font-bold text-white text-sm">Chat de la Clase</h3>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>

                    {/* Message list */}
                    <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
                      {chatMessages.length > 0 ? (
                        chatMessages.map(msg => (
                          <div key={msg.id} className="flex flex-col gap-0.5 text-xs">
                            <div className="flex items-center gap-1.5 justify-between">
                              <span className={`font-bold ${msg.user?.role === 'admin' ? 'text-primary-400' : 'text-white'}`}>
                                {msg.user?.name}
                              </span>
                              <span className="text-[10px] text-dark-500">
                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-dark-300 leading-relaxed bg-dark-900/50 p-2 rounded-lg border border-dark-850 mt-0.5">{msg.message}</p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-dark-500 my-auto text-xs">Aún no hay mensajes. ¡Di hola en el chat!</div>
                      )}
                    </div>

                    {/* Message send form */}
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
              ) : (
                /* NO LIVE CLASS ACTIVE */
                <div className="max-w-xl mx-auto py-12">
                  {isAdminOrInstructor ? (
                    <div className="glass-card p-8 flex flex-col gap-6">
                      <div className="flex flex-col gap-1 items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-400 mb-2">
                          <Video className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Iniciar una Clase en Vivo</h3>
                        <p className="text-sm text-dark-400">Selecciona el curso y escribe el título para transmitir la masterclass a los alumnos.</p>
                      </div>

                      <form onSubmit={handleStartLive} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold text-white">Curso Asociado</label>
                          <select 
                            value={selectedCourseId}
                            onChange={(e) => setSelectedCourseId(e.target.value)}
                            className="input-field"
                            required
                          >
                            {courses.map(course => (
                              <option key={course.id} value={course.id}>{course.titulo}</option>
                            ))}
                          </select>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold text-white">Título de la Clase</label>
                          <input 
                            type="text" 
                            placeholder="Ej. Programación Reactiva e Introducción a RxJS"
                            value={liveTitle}
                            onChange={(e) => setLiveTitle(e.target.value)}
                            className="input-field"
                            required
                          />
                        </div>

                        <button type="submit" className="btn-primary w-full py-2.5 flex items-center justify-center gap-2 mt-2">
                          <Plus className="w-4 h-4" /> Comenzar Stream
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="glass-card p-12 text-center flex flex-col items-center gap-4">
                      <VideoOff className="w-12 h-12 text-dark-600 animate-pulse" />
                      <h3 className="text-lg font-bold text-white">No hay clases en vivo en este momento</h3>
                      <p className="text-dark-500 max-w-sm">El instructor no ha iniciado ninguna videoconferencia activa. Vuelve más tarde o explora las clases grabadas.</p>
                      <button 
                        onClick={() => navigate('/dashboard/clases/grabaciones')}
                        className="btn-secondary text-sm mt-2 flex items-center gap-2"
                      >
                        <History className="w-4 h-4" /> Ver Grabaciones Anteriores
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Sub-view: RECORDINGS (GRABACIONES) */}
          {tipo === 'grabaciones' && (
            <div className="flex flex-col gap-4">
              {grabaciones.length > 0 ? (
                grabaciones.map(rec => (
                  <div key={rec.id} className="glass-card-hover p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400 shrink-0">
                        <History className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base leading-snug">{rec.titulo}</h3>
                        <div className="flex items-center gap-3 text-xs text-dark-500 font-semibold mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> 
                            {new Date(rec.created_at).toLocaleDateString()}
                          </span>
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
                ))
              ) : (
                <div className="glass-card p-12 text-center flex flex-col items-center gap-4">
                  <History className="w-12 h-12 text-dark-600" />
                  <h3 className="text-lg font-bold text-white">No hay grabaciones de clases</h3>
                  <p className="text-dark-500 max-w-sm">Aún no se han guardado clases en vivo grabadas anteriormente.</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClasesPage;
