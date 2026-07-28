@extends('layouts.frontend')

@section('title', 'Sewa Alat Pendakian & Porter Gunung Wonosobo | Browky Outdoor')
@section('meta_description', 'Browky Outdoor — platform sewa alat pendakian & jasa porter gunung di Wonosobo, Jawa Tengah. Tenda, carrier, sleeping bag & porter berpengalaman untuk Gunung Prau, Sumbing, Sindoro, Dieng. Harga mulai Rp 25.000/hari.')
@section('meta_keywords', 'sewa alat pendakian wonosobo, sewa pendakian wonosobo, porter wonosobo, sewa tenda wonosobo, jasa porter gunung wonosobo, porter gunung prau wonosobo, sewa outdoor wonosobo, perlengkapan mendaki wonosobo, browky outdoor wonosobo')
@section('og_title', 'Browky Outdoor — Sewa Alat Pendakian & Porter Wonosobo Terpercaya')
@section('og_description', 'Platform sewa alat pendakian & jasa porter gunung di Wonosobo. Tenda, carrier, sleeping bag & porter profesional untuk Prau, Sumbing, Sindoro & Dieng.')

@section('structured_data')
<script type="application/ld+json">
{
  "@@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Browky Outdoor",
  "description": "Platform sewa alat pendakian gunung dan jasa porter profesional di Wonosobo, Jawa Tengah. Melayani pendakian ke Gunung Prau, Sumbing, Sindoro, dan wisata Dieng.",
  "url": "{{ url('/') }}",
  "telephone": "+6287834443012",
  "email": "hello@browkyoutdoor.com",
  "openingHours": "Mo-Su 08:00-21:00",
  "image": "{{ asset('images/og-browky.jpg') }}",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Wonosobo",
    "addressRegion": "Jawa Tengah",
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "-7.3598",
    "longitude": "109.9028"
  },
  "hasMap": "https://maps.app.goo.gl/xSWc6pS5EA7Mnzzo9",
  "priceRange": "Rp 25.000 - Rp 500.000",
  "areaServed": ["Wonosobo", "Dieng", "Gunung Prau", "Gunung Sumbing", "Gunung Sindoro"],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "200"
  }
}
</script>
<script type="application/ld+json">
{
  "@@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Dimana lokasi rental alat pendakian Browky di Wonosobo?",
      "acceptedAnswer": {"@type": "Answer", "text": "Browky Outdoor berlokasi di Wonosobo, Jawa Tengah. Kami melayani sewa alat pendakian untuk area Wonosobo, Dieng, dan sekitarnya."}
    },
    {
      "@type": "Question",
      "name": "Apa saja alat pendakian yang bisa disewa di Browky Wonosobo?",
      "acceptedAnswer": {"@type": "Answer", "text": "Browky menyediakan sewa tenda, carrier/ransel, sleeping bag, matras, kompor camping, dan berbagai perlengkapan outdoor lainnya dengan harga mulai Rp 25.000/hari."}
    },
    {
      "@type": "Question",
      "name": "Bagaimana cara memesan jasa porter gunung di Wonosobo?",
      "acceptedAnswer": {"@type": "Answer", "text": "Pesan porter gunung di Wonosobo sangat mudah melalui Browky. Pilih paket porter, tentukan tanggal pendakian, dan konfirmasi via WhatsApp. Porter kami berpengalaman untuk jalur Gunung Prau, Sumbing, Sindoro, dan Dieng."}
    }
  ]
}
</script>
@endsection

@section('content')

