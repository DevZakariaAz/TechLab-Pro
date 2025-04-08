composer install
php artisan key:generate
composer require spatie/laravel-permission
php artisan vendor:publish--provider="Spatie\Permission\PermissionServiceProvider"
composer require laravel/sanctum
php artisan vendor:publish--provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate --seed
