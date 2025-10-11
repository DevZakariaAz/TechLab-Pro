<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use App\Models\Pkg_Lab\Technique;
use App\Models\Pkg_Lab\Step;
use App\Models\Pkg_Lab\Tip;

class TechniqueJsonSeeder extends Seeder
{
    public function run(): void
    {
        $path = database_path('seeders/data/techniques.json');
        if (!File::exists($path)) {
            $this->command->error("File not found: {$path}");
            return;
        }

        $all = json_decode(File::get($path), true);
        DB::transaction(function () use ($all) {
            foreach ($all as $techData) {
                $stepsData = $techData['steps'] ?? [];
                unset($techData['steps']);

                // Create technique
                $technique = Technique::create([
                    'title' => $techData['title'],
                    'image' => $techData['image'] ?? 'default-technique.jpg', // 👈 default image
                    'description' => $techData['description'] ?? '',
                    'laboratory_id' => $techData['laboratory_id'] ?? 1,
                    'category_id' => $techData['category_id'] ?? 1,
                ]);

                $pivotRows = [];

                foreach ($stepsData as $index => $s) {
                    $tips = $s['tips'] ?? [];
                    unset($s['tips']);

                    // Create a new step (specific to this technique)
                    $step = Step::create([
                        'title' => $s['title'],
                        'reactive' => $s['reactive'] ?? null,
                        'duration' => $s['duration'] ?? 0,
                        'description' => $s['description'] ?? null,
                    ]);

                    $position = $s['position'] ?? ($index + 1);

                    $pivotRows[] = [
                        'step_id' => $step->id,
                        'technique_id' => $technique->id,
                        'position' => $position,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];

                    // Create tips specific to this step
                    foreach ($tips as $t) {
                        $tip = Tip::create([
                            'tip' => $t['tip'],
                            'description' => $t['description'] ?? null,
                        ]);

                        $step->tips()->attach($tip->id, ['duration' => $t['duration'] ?? null]);
                    }
                }

                if (!empty($pivotRows)) {
                    DB::table('step_technique')->insert($pivotRows);
                }
            }
        });
    }
}
