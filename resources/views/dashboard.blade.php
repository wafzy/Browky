<x-app-layout>
    <x-slot name="header">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-base font-semibold text-zinc-900">Dashboard</h1>
                <p class="text-xs text-zinc-500 mt-0.5">Ringkasan data pengelolaan website Browky.</p>
            </div>
            <a href="{{ route('admin.orders.index') }}"
               class="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-xs hover:bg-zinc-50 transition-colors">
                <svg class="h-3.5 w-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Kelola Pesanan
            </a>
        </div>
    </x-slot>

    <div class="py-8">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">

            <!-- Stats Grid -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">

                <!-- Total Produk -->
                <div class="rounded-lg border border-zinc-200 bg-white p-5 shadow-xs">
                    <div class="flex items-start justify-between">
                        <div>
                            <p class="text-xs font-medium uppercase tracking-wider text-zinc-500">Total Produk</p>
                            <p class="mt-2 text-2xl font-semibold text-zinc-900">{{ \App\Models\Product::count() }}</p>
                            <p class="mt-0.5 text-xs text-zinc-400">Alat camping aktif</p>
                        </div>
                        <div class="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-100 bg-zinc-50 text-zinc-600">
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                <line x1="12" y1="22.08" x2="12" y2="12" />
                            </svg>
                        </div>
                    </div>
                    <div class="mt-4 pt-4 border-t border-zinc-100">
                        <a href="{{ route('admin.products.index') }}"
                           class="inline-flex items-center gap-1 text-xs font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
                            Kelola Produk
                            <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- Total Porter -->
                <div class="rounded-lg border border-zinc-200 bg-white p-5 shadow-xs">
                    <div class="flex items-start justify-between">
                        <div>
                            <p class="text-xs font-medium uppercase tracking-wider text-zinc-500">Total Porter</p>
                            <p class="mt-2 text-2xl font-semibold text-zinc-900">{{ \App\Models\Porter::count() }}</p>
                            <p class="mt-0.5 text-xs text-zinc-400">Porter pendakian gunung</p>
                        </div>
                        <div class="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-100 bg-zinc-50 text-zinc-600">
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                    </div>
                    <div class="mt-4 pt-4 border-t border-zinc-100">
                        <a href="{{ route('admin.porters.index') }}"
                           class="inline-flex items-center gap-1 text-xs font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
                            Kelola Porter
                            <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- Total Pesanan -->
                <div class="rounded-lg border border-zinc-200 bg-white p-5 shadow-xs">
                    <div class="flex items-start justify-between">
                        <div>
                            <p class="text-xs font-medium uppercase tracking-wider text-zinc-500">Total Pesanan</p>
                            <p class="mt-2 text-2xl font-semibold text-zinc-900">{{ \App\Models\Order::count() }}</p>
                            <p class="mt-0.5 text-xs text-zinc-400">Transaksi pesanan masuk</p>
                        </div>
                        <div class="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-100 bg-zinc-50 text-zinc-600">
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </div>
                    </div>
                    <div class="mt-4 pt-4 border-t border-zinc-100">
                        <a href="{{ route('admin.orders.index') }}"
                           class="inline-flex items-center gap-1 text-xs font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
                            Lihat Pesanan
                            <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Quick Links Card -->
            <div class="rounded-lg border border-zinc-200 bg-white shadow-xs">
                <div class="flex items-center gap-2 border-b border-zinc-100 px-5 py-4">
                    <h2 class="text-sm font-semibold text-zinc-900">Pintasan Cepat</h2>
                    <span class="text-xs text-zinc-400">— kelola data toko dan katalog</span>
                </div>
                <div class="grid grid-cols-2 gap-3 p-5 sm:grid-cols-4">
                    <!-- Tambah Produk -->
                    <a href="{{ route('admin.products.create') }}"
                       class="group flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 hover:border-zinc-300 hover:bg-zinc-50 transition-all">
                        <div class="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-500 transition-colors group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white">
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                        </div>
                        <div>
                            <p class="text-xs font-semibold text-zinc-800">Tambah Produk</p>
                            <p class="text-[10px] text-zinc-400 mt-0.5">Katalog sewa baru</p>
                        </div>
                    </a>

                    <!-- Tambah Porter -->
                    <a href="{{ route('admin.porters.create') }}"
                       class="group flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 hover:border-zinc-300 hover:bg-zinc-50 transition-all">
                        <div class="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-500 transition-colors group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white">
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <line x1="19" y1="8" x2="19" y2="14" />
                                <line x1="22" y1="11" x2="16" y2="11" />
                            </svg>
                        </div>
                        <div>
                            <p class="text-xs font-semibold text-zinc-800">Tambah Porter</p>
                            <p class="text-[10px] text-zinc-400 mt-0.5">Registrasi porter</p>
                        </div>
                    </a>

                    <!-- Paket Camping -->
                    <a href="{{ route('admin.camping-packages.index') }}"
                       class="group flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 hover:border-zinc-300 hover:bg-zinc-50 transition-all">
                        <div class="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-500 transition-colors group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white">
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <polygon points="12 2 2 22 22 22"/>
                            </svg>
                        </div>
                        <div>
                            <p class="text-xs font-semibold text-zinc-800">Paket Camping</p>
                            <p class="text-[10px] text-zinc-400 mt-0.5">Paket bundling</p>
                        </div>
                    </a>

                    <!-- Gunung & SEO -->
                    <a href="{{ route('admin.mountains.index') }}"
                       class="group flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 hover:border-zinc-300 hover:bg-zinc-50 transition-all">
                        <div class="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-500 transition-colors group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white">
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                            </svg>
                        </div>
                        <div>
                            <p class="text-xs font-semibold text-zinc-800">Gunung & SEO</p>
                            <p class="text-[10px] text-zinc-400 mt-0.5">Destinasi & SEO</p>
                        </div>
                    </a>
                </div>
            </div>

        </div>
    </div>
</x-app-layout>
