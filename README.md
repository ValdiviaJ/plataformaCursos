# 🎓 CodeMaster - Plataforma de Cursos de Programación

Este proyecto sigue la misma arquitectura modular e infraestructura basada en contenedores de los proyectos `Sistema_Gimnacio` y `Sistema_Restaurante`.

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + Vite 5 + TailwindCSS 3 + Lucide React + Context API.
- **Base de Datos**: PostgreSQL 15.
- **Entorno local**: Docker & Docker Compose.

## 📁 Estructura del Proyecto

```
plataforma-cursos/
├── docker-compose.yml
├── .gitignore
├── README.md
├── frontend/                   # Aplicación React + Vite
│   ├── src/
│   │   ├── layouts/            # Diseños de página base (Navbar, Sidebar, etc.)
│   │   ├── routes/             # Enrutamiento con react-router-dom
│   │   ├── context/            # Gestión de estado (AuthContext)
│   │   ├── services/           # Peticiones API & Mock Data
│   │   └── modules/            # Módulos por feature
│   │       ├── auth/
│   │       ├── dashboard/
│   │       ├── cursos/
│   │       ├── miaprendizaje/
│   │       ├── lecciones/
│   │       ├── instructores/
│   │       ├── pagos/
│   │       └── reportes/
```

## 🚀 Despliegue Local

Para levantar el entorno de desarrollo usando Docker, ejecuta en la raíz:

```bash
docker-compose up --build
```

El frontend estará disponible en `http://localhost:3000`.
