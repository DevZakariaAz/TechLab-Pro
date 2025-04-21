<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::create(['name' => 'admin']);
        $adminRole = Role::create(['name' => 'technician']);
        $admin = User::create([
            'id' => 1,
            'name' => 'Zakaria Azizi',
            'email' => 'zeko@azizi.com',
            'laboratory_id' => 1,
            'password' => bcrypt('123456'),
        ]);
        $admin->assignRole($adminRole);
    }
}
