<?php

namespace Database\Seeders;

use App\Models\Pkg_Quiz\Quiz;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Quiz::create([
            'id' => 1,
            'title' => 'Test de Chimie - Niveaux 1',
            'description' => 'Un test sur les concepts de base de la chimie.',
        ]);

        Quiz::create([
            'id' => 2,
            'title' => 'Évaluation en Biologie',
            'description' => 'Un quiz sur les bases de la biologie et la classification des organismes.',
        ]);

        Quiz::create([
            'id' => 3,
            'title' => 'Test de Physique - Mécanique',
            'description' => 'Examen sur les lois de la mécanique et des forces.',
        ]);

        Quiz::create([
            'id' => 4,
            'title' => 'Révision sur les Mathématiques',
            'description' => 'Un quiz pour réviser les concepts de base en mathématiques.',
        ]);

        Quiz::create([
            'id' => 5,
            'title' => 'Quiz sur la Microbiologie',
            'description' => 'Évaluation sur la compréhension des microorganismes et de leurs processus.',
        ]);

    }
}
