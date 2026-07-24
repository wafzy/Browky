<?php

namespace App\Http\Controllers;

abstract class Controller
{
    /**
     * Upload, resize, compress and convert an image to WebP.
     *
     * @param \Illuminate\Http\UploadedFile $file The uploaded file object
     * @param string $folder Destination folder inside public disk (e.g. 'products', 'porters')
     * @param int $maxWidth Maximum width of the image (default 1000)
     * @param int $quality Compression quality (default 80)
     * @return string The relative path of the saved file (e.g. 'products/filename.webp')
     */
    protected function uploadAndOptimizeImage(\Illuminate\Http\UploadedFile $file, string $folder, int $maxWidth = 1000, int $quality = 80): string
    {
        // 1. Initialize Intervention Image Manager with GD driver
        $manager = new \Intervention\Image\ImageManager(new \Intervention\Image\Drivers\Gd\Driver());
        
        // 2. Read the uploaded file
        $image = $manager->read($file);
        
        // 3. Scale down the image if it exceeds $maxWidth (maintaining aspect ratio)
        $image->scale(width: $maxWidth);
        
        // 4. Encode as WebP with the given quality
        $encoded = $image->toWebp($quality);
        
        // 5. Generate unique filename with .webp extension
        $filename = uniqid($folder . '_') . '_' . time() . '.webp';
        $path = $folder . '/' . $filename;
        
        // 6. Save using Laravel Storage on the 'public' disk
        \Illuminate\Support\Facades\Storage::disk('public')->put($path, (string) $encoded);
        
        return $path;
    }
}
