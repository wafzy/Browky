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

    public function rental(Request $request)
    {
        $products = Product::get();
        $categories = Product::select('category')->distinct()->pluck('category');
        return Inertia::render('Rental', [
            'products' => $products,
            'categories' => $categories,
            'searchMountain' => $request->get('mountain', ''),
            'startDate' => $request->get('startDate', ''),
            'endDate' => $request->get('endDate', ''),
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

    public function porter(Request $request)
    {
        $mountainParam = $request->get('mountain');
        $query = Porter::query();

        if ($mountainParam) {
            $cleanName = trim(str_replace(['Gunung ', 'gunung '], '', $mountainParam));
            $query->where(function($q) use ($cleanName, $mountainParam) {
                $q->where('mountain', 'LIKE', "%{$cleanName}%")
                  ->orWhere('mountain', 'LIKE', "%{$mountainParam}%")
                  ->orWhere('name', 'LIKE', "%{$cleanName}%")
                  ->orWhere('description', 'LIKE', "%{$cleanName}%");
            });
        }

        $porters = $query->get();
        $porterCategories = Porter::select('category')->whereNotNull('category')->distinct()->pluck('category');
        return Inertia::render('Porter', [
            'porters' => $porters,
            'porterCategories' => $porterCategories,
            'searchMountain' => $mountainParam ?? '',
            'startDate' => $request->get('startDate', ''),
            'endDate' => $request->get('endDate', ''),
        ]);
    }

    public function porterMountain(Request $request, $mountain_slug)
    {
        $cleanSlug = str_replace('gunung-', '', strtolower($mountain_slug));
        $mountain = \App\Models\Mountain::where('slug', $mountain_slug)
            ->orWhere('slug', 'gunung-' . $cleanSlug)
            ->orWhere('slug', $cleanSlug)
            ->first();

        $mountainName = $mountain ? $mountain->name : ('Gunung ' . ucwords($cleanSlug));
        $cleanName = trim(str_replace(['Gunung ', 'gunung '], '', $mountainName));

        $porters = Porter::where(function($q) use ($cleanName, $mountainName) {
            $q->where('mountain', 'LIKE', "%{$cleanName}%")
              ->orWhere('mountain', 'LIKE', "%{$mountainName}%")
              ->orWhere('name', 'LIKE', "%{$cleanName}%")
              ->orWhere('description', 'LIKE', "%{$cleanName}%");
        })->get();

        $porterCategories = Porter::select('category')->whereNotNull('category')->distinct()->pluck('category');
        return Inertia::render('Porter', [
            'porters' => $porters,
            'porterCategories' => $porterCategories,
            'searchMountain' => $mountainName,
            'startDate' => $request->get('startDate', ''),
            'endDate' => $request->get('endDate', ''),
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

    public function mountainDetail(Request $request, $slug)
    {
        $cleanSlug = str_replace('gunung-', '', strtolower($slug));
        $mountain = \App\Models\Mountain::where('slug', $slug)
            ->orWhere('slug', 'gunung-' . $cleanSlug)
            ->orWhere('slug', $cleanSlug)
            ->orWhere('name', 'LIKE', "%{$cleanSlug}%")
            ->firstOrFail();

        // Clean mountain name snippet (e.g. "Sumbing" from "Gunung Sumbing")
        $cleanName = trim(str_replace(['Gunung ', 'gunung '], '', $mountain->name));

        // Porters specifically for this mountain ONLY (no incorrect cross-mountain fallbacks)
        $porters = \App\Models\Porter::where(function($q) use ($cleanName, $mountain) {
            $q->where('mountain', 'LIKE', "%{$cleanName}%")
              ->orWhere('mountain', 'LIKE', "%{$mountain->name}%")
              ->orWhere('name', 'LIKE', "%{$cleanName}%")
              ->orWhere('description', 'LIKE', "%{$cleanName}%");
        })->get();

        // Camping Packages specifically for this mountain ONLY
        $campingPackages = \App\Models\CampingPackage::where(function($q) use ($cleanName, $mountain) {
            $q->where('tags', 'LIKE', "%{$cleanName}%")
              ->orWhere('tags', 'LIKE', "%{$mountain->name}%")
              ->orWhere('name', 'LIKE', "%{$cleanName}%")
              ->orWhere('description', 'LIKE', "%{$cleanName}%");
        })->get();

        // Recommended Rental Gear / Products
        $products = \App\Models\Product::with('images')->latest()->take(8)->get();

        return Inertia::render('MountainDetail', [
            'mountain' => $mountain,
            'porters' => $porters,
            'campingPackages' => $campingPackages,
            'products' => $products,
            'activeService' => $request->get('service', 'all'),
            'startDate' => $request->get('startDate', ''),
            'endDate' => $request->get('endDate', ''),
        ]);
    }

    public function favorit()
    {
        return Inertia::render('Favorit');
    }

    public function camping(Request $request)
    {
        $mountainParam = $request->get('mountain');
        $query = CampingPackage::where('status', 'Available');

        if ($mountainParam) {
            $cleanName = trim(str_replace(['Gunung ', 'gunung '], '', $mountainParam));
            $query->where(function($q) use ($cleanName, $mountainParam) {
                $q->where('tags', 'LIKE', "%{$cleanName}%")
                  ->orWhere('tags', 'LIKE', "%{$mountainParam}%")
                  ->orWhere('name', 'LIKE', "%{$cleanName}%")
                  ->orWhere('description', 'LIKE', "%{$cleanName}%");
            });
        }

        $packages = $query->orderBy('created_at', 'desc')->get();
        $campingCategories = CampingPackage::select('tags')->whereNotNull('tags')->distinct()->pluck('tags');
        return Inertia::render('Camping', [
            'packages' => $packages,
            'campingCategories' => $campingCategories,
            'searchMountain' => $mountainParam ?? '',
            'startDate' => $request->get('startDate', ''),
            'endDate' => $request->get('endDate', ''),
        ]);
    }

    public function campingMountain(Request $request, $mountain_slug)
    {
        $cleanSlug = str_replace('gunung-', '', strtolower($mountain_slug));
        $mountain = \App\Models\Mountain::where('slug', $mountain_slug)
            ->orWhere('slug', 'gunung-' . $cleanSlug)
            ->orWhere('slug', $cleanSlug)
            ->first();

        $mountainName = $mountain ? $mountain->name : ('Gunung ' . ucwords($cleanSlug));
        $cleanName = trim(str_replace(['Gunung ', 'gunung '], '', $mountainName));

        $packages = CampingPackage::where('status', 'Available')
            ->where(function($q) use ($cleanName, $mountainName) {
                $q->where('tags', 'LIKE', "%{$cleanName}%")
                  ->orWhere('tags', 'LIKE', "%{$mountainName}%")
                  ->orWhere('name', 'LIKE', "%{$cleanName}%")
                  ->orWhere('description', 'LIKE', "%{$cleanName}%");
            })
            ->orderBy('created_at', 'desc')
            ->get();

        $campingCategories = CampingPackage::select('tags')->whereNotNull('tags')->distinct()->pluck('tags');

        return Inertia::render('Camping', [
            'packages' => $packages,
            'campingCategories' => $campingCategories,
            'searchMountain' => $mountainName,
            'startDate' => $request->get('startDate', ''),
            'endDate' => $request->get('endDate', ''),
        ]);
    }

    public function rentalMountain(Request $request, $mountain_slug)
    {
        $cleanSlug = str_replace('gunung-', '', strtolower($mountain_slug));
        $mountain = \App\Models\Mountain::where('slug', $mountain_slug)
            ->orWhere('slug', 'gunung-' . $cleanSlug)
            ->orWhere('slug', $cleanSlug)
            ->first();

        $mountainName = $mountain ? $mountain->name : ('Gunung ' . ucwords($cleanSlug));
        $cleanName = trim(str_replace(['Gunung ', 'gunung '], '', $mountainName));

        $products = Product::with('images')
            ->where(function($q) use ($cleanName, $mountainName) {
                $q->where('name', 'LIKE', "%{$cleanName}%")
                  ->orWhere('category', 'LIKE', "%{$cleanName}%")
                  ->orWhere('description', 'LIKE', "%{$cleanName}%");
            })
            ->get();

        $categories = Product::select('category')->distinct()->pluck('category');

        return Inertia::render('Rental', [
            'products' => $products,
            'categories' => $categories,
            'searchMountain' => $mountainName,
            'startDate' => $request->get('startDate', ''),
            'endDate' => $request->get('endDate', ''),
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

    public function searchResults(Request $request)
    {
        $mountainParam = $request->get('mountain', '');
        $startDate = $request->get('startDate', '');
        $endDate = $request->get('endDate', '');
        $queryKeyword = $request->get('q', '');

        $cleanName = trim(str_replace(['Gunung ', 'gunung '], '', $mountainParam));

        // 1. Products (Sewa Alat)
        $productQuery = Product::query();
        if ($queryKeyword) {
            $productQuery->where(function($q) use ($queryKeyword) {
                $q->where('name', 'LIKE', "%{$queryKeyword}%")
                  ->orWhere('category', 'LIKE', "%{$queryKeyword}%")
                  ->orWhere('description', 'LIKE', "%{$queryKeyword}%");
            });
        }
        $products = $productQuery->get();

        // 2. Porters (Jasa Porter)
        $porterQuery = Porter::query();
        if ($mountainParam) {
            $porterQuery->where(function($q) use ($cleanName, $mountainParam) {
                $q->where('mountain', 'LIKE', "%{$cleanName}%")
                  ->orWhere('mountain', 'LIKE', "%{$mountainParam}%")
                  ->orWhere('name', 'LIKE', "%{$cleanName}%")
                  ->orWhere('description', 'LIKE', "%{$cleanName}%");
            });
        }
        if ($queryKeyword) {
            $porterQuery->where(function($q) use ($queryKeyword) {
                $q->where('name', 'LIKE', "%{$queryKeyword}%")
                  ->orWhere('mountain', 'LIKE', "%{$queryKeyword}%")
                  ->orWhere('description', 'LIKE', "%{$queryKeyword}%");
            });
        }
        $porters = $porterQuery->get();

        // 3. Camping Packages (Paket Camping)
        $campingQuery = CampingPackage::where('status', 'Available');
        if ($mountainParam) {
            $campingQuery->where(function($q) use ($cleanName, $mountainParam) {
                $q->where('tags', 'LIKE', "%{$cleanName}%")
                  ->orWhere('tags', 'LIKE', "%{$mountainParam}%")
                  ->orWhere('name', 'LIKE', "%{$cleanName}%")
                  ->orWhere('description', 'LIKE', "%{$cleanName}%");
            });
        }
        if ($queryKeyword) {
            $campingQuery->where(function($q) use ($queryKeyword) {
                $q->where('name', 'LIKE', "%{$queryKeyword}%")
                  ->orWhere('tags', 'LIKE', "%{$queryKeyword}%")
                  ->orWhere('description', 'LIKE', "%{$queryKeyword}%");
            });
        }
        $campingPackages = $campingQuery->get();

        // 4. Mountain info if matched
        $mountain = null;
        if ($mountainParam) {
            $mountain = Mountain::where('name', 'LIKE', "%{$cleanName}%")
                ->orWhere('name', 'LIKE', "%{$mountainParam}%")
                ->first();
        }

        return Inertia::render('SearchResults', [
            'products' => $products,
            'porters' => $porters,
            'campingPackages' => $campingPackages,
            'mountain' => $mountain,
            'searchMountain' => $mountainParam,
            'startDate' => $startDate,
            'endDate' => $endDate,
            'queryKeyword' => $queryKeyword,
        ]);
    }

    public function mountainServices(Request $request, $mountain_slug)
    {
        $cleanSlug = str_replace('gunung-', '', strtolower($mountain_slug));
        $mountain = Mountain::where('slug', $mountain_slug)
            ->orWhere('slug', 'gunung-' . $cleanSlug)
            ->orWhere('slug', $cleanSlug)
            ->first();

        $mountainName = $mountain ? $mountain->name : ('Gunung ' . ucwords(str_replace('-', ' ', $cleanSlug)));
        $cleanName = trim(str_replace(['Gunung ', 'gunung '], '', $mountainName));

        // 1. Porters for this mountain
        $porters = Porter::where(function($q) use ($cleanName, $mountainName) {
            $q->where('mountain', 'LIKE', "%{$cleanName}%")
              ->orWhere('mountain', 'LIKE', "%{$mountainName}%")
              ->orWhere('name', 'LIKE', "%{$cleanName}%")
              ->orWhere('description', 'LIKE', "%{$cleanName}%");
        })->get();

        // 2. Camping Packages for this mountain
        $campingPackages = CampingPackage::where('status', 'Available')
            ->where(function($q) use ($cleanName, $mountainName) {
                $q->where('tags', 'LIKE', "%{$cleanName}%")
                  ->orWhere('tags', 'LIKE', "%{$mountainName}%")
                  ->orWhere('name', 'LIKE', "%{$cleanName}%")
                  ->orWhere('description', 'LIKE', "%{$cleanName}%");
            })
            ->get();

        // 3. Products (All rental equipment available for hiking)
        $products = Product::get();

        return Inertia::render('SearchResults', [
            'products' => $products,
            'porters' => $porters,
            'campingPackages' => $campingPackages,
            'mountain' => $mountain,
            'searchMountain' => $mountainName,
            'startDate' => $request->get('startDate', ''),
            'endDate' => $request->get('endDate', ''),
        ]);
    }
}
