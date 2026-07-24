<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Porter;
use App\Models\Mountain;
use App\Models\CampingPackage;
use Inertia\Inertia;

class FrontendController extends Controller
{
    public function index()
    {
        $popularProducts = Product::take(12)->get(); // Fetch 12 popular products for filtering
        $categories = Product::select('category')->distinct()->pluck('category');
        $popularPorters = Porter::take(8)->get(); // Fetch 8 porters for filtering
        $porterCategories = Porter::select('category')->whereNotNull('category')->distinct()->pluck('category');
        $mountains = Mountain::orderBy('created_at', 'desc')->take(8)->get();
        $campingPackages = CampingPackage::where('status', 'Available')->orderBy('created_at', 'desc')->take(8)->get();
        
        return Inertia::render('Home', [
            'popularProducts' => $popularProducts,
            'categories' => $categories,
            'popularPorters' => $popularPorters,
            'porterCategories' => $porterCategories,
            'mountains' => $mountains,
            'campingPackages' => $campingPackages
        ]);
    }

    public function rental()
    {
        $products = Product::get();
        $categories = Product::select('category')->distinct()->pluck('category');
        return Inertia::render('Rental', [
            'products' => $products,
            'categories' => $categories
        ]);
    }

    public function product($slug)
    {
        $product = Product::with('images')->where('slug', $slug)->firstOrFail();
        $relatedProducts = Product::where('id', '!=', $product->id)->take(5)->get();
        return Inertia::render('ProductDetail', [
            'product' => $product,
            'relatedProducts' => $relatedProducts
        ]);
    }

    public function porter()
    {
        $porters = Porter::all();
        $porterCategories = Porter::select('category')->whereNotNull('category')->distinct()->pluck('category');
        return Inertia::render('Porter', [
            'porters' => $porters,
            'porterCategories' => $porterCategories
        ]);
    }
    
    public function porterDetail($slug)
    {
        $porter = Porter::where('slug', $slug)->firstOrFail();
        $relatedPorters = Porter::where('id', '!=', $porter->id)->take(5)->get();
        return Inertia::render('PorterDetail', [
            'porter' => $porter,
            'relatedPorters' => $relatedPorters
        ]);
    }

    public function campingDetail($slug)
    {
        $package = CampingPackage::where('slug', $slug)->firstOrFail();
        $relatedPackages = CampingPackage::where('id', '!=', $package->id)->take(5)->get();
        return Inertia::render('CampingDetail', [
            'package' => $package,
            'relatedPackages' => $relatedPackages
        ]);
    }

    public function mountainDetail($slug)
    {
        $mountain = \App\Models\Mountain::where('slug', $slug)->firstOrFail();
        return Inertia::render('MountainDetail', [
            'mountain' => $mountain
        ]);
    }

    public function favorit()
    {
        return Inertia::render('Favorit');
    }

    public function camping()
    {
        $packages = CampingPackage::where('status', 'Available')->orderBy('created_at', 'desc')->get();
        return Inertia::render('Camping', [
            'packages' => $packages
        ]);
    }

    public function apiSearch(Request $request)
    {
        $query = trim($request->get('q', ''));
        if (strlen($query) < 1) {
            return response()->json([]);
        }

        $products = Product::where('name', 'LIKE', "%{$query}%")
            ->orWhere('category', 'LIKE', "%{$query}%")
            ->orWhere('brand', 'LIKE', "%{$query}%")
            ->take(6)
            ->get()
            ->map(function ($p) {
                $img = $p->cover_image ? (str_starts_with($p->cover_image, 'http') ? $p->cover_image : '/storage/' . $p->cover_image) : '/images/logobrowkyoutdoor.png';
                return [
                    'id' => 'product-' . $p->id,
                    'type' => 'Alat Hiking',
                    'name' => $p->name,
                    'price' => 'Rp ' . number_format((float)$p->price_per_day, 0, ',', '.') . ' / hari',
                    'image' => $img,
                    'url' => '/sewa-alat/' . $p->slug,
                ];
            });

        $porters = Porter::where('name', 'LIKE', "%{$query}%")
            ->orWhere('mountain_target', 'LIKE', "%{$query}%")
            ->take(4)
            ->get()
            ->map(function ($p) {
                $img = $p->photo ? (str_starts_with($p->photo, 'http') ? $p->photo : '/storage/' . $p->photo) : '/images/logobrowkyoutdoor.png';
                return [
                    'id' => 'porter-' . $p->id,
                    'type' => 'Porter / Guide',
                    'name' => $p->name,
                    'price' => 'Rp ' . number_format((float)$p->price_per_day, 0, ',', '.') . ' / hari',
                    'image' => $img,
                    'url' => '/porter-gunung/' . $p->slug,
                ];
            });

        $campings = CampingPackage::where('name', 'LIKE', "%{$query}%")
            ->take(4)
            ->get()
            ->map(function ($c) {
                $img = $c->cover_image ? (str_starts_with($c->cover_image, 'http') ? $c->cover_image : '/storage/' . $c->cover_image) : '/images/logobrowkyoutdoor.png';
                return [
                    'id' => 'camping-' . $c->id,
                    'type' => 'Paket Camping',
                    'name' => $c->name,
                    'price' => 'Rp ' . number_format((float)$c->price, 0, ',', '.'),
                    'image' => $img,
                    'url' => '/paket-camping/' . $c->slug,
                ];
            });

        return response()->json($products->concat($porters)->concat($campings));
    }
}
