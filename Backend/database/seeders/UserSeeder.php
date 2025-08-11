<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $technicianRole = Role::where('name', 'technician')->first();
        $technician = User::create([
            'id' => 2,
            'name' => 'Aymen CHABBEH',
            'email' => 'Aymen@chabbeh.com',
            'laboratory_id' => 1,
            'password' => bcrypt('123456'),
        ]);
        $technician->assignRole($technicianRole);

    }
}