{{-- ============================================================
     HERO SECTION
============================================================ --}}
<section class="relative w-full overflow-hidden" style="height: 100vh;">

    <!-- Background Video (Desktop Only for Speed & Payload Optimization) -->
    <video
        class="absolute inset-0 w-full h-full object-cover hidden md:block"
        autoplay muted loop playsinline preload="none"
        poster="/images/hero-fallback.jpg"
    >
        <source src="/videos/loop-2.webm" type="video/webm">
        <source src="/videos/loop-2.mp4" type="video/mp4">
    </video>

    <!-- Mobile Hero Fallback Image (Prevents 5.5MB Video Payload on Mobile) -->
    <img 
        src="/images/hero-fallback.jpg" 
        alt="Sewa Alat Pendakian & Porter Gunung Wonosobo" 
        class="absolute inset-0 w-full h-full object-cover md:hidden" 
        fetchpriority="high" 
        loading="eager" 
        decoding="async" 
    />

    <!-- Gradient Overlay -->
    <div class="absolute inset-0 hero-overlay"></div>

    <!-- Content -->
    <div class="relative z-10 h-full flex items-center">
        <div class="container-main w-full">
            <div class="max-w-xl text-left">
                <h1 class="text-display font-anton tracking-wide uppercase text-white mb-5">
                    Sewa Alat Pendakian & Porter Gunung Wonosobo
                </h1>
                <p class="text-base text-white max-w-md">
                    Platform #1 sewa perlengkapan outdoor & jasa porter profesional di Wonosobo — mulai Rp 25.000/hari.
                </p>
                <div class="flex flex-wrap gap-4 mt-8">
                    <a href="{{ url('/sewa-alat') }}" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xs bg-white hover:bg-white/90 active:scale-95 text-gray-900 font-bold text-sm transition-all shadow-md">
                        Sewa Alat
                    </a>
                    <a href="{{ url('/porter-gunung') }}" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xs border border-white/30 bg-transparent hover:bg-white/10 hover:text-white active:scale-95 text-white font-bold text-sm transition-all">
                        Booking Porter
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- Scroll hint -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50">
        <svg class="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7"></path>
        </svg>
    </div>
</section>

{{-- ============================================================
     BRAND LOGOS
============================================================ --}}
<section class="py-10 border-b border-gray-100">
    <div class="container-main">
        <p class="section-label text-center mb-8">Peralatan dari brand terpercaya</p>
        <div class="w-full relative overflow-hidden animate-marquee-wrapper">
            <!-- Fade edges -->
            <div class="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div class="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div class="flex" style="width: max-content">
                <div class="animate-marquee flex items-center gap-16 sm:gap-24 pr-16 sm:pr-24">
                    <img src="/images/Logo/eiger-logo.png" alt="Eiger" width="120" height="40" loading="lazy" decoding="async" class="h-9 sm:h-11 md:h-12 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105">
                    <img src="/images/Logo/consina-logo.png" alt="Consina" width="120" height="40" loading="lazy" decoding="async" class="h-9 sm:h-11 md:h-12 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105">
                    <img src="/images/Logo/logo-arei.webp" alt="Arei" width="120" height="40" loading="lazy" decoding="async" class="h-9 sm:h-11 md:h-12 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105">
                    <img src="/images/Logo/antarestar-logo.png" alt="Antarestar" width="120" height="40" loading="lazy" decoding="async" class="h-9 sm:h-11 md:h-12 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105">
                    <img src="/images/Logo/Arcteryx-Logo.png" alt="Arc'teryx" width="120" height="40" loading="lazy" decoding="async" class="h-9 sm:h-11 md:h-12 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105">
                    
                    <!-- Duplicate set for seamless loop -->
                    <img src="/images/Logo/eiger-logo.png" alt="Eiger" width="120" height="40" loading="lazy" decoding="async" class="h-9 sm:h-11 md:h-12 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105" aria-hidden="true">
                    <img src="/images/Logo/consina-logo.png" alt="Consina" width="120" height="40" loading="lazy" decoding="async" class="h-9 sm:h-11 md:h-12 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105" aria-hidden="true">
                    <img src="/images/Logo/logo-arei.webp" alt="Arei" width="120" height="40" loading="lazy" decoding="async" class="h-9 sm:h-11 md:h-12 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105" aria-hidden="true">
                    <img src="/images/Logo/antarestar-logo.png" alt="Antarestar" width="120" height="40" loading="lazy" decoding="async" class="h-9 sm:h-11 md:h-12 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105" aria-hidden="true">
                    <img src="/images/Logo/Arcteryx-Logo.png" alt="Arc'teryx" width="120" height="40" loading="lazy" decoding="async" class="h-9 sm:h-11 md:h-12 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105" aria-hidden="true">
                </div>
            </div>
        </div>
    </div>
</section>

