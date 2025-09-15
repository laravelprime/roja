<?php

namespace App\Http\Controllers\My;

use App\Http\Controllers\Controller;
use App\Http\Requests\My\StorePropertyRequest;
use App\Http\Requests\My\UpdatePropertyRequest;
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

            $property->user_id = Auth::user()->id;
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
            $property->rental_status = $validated['rental_status'];
            $property->cell_number = $validated['cell_number'];
            $property->whatsapp_number = $validated['cell_number'];

            $property->save();

            $property->features()->sync($validated['features'] ?? []);

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
                ->with('error', 'Failed to create property. Please try again.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Property $property)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Property $property)
    {
        // Ensure the property belongs to the authenticated user
        if ($property->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        return inertia('my/properties/edit', [
            'property' => $property->load(['media', 'features']),
            'featuresList' => PropertyFeature::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePropertyRequest $request, Property $property)
    {
        // Ensure the property belongs to the authenticated user
        if ($property->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validated();

        try {
            // Update Property Details
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
            $property->rental_status = $validated['rental_status'];
            $property->cell_number = $validated['cell_number'];
            $property->whatsapp_number = $validated['whatsapp_number'];

            $property->features()->sync($validated['features'] ?? []);

            $property->save();

            // Save New Property Images
            if (!empty($validated['newImageIds'])) {
                foreach ($validated['newImageIds'] as $imageId) {
                    $image = collect(\File::files(storage_path('app/private/tmp-files/' . $imageId['serverId'])))->first();
                    $property->addMedia(storage_path('app/private/tmp-files/' . $imageId['serverId'] . '/' . $image->getFilename()))
                        ->toMediaCollection('property_images');
                    rmdir(storage_path('app/private/tmp-files/' . $imageId['serverId']));
                }
            }

            return redirect()->back()->with('success', 'Property updated successfully!');
        } catch (\Exception $e) {
            // Log the error
            Log::error('Property update failed: ' . $e->getMessage());

            // Return error response
            return redirect()->back()
                ->withInput()
                ->with(['error' => 'Failed to update property. Please try again.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Property $property)
    {
        // Ensure the property belongs to the authenticated user
        if ($property->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        try {
            // Delete all media associated with the property
            $property->clearMediaCollection('property_images');

            // Delete the property itself
            $property->delete();

            return redirect()->route('my.properties.index')
                ->with('success', 'Property deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Failed to delete property: ' . $e->getMessage());

            return redirect()->back()
                ->with(['error' => 'Failed to delete property. Please try again.']);
        }
    }

    /**
     * Remove the specified media from storage.
     */
    public function destroyMedia(Property $property, $mediaId){
        // Ensure the property belongs to the authenticated user
        if ($property->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        if(!filter_var($mediaId, FILTER_VALIDATE_INT)){
            return redirect()->back()->with(['error' => 'Invalid image ID.']);
        }

        $castedMediaId = (int)$mediaId;

        // Validate that the mediaId refers to media that exists belongs to the property
        if($property->media()->where('id', $castedMediaId)->count() === 0){
            return redirect()->back()->with(['error' => 'Image not found.']);
        }

        if($property->featured_image_id === $castedMediaId){
            return redirect()->back()->with(['error' => 'Cannot delete the featured image. Please set another image as featured before deleting this one.']);
        }

        $mediaItem = $property->media()->where('id', $mediaId)->first();

        try {
            $mediaItem->delete();

            return redirect()->back()->with('success', 'Image item deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Failed to delete media item: ' . $e->getMessage());

            return redirect()->back()->with(['error' => 'Failed to delete image. Please try again.']);
        }
    }

    /**
     * Set the specified media as featured image.
     */
    public function setFeaturedImage(Property $property, $mediaId){
        // Ensure the property belongs to the authenticated user
        if ($property->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $mediaItem = $property->media()->where('id', $mediaId)->first();
        if (!$mediaItem) {
            return redirect()->back()->with(['error' => 'Image not found.']);
        }

        try {
            $property->featured_image_id = $mediaItem->id;
            $property->save();

            return redirect()->back()->with('success', 'Featured image updated successfully.');
        } catch (\Exception $e) {
            Log::error('Failed to set featured image: ' . $e->getMessage());

            return redirect()->back()->with(['error' => 'Failed to set featured image. Please try again.']);
        }
    }
}
