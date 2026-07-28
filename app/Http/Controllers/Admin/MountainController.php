<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Mountain;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MountainController extends Controller
{
    public function index()
    {
        $mountains = Mountain::latest()->get();
        return Inertia::render('Admin/Mountains/Index', [
            'mountains' => $mountains
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Mountains/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'elevation' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image_1' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image_2' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image_3' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image_4' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image_5' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $data = $request->except(['image', 'image_1', 'image_2', 'image_3', 'image_4', 'image_5']);
        $data['slug'] = $this->generateUniqueSlug($request->name);

        foreach (['image', 'image_1', 'image_2', 'image_3', 'image_4', 'image_5'] as $imgKey) {
            if ($request->hasFile($imgKey)) {
                $data[$imgKey] = $this->uploadAndOptimizeImage($request->file($imgKey), 'mountains');
            }
        }

        Mountain::create($data);

        return redirect()->route('admin.mountains.index')->with('success', 'Gunung berhasil ditambahkan.');
    }

    public function edit(Mountain $mountain)
    {
        return Inertia::render('Admin/Mountains/Edit', [
            'mountain' => $mountain
        ]);
    }

    public function update(Request $request, Mountain $mountain)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'elevation' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image_1' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image_2' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image_3' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image_4' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image_5' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $data = $request->except(['image', 'image_1', 'image_2', 'image_3', 'image_4', 'image_5']);
        if ($mountain->name !== $request->name) {
            $data['slug'] = $this->generateUniqueSlug($request->name, $mountain->id);
        }

        foreach (['image', 'image_1', 'image_2', 'image_3', 'image_4', 'image_5'] as $imgKey) {
            if ($request->hasFile($imgKey)) {
                if ($mountain->$imgKey) {
                    Storage::disk('public')->delete($mountain->$imgKey);
                }
                $data[$imgKey] = $this->uploadAndOptimizeImage($request->file($imgKey), 'mountains');
            }
        }

        $mountain->update($data);

        return redirect()->route('admin.mountains.index')->with('success', 'Gunung berhasil diperbarui.');
    }

    public function destroy(Mountain $mountain)
    {
        foreach (['image', 'image_1', 'image_2', 'image_3', 'image_4', 'image_5'] as $imgKey) {
            if ($mountain->$imgKey) {
                Storage::disk('public')->delete($mountain->$imgKey);
            }
        }
        $mountain->delete();

        return redirect()->route('admin.mountains.index')->with('success', 'Gunung berhasil dihapus.');
    }

    private function generateUniqueSlug(string $name, $ignoreId = null): string
    {
        $baseSlug = Str::slug($name);
        $slug = $baseSlug;
        $count = 1;

        while (Mountain::where('slug', $slug)->where('id', '!=', $ignoreId)->exists()) {
            $slug = "{$baseSlug}-{$count}";
            $count++;
        }

        return $slug;
    }
}
