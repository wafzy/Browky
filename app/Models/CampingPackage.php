<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CampingPackage extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'price',
        'description',
        'facilities',
        'tags',
        'image',
        'status',
        'special_badge',
    ];
}
