<?php

namespace App\Repositories\Eloquent;

use App\Models\Course;
use App\Repositories\Contracts\CourseRepositoryInterface;

class CourseRepository extends BaseRepository implements CourseRepositoryInterface
{
    public function __construct(Course $model)
    {
        parent::__construct($model);
    }

    public function getFilteredCourses(array $filters)
    {
        $query = $this->model->newQuery()->with('category');

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function($q) use ($search) {
                $q->where('titulo', 'LIKE', "%{$search}%")
                  ->orWhere('descripcion', 'LIKE', "%{$search}%");
            });
        }

        if (!empty($filters['categoria']) && $filters['categoria'] !== 'Todos') {
            $query->whereHas('category', function($q) use ($filters) {
                $q->where('nombre', $filters['categoria']);
            });
        }

        if (!empty($filters['nivel']) && $filters['nivel'] !== 'Todos') {
            $query->where('nivel', $filters['nivel']);
        }

        return $query->get();
    }

    public function getCourseDetails($id)
    {
        return $this->model->with(['category', 'lessons'])->findOrFail($id);
    }
}
