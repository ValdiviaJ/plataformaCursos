<?php

namespace App\Http\Controllers\API;

use App\Services\CourseService;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Enrollment;
use App\Models\Progress;
use Illuminate\Support\Facades\Auth;

class CourseController extends BaseController
{
    protected CourseService $courseService;

    public function __construct(CourseService $courseService)
    {
        $this->courseService = $courseService;
    }

    public function index(Request $request)
    {
        $filters = $request->only(['search', 'categoria', 'nivel']);
        $courses = $this->courseService->listCourses($filters);
        return $this->sendResponse($courses, 'Cursos recuperados correctamente.');
    }

    public function show($id)
    {
        $course = $this->courseService->findCourse($id);
        return $this->sendResponse($course, 'Curso recuperado correctamente.');
    }

    public function categories()
    {
        $categories = Category::withCount('courses')->get();
        return $this->sendResponse($categories, 'Categorías recuperadas correctamente.');
    }

    public function enroll($id)
    {
        $user = Auth::user();
        
        $exists = Enrollment::where('user_id', $user->id)
                            ->where('course_id', $id)
                            ->exists();

        if ($exists) {
            return $this->sendError('Ya estás inscrito en este curso.', [], 400);
        }

        $enrollment = Enrollment::create([
            'user_id' => $user->id,
            'course_id' => $id,
            'progreso' => 0,
            'estado' => 'activo'
        ]);

        return $this->sendResponse($enrollment, 'Inscripción realizada correctamente.');
    }

    public function myLearning()
    {
        $user = Auth::user();
        $enrollments = Enrollment::where('user_id', $user->id)
                                 ->with(['course.category', 'course.lessons', 'progress'])
                                 ->get();

        return $this->sendResponse($enrollments, 'Mis cursos inscritos recuperados correctamente.');
    }

    public function completeLesson(Request $request, $lessonId)
    {
        $user = Auth::user();
        
        $enrollment = Enrollment::where('user_id', $user->id)
                                 ->whereHas('course.lessons', function($q) use ($lessonId) {
                                     $q->where('id', $lessonId);
                                 })->firstOrFail();

        $progress = Progress::firstOrCreate([
            'enrollment_id' => $enrollment->id,
            'lesson_id' => $lessonId
        ], [
            'completada' => true
        ]);

        // Calcular nuevo progreso general del curso
        $totalLessons = $enrollment->course->lessons()->count();
        $completedLessons = Progress::where('enrollment_id', $enrollment->id)
                                    ->where('completada', true)
                                    ->count();

        $percentage = $totalLessons > 0 ? round(($completedLessons / $totalLessons) * 100) : 0;
        $enrollment->update(['progreso' => $percentage]);

        return $this->sendResponse([
            'progress' => $progress,
            'course_progress' => $percentage
        ], 'Lección marcada como completada.');
    }
}
