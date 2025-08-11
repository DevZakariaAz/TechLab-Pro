<?php

namespace Database\Seeders;

use App\Models\Pkg_Lab\Prerequisite;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PrerequisiteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Prerequisite::create([
            'id' => 1,
            'name' => 'Formation en Sécurité',
            'description' => 'Avoir suivi une formation sur les règles de sécurité en laboratoire.',
        ]);

        Prerequisite::create([
            'id' => 2,
            'name' => 'Connaissances en Chimie',
            'description' => 'Maîtriser les bases de la chimie générale et organique.',
        ]);

        Prerequisite::create([
            'id' => 3,
            'name' => 'Utilisation du Matériel de Laboratoire',
            'description' => 'Savoir manipuler les instruments de mesure et d’analyse.',
        ]);

        Prerequisite::create([
            'id' => 4,
            'name' => 'Notions de Microbiologie',
            'description' => 'Comprendre les principes de manipulation des micro-organismes.',
        ]);

        Prerequisite::create([
            'id' => 5,
            'name' => 'Respect des Protocoles',
            'description' => 'Être capable de suivre rigoureusement les procédures expérimentales.',
        ]);
    }
}
