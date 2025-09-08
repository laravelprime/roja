<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (!User::where('email', 'comfort@gmail.com')->exists()) {
            User::factory()->create([
                'name' => 'Comfort',
                'email' => 'comfort@gmail.com',
                'password' => bcrypt('password'),
                'role' => 'user',
                'cell_number' => '1234567890',
                'whatsapp_number' => '1234567890',
            ]);
        }
    }
}
