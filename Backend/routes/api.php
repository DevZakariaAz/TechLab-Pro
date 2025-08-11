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
use SadiqSalau\LaravelOtp\Facades\Otp;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::post('/test', function(){return ['message' => 'Good Admin'];})->middleware(['auth:sanctum', 'role:admin']);
Route::post('/otp/verify', [AuthController::class, 'otpVerify']);
Route::apiResource('categories', CategoryController::class);
Route::apiResource('laboratories', LaboratoryController::class);
Route::apiResource('prerequisites', PrerequisiteController::class);
Route::apiResource('steps', StepController::class);
Route::apiResource('techniques', TechniqueController::class);
Route::apiResource('tips', TipController::class);
Route::apiResource('Answers', AnswerController::class);
Route::apiResource('questions', QuestionController::class);
Route::apiResource('quizzes', QuizController::class);

/** OTP Resend Route */
Route::post('/otp/verify', [AuthController::class, 'otpVerify']);
Route::post('/otp/resend', function (Request $request) {

    $request->validate([
        'email'    => ['required', 'string', 'email', 'max:255']
    ]);

    $otp = Otp::identifier($request->email)->update();

    if($otp['status'] != Otp::OTP_SENT)
    {
        abort(403, __($otp['status']));
    }
    return __($otp['status']);
});

// Routes protégées par Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return response()->json($request->user());
    });
});
