<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\CartController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\SitemapController;

// SEO Sitemap Route
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');

// Frontend Routes
Route::get('/', [FrontendController::class, 'index'])->name('home');
Route::get('/sewa-alat', [FrontendController::class, 'rental'])->name('rental');
Route::get('/sewa-alat/{slug}', [FrontendController::class, 'product'])->name('product');
Route::get('/porter-gunung', [FrontendController::class, 'porter'])->name('porter');
Route::get('/porter-gunung/{slug}', [FrontendController::class, 'porterDetail'])->name('porter.detail');
Route::get('/paket-camping', [FrontendController::class, 'camping'])->name('camping');
Route::get('/paket-camping/{slug}', [FrontendController::class, 'campingDetail'])->name('camping.detail');
Route::get('/gunung/{slug}', [FrontendController::class, 'mountainDetail'])->name('mountain.detail');
Route::get('/favorit', [FrontendController::class, 'favorit'])->name('favorit');
Route::get('/api/search', [FrontendController::class, 'apiSearch'])->name('api.search');

// Cart & Checkout Routes
Route::get('/keranjang', [CartController::class, 'index'])->name('cart.index');
Route::post('/keranjang/add', [CartController::class, 'add'])->name('cart.add');
Route::post('/keranjang/remove', [CartController::class, 'remove'])->name('cart.remove');
Route::post('/keranjang/update', [CartController::class, 'update'])->name('cart.update');
Route::post('/keranjang/checkout', [CartController::class, 'checkout'])->name('cart.checkout');

// Admin Dashboard Routes
Route::get('/dashboard', function () {
    $productCount = \App\Models\Product::count();
    $porterCount  = \App\Models\Porter::count();
    $orderCount   = \App\Models\Order::count();
    $revenue      = (int) \App\Models\Order::whereIn('status', ['confirmed', 'completed'])->sum('total_price');
    $pendingCount = \App\Models\Order::where('status', 'pending')->count();
    $recentOrders = \App\Models\Order::orderBy('created_at', 'desc')->take(50)->get();

    return \Inertia\Inertia::render('dashboard', [
        'stats' => [
            'productCount' => $productCount,
            'porterCount'  => $porterCount,
            'orderCount'   => $orderCount,
            'revenue'      => $revenue,
            'pendingCount' => $pendingCount,
        ],
        'orders' => $recentOrders,
    ]);
})->middleware(['auth'])->name('dashboard');

use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProductImageController;
use App\Http\Controllers\Admin\PorterController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\MountainController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\CampingPackageController;

Route::prefix('admin')->name('admin.')->middleware(['auth'])->group(function () {
    Route::resource('users', UserController::class)->except(['show']);
    Route::resource('products', ProductController::class);
    Route::delete('product-images/{image}', [ProductImageController::class, 'destroy'])->name('product-images.destroy');
    Route::put('product-images/{image}/set-primary', [ProductImageController::class, 'setPrimary'])->name('product-images.set-primary');
    
    Route::resource('porters', PorterController::class);
    Route::resource('orders', OrderController::class)->only(['index', 'show', 'update']);
    Route::resource('mountains', MountainController::class)->except(['show']);
    Route::resource('camping-packages', CampingPackageController::class)->parameters(['camping-packages' => 'campingPackage']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