{{-- ============================================================
     RENTAL PRODUCTS SECTION
============================================================ --}}
<section class="section">
    <div class="container-main">

        <!-- Section Header -->
        <div class="flex items-end justify-between mb-6">
            <div>
                <h2 class="text-section-title">Sewa Alat Pendakian</h2>
                <p class="text-sm text-gray-500 mt-1">Perlengkapan lengkap siap pakai</p>
            </div>
            <div class="flex items-center gap-4">
                <a href="{{ url('/sewa-alat') }}" class="text-sm font-medium text-gray-900 underline underline-offset-2 hidden sm:block hover:text-gray-600 transition-colors">
                    Lihat semua
                </a>
                <!-- Slider Nav Arrows -->
                <div class="hidden sm:flex items-center gap-1.5">
                    <button type="button" onclick="scrollGrid('product-grid', 'left')" class="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition shadow-sm" aria-label="Slide Left">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <button type="button" onclick="scrollGrid('product-grid', 'right')" class="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition shadow-sm" aria-label="Slide Right">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Category Pills -->
        <div class="flex gap-2 overflow-x-auto hide-scrollbar pb-4 mb-2">
            <button class="pill-tab active" data-category="all" onclick="filterProducts('all', this)">Semua</button>
            @if(isset($categories))
                @foreach($categories as $category)
                    <button class="pill-tab" data-category="{{ $category }}" onclick="filterProducts('{{ $category }}', this)">{{ $category }}</button>
                @endforeach
            @endif
        </div>

        <!-- Products Scroll Grid -->
        <div class="scroll-grid hide-scrollbar" id="product-grid" style="padding-bottom: 8px;">
            @forelse($popularProducts as $product)
                <div class="card-airbnb product-card"
                     data-category="{{ $product->category }}"
                     style="width: 210px; flex-shrink: 0;">

                    <!-- Favorite -->
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
                                $imgSrc = $product->cover_image ? (str_starts_with($product->cover_image, 'http') ? $product->cover_image : asset('storage/' . $product->cover_image)) : 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=500&q=80';
                            @endphp
                            <img src="{{ $imgSrc }}" alt="{{ $product->name }}" loading="lazy">

                            @if($product->special_badge)
                                @php
                                    $badgeColors = [
                                        'Paling Diminati' => 'from-red-500 to-orange-400',
                                        'Pilihan Lokal'   => 'from-blue-600 to-cyan-400',
                                        'Spesial Diskon'  => 'from-pink-500 to-orange-400',
                                        'Paling Hemat'    => 'from-green-600 to-emerald-400',
                                    ];
                                    $badgeIcons = [
                                        'Paling Diminati' => 'fa-fire',
                                        'Pilihan Lokal'   => 'fa-thumbs-up',
                                        'Spesial Diskon'  => 'fa-tag',
                                        'Paling Hemat'    => 'fa-star',
                                    ];
                                    $badgeColor = $badgeColors[$product->special_badge] ?? 'from-gray-600 to-gray-400';
                                    $badgeIcon  = $badgeIcons[$product->special_badge] ?? 'fa-star';
                                @endphp
                                <div class="card-badge bg-gradient-to-r {{ $badgeColor }}">
                                    @if(($product->special_badge ?? '') === 'Paling Diminati')
                                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z"/></svg>
                                    @elseif(($product->special_badge ?? '') === 'Pilihan Lokal')
                                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>
                                    @elseif(($product->special_badge ?? '') === 'Spesial Diskon')
                                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>
                                    @else
                                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                    @endif
                                    {{ $product->special_badge }}
                                </div>
                            @endif
                        </div>

                        <!-- Card Info -->
                        <div class="card-body">
                            <div class="flex items-start justify-between gap-2">
                                <h3 class="text-card-title line-clamp-1 flex-1">{{ $product->name }}</h3>
                            </div>
                            <p class="text-price mt-1 text-[#E52F1E]">
                                Rp {{ number_format($product->price_per_day, 0, ',', '.') }}
                                <span class="text-caption font-normal text-[#E52F1E]">/ hari</span>
                            </p>
                        </div>
                    </a>
                </div>
            @empty
                <div class="w-full py-16 text-center text-gray-400">
                    <p class="text-sm">Belum ada produk tersedia.</p>
                </div>
            @endforelse
        </div>

        <!-- Mobile: See all -->
        <div class="mt-4 sm:hidden">
            <a href="{{ url('/sewa-alat') }}" class="text-sm font-medium text-gray-900 underline underline-offset-2">Lihat semua alat →</a>
        </div>
    </div>
