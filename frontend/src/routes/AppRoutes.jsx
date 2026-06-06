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

// Reformed Admin & Academico pages
import UsuariosPage from '../modules/dashboard/pages/UsuariosPage';
import CursosAcademicoPage from '../modules/dashboard/pages/CursosAcademicoPage';
import ClasesPage from '../modules/dashboard/pages/ClasesPage';
import MaterialesPage from '../modules/dashboard/pages/MaterialesPage';
import EvaluacionesPage from '../modules/dashboard/pages/EvaluacionesPage';
import ComunicacionPage from '../modules/dashboard/pages/ComunicacionPage';
import CertificadosPage from '../modules/dashboard/pages/CertificadosPage';
import GamificacionPage from '../modules/dashboard/pages/GamificacionPage';
import IAPage from '../modules/dashboard/pages/IAPage';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="p-8 text-center text-dark-400">Verificando sesión...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const RoleRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="p-8 text-center text-dark-400">Verificando sesión...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  const userRole = user?.role || user?.rol || 'estudiante';
  
  return allowedRoles.includes(userRole) ? children : <Navigate to="/dashboard" replace />;
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
        <Route path="/reportes" element={<RoleRoute allowedRoles={['admin', 'instructor']}><Reportes /></RoleRoute>} />
        <Route path="/configuracion" element={<Configuracion />} />
        
        <Route path="/dashboard/usuarios/:tipo" element={<RoleRoute allowedRoles={['admin']}><UsuariosPage /></RoleRoute>} />
        <Route path="/dashboard/cursos-academica/:sub" element={<RoleRoute allowedRoles={['admin', 'instructor']}><CursosAcademicoPage /></RoleRoute>} />
        <Route path="/dashboard/clases/:tipo" element={<ClasesPage />} />
        <Route path="/dashboard/materiales" element={<MaterialesPage />} />
        <Route path="/dashboard/evaluaciones/:tipo" element={<EvaluacionesPage />} />
        <Route path="/dashboard/comunicacion/:tipo" element={<ComunicacionPage />} />
        <Route path="/dashboard/certificados" element={<CertificadosPage />} />
        <Route path="/dashboard/gamificacion" element={<GamificacionPage />} />
        <Route path="/dashboard/ia" element={<IAPage />} />
        
        {/* Explorar catálogo y detalle dentro del dashboard */}
        <Route path="/dashboard/cursos" element={<CatalogoCursos />} />
        <Route path="/dashboard/curso/:id" element={<DetalleCurso />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
