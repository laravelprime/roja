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
        $users = User::factory()->count(10)->create([
            'role' => 'user',
        ]);   
        
        $properties = Property::factory()
            ->count(100)
            ->recycle($users)
            ->create();

        foreach ($properties as $property) {
            if($property->type = 'house'){
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
            $property->featured_image_id = $property->getFirstMedia('property_images')->id;
            $property->save();
        }
    }
}



        

        