</section>

<div class="divider"></div>

{{-- ============================================================
     PORTER SECTION
============================================================ --}}
<section class="section">
    <div class="container-main">

        <!-- Section Header -->
        <div class="flex items-end justify-between mb-6">
            <div>
                <h2 class="text-section-title">Porter Gunung</h2>
                <p class="text-sm text-gray-500 mt-1">Porter profesional hafal jalur</p>
            </div>
            <div class="flex items-center gap-4">
                <a href="{{ url('/porter-gunung') }}" class="text-sm font-medium text-gray-900 underline underline-offset-2 hidden sm:block hover:text-gray-600 transition-colors">
                    Lihat semua
                </a>
                <!-- Slider Nav Arrows -->
                <div class="hidden sm:flex items-center gap-1.5">
                    <button type="button" onclick="scrollGrid('porter-grid', 'left')" class="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition shadow-sm" aria-label="Slide Left">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <button type="button" onclick="scrollGrid('porter-grid', 'right')" class="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition shadow-sm" aria-label="Slide Right">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Porter Tabs -->
        <div class="flex gap-2 overflow-x-auto hide-scrollbar pb-4 mb-2">
            <button class="pill-tab active" data-category="all" onclick="filterPorters('all', this)">Semua Paket</button>
            <button class="pill-tab" data-category="Tektok" onclick="filterPorters('Tektok', this)">Tektok</button>
            <button class="pill-tab" data-category="Porter Inap" onclick="filterPorters('Porter Inap', this)">Porter Inap</button>
        </div>

        <!-- Porter Scroll Grid -->
        <div class="scroll-grid hide-scrollbar" id="porter-grid" style="padding-bottom: 8px;">
            @forelse($popularPorters as $porter)
                @php $pCat = $porter->category ?? 'Lainnya'; @endphp
                <div class="card-airbnb porter-card"
                     data-category="{{ $pCat }}"
                     style="width: 210px; flex-shrink: 0;">

                    <!-- Favorite -->
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
                                $imgSrc = $porter->image ? (str_starts_with($porter->image, 'http') ? $porter->image : asset('storage/' . $porter->image)) : 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be1?auto=format&fit=crop&w=500&q=80';
                            @endphp
                            <img src="{{ $imgSrc }}" alt="{{ $porter->name }}" loading="lazy">
                        </div>

                        <!-- Card Info -->
                        <div class="card-body">
                            <h3 class="text-card-title line-clamp-1">{{ $porter->name }}</h3>
                            <p class="text-caption mt-0.5">{{ $pCat }}</p>
                            <p class="text-price mt-1">Rp {{ number_format($porter->price_per_day, 0, ',', '.') }}</p>
                        </div>
                    </a>
                </div>
            @empty
                <div class="w-full py-16 text-center text-gray-400">
                    <p class="text-sm">Belum ada paket porter tersedia.</p>
                </div>
            @endforelse
        </div>

        <!-- Mobile: See all -->
        <div class="mt-4 sm:hidden">
            <a href="{{ url('/porter-gunung') }}" class="text-sm font-medium text-gray-900 underline underline-offset-2">Lihat semua paket →</a>
        </div>
    </div>
</section>

<div class="divider"></div>

