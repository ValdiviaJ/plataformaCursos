<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CourseController;
use App\Http\Controllers\API\ChatbotController;
use App\Http\Controllers\API\LiveClassController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group.
|
*/

// Public routes
Route::post('/v1/auth/login', [AuthController::class, 'login']);
Route::post('/v1/auth/register', [AuthController::class, 'register']);
Route::get('/v1/courses', [CourseController::class, 'index']);
Route::get('/v1/courses/{id}', [CourseController::class, 'show']);
Route::get('/v1/categories', [CourseController::class, 'categories']);

// Protected routes (Sanctum)
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::put('/auth/profile', [AuthController::class, 'updateProfile']);
    
    // Enrollments & Progress
    Route::post('/courses/{id}/enroll', [CourseController::class, 'enroll']);
    Route::get('/my-learning', [CourseController::class, 'myLearning']);
    Route::post('/lessons/{lessonId}/complete', [CourseController::class, 'completeLesson']);

    // Clases en Vivo
    Route::get('/live-class/active', [LiveClassController::class, 'getActive']);
    Route::post('/live-class/start', [LiveClassController::class, 'start']);
    Route::post('/live-class/end', [LiveClassController::class, 'end']);
    Route::get('/live-class/{id}/chat', [LiveClassController::class, 'getChat']);
    Route::post('/live-class/{id}/chat', [LiveClassController::class, 'postChat']);
    Route::get('/live-class/recordings', [LiveClassController::class, 'getRecordings']);

    // Chatbot Tutor Virtual
    Route::post('/chatbot', [ChatbotController::class, 'chat']);
});
