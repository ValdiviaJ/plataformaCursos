import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ClipboardCheck, 
  FileText, 
  HelpCircle, 
  Clock, 
  AlertCircle, 
  CheckCircle,
  FileSignature,
  FileEdit,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

const mockTareas = [
  { id: 1, title: 'Práctica Calificada 1: Custom Hooks en React', curso: 'React Avanzado', deadline: '2026-06-05', status: 'pending', grade: null },
  { id: 2, title: 'Tarea 2: Construcción de un Router Personalizado', curso: 'React Avanzado', deadline: '2026-05-28', status: 'submitted', grade: '18/20' }
];

const quizQuestions = [
  {
    id: 1,
    question: '¿Cuál de los siguientes Hooks de React se utiliza para memorizar valores costosos de calcular?',
    options: ['useEffect', 'useMemo', 'useCallback', 'useRef'],
    answer: 'useMemo'
  },
  {
    id: 2,
    question: '¿Qué método o propiedad se utiliza en Laravel Sanctum para emitir un token de API para un usuario?',
    options: ['createToken()', 'issueToken()', 'generateApiToken()', 'makeSanctumToken()'],
    answer: 'createToken()'
  },
  {
    id: 3,
    question: 'El patrón Repository nos permite desacoplar la lógica de negocio de la persistencia de datos.',
    options: ['Verdadero', 'Falso'],
    answer: 'Verdadero'
  }
];