{{-- ============================================================
     CAMPING PACKAGES SECTION
============================================================ --}}
<section class="section bg-[#ededed]">
    <div class="container-main">

        <!-- Section Header -->
        <div class="flex items-end justify-between mb-6">
            <div>
                <h2 class="text-section-title">Penawaran Terbaik</h2>
                <p class="text-sm text-gray-500 mt-1">Paket camping spesial</p>
            </div>
            <div class="flex items-center gap-4">
                <a href="{{ url('/paket-camping') }}" class="text-sm font-medium text-gray-900 underline underline-offset-2 hidden sm:block hover:text-gray-600 transition-colors">
                    Lihat semua
                </a>
                <!-- Slider Nav Arrows -->
                <div class="hidden sm:flex items-center gap-1.5">
                    <button type="button" onclick="scrollGrid('camping-slider', 'left')" class="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition shadow-sm" aria-label="Slide Left">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <button type="button" onclick="scrollGrid('camping-slider', 'right')" class="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition shadow-sm" aria-label="Slide Right">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Camping Scroll Grid -->
        <div class="scroll-grid hide-scrollbar" id="camping-slider" style="padding-bottom: 8px;">
            @forelse($campingPackages as $package)
                @php
                    $imagePath = $package->image ? (str_starts_with($package->image, 'http') ? $package->image : asset('storage/' . $package->image)) : 'https://images.unsplash.com/photo-1504280390224-2c3554e22295?auto=format&fit=crop&w=500&q=80';
                @endphp
                <div class="card-airbnb" style="width: 210px; flex-shrink: 0;">
                    <!-- Favorite -->
                    <button class="fav-btn favorite-btn text-gray-400"
                            data-id="camping-{{ $package->id }}"
                            data-type="camping"
                            data-name="{{ $package->name }}"
                            data-price="{{ $package->price }}"
                            data-image="{{ $imagePath }}"
                            data-link="{{ route('camping.detail', $package->slug) }}"
                            aria-label="Tambah ke wishlist">
                        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </button>

                    <a href="{{ route('camping.detail', $package->slug) }}" class="block">
                        <div class="card-image">
                            <img src="{{ $imagePath }}" alt="{{ $package->name }}" loading="lazy">
                            @if($package->special_badge)
                                @php
                                    $badgeColors = [
                                        'Paling Diminati' => 'from-red-500 to-orange-400',
                                        'Pilihan Lokal'   => 'from-blue-600 to-cyan-400',
                                        'Spesial Diskon'  => 'from-pink-500 to-orange-400',
                                        'Paling Hemat'    => 'from-green-600 to-emerald-400',
                                    ];
                                    $badgeIcons = [
                                        'Paling Diminati' => 'fa-fire',
                                        'Pilihan Lokal'   => 'fa-thumbs-up',
                                        'Spesial Diskon'  => 'fa-tag',
                                        'Paling Hemat'    => 'fa-star',
                                    ];
                                    $bc = $badgeColors[$package->special_badge] ?? 'from-gray-600 to-gray-400';
                                    $bi = $badgeIcons[$package->special_badge] ?? 'fa-star';
                                @endphp
                                <div class="card-badge bg-gradient-to-r {{ $bc }}">
                                    @if(($package->special_badge ?? '') === 'Paling Diminati')
                                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z"/></svg>
                                    @elseif(($package->special_badge ?? '') === 'Pilihan Lokal')
                                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>
                                    @elseif(($package->special_badge ?? '') === 'Spesial Diskon')
                                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>
                                    @else
                                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                    @endif
                                    {{ $package->special_badge }}
                                </div>
                            @endif
                        </div>
                        <div class="card-body">
                            <h3 class="text-card-title line-clamp-1">{{ $package->name }}</h3>
                            <p class="text-caption mt-0.5">{{ $package->tags ?? 'Paket Camping' }}</p>
                            <p class="text-price mt-1">Rp {{ number_format($package->price, 0, ',', '.') }}</p>
                        </div>
                    </a>
                </div>
            @empty
                <div class="w-full py-16 text-center text-gray-400">
                    <p class="text-sm">Belum ada penawaran tersedia.</p>
                </div>
            @endforelse

            <!-- See All Card -->
            <a href="{{ url('/paket-camping') }}"
               style="width: 210px; flex-shrink: 0;"
               class="rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center aspect-square hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 group">
                <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-gray-200 transition-colors">
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                </div>
                <span class="text-sm font-semibold text-gray-900">Lihat Semua</span>
                <span class="text-xs text-gray-500 mt-0.5">8+ Paket Camping</span>
            </a>
        </div>
    </div>
</section>

<div class="divider"></div>

