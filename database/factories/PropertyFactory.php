<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    // Harare neighborhoods
    private $harareNeighbourhoods = [
        'Avondale', 'Borrowdale', 'Mount Pleasant', 'Highlands', 'Newlands',
        'Marlborough', 'Chisipite', 'Gunhill', 'Greystone Park', 'Eastlea',
        'Belvedere', 'Waterfalls', 'Chitungwiza', 'Kuwadzana', 'Budiriro',
        'Glen View', 'Mbare', 'Highfield', 'Harare South', 'Dzivarasekwa'
    ];

    private $houseTitles = [
        '3 Bedroom House with Garden',
        '4 Bedroom Family Home',
        '2 Bedroom Cottage',
        'Spacious 5 Bedroom House',
        'Modern 3 Bedroom House',
        'Executive 4 Bedroom Home',
        'Cozy 2 Bedroom House',
        'Luxury 3 Bedroom Villa'
    ];

    private $roomTitles = [
        'Single Room to Let',
        'Spacious Room with Kitchenette',
        'Furnished Room for Professionals',
        'Bachelor Room with Bathroom',
        'Student Room Near Campus',
        'Room in Shared House',
        'Self-Contained Room',
        'Room with Private Entrance'
    ];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = $this->faker->randomElement(['house', 'room']);
        $neighbourhood = $this->faker->randomElement($this->harareNeighbourhoods);
        $title = $type === 'house' 
            ? $this->faker->randomElement($this->houseTitles)
            : $this->faker->randomElement($this->roomTitles);
        
        $rent = $type === 'house' 
            ? $this->faker->numberBetween(200, 1000)
            : $this->faker->numberBetween(50, 350);
        
        $deposit = $this->faker->numberBetween(
            (int)($rent * 0.5), 
            $rent
        );

        // Generate availability date
        $availabilityDate = $this->faker->randomElement([
            'Now',
            $this->faker->dateTimeBetween('now', '+90 days')->format('d/m/Y')
        ]);

        return [
            'user_id' => User::factory(),
            'title' => $title,
            'short_desc' => $title . ' in ' . $neighbourhood,
            'description' => $this->faker->paragraph(3) . ' Located in ' . $neighbourhood . '. Perfect for ' . $this->faker->randomElement(['professionals', 'families', 'students', 'couples']) . '. Close to amenities and transport.',
            'city' => 'Harare',
            'neighbourhood' => $neighbourhood,
            'type' => $type,
            'rent' => $rent,
            'deposit' => $deposit,
            'suitable_for' => $this->faker->randomElement([
                'Single Professional', 'Couple', 'Family', 'Students', 
                'Working Professional', 'Small Family', 'Anyone'
            ]),
            'availability_date' => $availabilityDate,
            'status' => $this->faker->randomElement(['available', 'available', 'available', 'available', 'rented']), // 80% available
            'contact_number' => '+263 ' . $this->faker->randomElement(['77', '71', '78', '73']) . ' ' . $this->faker->numerify('### ####'),
            'created_at' => $this->faker->dateTimeBetween('-30 days', 'now'),
            'updated_at' => now(),
        ];
    }
}