const EvaluacionesPage = () => {
  const { tipo } = useParams(); // 'tareas', 'cuestionarios', 'examenes'
  
  // Tarea submit mock
  const [tareas, setTareas] = useState(mockTareas);
  const [submitLink, setSubmitLink] = useState('');
  const [submittingTaskId, setSubmittingTaskId] = useState(null);

  // Quiz / Exam Simulator
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    if ((tipo === 'cuestionarios' || tipo === 'examenes') && timeLeft > 0 && timerRunning && !quizSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && timerRunning && !quizSubmitted) {
      handleGradeQuiz();
    }
  }, [timeLeft, timerRunning, tipo, quizSubmitted]);

  const handleTaskSubmit = (e, taskId) => {
    e.preventDefault();
    if (!submitLink) return;

    setTareas(tareas.map(t => {
      if (t.id === taskId) {
        return { ...t, status: 'submitted', dateSubmitted: new Date().toISOString().split('T')[0] };
      }
      return t;
    }));

    setSubmitLink('');
    setSubmittingTaskId(null);
    alert('¡Tarea entregada correctamente para revisión!');
  };

  const handleOptionSelect = (qId, option) => {
    if (quizSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [qId]: option
    });
  };

  const handleGradeQuiz = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.answer) {
        score += 1;
      }
    });

    const finalPercent = Math.round((score / quizQuestions.length) * 100);
    setQuizScore(finalPercent);
    setQuizSubmitted(true);
    setTimerRunning(false);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setTimeLeft(600);
    setTimerRunning(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex flex-col gap-6 animate-in">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-dark-900 pb-4">
        <div>
          <h1 className="section-title text-2xl font-black capitalize">
            {tipo === 'tareas' ? 'Tareas Académicas' : tipo === 'cuestionarios' ? 'Cuestionario de Evaluación' : 'Examen de Certificación'}
          </h1>
          <p className="text-sm text-dark-400">
            {tipo === 'tareas' ? 'Entrega tus actividades prácticas y recibe calificación.' : tipo === 'cuestionarios' ? 'Prueba tu aprendizaje rápido.' : 'Examen final programado de fin de curso.'}
          </p>
        </div>
      </div>

      {/* Render layouts */}
      {tipo === 'tareas' && (
        <div className="flex flex-col gap-4">
          {tareas.map(tarea => (
            <div key={tarea.id} className="glass-card p-5 flex flex-col gap-4 border-l-4 border-l-primary-500">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <span className="badge bg-primary-500/10 text-primary-400 border border-primary-500/20 text-[10px] mb-2">{tarea.curso}</span>
                  <h3 className="font-bold text-white text-base leading-snug">{tarea.title}</h3>
                  <p className="text-xs text-dark-500 mt-1">Fecha límite: {tarea.deadline}</p>
                </div>
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {tarea.status === 'submitted' ? (
                    <span className="badge bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Entregado {tarea.grade ? `(${tarea.grade})` : ''}
                    </span>
                  ) : (
                    <span className="badge bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Pendiente
                    </span>
                  )}
                </div>
              </div>

              {tarea.status !== 'submitted' && submittingTaskId !== tarea.id && (
                <button 
                  onClick={() => setSubmittingTaskId(tarea.id)}
                  className="btn-primary py-2 px-5 text-xs font-bold self-start mt-2"
                >
                  Entregar Tarea
                </button>
              )}

              {submittingTaskId === tarea.id && (
                <form onSubmit={(e) => handleTaskSubmit(e, tarea.id)} className="flex flex-col gap-3 mt-2 border-t border-dark-850 pt-4 animate-in">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-dark-400 font-semibold uppercase">Enlace de la Entrega (GitHub, Drive o PDF)</label>
                    <input 
                      type="url"
                      required
                      placeholder="https://github.com/usuario/repositorio"
                      value={submitLink}
                      onChange={(e) => setSubmitLink(e.target.value)}
                      className="input-field py-2 px-3 text-xs"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button 
                      type="button" 
                      onClick={() => setSubmittingTaskId(null)} 
                      className="btn-secondary py-1.5 px-4 text-xs font-bold"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      className="btn-primary py-1.5 px-4 text-xs font-bold"
                    >
                      Enviar Entrega
                    </button>
                  </div>
                </form>
              )}
            </div>
          ))}
        </div>
      )}

      {(tipo === 'cuestionarios' || tipo === 'examenes') && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quiz Player */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {quizQuestions.map((q, idx) => (
              <div key={q.id} className="glass-card p-6 flex flex-col gap-4">
                <h3 className="font-bold text-white text-sm">
                  Pregunta {idx + 1}: {q.question}
                </h3>
                <div className="flex flex-col gap-2">
                  {q.options.map(option => {
                    const isSelected = selectedAnswers[q.id] === option;
                    const isCorrect = q.answer === option;
                    let optionStyle = 'bg-dark-900 border-dark-800 text-dark-300 hover:border-primary-500/50';

                    if (isSelected) {
                      optionStyle = 'bg-primary-500/10 border-primary-500 text-primary-400';
                    }
                    if (quizSubmitted) {
                      if (isCorrect) {
                        optionStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-400 font-bold';
                      } else if (isSelected) {
                        optionStyle = 'bg-red-500/15 border-red-500 text-red-400 font-bold';
                      }
                    }

                    return (
                      <button 
                        key={option}
                        onClick={() => handleOptionSelect(q.id, option)}
                        className={`text-left p-3.5 rounded-xl border text-xs font-semibold transition-all ${optionStyle}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {!quizSubmitted ? (
              <button 
                onClick={handleGradeQuiz}
                disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
                className="btn-primary py-3 font-bold text-sm w-full disabled:opacity-50"
              >
                Terminar y Calificar
              </button>
            ) : (
              <button 
                onClick={resetQuiz}
                className="btn-secondary py-3 font-bold text-sm w-full"
              >
                Reintentar Evaluación
              </button>
            )}
          </div>

          {/* Quiz Stats */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="glass-card p-6 flex flex-col gap-5">
              <h3 className="font-bold text-white text-sm">Estado de la Evaluación</h3>
              
              <div className="flex items-center justify-between border-b border-dark-800 pb-3">
                <span className="text-xs text-dark-400 font-semibold">Tiempo Restante:</span>
                <span className={`text-sm font-black flex items-center gap-1.5 ${timeLeft < 120 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                  <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-dark-800 pb-3">
                <span className="text-xs text-dark-400 font-semibold">Preguntas respondidas:</span>
                <span className="text-sm font-bold text-white">
                  {Object.keys(selectedAnswers).length} / {quizQuestions.length}
                </span>
              </div>

              {quizSubmitted && (
                <div className="flex flex-col gap-3 pt-2 animate-in">
                  <div className={`p-4 rounded-xl border flex flex-col gap-1 items-center justify-center text-center ${quizScore >= 70 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-450'}`}>
                    <span className="text-2xl font-black">{quizScore}%</span>
                    <span className="text-xs font-semibold">{quizScore >= 70 ? '¡Aprobado con Éxito!' : 'Nota Desaprobatoria'}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluacionesPage;
