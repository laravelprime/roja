<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Property extends Model implements HasMedia
{
    use InteractsWithMedia, HasFactory;

    /**
     * Has many relationship with PropertyFeature.
     */
    public function features()
    {
        return $this->hasMany(PropertyFeature::class); 
    }
}
