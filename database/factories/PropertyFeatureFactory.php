<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PropertyFeature>
 */
class PropertyFeatureFactory extends Factory
{
    // Property features
    private $propertyFeatures = [
        'Wi-Fi', 'DSTV Ready', 'Parking', 'Security', 'Garden', 'Pool',
        'Borehole', 'Generator', 'Solar Power', 'Prepaid Electricity',
        'Water Tank', 'Servant Quarters', 'Alarm System', 'Electric Fence',
        'Tiled Floors', 'Built-in Cupboards', 'Air Conditioning', 'Fireplace',
        'Study Room', 'Dining Room', 'Garage', 'Carport', 'Balcony',
        'Paved Yard', 'Burglar Bars', 'Ceiling Fans', 'Kitchen Units'
    ];

    private $features = [];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Generate 3-8 random features
        $this->features = $this->faker->randomElements(
            $this->propertyFeatures, 
            $this->faker->numberBetween(3, 8)
        );

        return [
            'feature' => $this->faker->randomElement($this->features),
        ];
    }

    /**
     * Define house features.
     *
     * @return string
     */
    public function houseFeature()
    {
        $this->features = array_merge($this->features, ['Multiple Bedrooms', 'Living Room', 'Kitchen']);
        
        return $this->state(function (array $attributes) {
            return [
                'feature' => $this->faker->randomElement($this->propertyFeatures)
            ];
        });
    }

    /**
     * Define room features.
     *
     * @return string
     */
    public function roomFeature()
    {
        $this->features = array_merge($this->features, ['Shared Kitchen', 'Own Entrance']);
        
        return $this->state(function (array $attributes) {
            return [
                'feature' => $this->faker->randomElement($this->propertyFeatures)
            ];
        });
    } 
}
