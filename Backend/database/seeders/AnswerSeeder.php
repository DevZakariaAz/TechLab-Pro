<?php

namespace Database\Seeders;

use App\Models\Pkg_Quiz\Answer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AnswerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Answer::create([
            'id' => 1,
            'answer' => 'H2O',
        ]);

        Answer::create([
            'id' => 2,
            'answer' => 'Charles Darwin',
        ]);

        Answer::create([
            'id' => 3,
            'answer' => 'Loi de Newton',
        ]);

        Answer::create([
            'id' => 4,
            'answer' => '35',
        ]);

        Answer::create([
            'id' => 5,
            'answer' => 'Mycobacterium tuberculosis',
        ]);

        Answer::create([
            'id' => 6,
            'answer' => 'NaCl',
        ]);

        Answer::create([
            'id' => 7,
            'answer' => 'Galileo Galilei',
        ]);

        Answer::create([
            'id' => 8,
            'answer' => 'Loi de la gravitation universelle',
        ]);

        Answer::create([
            'id' => 9,
            'answer' => '40',
        ]);

        Answer::create([
            'id' => 10,
            'answer' => 'E. coli',
        ]);
    }
}
