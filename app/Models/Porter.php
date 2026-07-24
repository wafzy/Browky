<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Porter extends Model
{
    /** @use HasFactory<\Database\Factories\PorterFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'category',
        'mountain',
        'price_per_day',
        'description',
        'image',
        'status',
        'special_badge',
    ];
}
