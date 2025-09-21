<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Property extends Model implements HasMedia
{
    use InteractsWithMedia, HasFactory;

    /**
     * Has many relationship with PropertyFeature.
     */
    public function features()
    {
        return $this->belongsToMany(PropertyFeature::class, 'property_feature_properties'); 
    }

    public function featuredImage()
    {
        return $this->belongsTo(Media::class, 'featured_image_id');
    }
}
