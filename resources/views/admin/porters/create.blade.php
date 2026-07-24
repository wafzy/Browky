@extends('admin.layouts.app')

@section('content')
{{-- Page Header --}}
<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-8">
    <div>
        <h1 class="text-2xl font-bold tracking-tight text-zinc-900">Tambah Paket Porter</h1>
        <p class="text-xs text-zinc-500 mt-1">Isi formulir di bawah untuk menambahkan paket porter baru.</p>
    </div>
    <a href="{{ route('admin.porters.index') }}" class="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 shadow-xs hover:bg-zinc-50 transition-colors cursor-pointer">
        <svg class="h-3.5 w-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Kembali ke Daftar
    </a>
</div>

{{-- Error Alert --}}
@if ($errors->any())
<div class="flex gap-3 w-full border-l-4 border-red-500 bg-red-50 p-4 rounded-lg mb-6">
    <svg class="h-5 w-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    <div>
        <h5 class="text-sm font-semibold text-red-700 mb-1">Terdapat kesalahan input:</h5>
        <ul class="list-disc text-xs text-red-600 pl-4 space-y-0.5">
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
</div>
@endif

<form action="{{ route('admin.porters.store') }}" method="POST" enctype="multipart/form-data">
    @csrf
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {{-- Main Form Fields --}}
        <div class="lg:col-span-2 space-y-6">
            <div class="bg-white border border-zinc-200/80 rounded-xl shadow-xs p-6">
                <h2 class="text-sm font-bold text-zinc-900 mb-5 pb-4 border-b border-zinc-100">Informasi Paket Porter</h2>

                <div class="space-y-5">
                    <div>
                        <label for="name" class="block text-xs font-semibold text-zinc-700 mb-1.5">Nama Paket <span class="text-red-500">*</span></label>
                        <input type="text" id="name" name="name" value="{{ old('name') }}" placeholder="Contoh: Paket Porter 1 Hari" class="w-full rounded-lg border border-zinc-300 bg-white py-2.5 px-3.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition" required>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div>
                            <label for="category" class="block text-xs font-semibold text-zinc-700 mb-1.5">Kategori <span class="text-red-500">*</span></label>
                            <select id="category" name="category" class="w-full rounded-lg border border-zinc-300 bg-white py-2.5 px-3.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition" required>
                                <option value="Tektok" {{ old('category') == 'Tektok' ? 'selected' : '' }}>Tektok</option>
                                <option value="Porter Inap" {{ old('category') == 'Porter Inap' ? 'selected' : '' }}>Porter Inap</option>
                            </select>
                        </div>
                        <div>
                            <label for="status" class="block text-xs font-semibold text-zinc-700 mb-1.5">Status <span class="text-red-500">*</span></label>
                            <select id="status" name="status" class="w-full rounded-lg border border-zinc-300 bg-white py-2.5 px-3.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition" required>
                                <option value="Available" {{ old('status') == 'Available' ? 'selected' : '' }}>Available</option>
                                <option value="Unavailable" {{ old('status') == 'Unavailable' ? 'selected' : '' }}>Unavailable</option>
                            </select>
                        </div>
                        <div>
                            <label for="special_badge" class="block text-xs font-semibold text-zinc-700 mb-1.5">Special Badge <span class="text-zinc-400 font-normal">(Opsional)</span></label>
                            <select id="special_badge" name="special_badge" class="w-full rounded-lg border border-zinc-300 bg-white py-2.5 px-3.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition">
                                <option value="">Tanpa Badge</option>
                                <option value="Paling Diminati" {{ old('special_badge') == 'Paling Diminati' ? 'selected' : '' }}>Paling Diminati</option>
                                <option value="Pilihan Lokal" {{ old('special_badge') == 'Pilihan Lokal' ? 'selected' : '' }}>Pilihan Lokal</option>
                                <option value="Spesial Diskon" {{ old('special_badge') == 'Spesial Diskon' ? 'selected' : '' }}>Spesial Diskon</option>
                                <option value="Paling Hemat" {{ old('special_badge') == 'Paling Hemat' ? 'selected' : '' }}>Paling Hemat</option>
                            </select>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label for="price_per_day" class="block text-xs font-semibold text-zinc-700 mb-1.5">Harga (Rp) <span class="text-red-500">*</span></label>
                            <input type="number" id="price_per_day" name="price_per_day" value="{{ old('price_per_day') }}" placeholder="150000" class="w-full rounded-lg border border-zinc-300 bg-white py-2.5 px-3.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition" required>
                        </div>
                        <div>
                            <label for="mountain" class="block text-xs font-semibold text-zinc-700 mb-1.5">Gunung <span class="text-red-500">*</span></label>
                            <input type="text" id="mountain" name="mountain" value="{{ old('mountain') }}" placeholder="Contoh: Gunung Sumbing" class="w-full rounded-lg border border-zinc-300 bg-white py-2.5 px-3.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition" required>
                        </div>
                    </div>

                    <div>
                        <label for="description" class="block text-xs font-semibold text-zinc-700 mb-1.5">Deskripsi Paket <span class="text-red-500">*</span></label>
                        <textarea id="description" name="description" rows="4" placeholder="Jelaskan fasilitas dan rincian paket porter..." class="w-full rounded-lg border border-zinc-300 bg-white py-2.5 px-3.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition resize-none" required>{{ old('description') }}</textarea>
                    </div>
                </div>
            </div>
        </div>

        {{-- Sidebar: Image & Actions --}}
        <div class="space-y-6">
            {{-- Porter Image Card --}}
            <div class="bg-white border border-zinc-200/80 rounded-xl shadow-xs p-6">
                <h2 class="text-sm font-bold text-zinc-900 mb-4 pb-4 border-b border-zinc-100">Foto Paket</h2>

                <div id="porterImagePreviewContainer" class="hidden mb-4">
                    <div class="aspect-square w-full overflow-hidden rounded-lg border border-zinc-200">
                        <img src="" id="porterImagePreview" class="w-full h-full object-cover" alt="Preview">
                    </div>
                </div>

                <label for="porterImageInput" class="flex flex-col items-center justify-center gap-2 w-full h-28 rounded-lg border-2 border-dashed border-zinc-300 cursor-pointer hover:border-zinc-900 hover:bg-zinc-50/50 transition">
                    <svg class="h-7 w-7 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/></svg>
                    <span class="text-xs font-semibold text-zinc-600">Pilih gambar porter</span>
                </label>
                <input type="file" name="image" id="porterImageInput" accept="image/*" class="hidden" required>
            </div>

            {{-- Submit Actions --}}
            <div class="bg-white border border-zinc-200/80 rounded-xl shadow-xs p-6">
                <h2 class="text-sm font-bold text-zinc-900 mb-4">Simpan Paket Porter</h2>
                <button type="submit" class="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-900 px-4 py-3 text-sm font-semibold text-white shadow-xs transition-colors cursor-pointer">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                    Simpan Paket
                </button>
                <a href="{{ route('admin.porters.index') }}" class="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 shadow-xs hover:bg-zinc-50 transition-colors cursor-pointer">
                    Batal
                </a>
            </div>
        </div>
    </div>
</form>

@push('scripts')
<script>
    const porterImageInput = document.getElementById('porterImageInput');
    const porterImagePreviewContainer = document.getElementById('porterImagePreviewContainer');
    const porterImagePreview = document.getElementById('porterImagePreview');

    porterImageInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                porterImagePreview.src = e.target.result;
                porterImagePreviewContainer.classList.remove('hidden');
            }
            reader.readAsDataURL(file);
        } else {
            porterImagePreviewContainer.classList.add('hidden');
        }
    });
</script>
@endpush

@endsection
