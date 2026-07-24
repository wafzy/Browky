@extends('layouts.frontend')

@section('title', 'Sewa Alat Pendakian Wonosobo Lengkap & Murah | Browky Outdoor')
@section('meta_description', 'Katalog lengkap sewa alat pendakian di Wonosobo: tenda, carrier, sleeping bag, matras, kompor camping & perlengkapan outdoor lainnya. Harga mulai Rp 25.000/hari. Tersedia untuk Gunung Prau, Sumbing, Sindoro & Dieng.')
@section('meta_keywords', 'sewa alat pendakian wonosobo, sewa tenda wonosobo, sewa carrier wonosobo, sewa sleeping bag wonosobo, perlengkapan mendaki wonosobo, sewa matras wonosobo')
@section('og_title', 'Katalog Sewa Alat Pendakian Wonosobo - Browky Outdoor')
@section('og_description', 'Sewa alat pendakian lengkap di Wonosobo: tenda, carrier, sleeping bag & lebih banyak lagi. Harga murah, kondisi prima, siap pakai!')

@section('content')

<!-- ====== PAGE HEADER & FILTER ====== -->
<div class="bg-white pt-10">
    <div class="container-main">
        <h1 class="text-4xl font-anton tracking-wide uppercase text-gray-900 mb-6">Sewa Alat Pendakian</h1>
        
        <!-- Category Filter -->
        <div class="flex gap-2 overflow-x-auto hide-scrollbar pb-4 border-b border-gray-100">
            <button class="pill-tab active" data-category="all" onclick="filterSewaProducts('all', this)">Semua</button>
            @if(isset($categories))
                @foreach($categories as $category)
                    <button class="pill-tab" data-category="{{ $category }}" onclick="filterSewaProducts('{{ $category }}', this)">{{ $category }}</button>
                @endforeach
            @endif
        </div>
    </div>
</div>

<!-- ====== GRID CONTENT ====== -->
<div class="bg-white py-8">
    <div class="container-main">

        <!-- Product Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-8" id="product-grid">
            @forelse($products as $product)
                <div class="card-airbnb rental-product-card" data-category="{{ $product->category }}">

                    <!-- Favorite Button -->
                    <button class="fav-btn favorite-btn text-gray-400"
                            data-id="{{ $product->id }}"
                            data-type="product"
                            data-name="{{ $product->name }}"
                            data-price="{{ $product->price_per_day }}"
                            data-image="{{ $product->cover_image ? (str_starts_with($product->cover_image, 'http') ? $product->cover_image : asset('storage/' . $product->cover_image)) : 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=500&q=80' }}"
                            data-link="{{ url('/sewa-alat/' . $product->slug) }}"
                            aria-label="Tambah ke wishlist">
                        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </button>

                    <!-- Image -->
                    <a href="{{ url('/sewa-alat/' . $product->slug) }}" class="block">
                        <div class="card-image">
                            @php
                                $imagePath = $product->cover_image ? (str_starts_with($product->cover_image, 'http') ? $product->cover_image : asset('storage/' . $product->cover_image)) : 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=500&q=80';
                            @endphp
                            <img src="{{ $imagePath }}" alt="{{ $product->name }}" loading="lazy">

                            @if($product->stock <= 0)
                                <div class="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
                                    <span class="bg-white text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">Stok Habis</span>
                                </div>
                            @endif
                        </div>

                        <!-- Info -->
                        <div class="card-body">
                            <h3 class="text-card-title mt-1 line-clamp-1">{{ $product->name }}</h3>
                            <p class="text-price mt-2 text-[#E52F1E]">
                                Rp {{ number_format($product->price_per_day, 0, ',', '.') }}
                                <span class="text-caption font-normal text-[#E52F1E]">/ hari</span>
                            </p>
                        </div>
                    </a>
                </div>
            @empty
                <div class="col-span-4 py-20 flex flex-col items-center justify-center text-center">
                    <div class="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                        <svg class="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                    </div>
                    <h3 class="text-sm font-semibold text-gray-900 mb-1">Belum ada alat</h3>
                    <p class="text-caption">Katalog perlengkapan sedang diperbarui.</p>
                </div>
            @endforelse
        </div>

    </div>
</div>

@push('scripts')
<script>
    function filterSewaProducts(category, btn) {
        document.querySelectorAll('.pill-tab[onclick*="filterSewaProducts"]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.rental-product-card').forEach(card => {
            card.style.display = (category === 'all' || card.dataset.category === category) ? 'block' : 'none';
        });
    }
</script>
@endpush
@endsection
