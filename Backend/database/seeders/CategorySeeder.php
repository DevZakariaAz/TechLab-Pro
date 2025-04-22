<?php

namespace Database\Seeders;

use App\Models\Pkg_Lab\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'id' => 1,
            'name' => 'Analyse Chimique',
            'description' => 'Tests en laboratoire pour analyser des substances chimiques.',
        ]);

        Category::create([
            'id' => 2,
            'name' => 'Microbiologie',
            'description' => 'Étude des micro-organismes en laboratoire.',
        ]);

        Category::create([
            'id' => 3,
            'name' => 'Biotechnologie',
            'description' => 'Techniques combinant biologie et technologie en laboratoire.',
        ]);

        Category::create([
            'id' => 4,
            'name' => 'Expériences de Physique',
            'description' => 'Travaux de laboratoire sur des principes et phénomènes physiques.',
        ]);

        Category::create([
            'id' => 5,
            'name' => 'Tests Environnementaux',
            'description' => 'Analyse d’échantillons environnementaux en laboratoire.',
        ]);
    }
}
