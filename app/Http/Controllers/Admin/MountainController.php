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
        ]);

        $data = $request->except('image');
        $data['slug'] = Str::slug($request->name) . '-' . time();

        if ($request->hasFile('image')) {
            $data['image'] = $this->uploadAndOptimizeImage($request->file('image'), 'mountains');
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
        ]);

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            if ($mountain->image) {
                Storage::disk('public')->delete($mountain->image);
            }
            $data['image'] = $this->uploadAndOptimizeImage($request->file('image'), 'mountains');
        }

        $mountain->update($data);

        return redirect()->route('admin.mountains.index')->with('success', 'Gunung berhasil diperbarui.');
    }

    public function destroy(Mountain $mountain)
    {
        if ($mountain->image) {
            Storage::disk('public')->delete($mountain->image);
        }
        $mountain->delete();

        return redirect()->route('admin.mountains.index')->with('success', 'Gunung berhasil dihapus.');
    }
}
