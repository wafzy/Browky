@extends('layouts.frontend')

@section('title', 'Katalog Paket Camping Lengkap Wonosobo | Browky Outdoor')
@section('meta_description', 'Katalog pilihan paket camping lengkap tanpa ribet di Wonosobo. Peralatan lengkap, tenda, perlengkapan masak, dan porter sudah siap sedia.')

@section('content')

<!-- ====== PAGE HEADER ====== -->
<div class="bg-white pt-10 pb-4">
    <div class="container-main border-b border-gray-100 pb-4">
        <h1 class="text-4xl font-anton tracking-wide uppercase text-gray-900">
            Paket Camping
        </h1>
    </div>
</div>

<!-- ====== GRID CONTENT ====== -->
<div class="bg-white py-8">
    <div class="container-main">
        <!-- Packages Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-8" id="camping-grid">
            @forelse($packages as $package)
                @php
                    $imgSrc = $package->image ? (str_starts_with($package->image, 'http') ? $package->image : asset('storage/' . $package->image)) : 'https://images.unsplash.com/photo-1504280390224-2c3554e22295?auto=format&fit=crop&w=500&q=80';
                @endphp
                <div class="card-airbnb camping-card">
                    <!-- Favorite Button -->
                    <button class="fav-btn favorite-btn text-gray-400"
                            data-id="camping-{{ $package->id }}"
                            data-type="camping"
                            data-name="{{ $package->name }}"
                            data-price="{{ $package->price }}"
                            data-image="{{ $imgSrc }}"
                            data-link="{{ route('camping.detail', $package->slug) }}"
                            aria-label="Tambah ke wishlist">
                        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </button>

                    <!-- Image -->
                    <a href="{{ route('camping.detail', $package->slug) }}" class="block">
                        <div class="card-image">
                            <img src="{{ $imgSrc }}" alt="{{ $package->name }}" loading="lazy">
                        </div>
                        <!-- Info -->
                        <div class="card-body">
                            <h3 class="text-card-title mt-1 line-clamp-1">{{ $package->name }}</h3>
                            <p class="text-caption mt-1">{{ $package->tags ?? 'Paket Lengkap' }}</p>
                            <p class="text-price mt-2">Rp {{ number_format($package->price, 0, ',', '.') }}</p>
                        </div>
                    </a>
                </div>
            @empty
                <div class="col-span-full py-20 flex flex-col items-center justify-center text-center">
                    <div class="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4 text-gray-300">
                        <svg class="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 21 12 3 5 21"/><path d="M12 21V9"/><path d="m14 15-4 4"/></svg>
                    </div>
                    <h3 class="text-sm font-semibold text-gray-900 mb-1">Belum ada paket camping</h3>
                    <p class="text-xs text-gray-500">Paket layanan camping sedang dalam persiapan.</p>
                </div>
            @endforelse
        </div>
    </div>
</div>

@endsection
