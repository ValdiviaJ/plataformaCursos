<?php

namespace App\Services;

use App\Repositories\Contracts\CourseRepositoryInterface;

class CourseService extends BaseService
{
    protected CourseRepositoryInterface $courseRepository;

    public function __construct(CourseRepositoryInterface $courseRepository)
    {
        $this->courseRepository = $courseRepository;
    }

    public function listCourses(array $filters)
    {
        return $this->courseRepository->getFilteredCourses($filters);
    }

    public function findCourse($id)
    {
        return $this->courseRepository->getCourseDetails($id);
    }
}
