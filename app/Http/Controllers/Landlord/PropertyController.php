<?php

namespace App\Http\Controllers\Landlord;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('properties/index', [
            'properties' => [],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'short_desc' => 'required|string|max:500',
            'description' => 'nullable|string|max:2000',
            'city' => 'required|string|max:100',
            'neighbourhood' => 'required|string|max:100',
            'type' => 'required|string|in:room,house',
            'rent' => 'required|numeric|min:0',
            'deposit' => 'required|numeric|min:0',
            'suitable_for' => 'required|string|max:100',
            'availability_date' => ['required', 'string', function ($attribute, $value, $fail) {
                // Allow "Now" (case-insensitive)
                if (strtolower(trim($value)) === 'now') {
                    return;
                }

                // Validate DD/MM/YYYY format
                if (!preg_match('/^\d{2}\/\d{2}\/\d{4}$/', $value)) {
                    $fail('The availability date must be either "Now" or in DD/MM/YYYY format (e.g., 15/08/2025).');
                    return;
                }

                // Try to parse as date with specific format
                try {
                    $date = \Carbon\Carbon::createFromFormat('d/m/Y', $value)->setTime(0, 0, 0)->setTimezone('UTC');
                    
                    // Check if the parsed date matches the input (catches invalid dates like 32/13/2025)
                    if ($date->format('d/m/Y') !== $value) {
                        $fail('The availability date is not a valid date.');
                        return;
                    }
                    
                    // Check if date is in the future or today
                    if ($date->isPast() && !$date->isToday()) {
                        $fail('The availability date must be today or a future date.');
                    }
                } catch (\Exception $e) {
                    $fail('The availability date must be either "Now" or a valid date in DD/MM/YYYY format.');
                }
            }],
            'status' => 'required|string|in:available,rented',
            'contact_number' => 'required|string|max:20',
            'features' => 'nullable|array',
            'features.*' => 'nullable|string|max:20',
            'imageIds' => 'required|array|min:4',
            'imageIds.*.id' => 'required|string',
            'imageIds.*.serverId' => ['required', 'string', function ($attribute, $value, $fail) {
                $tempFilePath = storage_path('app/private/tmp-files/' . $value);
                if (!file_exists($tempFilePath)) {
                    $fail('The uploaded image file does not exist or has expired.');
                }
            }]
        ]);

        dd($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
