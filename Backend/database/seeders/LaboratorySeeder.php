<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Pkg_Lab\Laboratory;

class LaboratorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Laboratory::create([
            'id' => 1,
            'title' => 'Chemistry Lab',
            'image' => 'chemistry_lab.jpg',
            'description' => 'Chemical reactions and experiments with safety.',
        ]);
    }
}
