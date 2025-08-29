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

        Laboratory::create([
            'id' => 2,
            'title' => 'Biology Lab',
            'image' => 'biology_lab.jpg',
            'description' => 'Study of living organisms and biological processes.',
        ]);
        Laboratory::create([
            'id' => 3,
            'title' => 'Physics Lab',
            'image' => 'physics_lab.jpg',
            'description' => 'Experiments in mechanics, optics, and electromagnetism.',
        ]);
    }
}
