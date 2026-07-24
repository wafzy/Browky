@extends('layouts.frontend')

@section('title', 'Info Pendakian ' . $mountain->name . ' | Browky')

@section('content')

<!-- Hero Section for Mountain -->
<div class="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
    @php
        $imgSrc = $mountain->image ? (str_starts_with($mountain->image, 'http') ? $mountain->image : asset('storage/' . $mountain->image)) : 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80';
    @endphp
    <img src="{{ $imgSrc }}" alt="{{ $mountain->name }}" class="absolute inset-0 w-full h-full object-cover">
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    
    <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center px-4">
            <h1 class="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">{{ $mountain->name }}</h1>
            <div class="flex items-center justify-center gap-4 text-white/90 text-sm md:text-base font-medium">
                <span class="flex items-center gap-1">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {{ $mountain->location }}
                </span>
                @if($mountain->elevation)
                    <span class="hidden md:inline">•</span>
                    <span class="flex items-center gap-1">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                        {{ $mountain->elevation }}
                    </span>
                @endif
            </div>
        </div>
    </div>
</div>

<div class="bg-gray-50 py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Description -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Tentang {{ $mountain->name }}</h2>
            <div class="prose prose-blue max-w-none text-gray-700">
                @if($mountain->description)
                    {!! nl2br(e($mountain->description)) !!}
                @else
                    <p>Informasi detail mengenai {{ $mountain->name }} sedang dalam tahap pembaruan. Gunung ini merupakan salah satu destinasi pendakian populer yang menawarkan pemandangan alam memukau dan pengalaman mendaki yang tak terlupakan.</p>
                @endif
            </div>
        </div>

        <!-- Call to Action -->
        <div class="bg-gradient-to-br from-primary to-blue-800 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
            <!-- Background Decoration -->
            <svg class="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 text-white opacity-10 w-96 h-96" fill="currentColor" viewBox="0 0 24 24"><path d="M14 11.5l3-3 5 5V21H2V13.5l5-5 3 3 4-4z"></path></svg>
            
            <div class="relative z-10">
                <h3 class="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">Siap Mewujudkan Pendakian ke {{ $mountain->name }}?</h3>
                <p class="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                    Ingin mewujudkan pergi ke gunung ini dan membutuhkan porter yang berpengalaman? Atau butuh melengkapi peralatan pendakian? Hubungi kami sekarang!
                </p>
                <div class="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="{{ url('/porter-gunung') }}" class="inline-flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-bold rounded-xl text-primary bg-white hover:bg-gray-50 transition shadow-lg hover:shadow-xl">
                        Cari Porter
                    </a>
                    <a href="{{ url('/rental-alat') }}" class="inline-flex items-center justify-center px-6 py-3.5 border-2 border-white text-base font-bold rounded-xl text-white hover:bg-white hover:text-primary transition shadow-lg hover:shadow-xl">
                        Sewa Alat
                    </a>
                </div>
            </div>
        </div>

    </div>
</div>

@endsection
