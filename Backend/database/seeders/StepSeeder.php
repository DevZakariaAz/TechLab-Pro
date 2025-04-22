<?php

namespace Database\Seeders;

use App\Models\Pkg_Lab\Step;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StepSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $step1 = Step::create([
            'id' => 1,
            'title' => 'Préparation des échantillons',
            'reactive' => 'Solution saline',
            'duration' => 15,
            'description' => 'Préparer les échantillons à analyser en utilisant une solution saline stérile.',
        ]);

        $step2 = Step::create([
            'id' => 2,
            'title' => 'Mélange des réactifs',
            'reactive' => 'Réactif X',
            'duration' => 10,
            'description' => 'Mélanger soigneusement le réactif X avec les échantillons préparés.',
        ]);

        $step3 = Step::create([
            'id' => 3,
            'title' => 'Incubation',
            'reactive' => 'Aucun',
            'duration' => 8,
            'description' => 'Laisser les échantillons incuber à 37°C pendant 30 minutes.',
        ]);

        $step4 = Step::create([
            'id' => 4,
            'title' => 'Ajout de l’indicateur',
            'reactive' => 'Indicateur de pH',
            'duration' => 5,
            'description' => 'Ajouter quelques gouttes d’indicateur de pH pour observer les changements.',
        ]);

        $step5 = Step::create([
            'id' => 5,
            'title' => 'Analyse des résultats',
            'reactive' => 'Aucun',
            'duration' => 4,
            'description' => 'Observer et noter les résultats obtenus après l’ajout de l’indicateur.',
        ]);



        // Attaching tips to steps


        $step1->tips()->attach([
            1 => ['duration' => 5,],
            2 => ['duration' => 3,],
            3 => ['duration' => 7,],
        ]);
        $step2->tips()->attach([
            2 => ['duration' => 3,],
            3 => ['duration' => 3,],
            4 => ['duration' => 4,],
        ]);
        $step3->tips()->attach([
            1 => ['duration' => 1,],
            4 => ['duration' => 2,],
            3 => ['duration' => 3,],
        ]);
        $step4->tips()->attach([
            2 => ['duration' => 1,],
            5 => ['duration' => 1,],
            3 => ['duration' => 2,],
        ]);
        $step5->tips()->attach([
            5 => ['duration' => 1,],
            2 => ['duration' => 1,],
            4 => ['duration' => 2,],
        ]);
    }
}
