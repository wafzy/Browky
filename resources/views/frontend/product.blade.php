@extends('layouts.frontend')

@section('title', 'Sewa ' . $product->name . ' di Dieng Wonosobo | Sewa Alat Pendakian')

@section('content')
<div class="bg-white">
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumb -->
        <nav class="flex text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-2">
                <li><a href="{{ url('/') }}" class="hover:text-gray-900 transition">Home</a></li>
                <li><svg class="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg></li>
                <li><a href="{{ url('/sewa-alat') }}" class="hover:text-gray-900 transition">Sewa Alat</a></li>
                <li><svg class="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg></li>
                <li class="text-gray-900 font-medium truncate max-w-[150px] sm:max-w-xs">{{ $product->name }}</li>
            </ol>
        </nav>

        <!-- Main Product Info Row (Shopee Style) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-12 items-start">
            <!-- Left Column: Gallery Section (col-span-6) -->
            <div class="lg:col-span-6">
                <!-- 1. Gallery Section -->
                <div class="mb-8">
                    @php
                        $getImageUrl = function($path) {
                            if (!$path) return 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1200&q=80';
                            return str_starts_with($path, 'http') ? $path : asset('storage/' . $path);
                        };
                    @endphp
                    
                    <div class="aspect-square w-full rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                        <img src="{{ $getImageUrl($product->cover_image) }}" alt="{{ $product->name }}" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1200&q=80'">
                    </div>
                </div>
            </div>
            
            <!-- Right Column: Product Info & Booking Actions (col-span-6) -->
            <div class="lg:col-span-6 flex flex-col">
                <!-- Category Badge -->
                <div class="mb-2">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-primary uppercase tracking-wider">
                        {{ $product->category }}
                    </span>
                </div>
                
                <!-- Product Name (Title) -->
                <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-2">
                    {{ $product->name }}
                </h1>

                <!-- Like & Share Buttons -->
                <div class="flex items-center gap-4 mb-5 text-sm">
                    <!-- Favorite Button -->
                    <button type="button" 
                            class="favorite-btn flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition cursor-pointer select-none"
                            data-id="{{ $product->id }}"
                            data-type="product"
                            data-name="{{ $product->name }}"
                            data-price="{{ $product->price_per_day }}"
                            data-image="{{ $product->cover_image ? (str_starts_with($product->cover_image, 'http') ? $product->cover_image : asset('storage/' . $product->cover_image)) : 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=500&q=80' }}"
                            data-link="{{ url()->current() }}">
                        <svg class="w-4 h-4 fill-current transition-transform duration-200" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span class="font-medium text-gray-600 hover:text-gray-950 transition-colors">Favorit</span>
                    </button>

                    <span class="text-gray-300">|</span>

                    <!-- Share Button -->
                    <button type="button" 
                            onclick="shareProduct()" 
                            class="flex items-center gap-1.5 text-gray-400 hover:text-primary transition cursor-pointer select-none">
                        <svg class="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 10.742l4.028-2.014m0 0a3 3 0 10-2.243-4.077L6.445 6.66a3 3 0 114.028 4.077m4.028-4.077L15.263 17.65m0 0a3 3 0 11-4.243-4.243 3 3 0 014.243 4.243z"/>
                        </svg>
                        <span class="font-medium text-gray-600 hover:text-primary transition-colors">Bagikan</span>
                    </button>
                </div>
                
                <!-- Shopee-Style Price Box -->
                <div class="bg-gray-50 rounded-2xl p-5 border border-gray-200 mb-6">
                    <div class="flex items-baseline gap-2">
                        <span class="text-3xl sm:text-4xl font-extrabold text-primary">Rp{{ number_format($product->price_per_day, 0, ',', '.') }}</span>
                        <span class="text-sm font-medium text-gray-500">/ hari</span>
                    </div>
                </div>
                
                <!-- Booking Form -->
                <form action="{{ route('cart.add') }}" method="POST" class="space-y-6">
                    @csrf
                    <input type="hidden" name="product_id" value="{{ $product->id }}">
                    
                    <!-- Stock Status Row -->
                    <div class="flex items-center gap-4">
                        <span class="text-sm font-medium text-gray-500 w-20">Stok</span>
                        <span class="text-sm font-bold {{ $product->stock > 0 ? 'text-green-600' : 'text-red-600' }}">
                            {{ $product->stock > 0 ? 'Tersedia (' . $product->stock . ' unit)' : 'Habis' }}
                        </span>
                    </div>
                    
                    <!-- Quantity Selector Row -->
                    <div class="flex items-center gap-4">
                        <span class="text-sm font-medium text-gray-500 w-20">Jumlah</span>
                        <div class="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white w-max">
                            <button type="button" class="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50" onclick="decreaseQty()" {{ $product->stock <= 0 ? 'disabled' : '' }}>
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
                            </button>
                            <input type="number" id="quantity" name="quantity" value="1" min="1" max="{{ $product->stock }}" class="w-10 h-8 text-center p-0 border-y border-x-0 border-gray-300 focus:ring-0 text-sm font-medium bg-white text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" onchange="validateQty(this)" {{ $product->stock <= 0 ? 'disabled' : '' }}>
                            <button type="button" class="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50" onclick="increaseQty()" {{ $product->stock <= 0 ? 'disabled' : '' }}>
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Submit / CTA button -->
                    <button type="submit" class="w-full sm:w-64 flex justify-center py-3.5 px-6 rounded-xl font-bold text-white bg-primary hover:bg-blue-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed group shadow-sm" {{ $product->stock <= 0 ? 'disabled' : '' }}>
                        <span class="flex items-center gap-2">
                            <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            Pesan Sekarang
                        </span>
                    </button>
                </form>
                
                <!-- Guarantee/Payment info note -->
                <div class="mt-6 pt-6 border-t border-gray-150 flex items-center gap-2 text-xs text-gray-500">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>Pembayaran dilakukan secara langsung saat pengambilan alat di basecamp</span>
                </div>
            </div>
        </div>

        <!-- Row 2: Tabs/Details (Description & Features) -->
        <div class="mt-12 pt-8 border-t border-gray-200 grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-12">
            <div class="lg:col-span-8 flex flex-col">
                <!-- Description Section -->
                <div class="mb-8 pb-8 border-b border-gray-200">
                    <h3 class="text-xl font-bold mb-4 text-gray-900">Tentang Alat Ini</h3>
                    <div class="prose prose-sm md:prose-base text-gray-700 max-w-none">
                        {!! nl2br(e($product->description ?: 'Belum ada deskripsi untuk produk ini.')) !!}
                    </div>
                </div>

                <!-- Features Section -->
                <div class="mb-8">
                    <h3 class="text-xl font-bold mb-6 text-gray-900">Keunggulan Layanan</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                        <div class="flex items-start gap-4">
                            <div class="flex-shrink-0 mt-1">
                                <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-900 text-base">Kondisi alat terawat</h4>
                                <p class="text-sm text-gray-500 mt-1">Peralatan dibersihkan dan dicek ketat setelah digunakan.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="flex-shrink-0 mt-1">
                                <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-900 text-base">Siap pakai pendakian</h4>
                                <p class="text-sm text-gray-500 mt-1">Standar keamanan sangat terjamin untuk medan gunung Dieng.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="flex-shrink-0 mt-1">
                                <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-900 text-base">Sewa harian fleksibel</h4>
                                <p class="text-sm text-gray-500 mt-1">Sewa harian atau paket menyesuaikan itinerary pendakianmu.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="flex-shrink-0 mt-1">
                                <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-900 text-base">Ambil di basecamp Dieng</h4>
                                <p class="text-sm text-gray-500 mt-1">Pengambilan mudah di meeting point area wisata Dieng.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Rekomendasi Produk -->
        @if($relatedProducts->count() > 0)
        <div class="mt-20 pt-10 border-t border-gray-200">
            <h2 class="text-2xl font-extrabold text-gray-900 tracking-tight">Rekomendasi Lainnya</h2>
            <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
                @foreach($relatedProducts as $related)
                <div class="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden">
                    <!-- Favorite Button -->
                    <button class="absolute top-3 right-3 z-10 p-2 rounded-full bg-white bg-opacity-80 text-gray-400 hover:text-red-500 hover:bg-opacity-100 transition favorite-btn " 
                            data-id="{{ $related->id }}" 
                            data-type="product" 
                            data-name="{{ $related->name }}" 
                            data-price="{{ $related->price_per_day }}" 
                            data-image="{{ $related->cover_image ? $getImageUrl($related->cover_image) : 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=500&q=80' }}" 
                            data-link="{{ url('/sewa-alat/' . $related->slug) }}">
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </button>

                    <!-- Image 1:1 -->
                    <div class="aspect-square w-full overflow-hidden bg-gray-100 relative">
                        @php
                            $relatedImagePath = $getImageUrl($related->cover_image);
                        @endphp
                        <img src="{{ $relatedImagePath }}" alt="{{ $related->name }}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1200&q=80'">
                        @if($related->stock <= 0)
                            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <span class="text-white font-bold bg-red-600 px-3 py-1 rounded-md text-sm">Habis</span>
                            </div>
                        @endif
                    </div>
                    
                    <div class="p-5">
                        <div class="flex justify-between items-center text-xs text-gray-500 mb-2">
                            <span class="font-bold text-primary uppercase tracking-wider">{{ $related->category }}</span>
                        </div>
                        <h3 class="text-base font-bold text-gray-900 leading-snug mb-1 line-clamp-1">
                            <a href="{{ url('/sewa-alat/' . $related->slug) }}">
                                <span aria-hidden="true" class="absolute inset-0 z-0"></span>
                                {{ $related->name }}
                            </a>
                        </h3>
                        <p class="text-sm text-gray-500 line-clamp-2 mb-4">{{ $related->description }}</p>
                        <p class="text-lg font-bold text-gray-900">Rp {{ number_format($related->price_per_day, 0, ',', '.') }}<span class="text-xs font-normal text-gray-500"> / hari</span></p>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
        @endif
    </div>
