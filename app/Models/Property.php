<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Property extends Model implements HasMedia
{
    use InteractsWithMedia;

    /**
     * Has many relationship with PropertyFeature.
     */
    public function features()
    {
        return $this->hasMany(PropertyFeature::class); 
    }
}
