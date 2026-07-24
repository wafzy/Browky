<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CampingPackage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

use Inertia\Inertia;

use App\Models\Product;
use App\Models\Mountain;

class CampingPackageController extends Controller
{
    public function index()
    {
        $packages = CampingPackage::latest()->get();
        return Inertia::render('Admin/CampingPackages/Index', [
            'packages' => $packages
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/CampingPackages/Create', [
            'products' => Product::select('id', 'name', 'category')->get(),
            'mountains' => Mountain::select('id', 'name')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'mountain' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'required|string',
            'facilities' => 'nullable|string',
            'tags' => 'nullable|string|max:255',
            'status' => 'required|in:Available,Unavailable',
            'image' => 'nullable|image|max:2048',
            'special_badge' => 'nullable|string|max:255',
        ]);

        $validated['slug'] = Str::slug($validated['name']) . '-' . time();

        if ($request->hasFile('image')) {
            $validated['image'] = $this->uploadAndOptimizeImage($request->file('image'), 'camping_packages');
        }

        CampingPackage::create($validated);

        return redirect()->route('admin.camping-packages.index')->with('success', 'Paket Camping berhasil ditambahkan.');
    }

    public function edit(CampingPackage $campingPackage)
    {
        return Inertia::render('Admin/CampingPackages/Edit', [
            'campingPackage' => $campingPackage,
            'products' => Product::select('id', 'name', 'category')->get(),
            'mountains' => Mountain::select('id', 'name')->get()
        ]);
    }

    public function update(Request $request, CampingPackage $campingPackage)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'required|string',
            'facilities' => 'nullable|string',
            'tags' => 'nullable|string|max:255',
            'status' => 'required|in:Available,Unavailable',
            'image' => 'nullable|image|max:2048',
            'special_badge' => 'nullable|string|max:255',
        ]);

        // Do not update slug automatically on edit to preserve SEO/links, 
        // unless requested.

        if ($request->hasFile('image')) {
            if ($campingPackage->image) {
                Storage::disk('public')->delete($campingPackage->image);
            }
            $validated['image'] = $this->uploadAndOptimizeImage($request->file('image'), 'camping_packages');
        }

        $campingPackage->update($validated);

        return redirect()->route('admin.camping-packages.index')->with('success', 'Paket Camping berhasil diperbarui.');
    }

    public function destroy(CampingPackage $campingPackage)
    {
        if ($campingPackage->image) {
            Storage::disk('public')->delete($campingPackage->image);
        }
        
        $campingPackage->delete();

        return redirect()->route('admin.camping-packages.index')->with('success', 'Paket Camping berhasil dihapus.');
    }
}
