<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'specifications',
        'price_per_day',
        'stock',
        'category',
        'brand',
        'special_badge',
        'cover_image',
    ];

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
}
