@extends('admin.layouts.app')

@section('title', 'Tambah Gunung')

@section('content')
<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-8">
    <div>
        <h1 class="text-2xl font-bold tracking-tight text-zinc-900">Tambah Data Gunung</h1>
        <p class="text-xs text-zinc-500 mt-1">Buat halaman SEO untuk destinasi gunung baru.</p>
    </div>
    <a href="{{ route('admin.mountains.index') }}" class="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 shadow-xs hover:bg-zinc-50 transition-colors cursor-pointer">
        <svg class="h-3.5 w-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Kembali ke Daftar
    </a>
</div>

<form action="{{ route('admin.mountains.store') }}" method="POST" enctype="multipart/form-data">
    @csrf
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div class="lg:col-span-2">
            <div class="bg-white border border-zinc-200/80 rounded-xl shadow-xs p-6">
                <h2 class="text-sm font-bold text-zinc-900 mb-5 pb-4 border-b border-zinc-100">Informasi Gunung</h2>

                <div class="space-y-5">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label for="name" class="block text-xs font-semibold text-zinc-700 mb-1.5">Nama Gunung <span class="text-red-500">*</span></label>
                            <input type="text" id="name" name="name" placeholder="Contoh: Gunung Prau" class="w-full rounded-lg border border-zinc-300 bg-white py-2.5 px-3.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition" required>
                        </div>
                        <div>
                            <label for="location" class="block text-xs font-semibold text-zinc-700 mb-1.5">Lokasi <span class="text-red-500">*</span></label>
                            <input type="text" id="location" name="location" placeholder="Contoh: Wonosobo, Jawa Tengah" class="w-full rounded-lg border border-zinc-300 bg-white py-2.5 px-3.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition" required>
                        </div>
                    </div>

                    <div>
                        <label for="elevation" class="block text-xs font-semibold text-zinc-700 mb-1.5">Ketinggian (Elevasi) <span class="text-zinc-400 font-normal">(Opsional)</span></label>
                        <input type="text" id="elevation" name="elevation" placeholder="Contoh: 2565 mdpl" class="w-full rounded-lg border border-zinc-300 bg-white py-2.5 px-3.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition">
                    </div>

                    <div>
                        <label for="description" class="block text-xs font-semibold text-zinc-700 mb-1.5">Deskripsi (SEO) <span class="text-zinc-400 font-normal">(Opsional)</span></label>
                        <textarea id="description" name="description" rows="5" placeholder="Deskripsi yang akan menarik pengunjung dari mesin pencari..." class="w-full rounded-lg border border-zinc-300 bg-white py-2.5 px-3.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition resize-none"></textarea>
                    </div>
                </div>
            </div>
        </div>

        <div class="space-y-6">
            <div class="bg-white border border-zinc-200/80 rounded-xl shadow-xs p-6">
                <h2 class="text-sm font-bold text-zinc-900 mb-4 pb-4 border-b border-zinc-100">Gambar Cover</h2>

                <div id="mountainImagePreviewContainer" class="hidden mb-4">
                    <div class="aspect-square w-full overflow-hidden rounded-lg border border-zinc-200">
                        <img src="" id="mountainImagePreview" class="w-full h-full object-cover" alt="Preview">
                    </div>
                </div>

                <label for="mountainImageInput" class="flex flex-col items-center justify-center gap-2 w-full h-28 rounded-lg border-2 border-dashed border-zinc-300 cursor-pointer hover:border-zinc-900 hover:bg-zinc-50/50 transition">
                    <svg class="h-7 w-7 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/></svg>
                    <span class="text-xs font-semibold text-zinc-600">Pilih gambar cover</span>
                    <span class="text-[10px] text-zinc-400">PNG, JPG, WEBP</span>
                </label>
                <input type="file" name="image" id="mountainImageInput" accept="image/*" class="hidden">
            </div>

            <div class="bg-white border border-zinc-200/80 rounded-xl shadow-xs p-6">
                <button type="submit" class="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-900 px-4 py-3 text-sm font-semibold text-white shadow-xs transition-colors cursor-pointer">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                    Simpan Data Gunung
                </button>
                <a href="{{ route('admin.mountains.index') }}" class="w-full mt-2 inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 shadow-xs hover:bg-zinc-50 transition-colors cursor-pointer">
                    Batal
                </a>
            </div>
        </div>
    </div>
</form>

@push('scripts')
<script>
    const mountainImageInput = document.getElementById('mountainImageInput');
    const mountainImagePreviewContainer = document.getElementById('mountainImagePreviewContainer');
    const mountainImagePreview = document.getElementById('mountainImagePreview');
    mountainImageInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                mountainImagePreview.src = e.target.result;
                mountainImagePreviewContainer.classList.remove('hidden');
            }
            reader.readAsDataURL(file);
        } else {
            mountainImagePreviewContainer.classList.add('hidden');
        }
    });
</script>
@endpush
@endsection
