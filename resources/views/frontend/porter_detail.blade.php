@extends('layouts.frontend')

@section('title', 'Sewa Jasa Porter ' . $porter->name . ' di Dieng Wonosobo | Browky')

@section('content')
<div class="bg-white">
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumb -->
        <nav class="flex text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-2">
                <li><a href="{{ url('/') }}" class="hover:text-gray-900 transition">Home</a></li>
                <li><svg class="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg></li>
                <li><a href="{{ url('/porter-gunung') }}" class="hover:text-gray-900 transition">Jasa Porter</a></li>
                <li><svg class="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg></li>
                <li class="text-gray-900 font-medium truncate max-w-[150px] sm:max-w-xs">{{ $porter->name }}</li>
            </ol>
        </nav>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-12">
            <!-- LEFT COLUMN -->
            <div class="lg:col-span-8 flex flex-col">
                
                <!-- 1. Gallery Section (1 large image for Porter) -->
                <div class="mb-8">
                    @php
                        $imagePath = $porter->image ? (str_starts_with($porter->image, 'http') ? $porter->image : asset('storage/' . $porter->image)) : 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be1?auto=format&fit=crop&w=1200&q=80';
                    @endphp
                    <div class="aspect-video sm:aspect-square md:aspect-[16/9] w-full rounded-2xl overflow-hidden relative border border-gray-200">
                        <img src="{{ $imagePath }}" alt="{{ $porter->name }}" class="w-full h-full object-cover">
                    </div>
                </div>

                <!-- 2. Title Section -->
                <div class="mb-8 border-b pb-8 border-gray-200">
                    <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">{{ $porter->name }}</h1>
                    <div class="mt-4 flex items-center text-sm text-gray-600 gap-6">
                        <span class="flex items-center gap-1 font-medium"><svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Berpengalaman</span>
                        <span class="flex items-center gap-1 font-medium"><svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Tepat Waktu</span>
                    </div>
                </div>

                <!-- 3. Features Section -->
                <div class="mb-8 pb-8 border-b border-gray-200">
                    <h3 class="text-xl font-bold mb-6 text-gray-900">Keunggulan Layanan</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                        <div class="flex items-start gap-4">
                            <div class="flex-shrink-0 mt-1">
                                <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-900 text-base">Porter berpengalaman</h4>
                                <p class="text-sm text-gray-500 mt-1">Tim kami terdiri dari warga lokal yang sudah terbiasa dengan medan Dieng.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="flex-shrink-0 mt-1">
                                <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-900 text-base">Familiar jalur gunung</h4>
                                <p class="text-sm text-gray-500 mt-1">Mengetahui dengan pasti kondisi trek Gunung Prau, Sindoro, dan Sumbing.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="flex-shrink-0 mt-1">
                                <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-900 text-base">Bantu logistik pendakian</h4>
                                <p class="text-sm text-gray-500 mt-1">Siap membawakan perlengkapan kelompok dari basecamp hingga area camp.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="flex-shrink-0 mt-1">
                                <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-900 text-base">Bisa guide pendakian</h4>
                                <p class="text-sm text-gray-500 mt-1">Tidak hanya angkut barang, porter kami bisa menjadi penunjuk arah.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 4. Removed Inline Mobile Booking Card for Sticky Bottom Bar -->

                <!-- 5. Description Section -->
                <div class="mb-8 pb-8 border-b border-gray-200">
                    <h3 class="text-xl font-bold mb-4 text-gray-900">Tentang Layanan Ini</h3>
                    <div class="prose prose-sm md:prose-base text-gray-700 max-w-none">
                        {!! nl2br(e($porter->description)) !!}
                    </div>
                </div>

                <!-- 6. Specifications Section -->
                <div class="mb-8">
                    <h3 class="text-xl font-bold mb-4 text-gray-900">Spesifikasi Layanan</h3>
                    <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                            <div class="flex items-center justify-between py-2 border-b border-gray-100">
                                <span class="text-gray-500 text-sm">Jenis Layanan</span>
                                <span class="font-medium text-gray-900 text-sm">Porter Gunung</span>
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-gray-100">
                                <span class="text-gray-500 text-sm">Kapasitas Angkut</span>
                                <span class="font-medium text-gray-900 text-sm">Maks. 15-20kg</span>
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-gray-100 sm:border-b-0">
                                <span class="text-gray-500 text-sm">Durasi</span>
                                <span class="font-medium text-gray-900 text-sm">Per Trip / Hari</span>
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-gray-100 sm:border-b-0">
                                <span class="text-gray-500 text-sm">Area Operasional</span>
                                <span class="font-medium text-gray-900 text-sm">Dieng & Sekitarnya</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- RIGHT COLUMN: Desktop Booking Card -->
            <div class="hidden lg:block lg:col-span-4">
                <div class="sticky top-28">
                    @include('frontend.components.booking_card_porter')
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Mobile Sticky Bottom Bar -->
<div class="fixed lg:hidden bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] pb-safe">
    <div class="flex justify-between items-center gap-4">
        <div class="flex flex-col">
            <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Mulai Dari</span>
            <span class="text-base sm:text-lg font-extrabold text-gray-900 leading-none">Rp{{ number_format($porter->price_per_day, 0, ',', '.') }}</span>
        </div>
        
        <a href="https://wa.me/6287834443012?text={{ urlencode('Halo Admin Browky, saya tertarik dengan paket porter: ' . $porter->name . '. Mohon informasi lebih lanjut.') }}" target="_blank" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-6 rounded-lg transition text-sm sm:text-base shadow-sm flex items-center gap-2">
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M22 12c0 5.523-4.477 10-10 10a9.964 9.964 0 01-5.11-1.405l-4.402 1.155 1.171-4.286A9.957 9.957 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10zM12 4a8 8 0 102.827 15.485l-2.45-1.294-1.423 3.916 3.916-1.423-1.294-2.45A8 8 0 0012 4zm1.465 11.232c-.305.155-1.808.892-2.088.995-.28.102-.486.155-.69.155-.203 0-.585-.306-.69-.586-.105-.28-.105-.838-.105-1.144 0-.306.105-.838.335-1.144.23-.306.585-.586.89-.89.306-.306.406-.41.61-.41s.406.104.61.41c.204.306.89 1.144 1.045 1.348.155.204.305.306.61.306h.001z" clip-rule="evenodd"></path>
            </svg>
            Pesan via WA
        </a>
    </div>
</div>

@endsection
