<?php

namespace App\Http\Controllers\My;

use App\Http\Controllers\Controller;
use App\Http\Requests\Landlord\StorePropertyRequest;
use App\Models\Property;
use App\Models\PropertyFeature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('my/properties/index', [
            'properties' => Auth::user()
                ->properties()
                ->with(['media', 'features'])
                ->orderBy('created_at', 'desc')
                ->paginate(10)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('my/properties/create', [
            'featuresList' => PropertyFeature::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePropertyRequest $request)
    {
        $validated = $request->validated();

        try {
            // Save Property Details
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
            $property->status = $validated['rental_status'];
            $property->cell_number = $validated['cell_number'];
            $property->whatsapp_number = $validated['cell_number'];

            $property->save();  
            
            // Save Property Features
            if (!empty($validated['features'])) {
                foreach ($validated['features'] as $feature) {
                    $propertyFeature = new PropertyFeature();
                    $propertyFeature->property_id = $property->id;
                    $propertyFeature->feature = $feature;
                    $propertyFeature->save();
                }
            }

            // Save Property Images
            if (!empty($validated['imageIds'])) {
                foreach ($validated['imageIds'] as $imageId) {
                    $image = collect(\File::files(storage_path('app/private/tmp-files/' . $imageId['serverId'])))->first();
                    $property->addMedia(storage_path('app/private/tmp-files/' . $imageId['serverId'] . '/' . $image->getFilename()))
                        ->toMediaCollection('property_images');
                    rmdir(storage_path('app/private/tmp-files/' . $imageId['serverId']));
                }
            }

            return redirect()->route('my.properties.index')
                ->with('success', 'Property listed successfully!');
        } catch (\Exception $e) {
            // Log the error
            Log::error('Property creation failed: ' . $e->getMessage());

            // Return error response
            return redirect()->back()
                ->withInput()
                ->withErrors(['property_creation_error' => 'Failed to create property. Please try again.']);
                return redirect()->back();
        }
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
