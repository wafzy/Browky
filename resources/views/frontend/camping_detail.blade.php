@extends('layouts.frontend')

@section('title', $package->name . ' di Dieng Wonosobo | Browky')

@section('content')
<div class="bg-white">
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumb -->
        <nav class="flex text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-2">
                <li><a href="{{ url('/') }}" class="hover:text-gray-900 transition">Home</a></li>
                <li><svg class="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg></li>
                <li class="text-gray-900 font-medium truncate max-w-[150px] sm:max-w-xs">{{ $package->name }}</li>
            </ol>
        </nav>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-12">
            <!-- LEFT COLUMN -->
            <div class="lg:col-span-8 flex flex-col">
                
                <!-- 1. Gallery Section -->
                <div class="mb-8">
                    @php
                        $imagePath = $package->image ? (str_starts_with($package->image, 'http') ? $package->image : asset('storage/' . $package->image)) : 'https://images.unsplash.com/photo-1504280390224-2c3554e22295?auto=format&fit=crop&w=1200&q=80';
                    @endphp
                    <div class="aspect-video sm:aspect-square md:aspect-[16/9] w-full rounded-2xl overflow-hidden relative border border-gray-200">
                        <img src="{{ $imagePath }}" alt="{{ $package->name }}" class="w-full h-full object-cover">
                    </div>
                </div>

                <!-- 2. Title Section -->
                <div class="mb-8 border-b pb-8 border-gray-200">
                    <div class="flex items-center gap-2 mb-2">
                        @if($package->tags)
                            @foreach(explode(',', $package->tags) as $tag)
                                <span class="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md font-medium border border-gray-200">{{ trim($tag) }}</span>
                            @endforeach
                        @else
                            <span class="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md font-medium border border-gray-200">Paket Lengkap</span>
                        @endif
                    </div>
                    <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">{{ $package->name }}</h1>
                    <div class="mt-4 flex items-center text-sm text-gray-600 gap-6">
                        <span class="flex items-center gap-1 font-medium"><svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Alat Termasuk</span>
                        <span class="flex items-center gap-1 font-medium"><svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Jasa Termasuk</span>
                    </div>
                </div>

                <!-- 3. Description Section -->
                <div class="mb-8 pb-8 border-b border-gray-200">
                    <h3 class="text-xl font-bold mb-4 text-gray-900">Tentang Paket Ini</h3>
                    <div class="prose prose-sm md:prose-base text-gray-700 max-w-none">
                        {!! nl2br(e($package->description)) !!}
                    </div>
                </div>

                <!-- 4. Facilities Section -->
                <div class="mb-8">
                    <h3 class="text-xl font-bold mb-4 text-gray-900">Fasilitas yang Didapat</h3>
                    <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                        <div class="prose prose-sm md:prose-base text-gray-700 max-w-none">
                            @if($package->facilities)
                                <ul class="list-disc pl-5 space-y-2">
                                    @foreach(explode(',', $package->facilities) as $facility)
                                        <li>{{ trim($facility) }}</li>
                                    @endforeach
                                </ul>
                            @else
                                <p class="text-gray-500 italic">Detail fasilitas tidak disebutkan, silakan tanyakan admin.</p>
                            @endif
                        </div>
                    </div>
                </div>
            </div>

            <!-- RIGHT COLUMN: Desktop Booking Card -->
            <div class="hidden lg:block lg:col-span-4">
                <div class="sticky top-28">
                    @include('frontend.components.booking_card_camping')
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
            <span class="text-base sm:text-lg font-extrabold text-gray-900 leading-none">Rp{{ number_format($package->price, 0, ',', '.') }}</span>
        </div>
        
        <a href="https://wa.me/6287834443012?text={{ urlencode('Halo Admin Browky, saya tertarik dengan ' . $package->name . '. Mohon informasi lebih lanjut.') }}" target="_blank" class="bg-primary hover:bg-blue-950 text-white font-bold py-2.5 px-6 rounded-lg transition text-sm sm:text-base shadow-sm flex items-center gap-2">
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M22 12c0 5.523-4.477 10-10 10a9.964 9.964 0 01-5.11-1.405l-4.402 1.155 1.171-4.286A9.957 9.957 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10zM12 4a8 8 0 102.827 15.485l-2.45-1.294-1.423 3.916 3.916-1.423-1.294-2.45A8 8 0 0012 4zm1.465 11.232c-.305.155-1.808.892-2.088.995-.28.102-.486.155-.69.155-.203 0-.585-.306-.69-.586-.105-.28-.105-.838-.105-1.144 0-.306.105-.838.335-1.144.23-.306.585-.586.89-.89.306-.306.406-.41.61-.41s.406.104.61.41c.204.306.89 1.144 1.045 1.348.155.204.305.306.61.306h.001z" clip-rule="evenodd"></path>
            </svg>
            Pesan via WA
        </a>
    </div>
</div>

@endsection
