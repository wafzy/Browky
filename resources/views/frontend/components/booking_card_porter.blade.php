<div class="bg-white border border-gray-200 shadow-xl shadow-gray-200/50 rounded-2xl p-6 transition-shadow hover:shadow-2xl">
    <div class="mb-6">
        <span class="text-3xl font-extrabold text-gray-900">Rp{{ number_format($porter->price_per_day, 0, ',', '.') }}</span>
        <span class="text-base font-normal text-gray-500"> / hari</span>
    </div>

    <div class="bg-white border border-gray-300 rounded-lg overflow-hidden mb-6">
        <div class="p-3 border-b border-gray-300 flex justify-between items-center bg-gray-50">
            <span class="text-xs font-bold text-gray-700 uppercase tracking-wide">Status Layanan</span>
            <span class="text-sm font-medium {{ $porter->status == 'Available' ? 'text-green-600' : 'text-red-600' }}">
                {{ $porter->status }}
            </span>
        </div>
        <div class="p-4 bg-white">
            <p class="text-sm text-gray-600">Pemesanan layanan porter dilakukan secara langsung melalui WhatsApp untuk memastikan jadwal pendakian.</p>
        </div>
    </div>

    <a href="https://wa.me/6287834443012?text={{ urlencode('Halo Admin Browky, saya tertarik dengan paket porter: ' . $porter->name . '. Mohon informasi lebih lanjut.') }}" target="_blank" class="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-lg text-base font-bold text-white bg-green-600 hover:bg-green-700 transition-colors shadow-md hover:shadow-lg group">
        <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M22 12c0 5.523-4.477 10-10 10a9.964 9.964 0 01-5.11-1.405l-4.402 1.155 1.171-4.286A9.957 9.957 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10zM12 4a8 8 0 102.827 15.485l-2.45-1.294-1.423 3.916 3.916-1.423-1.294-2.45A8 8 0 0012 4zm1.465 11.232c-.305.155-1.808.892-2.088.995-.28.102-.486.155-.69.155-.203 0-.585-.306-.69-.586-.105-.28-.105-.838-.105-1.144 0-.306.105-.838.335-1.144.23-.306.585-.586.89-.89.306-.306.406-.41.61-.41s.406.104.61.41c.204.306.89 1.144 1.045 1.348.155.204.305.306.61.306h.001z" clip-rule="evenodd"></path>
        </svg>
        Pesan via WhatsApp
    </a>
    
    <div class="mt-4 text-center">
        <p class="text-sm text-gray-500">Anda belum dikenakan biaya</p>
    </div>

    <div class="mt-6 pt-6 border-t border-gray-200">
        <div class="flex items-center justify-center gap-2 text-sm text-gray-600">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Pembayaran DP dilakukan via Transfer</span>
        </div>
    </div>
</div>
