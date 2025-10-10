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
            'image' => 'https://images.pexels.com/photos/9629678/pexels-photo-9629678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            'description' => 'Analyse de la composition chimique de l\'eau en laboratoire.',
            'laboratory_id' => 1,
            'category_id' => 2,
        ]);

        Technique::create([
            'id' => 2,
            'title' => 'Culture de Bactéries',
            'image' => 'https://images.pexels.com/photos/4031440/pexels-photo-4031440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            'description' => 'Étude de la culture de bactéries en milieu contrôlé.',
            'laboratory_id' => 1,
            'category_id' => 3,
        ]);

        Technique::create([
            'id' => 3,
            'title' => 'Test de Résistance des Matériaux',
            'image' => 'http://images.pexels.com/photos/9629715/pexels-photo-9629715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            'description' => 'Test de résistance des matériaux sous différentes conditions.',
            'laboratory_id' => 1,
            'category_id' => 5,
        ]);

        Technique::create([
            'id' => 4,
            'title' => 'Analyse du Sol',
            'image' => 'https://images.pexels.com/photos/4031370/pexels-photo-4031370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            'description' => 'Étude de la composition du sol et de ses propriétés physiques.',
            'laboratory_id' => 1,
            'category_id' => 1,
        ]);

        Technique::create([
            'id' => 5,
            'title' => 'Observation Microscopique',
            'image' => 'https://images.pexels.com/photos/8539945/pexels-photo-8539945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            'description' => 'Observation de microorganismes au microscope.',
            'laboratory_id' => 1,
            'category_id' => 4,
        ]);
        // Attaching relationships to techniques is not soluttion
        //todo: fix this issue and make it work by another solution 
        $technique->prerequisites()->attach([1]);
        $technique->steps()->attach([1,2,3,4,5]);
        $technique->favoredByUsers()->attach([1,2]);
        $technique->users()->attach([2]);

    }
}
