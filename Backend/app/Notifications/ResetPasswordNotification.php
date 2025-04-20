<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    public $code;

    public function __construct($code)
    {
        $this->code = $code;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('TechLab Pro - Your Password Reset Code')
            ->greeting('Hello!')
            ->line('You are receiving this email because we received a password reset request for your TechLab Pro account.')
            ->line('Your password reset code is:')
            ->line('<h1 style="text-align: center; font-size: 40px; letter-spacing: 5px;">' . $this->code . '</h1>')
            ->line('This code will expire in 60 minutes for security reasons.')
            ->line('If you did not request a password reset, please ignore this email.')
            ->salutation('Best regards,\nThe TechLab Pro Team');
    }
}
