<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Otp\UserRegistrationOtp;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;
use SadiqSalau\LaravelOtp\Facades\Otp;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    // Enregistrement d'un utilisateur
    // public function register(Request $request)
    // {
    //     try {
    //         $validateUser = Validator::make($request->all(), [
    //             'name' => 'required|string',
    //             'email' => 'required|string|email|unique:users',
    //             'password' => 'required|string|min:6',
    //         ]);
    //         if ($validateUser->fails()) {
    //             return response()->json(
    //                 [
    //                     'status' =>false,
    //                     'message' => 'La validation a échoué',
    //                     'errors' => $validateUser->errors(),
    //                 ], 422);
    //         }
    //         // $user = User::create([
    //         //     'name' => $request->name,
    //         //     'email' => $request->email,
    //         //     'password' => Hash::make($request->password),
    //         // ]);
    //         // $token = $user->createToken('auth_token')->plainTextToken;
    //         // return response()->json(
    //         //     [
    //         //         'status' =>true,
    //         //         'message' => 'utilisateur créé avec succès',
    //         //         'token' => $token,
    //         //         'user' => $user,
    //         //     ]
    //         // ,200);

    //         $otp = Otp::identifier($request->email)->send(
    //             new UserRegistrationOtp(
    //                 name: $request->name,
    //                 email: $request->email,
    //                 password: $request->password
    //             ),
    //             Notification::route('mail', $request->email)
    //         );
        
    //         Log::info('OTP Response: ', $otp); // Log for debugging

    //     if ($otp['status'] === Otp::OTP_SENT) {
    //         return response()->json([
    //             'status' => true,
    //             'message' => 'OTP envoyé avec succès. Veuillez vérifier votre boîte de réception.',
    //         ], 200);
    //     }

    //     return response()->json([
    //         'status' => false,
    //         'message' => 'Échec de l\'envoi de l\'OTP : ' . __($otp['status']),
    //     ], 422);
    //     }
    //     catch (\Exception $error) {
    //         return response()->json(
    //             [
    //                 'status' => false,
    //                 'message' => $error->getMessage()
    //             ],422);
    //     }
    // }


    public function register(Request $request)
{
    try {
        $validateUser = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validateUser->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'La validation a échoué',
                'errors' => $validateUser->errors(),
            ], 422);
        }

        // Log::info('Sending OTP to: ' . $request->email); // Log recipient email

        $otp = Otp::identifier($request->email)->send(
            new UserRegistrationOtp(
                name: $request->name,
                email: $request->email,
                password: $request->password
            ),
            Notification::route('mail', $request->email)
        );

        // Log::info('OTP Response: ' . json_encode($otp, JSON_PARTIAL_OUTPUT_ON_ERROR)); // Fixed logging

        if ($otp['status'] === Otp::OTP_SENT) {
            return response()->json([
                'status' => true,
                'message' => 'OTP envoyé avec succès. Veuillez vérifier votre boîte de réception.',
            ], 200);
        }

        return response()->json([
            'status' => false,
            'message' => 'Échec de l\'envoi de l\'OTP : ' . __($otp['status']),
        ], 422);

        } catch (\Exception $error) {
            Log::error('OTP Error: ' . $error->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Une erreur s\'est produite : ' . $error->getMessage(),
            ], 500);
        }
}



    public function otpVerify(Request $request) {

        $request->validate([
            'email'    => ['required', 'string', 'email', 'max:255'],
            'code'     => ['required', 'string']
        ]);
    
        $otp = Otp::identifier($request->email)->attempt($request->code);
    
        if($otp['status'] != Otp::OTP_PROCESSED)
        {
            abort(403, __($otp['status']));
        }
    
        return $otp['result'];
    }

    // Connexion d'un utilisateur
    public function login(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(), [
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);
            if ($validateUser->fails()) {
                return response()->json(
                    [
                        'status' =>false,
                        'message' => 'La validation a échoué',
                        'errors' => $validateUser->errors(),
                    ], 422);
            }
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json(
                    [
                        'status' =>false,
                        'message' => 'Les informations de connexion sont incorrectes.',
                    ], 401);
            }
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json(
                [
                    'status' =>true,
                    'message' => 'Connexion réussie',
                    'token' => $token,
                    'user' => $user,
                ]
            ,200);
        }
        catch (\Exception $error) {
                return response()->json(
                    [
                        'status' => false,
                        'message' => $error->getMessage()
                    ],422);
            }
    }

    // Déconnexion
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Déconnexion réussie.']);
    }
}
