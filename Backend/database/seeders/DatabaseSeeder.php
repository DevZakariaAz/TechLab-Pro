<?php

namespace Database\Seeders;

use App\Models\Pkg_Lab\Prerequisite;
use App\Models\Pkg_Lab\Step;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call(
            [
                LaboratorySeeder::class,
                RolesSeeder::class,
                UserSeeder::class,
                CategorySeeder::class,
                PrerequisiteSeeder::class,
                TipSeeder::class,
                StepSeeder::class,
                TechniqueSeeder::class,
                QuizSeeder::class,
                QuestionSeeder::class,
                AnswerSeeder::class,
            ]);
    }
}
