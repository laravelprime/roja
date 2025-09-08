<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PropertyFeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $propertyFeatures = [
            'Wi-Fi',
            'Parking Space',
            'Tiled Floors', 
            'Fitted Cupboards',
            'Fitted Wardrobes',
            'Fenced/Durawalled',
            'Borehole and Tank',
            'Solar Backup',
            'Shared Kitchen',
            'Shared Bathroom',
            'DSTV Ready',
            'Ceiling',

        ];

        foreach ($propertyFeatures as $feature) {
            \App\Models\PropertyFeature::create(['name' => $feature]);
        }
    }
}
