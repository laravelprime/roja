<?php

namespace Database\Seeders;

use App\Models\Property;
use App\Models\PropertyFeature;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $landlords = User::factory()->count(10)->create([
            'role' => 'landlord',
        ]);   
        
        $properties = Property::factory()
            ->count(100)
            ->recycle($landlords)
            ->create();

        foreach ($properties as $property) {
            if($property->type = 'house'){
                PropertyFeature::factory()
                    ->count(rand(4, 16))
                    ->houseFeature()
                    ->create([
                        'property_id' => $property->id,
                    ]);

                // Copy house images and assign to property using spatie
                $houses_path = 'C:\Users\comfo\Documents\Web Dev\LARAVEL PRIME\roja test assets\houses';
                $images = collect(scandir($houses_path))
                    ->filter(fn($file) => !in_array($file, ['.', '..']) && is_file($houses_path . '/' . $file))
                    ->shuffle()
                    ->take(rand(4, 8));

                foreach ($images as $image) {
                    $property->addMedia($houses_path . '/' . $image)
                        ->preservingOriginal()
                        ->toMediaCollection('property_images');
                }
            } else {
                PropertyFeature::factory()
                    ->count(rand(4, 16))
                    ->roomFeature()
                    ->create([
                        'property_id' => $property->id,
                    ]);

                // Copy room images and assign to property using spatie
                $rooms_path = 'C:\Users\comfo\Documents\Web Dev\LARAVEL PRIME\roja test assets\rooms';

                $images = collect(scandir($rooms_path))
                    ->filter(fn($file) => !in_array($file, ['.', '..']) && is_file($rooms_path . '/' . $file))
                    ->shuffle()
                    ->take(rand(4, 8));
                
                foreach ($images as $image) {
                    $property->addMedia($rooms_path . '/' . $image)
                        ->preservingOriginal()
                        ->toMediaCollection('property_images');
                }
            }
        }
    }
}



        

        