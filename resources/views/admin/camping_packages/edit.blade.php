@extends('admin.layouts.app')

@section('content')
<div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <h2 class="text-title-md2 font-bold text-black text-2xl">
        Edit Paket Camping
    </h2>
    <a href="{{ route('admin.camping-packages.index') }}" class="inline-flex items-center justify-center gap-2.5 rounded-md border border-primary text-primary py-2 px-4 text-center font-medium hover:bg-primary hover:text-white transition-colors">
        Kembali
    </a>
</div>

<div class="rounded-sm border border-stroke bg-white shadow-default">
    <div class="border-b border-stroke py-4 px-6.5">
        <h3 class="font-medium text-black">
            Form Edit Paket
        </h3>
    </div>
    <form action="{{ route('admin.camping-packages.update', $campingPackage) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        <div class="p-6.5">
            <div class="mb-4.5">
                <label class="mb-2.5 block text-black">
                    Nama Paket <span class="text-meta-1">*</span>
                </label>
                <input type="text" name="name" value="{{ old('name', $campingPackage->name) }}" class="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter @error('name') border-red-500 @enderror" required />
                @error('name')
                    <span class="text-sm text-red-500 mt-1">{{ $message }}</span>
                @enderror
            </div>

            <div class="mb-4.5">
                <label class="mb-2.5 block text-black">
                    Harga Paket <span class="text-meta-1">*</span>
                </label>
                <input type="number" name="price" value="{{ old('price', $campingPackage->price) }}" class="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter @error('price') border-red-500 @enderror" required />
                @error('price')
                    <span class="text-sm text-red-500 mt-1">{{ $message }}</span>
                @enderror
            </div>

            <div class="mb-4.5">
                <label class="mb-2.5 block text-black">
                    Fasilitas (Opsional)
                </label>
                <textarea name="facilities" rows="3" class="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter">{{ old('facilities', $campingPackage->facilities) }}</textarea>
                @error('facilities')
                    <span class="text-sm text-red-500 mt-1">{{ $message }}</span>
                @enderror
            </div>

            <div class="mb-4.5">
                <label class="mb-2.5 block text-black">
                    Tag / Gunung (Opsional)
                </label>
                <input type="text" name="tags" value="{{ old('tags', $campingPackage->tags) }}" class="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter @error('tags') border-red-500 @enderror" />
                <p class="text-xs text-gray-500 mt-1">Pisahkan dengan koma.</p>
                @error('tags')
                    <span class="text-sm text-red-500 mt-1">{{ $message }}</span>
                @enderror
            </div>

            <div class="mb-4.5">
                <label class="mb-2.5 block text-black">
                    Deskripsi Lengkap <span class="text-meta-1">*</span>
                </label>
                <textarea name="description" rows="5" class="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter @error('description') border-red-500 @enderror" required>{{ old('description', $campingPackage->description) }}</textarea>
                @error('description')
                    <span class="text-sm text-red-500 mt-1">{{ $message }}</span>
                @enderror
            </div>

            <div class="mb-4.5">
                <label class="mb-2.5 block text-black">
                    Special Badge (Opsional)
                </label>
                <div class="relative z-20 bg-transparent">
                    <select name="special_badge" class="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary">
                        <option value="">Tanpa Badge</option>
                        <option value="Paling Diminati" {{ old('special_badge', $campingPackage->special_badge) == 'Paling Diminati' ? 'selected' : '' }}>Paling Diminati</option>
                        <option value="Pilihan Lokal" {{ old('special_badge', $campingPackage->special_badge) == 'Pilihan Lokal' ? 'selected' : '' }}>Pilihan Lokal</option>
                        <option value="Spesial Diskon" {{ old('special_badge', $campingPackage->special_badge) == 'Spesial Diskon' ? 'selected' : '' }}>Spesial Diskon</option>
                        <option value="Paling Hemat" {{ old('special_badge', $campingPackage->special_badge) == 'Paling Hemat' ? 'selected' : '' }}>Paling Hemat</option>
                    </select>
                    <span class="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg class="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.8">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="" />
                            </g>
                        </svg>
                    </span>
                </div>
            </div>

            <div class="mb-4.5">
                <label class="mb-2.5 block text-black">
                    Status <span class="text-meta-1">*</span>
                </label>
                <div class="relative z-20 bg-transparent">
                    <select name="status" class="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary" required>
                        <option value="Available" {{ old('status', $campingPackage->status) == 'Available' ? 'selected' : '' }}>Tersedia (Available)</option>
                        <option value="Unavailable" {{ old('status', $campingPackage->status) == 'Unavailable' ? 'selected' : '' }}>Tidak Tersedia (Unavailable)</option>
                    </select>
                    <span class="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg class="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.8">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="" />
                            </g>
                        </svg>
                    </span>
                </div>
            </div>

            <div class="mb-4.5">
                <label class="mb-2.5 block text-black">
                    Gambar Paket Saat Ini
                </label>
                @if($campingPackage->image)
                    <div class="mb-3 h-32 w-32 overflow-hidden rounded border border-stroke">
                        @php
                            $imgSrc = str_starts_with($campingPackage->image, 'http') ? $campingPackage->image : asset('storage/' . $campingPackage->image);
                        @endphp
                        <img src="{{ $imgSrc }}" alt="{{ $campingPackage->name }}" class="h-full w-full object-cover">
                    </div>
                @else
                    <p class="text-sm text-gray-500 mb-3">Tidak ada gambar yang diunggah.</p>
                @endif
                <label class="mb-2.5 block text-black">
                    Ganti Gambar (Opsional)
                </label>
                <input type="file" name="image" accept="image/*" class="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm file:font-medium focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter" />
                @error('image')
                    <span class="text-sm text-red-500 mt-1">{{ $message }}</span>
                @enderror
            </div>

            <button type="submit" class="flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90">
                Perbarui Paket Camping
            </button>
        </div>
    </form>
</div>
@endsection
