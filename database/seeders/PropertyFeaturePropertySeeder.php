<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PropertyFeaturePropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $properties = \App\Models\Property::all();
        $features = \App\Models\PropertyFeature::all();

        foreach ($properties as $property) {
            $assignedFeatures = $features->random(rand(3, $features->count()))->pluck('id')->toArray();
            $property->features()->sync($assignedFeatures);
        }
    }
}
