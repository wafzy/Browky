<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Porter;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

use Inertia\Inertia;

class PorterController extends Controller
{
    public function index()
    {
        $porters = Porter::latest()->get();
        return Inertia::render('Admin/Porters/Index', [
            'porters' => $porters
        ]);
    }

    public function create()
    {
        $mountains = \App\Models\Mountain::select('id', 'name')->get();
        return Inertia::render('Admin/Porters/Create', [
            'mountains' => $mountains
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'mountain' => 'nullable|string|max:255',
            'price_per_day' => 'required|numeric|min:0',
            'description' => 'required|string',
            'status' => 'required|in:Available,Unavailable',
            'special_badge' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $data = $request->except('image');
        $data['slug'] = Str::slug($request->name) . '-' . time();

        if ($request->hasFile('image')) {
            $data['image'] = $this->uploadAndOptimizeImage($request->file('image'), 'porters');
        }

        Porter::create($data);

        return redirect()->route('admin.porters.index')->with('success', 'Paket Porter berhasil ditambahkan.');
    }

    public function edit(Porter $porter)
    {
        $mountains = \App\Models\Mountain::select('id', 'name')->get();
        return Inertia::render('Admin/Porters/Edit', [
            'porter' => $porter,
            'mountains' => $mountains
        ]);
    }

    public function update(Request $request, Porter $porter)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'mountain' => 'nullable|string|max:255',
            'price_per_day' => 'required|numeric|min:0',
            'description' => 'required|string',
            'status' => 'required|in:Available,Unavailable',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($porter->image && Storage::disk('public')->exists($porter->image)) {
                Storage::disk('public')->delete($porter->image);
            } elseif ($porter->image && str_starts_with($porter->image, '/storage/porters/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $porter->image));
            }
            $data['image'] = $this->uploadAndOptimizeImage($request->file('image'), 'porters');
        }

        $porter->update($data);

        return redirect()->route('admin.porters.index')->with('success', 'Paket Porter berhasil diperbarui.');
    }

    public function destroy(Porter $porter)
    {
        if ($porter->image && Storage::disk('public')->exists($porter->image)) {
            Storage::disk('public')->delete($porter->image);
        } elseif ($porter->image && str_starts_with($porter->image, '/storage/porters/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $porter->image));
        }
        $porter->delete();

        return redirect()->route('admin.porters.index')->with('success', 'Paket Porter berhasil dihapus.');
    }
}
