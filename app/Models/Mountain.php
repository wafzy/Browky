<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mountain extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'location',
        'elevation',
        'description',
        'image',
        'image_1',
        'image_2',
        'image_3',
        'image_4',
        'image_5',
    ];
}
