<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Porter;
use App\Models\Mountain;
use App\Models\CampingPackage;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index()
    {
        $baseUrl = config('app.url', 'https://browkyoutdoor.com');
        $baseUrl = rtrim($baseUrl, '/');

        $staticUrls = [
            ['url' => $baseUrl, 'priority' => '1.0', 'changefreq' => 'daily'],
            ['url' => $baseUrl . '/sewa-alat', 'priority' => '0.9', 'changefreq' => 'daily'],
            ['url' => $baseUrl . '/porter-gunung', 'priority' => '0.9', 'changefreq' => 'daily'],
            ['url' => $baseUrl . '/paket-camping', 'priority' => '0.8', 'changefreq' => 'weekly'],
            ['url' => $baseUrl . '/favorit', 'priority' => '0.5', 'changefreq' => 'monthly'],
        ];

        $products = Product::select('slug', 'updated_at')->get();
        $porters = Porter::select('slug', 'updated_at')->get();
        $mountains = Mountain::select('slug', 'updated_at')->get();
        $campingPackages = CampingPackage::select('slug', 'updated_at')->get();

        $content = view('sitemap', [
            'baseUrl' => $baseUrl,
            'staticUrls' => $staticUrls,
            'products' => $products,
            'porters' => $porters,
            'mountains' => $mountains,
            'campingPackages' => $campingPackages,
        ])->render();

        return response($content, 200)
            ->header('Content-Type', 'text/xml');
    }
}
