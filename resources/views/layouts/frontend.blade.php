<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Lucide & Modern Styling -->

    <title>@yield('title', 'Browky - Sewa Alat Pendakian & Porter Gunung Wonosobo Terpercaya')</title>
    <meta name="description" content="@yield('meta_description', 'Browky adalah platform sewa alat pendakian dan jasa porter gunung terpercaya di Wonosobo, Jawa Tengah. Tenda, carrier, sleeping bag, dan porter profesional untuk pendakian Dieng, Prau, Sumbing & Sindoro. Booking mudah, harga terjangkau.')">
    <meta name="keywords" content="@yield('meta_keywords', 'sewa alat pendakian wonosobo, sewa pendakian wonosobo, porter wonosobo, sewa tenda wonosobo, jasa porter gunung wonosobo, porter gunung prau, porter sindoro, porter sumbing, sewa alat outdoor wonosobo, perlengkapan mendaki wonosobo, browky outdoor')">
    <meta name="robots" content="index, follow">
    <meta name="author" content="Browky Outdoor">
    <meta name="geo.region" content="ID-JT">
    <meta name="geo.placename" content="Wonosobo, Jawa Tengah">
    <link rel="canonical" href="@yield('canonical', url()->current())">

    {{-- Open Graph / Facebook --}}
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="@yield('og_title', 'Browky - Sewa Alat Pendakian & Porter Wonosobo')">
    <meta property="og:description" content="@yield('og_description', 'Platform sewa alat pendakian dan jasa porter gunung terpercaya di Wonosobo. Tenda, carrier, sleeping bag & porter profesional dengan harga terjangkau.')">
    <meta property="og:image" content="@yield('og_image', asset('images/og-browky.jpg'))">
    <meta property="og:site_name" content="Browky Outdoor">
    <meta property="og:locale" content="id_ID">

    {{-- Twitter Card --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="@yield('og_title', 'Browky - Sewa Alat Pendakian & Porter Wonosobo')">
    <meta name="twitter:description" content="@yield('og_description', 'Platform sewa alat pendakian dan jasa porter gunung terpercaya di Wonosobo.')">
    <meta name="twitter:image" content="@yield('og_image', asset('images/og-browky.jpg'))">

    {{-- JSON-LD Structured Data --}}
    @hasSection('structured_data')
        @yield('structured_data')
    @else
    <script type="application/ld+json">
    {
      "@@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Browky Outdoor",
      "description": "Penyedia jasa sewa alat pendakian gunung dan jasa porter profesional di Wonosobo, Jawa Tengah.",
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
      "areaServed": ["Wonosobo", "Dieng", "Gunung Prau", "Gunung Sumbing", "Gunung Sindoro"]
    }
    </script>
    @endif

    <!-- Favicon & App Icons -->
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    <link rel="icon" type="image/svg+xml" href="{{ asset('favicon.svg') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('apple-touch-icon.png') }}">
    <link rel="icon" type="image/png" sizes="192x192" href="{{ asset('favicon-192x192.png') }}">
    <link rel="icon" type="image/png" sizes="512x512" href="{{ asset('favicon-512x512.png') }}">
    <link rel="manifest" href="{{ asset('site.webmanifest') }}">
    <meta name="theme-color" content="#ffffff">

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="font-sans antialiased bg-white text-gray-900 flex flex-col min-h-screen">

    <!-- ========== NAVBAR ========== -->
    <header class="navbar {{ request()->is('/') ? 'navbar-transparent' : '' }}" id="site-header">
        <div class="container-main h-full flex items-center justify-between">

            <!-- Logo -->
            <a href="{{ url('/') }}" class="flex-shrink-0">
                <img src="{{ asset('images/logobrowkyoutdoor.png') }}" alt="Browky Outdoor" class="h-9 w-auto">
            </a>

            <!-- Nav Links — Desktop -->
            <nav class="hidden md:flex items-center gap-8" aria-label="Main Navigation">
                <a href="{{ url('/sewa-alat') }}" class="nav-link {{ request()->is('sewa-alat*') ? 'active' : '' }}">
                    Sewa Alat
                </a>
                <a href="{{ url('/porter-gunung') }}" class="nav-link {{ request()->is('porter-gunung*') ? 'active' : '' }}">
                    Porter Gunung
                </a>
                <a href="{{ url('/paket-camping') }}" class="nav-link {{ request()->is('paket-camping*') ? 'active' : '' }}">
                    Paket Camping
                </a>
                <a href="https://maps.app.goo.gl/xSWc6pS5EA7Mnzzo9" target="_blank" rel="noopener" class="nav-link">
                    Lokasi
                </a>
            </nav>

            <!-- Right Actions -->
            <div class="flex items-center gap-1">
                <!-- Wishlist -->
                <a href="{{ url('/favorit') }}" class="icon-btn relative" title="Wishlist" id="nav-wishlist-btn">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span id="favorite-counter" style="display:none;" class="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-red-500 rounded-full"></span>
                </a>

                <!-- Cart -->
                <a href="{{ url('/keranjang') }}" class="icon-btn relative" title="Keranjang">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    @if(session('cart') && count(session('cart')) > 0)
                    <span class="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-red-500 rounded-full">
                        {{ count(session('cart')) }}
                    </span>
                    @endif
                </a>

                <!-- Mobile menu button -->
                <button id="mobile-menu-button" type="button" class="icon-btn md:hidden ml-1" aria-label="Open menu">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-100">
            <div class="container-main py-4 flex flex-col gap-1">
                <a href="{{ url('/') }}" class="px-3 py-3 rounded-lg text-sm font-medium uppercase tracking-tight {{ request()->is('/') ? 'bg-gray-50 text-gray-900' : 'text-gray-600' }} hover:bg-gray-50">
                    Home
                </a>
                <a href="{{ url('/sewa-alat') }}" class="px-3 py-3 rounded-lg text-sm font-medium uppercase tracking-tight {{ request()->is('sewa-alat*') ? 'bg-gray-50 text-gray-900' : 'text-gray-600' }} hover:bg-gray-50">
                    Sewa Alat
                </a>
                <a href="{{ url('/porter-gunung') }}" class="px-3 py-3 rounded-lg text-sm font-medium uppercase tracking-tight {{ request()->is('porter-gunung*') ? 'bg-gray-50 text-gray-900' : 'text-gray-600' }} hover:bg-gray-50">
                    Porter Gunung
                </a>
                <a href="{{ url('/paket-camping') }}" class="px-3 py-3 rounded-lg text-sm font-medium uppercase tracking-tight {{ request()->is('paket-camping*') ? 'bg-gray-50 text-gray-900' : 'text-gray-600' }} hover:bg-gray-50">
                    Paket Camping
                </a>
                <a href="https://maps.app.goo.gl/xSWc6pS5EA7Mnzzo9" target="_blank" class="px-3 py-3 rounded-lg text-sm font-medium uppercase tracking-tight text-gray-600 hover:bg-gray-50">
                    Lokasi
                </a>
                <div class="divider mt-2"></div>
                <div class="flex items-center gap-2 px-3 py-3 text-sm text-gray-500">
                    <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    <a href="https://wa.me/6287834443012" class="hover:text-gray-900">+62 878-3444-3012</a>
                </div>
            </div>
        </div>
    </header>

    <!-- ========== MAIN CONTENT ========== -->
    <main class="flex-grow" x-data="{ loaded: false }" x-init="window.addEventListener('load', () => setTimeout(() => loaded = true, 300))">
        <!-- Skeleton Loading -->
        <div x-show="!loaded" class="container-main py-12 animate-pulse space-y-6">
            <div class="h-72 bg-gray-100 rounded-2xl w-full"></div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="h-52 bg-gray-100 rounded-2xl"></div>
                <div class="h-52 bg-gray-100 rounded-2xl"></div>
                <div class="h-52 bg-gray-100 rounded-2xl hidden md:block"></div>
                <div class="h-52 bg-gray-100 rounded-2xl hidden md:block"></div>
            </div>
        </div>

        <!-- Real Content -->
        <div x-show="loaded" style="display:none;"
             x-transition:enter="transition ease-out duration-300"
             x-transition:enter-start="opacity-0"
             x-transition:enter-end="opacity-100">
            @yield('content')
        </div>
    </main>

    <!-- ========== FOOTER ========== -->
    <footer class="bg-zinc-950 text-zinc-300 mt-auto border-t border-zinc-800">
        <div class="max-w-7xl mx-auto px-4 md:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-10">

                <!-- Brand Column -->
                <div class="md:col-span-2 space-y-4">
                    <img src="{{ asset('images/logobrowkyoutdoor.png') }}" alt="Browky Outdoor" class="h-8 w-auto filter brightness-0 invert">
                    <p class="text-sm text-zinc-400 leading-relaxed max-w-sm">
                        Platform sewa alat pendakian & jasa porter profesional di Wonosobo, Jawa Tengah. Melayani pendakian Gunung Prau, Sumbing, Sindoro & Dieng.
                    </p>
                </div>

                <!-- Navigation -->
                <div class="space-y-4">
                    <h3 class="text-xs font-bold uppercase tracking-wider text-white">Layanan</h3>
                    <ul class="space-y-2.5">
                        <li><a href="{{ url('/sewa-alat') }}" class="footer-link text-zinc-400 hover:text-white">Sewa Alat Pendakian</a></li>
                        <li><a href="{{ url('/porter-gunung') }}" class="footer-link text-zinc-400 hover:text-white">Jasa Porter Gunung</a></li>
                        <li><a href="{{ url('/paket-camping') }}" class="footer-link text-zinc-400 hover:text-white">Paket Camping</a></li>
                        <li><a href="{{ url('/favorit') }}" class="footer-link text-zinc-400 hover:text-white">Wishlist Saya</a></li>
                        <li><a href="{{ url('/keranjang') }}" class="footer-link text-zinc-400 hover:text-white">Keranjang</a></li>
                    </ul>
                </div>

                <!-- Contact -->
                <div>
                    <h3 class="footer-heading mb-4 text-white">Hubungi Kami</h3>
                    <ul class="space-y-3">
                        <li>
                            <a href="https://wa.me/6287834443012" target="_blank" class="flex items-center gap-3 footer-link text-zinc-400 hover:text-white group">
                                <svg class="w-4 h-4 text-zinc-400 group-hover:text-green-500 transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                                <span>+62 878-3444-3012</span>
                            </a>
                        </li>
                        <li>
                            <a href="mailto:hello@browkyoutdoor.com" class="flex items-center gap-3 footer-link text-zinc-400 hover:text-white group">
                                <svg class="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                <span>hello@browkyoutdoor.com</span>
                            </a>
                        </li>
                        <li class="pt-3">
                            <div class="flex items-center gap-3">
                                <a href="https://www.tiktok.com/@browkyoutdoor" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-cyan-400 hover:bg-zinc-900 transition-all duration-200" aria-label="TikTok">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
                                </a>
                                <a href="https://www.instagram.com/browkyoutdoor" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-pink-500 hover:bg-zinc-900 transition-all duration-200" aria-label="Instagram">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                                </a>
                                <a href="https://www.youtube.com/@browkyoutdoor" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-red-500 hover:bg-zinc-900 transition-all duration-200" aria-label="YouTube">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor"/></svg>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-zinc-900">
            <div class="container-main py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p class="text-sm text-zinc-500">© {{ date('Y') }} Browky Outdoor. All rights reserved.</p>
                <p class="text-sm text-zinc-500">Website by <a href="#" class="text-zinc-500 hover:text-white transition-colors underline underline-offset-2">Ralwaf.</a></p>
            </div>
        </div>
    </footer>

    <script>
        // Mobile Menu Toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const header = document.getElementById('site-header');
        const isHome = {{ request()->is('/') ? 'true' : 'false' }};
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
                if (isHome) {
                    if (!mobileMenu.classList.contains('hidden')) {
                        header.classList.remove('navbar-transparent');
                        header.classList.add('navbar-scrolled');
                    } else if (window.scrollY <= 50) {
                        header.classList.add('navbar-transparent');
                        header.classList.remove('navbar-scrolled');
                    }
                }
            });
        }

        // Scroll listener for sticky header and transparent transition
        function handleScroll() {
            if (isHome) {
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    header.classList.remove('navbar-transparent');
                    header.classList.add('navbar-scrolled');
                    return;
                }
                if (window.scrollY > 50) {
                    header.classList.remove('navbar-transparent');
                    header.classList.add('navbar-scrolled');
                } else {
                    header.classList.add('navbar-transparent');
                    header.classList.remove('navbar-scrolled');
                }
            } else {
                if (window.scrollY > 10) {
                    header.style.boxShadow = '0 1px 8px rgba(0,0,0,0.08)';
                } else {
                    header.style.boxShadow = 'none';
                }
            }
        }
        
        if (isHome) {
            handleScroll();
        }
        window.addEventListener('scroll', handleScroll);

        // ============= GLOBAL FAVORITES SYSTEM =============
        document.addEventListener('DOMContentLoaded', () => {
            const getFavorites = () => JSON.parse(localStorage.getItem('browky_favorites')) || [];
            const setFavorites = (favs) => localStorage.setItem('browky_favorites', JSON.stringify(favs));

            const updateFavoriteIcons = () => {
                const favs = getFavorites();
                const favIds = favs.map(f => f.id);

                document.querySelectorAll('.favorite-btn').forEach(btn => {
                    const icon = btn.querySelector('svg, i');
                    if (favIds.includes(btn.dataset.id)) {
                        btn.classList.add('text-red-500');
                        btn.classList.remove('text-gray-400');
                    } else {
                        btn.classList.add('text-gray-400');
                        btn.classList.remove('text-red-500');
                    }
                });

                const counter = document.getElementById('favorite-counter');
                if (counter) {
                    if (favs.length > 0) {
                        counter.textContent = favs.length;
                        counter.style.display = 'flex';
                    } else {
                        counter.style.display = 'none';
                    }
                }
            };

            updateFavoriteIcons();

            document.querySelectorAll('.favorite-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    const id = btn.dataset.id;
                    const item = {
                        id, type: btn.dataset.type,
                        name: btn.dataset.name,
                        price: btn.dataset.price,
                        image: btn.dataset.image,
                        link: btn.dataset.link,
                        timestamp: Date.now()
                    };

                    let favs = getFavorites();
                    const index = favs.findIndex(f => f.id === id);

                    if (index > -1) {
                        favs.splice(index, 1);
                    } else {
                        favs.push(item);
                        // Heart animation
                        btn.style.transform = 'scale(1.3)';
                        setTimeout(() => btn.style.transform = '', 200);
                    }

                    setFavorites(favs);
                    updateFavoriteIcons();
                    window.dispatchEvent(new Event('favorites-updated'));
                });
            });
        });
    </script>
    <!-- WhatsApp Floating Button -->
    <a href="https://wa.me/6287834443012" target="_blank" rel="noopener" class="wa-float flex items-center justify-center" title="Hubungi Kami via WhatsApp" aria-label="Hubungi Kami via WhatsApp">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
    </a>

    @stack('scripts')
</body>
</html>
