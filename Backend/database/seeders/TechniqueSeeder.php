<?php

namespace Database\Seeders;

use App\Models\Pkg_Lab\Technique;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TechniqueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $technique = Technique::create([
            'id' => 1,
            'title' => 'Analyse Chimique de l\'eau',
            'image' => 'analyse_chimique.jpg',
            'description' => 'Analyse de la composition chimique de l\'eau en laboratoire.',
            'laboratory_id' => 1,
            'category_id' => 2,
        ]);

        Technique::create([
            'id' => 2,
            'title' => 'Culture de Bactéries',
            'image' => 'culture_bacteries.jpg',
            'description' => 'Étude de la culture de bactéries en milieu contrôlé.',
            'laboratory_id' => 1,
            'category_id' => 3,
        ]);

        Technique::create([
            'id' => 3,
            'title' => 'Test de Résistance des Matériaux',
            'image' => 'test_resistance.jpg',
            'description' => 'Test de résistance des matériaux sous différentes conditions.',
            'laboratory_id' => 1,
            'category_id' => 5,
        ]);

        Technique::create([
            'id' => 4,
            'title' => 'Analyse du Sol',
            'image' => 'analyse_sol.jpg',
            'description' => 'Étude de la composition du sol et de ses propriétés physiques.',
            'laboratory_id' => 1,
            'category_id' => 1,
        ]);

        Technique::create([
            'id' => 5,
            'title' => 'Observation Microscopique',
            'image' => 'observation_microscope.jpg',
            'description' => 'Observation de microorganismes au microscope.',
            'laboratory_id' => 1,
            'category_id' => 4,
        ]);

        $technique->prerequisites()->attach([1]);
        $technique->steps()->attach([1,2,3,4,5]);
        $technique->favoredByUsers()->attach([1,2]);
        $technique->users()->attach([2]);

    }
}
