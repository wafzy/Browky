<div class="bg-white border border-gray-200 rounded-2xl p-6 ">
    <div class="mb-6">
        <span class="text-3xl font-extrabold text-gray-900">Rp{{ number_format($product->price_per_day, 0, ',', '.') }}</span>
        <span class="text-base font-normal text-gray-500"> / hari</span>
    </div>

    <form action="{{ route('cart.add') }}" method="POST">
        @csrf
        <input type="hidden" name="product_id" value="{{ $product->id }}">
        
        <div class="bg-white border border-gray-300 rounded-lg overflow-hidden mb-4">
            <div class="p-3 border-b border-gray-300 flex justify-between items-center bg-gray-50">
                <span class="text-xs font-bold text-gray-700 uppercase tracking-wide">Status Stok</span>
                <span class="text-sm font-medium {{ $product->stock > 0 ? 'text-green-600' : 'text-red-600' }}">
                    {{ $product->stock > 0 ? 'Tersedia (' . $product->stock . ')' : 'Habis' }}
                </span>
            </div>
            <div class="p-3 flex items-center justify-between">
                <label for="quantity" class="block text-xs font-bold text-gray-700 uppercase tracking-wide">Jumlah Item</label>
                <div class="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white  w-max">
                    <button type="button" class="px-3 py-1 bg-gray-50 text-gray-600 hover:bg-gray-100 transition disabled:opacity-50" onclick="decreaseQty()" {{ $product->stock <= 0 ? 'disabled' : '' }}>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
                    </button>
                    <input type="number" id="quantity" name="quantity" value="1" min="1" max="{{ $product->stock }}" class="w-12 text-center p-1 border-x border-gray-300 border-y-0 focus:ring-0 text-sm font-medium bg-white text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" onchange="validateQty(this)" {{ $product->stock <= 0 ? 'disabled' : '' }}>
                    <button type="button" class="px-3 py-1 bg-gray-50 text-gray-600 hover:bg-gray-100 transition disabled:opacity-50" onclick="increaseQty()" {{ $product->stock <= 0 ? 'disabled' : '' }}>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                    </button>
                </div>
            </div>
        </div>

        <button type="submit" class="w-full flex justify-center py-3.5 px-4 rounded-lg text-sm font-medium text-white bg-primary hover:bg-blue-950 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed group" {{ $product->stock <= 0 ? 'disabled' : '' }}>
            <span class="flex items-center gap-2">
                <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                Pesan Sekarang
            </span>
        </button>
        
        <div class="mt-4 text-center">
            <p class="text-sm text-gray-500">Anda belum dikenakan biaya</p>
        </div>
    </form>

    <div class="mt-6 pt-6 border-t border-gray-200">
        <div class="flex items-center justify-center gap-2 text-xs text-gray-600">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Pembayaran dilakukan saat pengambilan alat</span>
        </div>
    </div>
</div>

<script>
    const maxStock = {{ $product->stock }};
    const qtyInput = document.getElementById('quantity');

    function increaseQty() {
        let current = parseInt(qtyInput.value) || 1;
        if (current < maxStock) {
            qtyInput.value = current + 1;
        }
    }

    function decreaseQty() {
        let current = parseInt(qtyInput.value) || 1;
        if (current > 1) {
            qtyInput.value = current - 1;
        }
    }

    function validateQty(input) {
        let val = parseInt(input.value);
        if (isNaN(val) || val < 1) {
            input.value = 1;
        } else if (val > maxStock) {
            input.value = maxStock;
        }
    }
</script>
