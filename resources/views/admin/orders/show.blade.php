@extends('admin.layouts.app')

@section('content')
{{-- Page Header --}}
<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-8">
    <div>
        <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-full bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-sm font-bold text-zinc-900 uppercase">
                {{ strtoupper(substr($order->customer_name, 0, 2)) }}
            </div>
            <div>
                <h1 class="text-2xl font-bold tracking-tight text-zinc-900">Detail Pesanan</h1>
                <p class="text-xs text-zinc-500 mt-0.5">#ORD-{{ str_pad($order->id, 5, '0', STR_PAD_LEFT) }} • {{ \Carbon\Carbon::parse($order->created_at)->format('d F Y, H:i') }}</p>
            </div>
        </div>
    </div>
    <a href="{{ route('admin.orders.index') }}" class="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 shadow-xs hover:bg-zinc-50 transition-colors cursor-pointer">
        <svg class="h-3.5 w-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Kembali ke Pesanan
    </a>
</div>

{{-- Info Cards Row --}}
<div class="grid grid-cols-1 gap-6 md:grid-cols-3 mb-6">

    {{-- Informasi Pelanggan --}}
    <div class="bg-white border border-zinc-200/80 rounded-xl shadow-xs p-6">
        <div class="flex items-center gap-2 mb-5 pb-4 border-b border-zinc-100">
            <div class="h-7 w-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <h4 class="text-sm font-bold text-zinc-900">Informasi Pelanggan</h4>
        </div>
        <div class="space-y-4">
            <div>
                <span class="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Nama Lengkap</span>
                <span class="block text-sm font-semibold text-zinc-900">{{ $order->customer_name }}</span>
            </div>
            <div>
                <span class="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Nomor WhatsApp</span>
                <a href="https://wa.me/{{ $order->whatsapp_number }}" target="_blank" class="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                    <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    {{ $order->whatsapp_number }}
                </a>
            </div>
        </div>
    </div>

    {{-- Informasi Sewa --}}
    <div class="bg-white border border-zinc-200/80 rounded-xl shadow-xs p-6">
        <div class="flex items-center gap-2 mb-5 pb-4 border-b border-zinc-100">
            <div class="h-7 w-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <h4 class="text-sm font-bold text-zinc-900">Informasi Sewa</h4>
        </div>
        <div class="space-y-4">
            <div>
                <span class="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Tipe Pesanan</span>
                <span class="inline-flex items-center rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-700">{{ ucfirst($order->type) }}</span>
            </div>
            <div>
                <span class="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Tanggal Mulai</span>
                <span class="block text-sm font-semibold text-zinc-900">{{ \Carbon\Carbon::parse($order->start_date)->format('d F Y') }}</span>
            </div>
            <div>
                <span class="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Durasi</span>
                <span class="block text-sm font-semibold text-zinc-900">{{ $order->duration }} Hari</span>
            </div>
        </div>
    </div>

    {{-- Status & Pembayaran --}}
    <div class="bg-white border border-zinc-200/80 rounded-xl shadow-xs p-6">
        <div class="flex items-center gap-2 mb-5 pb-4 border-b border-zinc-100">
            <div class="h-7 w-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h4 class="text-sm font-bold text-zinc-900">Status & Pembayaran</h4>
        </div>
        <div class="space-y-4">
            <div>
                <span class="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Status Pesanan</span>
                <form action="{{ route('admin.orders.update', $order) }}" method="POST">
                    @csrf
                    @method('PUT')
                    <select name="status" onchange="this.form.submit()" class="w-full rounded-lg border text-sm font-semibold py-2 px-3 focus:outline-none focus:ring-2 transition cursor-pointer
                        {{ $order->status == 'pending' ? 'border-amber-200 bg-amber-50 text-amber-700 focus:ring-amber-500/20' : '' }}
                        {{ $order->status == 'confirmed' ? 'border-blue-200 bg-blue-50 text-blue-700 focus:ring-blue-500/20' : '' }}
                        {{ $order->status == 'completed' ? 'border-emerald-200 bg-emerald-50 text-emerald-700 focus:ring-emerald-500/20' : '' }}
                    ">
                        <option value="pending" {{ $order->status == 'pending' ? 'selected' : '' }}>⏳ Pending</option>
                        <option value="confirmed" {{ $order->status == 'confirmed' ? 'selected' : '' }}>✅ Confirmed</option>
                        <option value="completed" {{ $order->status == 'completed' ? 'selected' : '' }}>🎉 Completed</option>
                    </select>
                </form>
            </div>
            <div class="pt-4 border-t border-zinc-100">
                <span class="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Total Tagihan</span>
                <span class="block text-2xl font-extrabold tracking-tight text-zinc-900">Rp {{ number_format($order->total_price, 0, ',', '.') }}</span>
            </div>
        </div>
    </div>
</div>

{{-- Order Items Table --}}
<div class="bg-white border border-zinc-200/80 rounded-xl shadow-xs overflow-hidden">
    <div class="px-6 py-5 border-b border-zinc-100 flex items-center justify-between">
        <div>
            <h3 class="text-sm font-bold text-zinc-900">Item yang Dipesan</h3>
            <p class="text-xs text-zinc-400 mt-0.5">Rincian semua item dalam pesanan ini.</p>
        </div>
    </div>
    <div class="overflow-x-auto">
        <table class="w-full min-w-full">
            <thead>
                <tr class="bg-zinc-50/60 border-b border-zinc-100">
                    <th class="py-3.5 px-6 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Nama Item</th>
                    <th class="py-3.5 px-6 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Harga/Hari</th>
                    <th class="py-3.5 px-6 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Jumlah</th>
                    <th class="py-3.5 px-6 text-right text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Subtotal (× {{ $order->duration }} hari)</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-zinc-100">
                @forelse($order->items as $item)
                <tr class="hover:bg-zinc-50/40 transition-colors">
                    <td class="py-4 px-6">
                        <p class="text-sm font-semibold text-zinc-900">
                            @if($order->type == 'rental')
                                {{ $item->product->name ?? 'Produk Dihapus' }}
                            @else
                                {{ $item->porter->name ?? 'Porter Dihapus' }}
                            @endif
                        </p>
                        <span class="text-[10px] text-zinc-400 font-medium">{{ ucfirst($order->type) }}</span>
                    </td>
                    <td class="py-4 px-6">
                        <span class="text-sm text-zinc-700 font-medium">Rp {{ number_format($item->price, 0, ',', '.') }}</span>
                    </td>
                    <td class="py-4 px-6">
                        <span class="inline-flex items-center justify-center h-7 w-7 rounded-md bg-zinc-100 text-sm font-bold text-zinc-700">{{ $item->quantity }}</span>
                    </td>
                    <td class="py-4 px-6 text-right">
                        <span class="text-sm font-bold text-zinc-900">Rp {{ number_format($item->price * $item->quantity * $order->duration, 0, ',', '.') }}</span>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="4" class="py-12 text-center text-sm text-zinc-400 font-medium">Item tidak ditemukan.</td>
                </tr>
                @endforelse
            </tbody>
            @if($order->items->count() > 0)
            <tfoot>
                <tr class="bg-zinc-50/60 border-t border-zinc-200">
                    <td colspan="3" class="py-4 px-6 text-right text-xs font-bold text-zinc-500 uppercase tracking-wider">Total</td>
                    <td class="py-4 px-6 text-right">
                        <span class="text-base font-extrabold text-zinc-900">Rp {{ number_format($order->total_price, 0, ',', '.') }}</span>
                    </td>
                </tr>
            </tfoot>
            @endif
        </table>
    </div>
</div>
@endsection
