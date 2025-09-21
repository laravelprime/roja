<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\PropertyFeature;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $request->validate([
            'propertyType'   => 'array',
            'propertyType.*' => 'string|max:255',
            'city'           => 'nullable|string|max:255',
            'neighbourhood'  => 'nullable|string|max:255',
            'priceRange'     => 'array|size:2',
            'priceRange.*'   => 'numeric|min:0',
            'depositRange'   => 'array|size:2',
            'depositRange.*' => 'numeric|min:0',
            'features'       => 'array',
            'features.*'     => 'string|max:255',
            'sortBy'         => 'string|in:rent_low_to_high,rent_high_to_low,date_posted_newest,date_posted_oldest,neighbourhood_az,neighbourhood_za',
        ]);

        $filters = $request->only([
            'propertyType',
            'city',
            'neighbourhood',
            'priceRange',
            'depositRange',
            'features',
            'sortBy'
        ]);

        $query = Property::with(['media', 'features', 'featuredImage']);

        if (!empty($filters['propertyType'])) {
            $query->whereIn('type', $filters['propertyType']);
        }

        if (!empty($filters['city'])) {
            $query->where('city', $filters['city']);
        }

        if (!empty($filters['neighbourhood'])) {
            $query->where('neighbourhood', $filters['neighbourhood']);
        }

        if (!empty($filters['priceRange'])) {
            [$minPrice, $maxPrice] = $filters['priceRange'];
            $query->whereBetween('rent', [$minPrice, $maxPrice]);
        }

        if (!empty($filters['depositRange'])) {
            [$minDeposit, $maxDeposit] = $filters['depositRange'];
            $query->whereBetween('deposit', [$minDeposit, $maxDeposit]);
        }

        // if (!empty($filters['features'])) {
        //     $query->whereHas('features', function ($q) use ($filters) {
        //         $q->whereIn('feature', $filters['features']);
        //     });
        // }

        if (!empty($filters['sortBy'])) {
            switch ($filters['sortBy']) {
                case 'rent_low_to_high':
                    $query->orderBy('rent', 'asc');
                    break;
                case 'rent_high_to_low':
                    $query->orderBy('rent', 'desc');
                    break;
                case 'date_posted_newest':
                    $query->orderBy('created_at', 'desc');
                    break;
                case 'date_posted_oldest':
                    $query->orderBy('created_at', 'asc');
                    break;
                case 'neighbourhood_az':
                    $query->orderBy('neighbourhood', 'asc');
                    break;
                case 'neighbourhood_za':
                    $query->orderBy('neighbourhood', 'desc');
                    break;
            }
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $properties = $query->paginate(12);
       
        $propertyFeatures = PropertyFeature::all();
        
        return inertia('properties/index', [
            'properties' => $properties,
            'propertyFeatures' => $propertyFeatures,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return inertia('properties/show', [
            'property' => Property::with(['media', 'features'])->findOrFail($id),
        ]);
    }
    
    public function store(Request $request){
        
    }
}
