<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\Api\Pkg_Lab\CategoryController;
use App\Http\Controllers\Api\Pkg_Lab\LaboratoryController;
use App\Http\Controllers\Api\Pkg_Lab\PrerequisiteController;
use App\Http\Controllers\Api\Pkg_Lab\StepController;
use App\Http\Controllers\Api\Pkg_Lab\TechniqueController;
use App\Http\Controllers\Api\Pkg_Lab\TipController;
use App\Http\Controllers\Api\Pkg_Quiz\AnswerController;
use App\Http\Controllers\Api\Pkg_Quiz\QuestionController;
use App\Http\Controllers\Api\Pkg_Quiz\QuizController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/test', function(){return ['message' => 'Good Admin'];})->middleware(['auth:sanctum', 'role:admin']);
Route::apiResource('categories', CategoryController::class);
Route::apiResource('laboratories', LaboratoryController::class);
Route::apiResource('prerequisites', PrerequisiteController::class);
Route::apiResource('steps', StepController::class);
Route::apiResource('techniques', TechniqueController::class);
Route::apiResource('tips', TipController::class);
Route::apiResource('Answers', AnswerController::class);
Route::apiResource('questions', QuestionController::class);
Route::apiResource('quizzes', QuizController::class);

// Routes protégées par Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return response()->json($request->user());
    });
});
