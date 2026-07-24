@extends('layouts.frontend')

@section('title', 'Keranjang Saya - Browky')

@section('content')
<div class="bg-gray-50 py-12 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-extrabold text-gray-900 mb-8">Keranjang Saya</h1>

        @if(session('success'))
            <div class="bg-green-50 border-l-4 border-green-400 p-4 mb-8">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm text-green-700">
                            {{ session('success') }}
                        </p>
                    </div>
                </div>
            </div>
        @endif

        @if(session('error'))
            <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                        </svg>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm text-red-700">
                            {{ session('error') }}
                        </p>
                    </div>
                </div>
            </div>
        @endif

        @if(count($cart) > 0)
        <div class="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            <div class="lg:col-span-7">
                <div class="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                    <ul role="list" class="divide-y divide-gray-100">
                        @foreach($cart as $id => $details)
                        <li class="flex p-4 sm:p-5 hover:bg-gray-50/50 transition-colors duration-150">
                            <div class="flex-shrink-0">
                                @php
                                    $imgSrc = 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=200&q=80';
                                    if (!empty($details['image'])) {
                                        if (str_starts_with($details['image'], 'http') || str_starts_with($details['image'], 'https')) {
                                            $imgSrc = $details['image'];
                                        } else {
                                            $hasPublicPrefix = str_starts_with($details['image'], '/storage') || str_starts_with($details['image'], '/images') || str_starts_with($details['image'], '/assets');
                                            $cleanPath = $hasPublicPrefix 
                                                ? $details['image'] 
                                                : (str_starts_with($details['image'], '/') ? '/storage' . $details['image'] : '/storage/' . $details['image']);
                                            $imgSrc = asset($cleanPath);
                                        }
                                    }
                                @endphp
                                <img src="{{ $imgSrc }}" alt="{{ $details['name'] }}" class="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-center object-cover border border-gray-100 bg-gray-100">
                            </div>

                            <div class="ml-4 flex-1 flex flex-col justify-between">
                                <div class="flex justify-between items-start gap-2">
                                    <div>
                                        <h3 class="text-sm font-bold text-gray-900 leading-tight">
                                            {{ $details['name'] }}
                                        </h3>
                                        <p class="mt-0.5 text-xs text-gray-400 font-medium">Sewa Harian / Paket</p>
                                    </div>
                                    <p class="text-sm font-extrabold text-gray-900 whitespace-nowrap">Rp {{ number_format($details['price'] * $details['quantity'], 0, ',', '.') }}</p>
                                </div>

                                <div class="flex items-center justify-between mt-3">
                                    <div class="flex items-center">
                                        <form action="{{ route('cart.update') }}" method="POST" class="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                                            @csrf
                                            <input type="hidden" name="id" value="{{ $id }}">
                                            
                                            <button type="submit" name="quantity" value="{{ $details['quantity'] - 1 }}" class="px-2.5 py-1.5 bg-gray-50 text-gray-500 hover:bg-gray-100 transition disabled:opacity-40" {{ $details['quantity'] <= 1 ? 'disabled' : '' }}>
                                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
                                            </button>
                                            
                                            <input type="number" readonly value="{{ $details['quantity'] }}" class="w-9 text-center p-1 border-x border-gray-200 border-y-0 focus:ring-0 text-xs font-bold bg-white text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none">
                                            
                                            <button type="submit" name="quantity" value="{{ $details['quantity'] + 1 }}" class="px-2.5 py-1.5 bg-gray-50 text-gray-500 hover:bg-gray-100 transition">
                                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                                            </button>
                                        </form>
                                    </div>

                                    <div>
                                        <form action="{{ route('cart.remove') }}" method="POST">
                                            @csrf
                                            <input type="hidden" name="id" value="{{ $id }}">
                                            <button type="submit" class="text-xs font-semibold text-red-400 hover:text-red-600 flex items-center gap-1 transition">
                                                <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                <span class="hidden sm:inline">Hapus</span>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </li>
                        @endforeach
                    </ul>
                </div>
            </div>

            <!-- Checkout Form -->
            <div class="mt-16 bg-white rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5 border border-gray-200">
                <h2 class="text-lg font-medium text-gray-900">Detail Pemesanan</h2>

                <form action="{{ route('cart.checkout') }}" method="POST" class="mt-6">
                    @csrf
                    <div class="space-y-4">
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                            <input type="text" id="name" name="name" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                        </div>
                        <div>
                            <label for="whatsapp" class="block text-sm font-medium text-gray-700">Nomor WhatsApp</label>
                            <input type="text" id="whatsapp" name="whatsapp" required placeholder="08123xxxx" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                        </div>
                        <div>
                            <label for="start_date" class="block text-sm font-medium text-gray-700">Tanggal Sewa</label>
                            <input type="date" id="start_date" name="start_date" required min="{{ date('Y-m-d') }}" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                        </div>
                        <div>
                            <label for="duration" class="block text-sm font-medium text-gray-700">Durasi (Hari)</label>
                            <input type="number" id="duration" name="duration" min="1" value="1" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                        </div>
                    </div>

                    <dl class="mt-6 space-y-4">
                        <div class="flex items-center justify-between border-t border-gray-200 pt-4">
                            <dt class="text-base font-medium text-gray-500">Subtotal / Hari</dt>
                            <dd class="text-base font-medium text-gray-900" id="subtotal-per-day" data-value="{{ $total }}">Rp {{ number_format($total, 0, ',', '.') }}</dd>
                        </div>
                        <div class="flex items-center justify-between">
                            <dt class="text-lg font-bold text-gray-900">Total Keseluruhan</dt>
                            <dd class="text-xl font-extrabold text-primary" id="grand-total">Rp {{ number_format($total, 0, ',', '.') }}</dd>
                        </div>
                    </dl>

                    <div class="mt-6">
                        <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            Checkout via WhatsApp
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
        @push('scripts')
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                const durationInput = document.getElementById('duration');
                const grandTotalEl = document.getElementById('grand-total');
                const subtotalValue = parseInt(document.getElementById('subtotal-per-day').getAttribute('data-value'));

                function updateTotal() {
                    let duration = parseInt(durationInput.value) || 1;
                    if(duration < 1) duration = 1;
                    const total = subtotalValue * duration;
                    grandTotalEl.innerText = 'Rp ' + new Intl.NumberFormat('id-ID').format(total);
                }

                durationInput.addEventListener('input', updateTotal);
                durationInput.addEventListener('change', updateTotal);
            });
        </script>
        @endpush
        @else
            <div class="text-center py-16 bg-white border border-gray-200 rounded-lg">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">Keranjang Kosong</h3>
                <p class="mt-1 text-sm text-gray-500">Anda belum menambahkan alat apapun ke keranjang.</p>
                <div class="mt-6">
                    <a href="{{ url('/sewa-alat') }}" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-800">
                        Mulai Sewa Alat
                    </a>
                </div>
            </div>
        @endif
    </div>
</div>
@endsection
