<?php

use App\Http\Controllers\api\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use SadiqSalau\LaravelOtp\Facades\Otp;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/test', function(){return ['message' => 'Good Admin'];})->middleware(['auth:sanctum', 'role:admin']);
Route::post('/otp/verify', [AuthController::class, 'otpVerify']);


/** OTP Resend Route */
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
