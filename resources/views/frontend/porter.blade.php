@extends('layouts.frontend')

@section('title', 'Jasa Porter Gunung Wonosobo Profesional & Berpengalaman | Browky Outdoor')
@section('meta_description', 'Pesan jasa porter gunung terpercaya di Wonosobo untuk pendakian ke Gunung Prau, Sumbing, Sindoro, dan Dieng. Porter Browky berpengalaman, ramah, dan hafal jalur. Booking mudah via WhatsApp. Tersedia paket tektok & porter inap.')
@section('meta_keywords', 'porter wonosobo, jasa porter gunung wonosobo, porter gunung prau wonosobo, porter sindoro wonosobo, porter sumbing wonosobo, porter dieng, sewa porter pendakian, porter gunung profesional wonosobo')
@section('og_title', 'Jasa Porter Gunung Wonosobo - Browky Outdoor')
@section('og_description', 'Porter gunung profesional di Wonosobo untuk Gunung Prau, Sumbing, Sindoro & Dieng. Berpengalaman, hafal jalur, harga terjangkau. Booking via WhatsApp!')

@section('content')

<!-- ====== PAGE HEADER & FILTER ====== -->
<div class="bg-white pt-10">
    <div class="container-main">
        <h1 class="text-4xl font-anton tracking-wide uppercase text-gray-900 mb-6">Jasa Porter Gunung</h1>
        
        <!-- Category Filter -->
        <div class="flex gap-2 overflow-x-auto hide-scrollbar pb-4 border-b border-gray-100">
            <button class="pill-tab active" data-category="all" onclick="filterPorters('all', this)">Semua</button>
            @if(isset($porterCategories))
                @foreach($porterCategories as $category)
                    <button class="pill-tab" data-category="{{ $category }}" onclick="filterPorters('{{ $category }}', this)">{{ $category }}</button>
                @endforeach
            @endif
        </div>
    </div>
</div>

<!-- ====== GRID CONTENT ====== -->
<div class="bg-white py-8">
    <div class="container-main">
        <!-- Porter Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-8" id="porter-grid">
            @forelse($porters as $porter)
                @php $pCat = $porter->category ?? 'Lainnya'; @endphp
                <div class="card-airbnb porter-card" data-category="{{ $pCat }}">

                    <!-- Favorite Button -->
                    <button class="fav-btn favorite-btn text-gray-400"
                            data-id="porter-{{ $porter->id }}"
                            data-type="porter"
                            data-name="{{ $porter->name }}"
                            data-price="{{ $porter->price_per_day }}"
                            data-image="{{ $porter->image ? (str_starts_with($porter->image, 'http') ? $porter->image : asset('storage/' . $porter->image)) : 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be1?auto=format&fit=crop&w=500&q=80' }}"
                            data-link="{{ url('/porter-gunung/' . $porter->slug) }}"
                            aria-label="Tambah ke wishlist">
                        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </button>

                    <!-- Image -->
                    <a href="{{ url('/porter-gunung/' . $porter->slug) }}" class="block">
                        <div class="card-image">
                            @php
                                $imagePath = $porter->image ? (str_starts_with($porter->image, 'http') ? $porter->image : asset('storage/' . $porter->image)) : 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be1?auto=format&fit=crop&w=500&q=80';
                            @endphp
                            <img src="{{ $imagePath }}" alt="{{ $porter->name }}" loading="lazy">
                        </div>

                        <!-- Info -->
                        <div class="card-body">
                            <h3 class="text-card-title mt-1 line-clamp-1">{{ $porter->name }}</h3>
                            <p class="text-caption mt-1">{{ $pCat }}</p>
                            <p class="text-price mt-2">Rp {{ number_format($porter->price_per_day, 0, ',', '.') }}</p>
                        </div>
                    </a>
                </div>
            @empty
                <div class="col-span-4 py-20 flex flex-col items-center justify-center text-center">
                    <div class="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                        <svg class="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
                    </div>
                    <h3 class="text-sm font-semibold text-gray-900 mb-1">Belum ada paket porter</h3>
                    <p class="text-caption">Paket layanan porter sedang dalam persiapan.</p>
                </div>
            @endforelse
        </div>
    </div>
</div>

@push('scripts')
<script>
    function filterPorters(category, btn) {
        document.querySelectorAll('.pill-tab[onclick*="filterPorters"]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.porter-card').forEach(card => {
            card.style.display = (category === 'all' || card.dataset.category === category) ? 'block' : 'none';
        });
    }
</script>
@endpush
@endsection
