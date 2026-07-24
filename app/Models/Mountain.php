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
        'image'
    ];
}
