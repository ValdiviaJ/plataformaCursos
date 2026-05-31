import React from 'react';
import { Star, Mail, Award, BookOpen, Users } from 'lucide-react';

const mockInstructors = [
  { nombre: 'Carlos Mendoza', especialidad: 'React & Frontend Specialist', avatar: 'CM', alumnos: '15.4K', cursos: 4, rating: 4.9 },
  { nombre: 'Ana García', especialidad: 'Data Scientist & PhD in AI', avatar: 'AG', alumnos: '22.1K', cursos: 3, rating: 4.8 },
  { nombre: 'Miguel Torres', especialidad: 'Backend Architect', avatar: 'MT', alumnos: '18.3K', cursos: 5, rating: 4.7 },
  { nombre: 'Laura Sánchez', especialidad: 'Mobile App Developer', avatar: 'LS', alumnos: '9.8K', cursos: 2, rating: 4.8 },
  { nombre: 'Diego Ramírez', especialidad: 'Cloud & DevOps Lead', avatar: 'DR', alumnos: '11.2K', cursos: 3, rating: 4.9 },
  { nombre: 'Sofía Hernández', especialidad: 'Lead UI/UX Designer', avatar: 'SH', alumnos: '6.8K', cursos: 2, rating: 4.8 }
];

const Instructores = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8 animate-in">
      {/* Header */}
      <div>
        <h1 className="section-title">Nuestros Instructores</h1>
        <p className="section-subtitle">Aprende de ingenieros de software, arquitectos cloud y expertos certificados en la industria.</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockInstructors.map((ins, i) => (
          <div key={i} className="glass-card-hover p-6 flex flex-col items-center text-center gap-4">
            {/* Avatar representation */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center font-black text-xl text-white shadow-glow">
              {ins.avatar}
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-white text-lg">{ins.nombre}</h3>
              <span className="text-xs text-primary-400 font-semibold">{ins.especialidad}</span>
            </div>

            <div className="flex gap-1 items-center text-xs text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{ins.rating} de valoración</span>
            </div>

            <hr className="w-full border-dark-850" />

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 w-full text-center text-xs text-dark-500 mt-1">
              <div className="flex flex-col items-center">
                <Users className="w-4 h-4 text-dark-400 mb-1" />
                <span className="font-bold text-white">{ins.alumnos}</span>
                <span>Alumnos</span>
              </div>
              <div className="flex flex-col items-center">
                <BookOpen className="w-4 h-4 text-dark-400 mb-1" />
                <span className="font-bold text-white">{ins.cursos}</span>
                <span>Cursos</span>
              </div>
              <div className="flex flex-col items-center">
                <Award className="w-4 h-4 text-dark-400 mb-1" />
                <span className="font-bold text-white">Certificado</span>
                <span>Industry</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructores;
