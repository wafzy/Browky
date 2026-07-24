<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductImageController extends Controller
{
    public function destroy(ProductImage $image)
    {
        Storage::disk('public')->delete($image->image_path);
        
        $product = $image->product;
        $wasPrimary = $image->is_primary;
        
        $image->delete();

        // If the deleted image was primary, set another one as primary
        if ($wasPrimary && $product->images()->count() > 0) {
            $firstImage = $product->images()->first();
            $firstImage->update(['is_primary' => true]);
        }

        return back()->with('success', 'Gambar berhasil dihapus.');
    }

    public function setPrimary(ProductImage $image)
    {
        $product = $image->product;

        // Reset all images to not primary
        $product->images()->update(['is_primary' => false]);

        // Set the selected one to primary
        $image->update(['is_primary' => true]);

        return back()->with('success', 'Gambar utama berhasil diubah.');
    }
}
