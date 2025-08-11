<?php

namespace Database\Seeders;

use App\Models\Pkg_Quiz\Question;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Question::create([
            'id' => 1,
            'question' => 'Quelle est la formule chimique de l\'eau ?',
            'quiz_id' => 1, 
        ]);

        Question::create([
            'id' => 2,
            'question' => 'Qui est le père de la théorie de l\'évolution ?',
            'quiz_id' => 2, 
        ]);

        Question::create([
            'id' => 3,
            'question' => 'Quelle loi physique décrit la relation entre la force et l\'accélération ?',
            'quiz_id' => 3, 
        ]);

        Question::create([
            'id' => 4,
            'question' => 'Quel est le produit de 5 x 7 ?',
            'quiz_id' => 4, 
        ]);

        Question::create([
            'id' => 5,
            'question' => 'Quel est le nom du micro-organisme responsable de la tuberculose ?',
            'quiz_id' => 5, 
        ]);

    }
}
