<?php

namespace App\Otp;

use SadiqSalau\LaravelOtp\Contracts\OtpInterface as Otp;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Hash;

class UserRegistrationOtp implements Otp
{
    /**
     * Initiates the OTP with user details
     *
     * @param string $name
     * @param string $email
     * @param string $password
     */
    public function __construct(
        protected string $name,
        protected string $email,
        protected string $password
    ) {
    }

    /**
     * Specify the notification channels (e.g., mail)
     *
     * @param mixed $notifiable
     * @return array
     */
    public function via($notifiable): array
    {
        return ['mail'];
    }

    /**
     * Define the email content for the OTP
     *
     * @param mixed $notifiable
     * @return MailMessage
     */
    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Your OTP Code')
            ->line('Your one-time password (OTP) for registration is: **' . $notifiable->otp_code . '**')
            ->line('This code will expire in ' . config('otp.expires', 10) . ' minutes.')
            ->line('If you did not request this, please ignore this email.');
    }

    /**
     * Convert OTP data to array for storage (optional)
     *
     * @return array
     */
    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'password' => $this->password,
        ];
    }

    /**
     * Creates the user after OTP verification
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function process()
    {
        /** @var User */
        $user = User::unguarded(function () {
            return User::create([
                'name' => $this->name,
                'email' => $this->email,
                'password' => Hash::make($this->password),
                'email_verified_at' => now(),
            ]);
        });

        event(new Registered($user)); // Trigger Laravel's Registered event

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Utilisateur créé avec succès',
            'token' => $token,
            'user' => $user,
        ], 200);
    }
}