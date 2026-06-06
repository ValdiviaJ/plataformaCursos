<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Category;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\Enrollment;
use App\Models\Progress;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Default Student User
        if (!User::where('email', 'justo@codemaster.com')->exists()) {
            User::create([
                'name' => 'Justo Valdivia',
                'email' => 'justo@codemaster.com',
                'password' => Hash::make('password123'),
                'role' => 'estudiante',
            ]);
        }

        // 2. Create Default Admin User
        if (!User::where('email', 'admin@codemaster.com')->exists()) {
            User::create([
                'name' => 'Administrador CodeMaster',
                'email' => 'admin@codemaster.com',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
            ]);
        }

        // 2. Create Categories
        $categoriesData = [
            ['nombre' => 'Desarrollo Web', 'icon' => '💻'],
            ['nombre' => 'Desarrollo Móvil', 'icon' => '📱'],
            ['nombre' => 'Data Science', 'icon' => '🧠'],
            ['nombre' => 'Cloud & DevOps', 'icon' => '☁️'],
            ['nombre' => 'Ciberseguridad', 'icon' => '🔒'],
            ['nombre' => 'Diseño UI/UX', 'icon' => '🎨']
        ];

        $categories = [];
        foreach ($categoriesData as $catData) {
            $categories[$catData['nombre']] = Category::firstOrCreate(
                ['nombre' => $catData['nombre']],
                ['icon' => $catData['icon']]
            );
        }

        // 3. Create Courses & Lessons
        $coursesData = [
            [
                'category' => 'Desarrollo Web',
                'titulo' => 'React Avanzado: Hooks, Context y Patrones de Diseño',
                'descripcion' => 'Lleva tus habilidades de React al siguiente nivel. Domina custom hooks, Context API, rendimiento, pruebas unitarias y patrones avanzados de arquitectura frontend.',
                'nivel' => 'Avanzado',
                'duracion' => '18 horas',
                'precio' => 49.99,
                'descuento' => 20,
                'imagen_gradient' => 'from-blue-600 to-indigo-900',
                'rating' => 4.90,
                'total_estudiantes' => 4520,
                'lessons' => [
                    ['modulo' => 'Módulo 1: Repaso y Fundamentos de Hooks Avanzados', 'titulo' => '1.1 Bienvenido al curso', 'duracion' => '10 min', 'orden' => 1],
                    ['modulo' => 'Módulo 1: Repaso y Fundamentos de Hooks Avanzados', 'titulo' => '1.2 Advanced useState y useReducer', 'duracion' => '25 min', 'orden' => 2],
                    ['modulo' => 'Módulo 1: Repaso y Fundamentos de Hooks Avanzados', 'titulo' => '1.3 useRef para dom y persistencia', 'duracion' => '18 min', 'orden' => 3],
                    ['modulo' => 'Módulo 2: Gestión de Estado Avanzado', 'titulo' => '2.1 Context API a profundidad', 'duracion' => '30 min', 'orden' => 4],
                    ['modulo' => 'Módulo 2: Gestión de Estado Avanzado', 'titulo' => '2.2 Patrones de optimización para Context', 'duracion' => '22 min', 'orden' => 5],
                ]
            ],
            [
                'category' => 'Data Science',
                'titulo' => 'Python para Data Science y Machine Learning',
                'descripcion' => 'Aprende Python desde las bases hasta el análisis de datos completo con Pandas, NumPy, visualización con Matplotlib/Seaborn y modelado predictivo con Scikit-Learn.',
                'nivel' => 'Principiante',
                'duracion' => '32 horas',
                'precio' => 59.99,
                'descuento' => 0,
                'imagen_gradient' => 'from-emerald-600 to-teal-900',
                'rating' => 4.80,
                'total_estudiantes' => 8120,
                'lessons' => [
                    ['modulo' => 'Módulo 1: Introducción a Python para Ciencia de Datos', 'titulo' => '1.1 Setup del entorno con Anaconda', 'duracion' => '15 min', 'orden' => 1],
                    ['modulo' => 'Módulo 1: Introducción a Python para Ciencia de Datos', 'titulo' => '1.2 Sintaxis básica y estructuras de datos', 'duracion' => '35 min', 'orden' => 2],
                ]
            ],
            [
                'category' => 'Desarrollo Web',
                'titulo' => 'Node.js & Express: Arquitectura limpia y API REST',
                'descripcion' => 'Construye backends robustos, escalables y seguros con Node.js, Express y TypeScript. Integra bases de datos relacionales, autenticación y despliegue continuo.',
                'nivel' => 'Intermedio',
                'duracion' => '22 horas',
                'precio' => 39.99,
                'descuento' => 15,
                'imagen_gradient' => 'from-green-600 to-emerald-950',
                'rating' => 4.70,
                'total_estudiantes' => 3200,
                'lessons' => [
                    ['modulo' => 'Módulo 1: Fundamentos de Express y Routing', 'titulo' => '1.1 Estructura inicial del proyecto', 'duracion' => '20 min', 'orden' => 1],
                    ['modulo' => 'Módulo 1: Fundamentos de Express y Routing', 'titulo' => '1.2 Creación de middlewares robustos', 'duracion' => '28 min', 'orden' => 2],
                ]
            ]
        ];

        foreach ($coursesData as $cData) {
            $course = Course::firstOrCreate(
                ['titulo' => $cData['titulo']],
                [
                    'category_id' => $categories[$cData['category']]->id,
                    'descripcion' => $cData['descripcion'],
                    'nivel' => $cData['nivel'],
                    'duracion' => $cData['duracion'],
                    'precio' => $cData['precio'],
                    'descuento' => $cData['descuento'],
                    'imagen_gradient' => $cData['imagen_gradient'],
                    'rating' => $cData['rating'],
                    'total_estudiantes' => $cData['total_estudiantes']
                ]
            );

            foreach ($cData['lessons'] as $lData) {
                Lesson::firstOrCreate(
                    [
                        'course_id' => $course->id,
                        'titulo' => $lData['titulo']
                    ],
                    [
                        'modulo_titulo' => $lData['modulo'],
                        'duracion' => $lData['duracion'],
                        'orden' => $lData['orden']
                    ]
                );
            }
        }

        // 4. Inscribir al alumno de prueba 'Justo' en el curso de React y simular algo de progreso
        $student = User::where('email', 'justo@codemaster.com')->first();
        $reactCourse = Course::where('titulo', 'like', '%React Avanzado%')->first();

        if ($student && $reactCourse) {
            $enrollment = Enrollment::firstOrCreate([
                'user_id' => $student->id,
                'course_id' => $reactCourse->id
            ], [
                'progreso' => 0,
                'estado' => 'activo'
            ]);

            // Completar las dos primeras lecciones para Justo
            $lessons = $reactCourse->lessons()->orderBy('orden')->take(2)->get();
            foreach ($lessons as $lesson) {
                Progress::firstOrCreate([
                    'enrollment_id' => $enrollment->id,
                    'lesson_id' => $lesson->id
                ], [
                    'completada' => true
                ]);
            }

            // Calcular y actualizar porcentaje de progreso
            $totalLessons = $reactCourse->lessons()->count();
            $completedLessons = Progress::where('enrollment_id', $enrollment->id)
                                        ->where('completada', true)
                                        ->count();
            $percentage = $totalLessons > 0 ? round(($completedLessons / $totalLessons) * 100) : 0;
            $enrollment->update(['progreso' => $percentage]);
        }
    }
}
