composer install
php artisan key:generate
composer require spatie/laravel-permission
php artisan vendor:publish--provider="Spatie\Permission\PermissionServiceProvider"
composer require laravel/sanctum
php artisan vendor:publish--provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate --seed



// otp validation requires

composer require sadiqsalau/laravel-otp
php artisan vendor:publish --provider="SadiqSalau\LaravelOtp\OtpServiceProvider"
php artisan make:otp UserRegistrationOtp

//env configuration for mail verification sending

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=yahya.boussakla.solicode@gmail.com
MAIL_PASSWORD="quhc yfrj nhzz smxl"
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=yahya.boussakla.solicode@gmail.com
MAIL_FROM_NAME=laravelmailer

