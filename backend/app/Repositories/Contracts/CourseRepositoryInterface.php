<?php

namespace App\Repositories\Contracts;

interface CourseRepositoryInterface extends RepositoryInterface
{
    public function getFilteredCourses(array $filters);
    public function getCourseDetails($id);
}
