@extends('layouts.frontend')

@section('title', 'Favorit Anda - Browky')

@section('content')
<div class="bg-gray-50 py-12 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-10">
            <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">Daftar Favorit Anda</h1>
            <p class="mt-4 text-xl text-gray-500">Peralatan dan paket porter yang Anda simpan.</p>
        </div>

        <div id="favorites-container" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            <!-- Items will be injected here by JS -->
        </div>

        <div id="empty-state" class="hidden col-span-2 sm:col-span-4 text-center py-16 bg-white rounded-lg border border-dashed border-gray-300">
            <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 class="text-lg font-medium text-gray-900">Belum ada item favorit</h3>
            <p class="mt-2 text-sm text-gray-500 max-w-sm mx-auto mb-6">Mulai jelajahi katalog kami dan simpan peralatan atau paket porter yang Anda sukai dengan menekan tombol hati.</p>
            <div class="flex justify-center gap-4">
                <a href="{{ url('/sewa-alat') }}" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-800">
                    Eksplor Alat
                </a>
                <a href="{{ url('/porter-gunung') }}" class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Cari Porter
                </a>
            </div>
        </div>
    </div>
</div>

@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('favorites-container');
        const emptyState = document.getElementById('empty-state');
        
        const renderFavorites = () => {
            const favs = JSON.parse(localStorage.getItem('browky_favorites')) || [];
            
            if (favs.length === 0) {
                container.innerHTML = '';
                emptyState.classList.remove('hidden');
                return;
            }
            
            emptyState.classList.add('hidden');
            
            // Sort by newest first
            favs.sort((a, b) => b.timestamp - a.timestamp);
            
            container.innerHTML = favs.map(item => `
                <div class="group relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
                    <button class="absolute top-2 right-2 z-10 p-2 rounded-full bg-white bg-opacity-80 text-red-500 hover:text-gray-400 hover:bg-opacity-100 transition favorite-btn-remove" 
                            data-id="${item.id}">
                        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </button>

                    <div class="aspect-square w-full overflow-hidden bg-gray-100">
                        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy">
                    </div>
                    
                    <div class="p-4">
                        <div class="flex justify-between items-center text-xs text-gray-500 mb-1">
                            <span class="font-medium text-primary">${item.type === 'product' ? 'Sewa Alat' : (item.type === 'camping' ? 'Paket Camping' : 'Jasa Porter')}</span>
                        </div>
                        <h3 class="text-base font-bold text-gray-900 leading-tight mb-1 line-clamp-1">
                            <a href="${item.link}">
                                <span aria-hidden="true" class="absolute inset-0 z-0"></span>
                                ${item.name}
                            </a>
                        </h3>
                        <p class="text-lg font-bold text-gray-900 mt-2">Rp ${parseInt(item.price).toLocaleString('id-ID')}<span class="text-xs font-normal text-gray-500"> / hari</span></p>
                    </div>
                </div>
            `).join('');
            
            // Attach event listeners to remove buttons
            document.querySelectorAll('.favorite-btn-remove').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const idToRemove = btn.dataset.id;
                    let currentFavs = JSON.parse(localStorage.getItem('browky_favorites')) || [];
                    const filteredFavs = currentFavs.filter(f => f.id !== idToRemove);
                    
                    localStorage.setItem('browky_favorites', JSON.stringify(filteredFavs));
                    
                    // Dispatch event so the header updates too
                    window.dispatchEvent(new Event('favorites-updated'));
                    
                    // Re-render the grid
                    renderFavorites();
                });
            });
        };
        
        // Initial render
        renderFavorites();
        
        // Listen for updates from other tabs or header interactions
        window.addEventListener('favorites-updated', renderFavorites);
    });
</script>
@endpush
@endsection
