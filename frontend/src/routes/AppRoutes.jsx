import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Layouts
import LandingLayout from '../layouts/LandingLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Public pages
import Landing from '../modules/landing/pages/Landing';
import CatalogoCursos from '../modules/cursos/pages/CatalogoCursos';
import DetalleCurso from '../modules/cursos/pages/DetalleCurso';
import Login from '../modules/auth/pages/Login';
import Registro from '../modules/auth/pages/Registro';

// Private pages
import Overview from '../modules/dashboard/pages/Overview';
import MiAprendizaje from '../modules/miaprendizaje/pages/MiAprendizaje';
import Leccion from '../modules/lecciones/pages/Leccion';
import Instructores from '../modules/instructores/pages/Instructores';
import MisPagos from '../modules/pagos/pages/MisPagos';
import Reportes from '../modules/reportes/pages/Reportes';
import Configuracion from '../modules/configuracion/pages/Configuracion';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="p-8 text-center text-dark-400">Verificando sesión...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="p-8 text-center text-dark-400">Verificando sesión...</div>;
  }
  
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages Layout */}
      <Route element={<LandingLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/cursos" element={<CatalogoCursos />} />
        <Route path="/curso/:id" element={<DetalleCurso />} />
      </Route>

      {/* Auth Forms Layout */}
      <Route element={<PublicOnlyRoute><AuthLayout /></PublicOnlyRoute>}>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Route>

      {/* Private Dashboard Layout */}
      <Route element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
        <Route path="/dashboard" element={<Overview />} />
        <Route path="/mi-aprendizaje" element={<MiAprendizaje />} />
        <Route path="/leccion/:cursoId/:leccionId" element={<Leccion />} />
        <Route path="/instructores" element={<Instructores />} />
        <Route path="/pagos" element={<MisPagos />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/configuracion" element={<Configuracion />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
