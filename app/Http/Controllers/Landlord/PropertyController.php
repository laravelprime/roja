<?php

namespace App\Http\Controllers\Landlord;

use App\Http\Controllers\Controller;
use App\Http\Requests\Landlord\StorePropertyRequest;
use App\Models\Property;
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
        return inertia('properties/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePropertyRequest $request)
    {
        $validated = $request->validated();

        // Create a new Property object
        $property = new Property();

        $property->user_id = auth()->id();
        $property->title = $validated['title'];
        $property->short_desc = $validated['short_desc'];
        $property->description = $validated['description'] ?? '';
        $property->city = $validated['city'];
        $property->neighbourhood = $validated['neighbourhood'];
        $property->type = $validated['type'];
        $property->rent = $validated['rent'];
        $property->deposit = $validated['deposit'] ?? 0;
        $property->suitable_for = $validated['suitable_for'];
        $property->availability_date = $validated['availability_date'];
        $property->status = $validated['status'];
        $property->contact_number = $validated['contact_number'];

        $property->save();        

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
