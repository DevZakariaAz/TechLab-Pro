<?php

namespace Database\Seeders;

use App\Models\Pkg_Lab\Tip;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tip::create([
            'id' => 1,
            'tip' => 'Porter des équipements de protection',
            'description' => 'Toujours utiliser des gants, une blouse et des lunettes de protection avant toute manipulation.',
        ]);

        Tip::create([
            'id' => 2,
            'tip' => 'Étiqueter les produits',
            'description' => 'Indiquer clairement le contenu et la date de préparation sur chaque récipient.',
        ]);

        Tip::create([
            'id' => 3,
            'tip' => 'Travailler en milieu ventilé',
            'description' => 'Effectuer les expériences dans une hotte pour éviter l’inhalation de produits dangereux.',
        ]);

        Tip::create([
            'id' => 4,
            'tip' => 'Ne jamais pipeter à la bouche',
            'description' => 'Utiliser toujours un dispositif mécanique pour pipeter des liquides.',
        ]);

        Tip::create([
            'id' => 5,
            'tip' => 'Éliminer correctement les déchets',
            'description' => 'Séparer les déchets chimiques, biologiques et tranchants selon les procédures en vigueur.',
        ]);
    }
}