</div>

@push('scripts')
<script>
    // Share Functionality
    async function shareProduct() {
        const shareData = {
            title: 'Sewa {{ $product->name }} | Browky Outdoor',
            text: 'Platform sewa alat pendakian & jasa porter gunung Wonosobo terpercaya.',
            url: window.location.href
        };
        
        let shared = false;
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                shared = true;
            } catch (err) {
                console.warn('Native share failed, falling back to clipboard copy:', err);
            }
        }
        
        if (!shared) {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                showToast('Link produk berhasil disalin!');
            }).catch(err => {
                console.error('Gagal menyalin link: ', err);
            });
        }
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-lg z-[999] opacity-0 transition-opacity duration-300';
        toast.innerText = message;
        document.body.appendChild(toast);
        
        // Trigger transition
        setTimeout(() => toast.classList.remove('opacity-0'), 10);
        
        // Hide and remove
        setTimeout(() => {
            toast.classList.add('opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    // Global Configuration
    const maxStock = {{ $product->stock }};
    const unitPrice = {{ $product->price_per_day }};

    // Desktop Quantity Selector Logic
    const qtyInput = document.getElementById('quantity');
    
    function increaseQty() {
        if (!qtyInput) return;
        let current = parseInt(qtyInput.value) || 1;
        if (current < maxStock) {
            qtyInput.value = current + 1;
        }
    }
    
    function decreaseQty() {
        if (!qtyInput) return;
        let current = parseInt(qtyInput.value) || 1;
        if (current > 1) {
            qtyInput.value = current - 1;
        }
    }
    
    function validateQty(input) {
        if (!input) return;
        let val = parseInt(input.value);
        if (isNaN(val) || val < 1) {
            input.value = 1;
        } else if (val > maxStock) {
            input.value = maxStock;
        }
    }

    // Mobile quantity script
    const mobileQtyInput = document.getElementById('mobile_quantity');
    const mobilePriceEl = document.getElementById('mobile_price');

    function updateMobilePrice(qty) {
        if (!mobilePriceEl) return;
        const total = unitPrice * qty;
        mobilePriceEl.innerText = 'Rp' + new Intl.NumberFormat('id-ID').format(total);
    }

    function increaseQtyMobile() {
        if (!mobileQtyInput) return;
        let current = parseInt(mobileQtyInput.value) || 1;
        if (current < maxStock) {
            mobileQtyInput.value = current + 1;
            updateMobilePrice(current + 1);
        }
    }

    function decreaseQtyMobile() {
        if (!mobileQtyInput) return;
        let current = parseInt(mobileQtyInput.value) || 1;
        if (current > 1) {
            mobileQtyInput.value = current - 1;
            updateMobilePrice(current - 1);
        }
    }

    function validateQtyMobile(input) {
        if (!input) return;
        let val = parseInt(input.value);
        if (isNaN(val) || val < 1) {
            val = 1;
        } else if (val > maxStock) {
            val = maxStock;
        }
        input.value = val;
        updateMobilePrice(val);
    }
</script>
@endpush

<!-- Mobile Sticky Bottom Bar -->
<div class="fixed lg:hidden bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4  pb-safe">
    <form action="{{ route('cart.add') }}" method="POST" class="flex justify-between items-center gap-2">
        @csrf
        <input type="hidden" name="product_id" value="{{ $product->id }}">
        
        <div class="flex flex-col">
            <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Total Harga</span>
            <span class="text-base sm:text-lg font-extrabold text-gray-900 leading-none" id="mobile_price">Rp{{ number_format($product->price_per_day, 0, ',', '.') }}</span>
        </div>
        
        <div class="flex items-center gap-2 sm:gap-3">
            <div class="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
                <button type="button" class="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50" onclick="decreaseQtyMobile()" {{ $product->stock <= 0 ? 'disabled' : '' }}>
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
                </button>
                <input type="number" id="mobile_quantity" name="quantity" value="1" min="1" max="{{ $product->stock }}" class="w-10 h-8 text-center p-0 border-y border-x-0 border-gray-300 focus:ring-0 text-sm font-medium bg-white text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" onchange="validateQtyMobile(this)" {{ $product->stock <= 0 ? 'disabled' : '' }}>
                <button type="button" class="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50" onclick="increaseQtyMobile()" {{ $product->stock <= 0 ? 'disabled' : '' }}>
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                </button>
            </div>
            <button type="submit" class="bg-primary hover:bg-blue-800 text-white font-bold py-2 px-4 sm:px-5 rounded-lg transition disabled:bg-gray-400 text-sm sm:text-base whitespace-nowrap " {{ $product->stock <= 0 ? 'disabled' : '' }}>
                Pesan
            </button>
        </div>
    </form>
</div>

@endsection