{{-- ============================================================
     POPULAR MOUNTAINS
============================================================ --}}
<section class="section">
    <div class="container-main">
        <!-- Section Header -->
        <div class="flex items-end justify-between mb-6">
            <div>
                <h2 class="text-section-title">Gunung Populer</h2>
                <p class="text-sm text-gray-500 mt-1">Destinasi pendakian favorit di Indonesia</p>
            </div>
            <!-- Slider Nav Arrows -->
            <div class="hidden sm:flex items-center gap-1.5">
                <button type="button" onclick="scrollGrid('mountain-slider', 'left')" class="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition shadow-sm" aria-label="Slide Left">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button type="button" onclick="scrollGrid('mountain-slider', 'right')" class="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition shadow-sm" aria-label="Slide Right">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>
        </div>

        <div class="scroll-grid hide-scrollbar" id="mountain-slider" style="padding-bottom: 8px;">
            @if(isset($mountains) && $mountains->count() > 0)
                @foreach($mountains as $mountain)
                    @php
                        $imgSrc = $mountain->image ? (str_starts_with($mountain->image, 'http') ? $mountain->image : asset('storage/' . $mountain->image)) : 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80';
                    @endphp
                    <div class="card-airbnb" style="width: 210px; flex-shrink: 0;">
                        <a href="{{ route('mountain.detail', $mountain->slug) }}" class="block">
                            <div class="card-image">
                                <img src="{{ $imgSrc }}" alt="{{ $mountain->name }}" loading="lazy">
                            </div>
                            <div class="card-body">
                                <h3 class="text-card-title line-clamp-1">{{ $mountain->name }}</h3>
                                <p class="text-caption mt-0.5">{{ $mountain->location }}</p>
                                @if($mountain->elevation)
                                    <p class="text-price mt-1">{{ $mountain->elevation }}</p>
                                @endif
                            </div>
                        </a>
                    </div>
                @endforeach
            @else
                <div class="w-full py-16 text-center">
                    <p class="text-sm text-gray-400">Data gunung belum tersedia.</p>
                </div>
            @endif
        </div>
    </div>
</section>

<div class="divider"></div>

{{-- ============================================================
     CTA BANNER
============================================================ --}}
<section class="relative overflow-hidden bg-zinc-800 py-16 text-white border-b-8 border-secondary">
    <!-- Background pattern -->
    <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px); background-size: 40px 40px;"></div>

    <div class="container-main relative z-10">
        <div class="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div class="text-center md:text-left max-w-lg space-y-3">
                <h2 class="text-4xl font-anton tracking-wide uppercase leading-tight text-white">
                    Siap Menjelajahi <span class="text-white">Keindahan Wonosobo?</span>
                </h2>
                <p class="text-sm text-zinc-300 leading-relaxed">
                    Dapatkan perlengkapan terbaik dan layanan porter profesional untuk pengalaman mendaki yang aman, nyaman, dan tak terlupakan.
                </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full sm:w-auto">
                <a href="{{ url('/sewa-alat') }}" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xs bg-white hover:bg-white/90 active:scale-95 text-gray-900 font-bold text-sm transition-all shadow-md w-full sm:w-auto uppercase">
                    Sewa Alat Sekarang
                </a>
                <a href="{{ url('/porter-gunung') }}" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xs border border-white/30 bg-transparent hover:bg-white/10 hover:text-white active:scale-95 text-white font-bold text-sm transition-all w-full sm:w-auto uppercase">
                    Booking Porter
                </a>
            </div>
        </div>
    </div>
</section>

@push('scripts')
<script>
    // ====== Category Filter: Products ======
    function filterProducts(category, btn) {
        document.querySelectorAll('[data-category-group="products"] .pill-tab, #home-product-tabs .pill-tab').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.pill-tab[onclick*="filterProducts"]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.product-card').forEach(card => {
            card.style.display = (category === 'all' || card.dataset.category === category) ? 'block' : 'none';
        });
    }

    // ====== Category Filter: Porters ======
    function filterPorters(category, btn) {
        document.querySelectorAll('.pill-tab[onclick*="filterPorters"]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.porter-card').forEach(card => {
            card.style.display = (category === 'all' || card.dataset.category === category) ? 'block' : 'none';
        });
    }

    // ====== Grid Horizontal Slider Navigation ======
    function scrollGrid(gridId, direction) {
        const grid = document.getElementById(gridId);
        if (!grid) return;
        const scrollAmount = 600; // Pixels to scroll
        if (direction === 'left') {
            grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
</script>
@endpush
@endsection
