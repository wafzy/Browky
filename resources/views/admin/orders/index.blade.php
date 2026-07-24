@extends('admin.layouts.app')

@section('content')
{{-- Page Header --}}
<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-8">
    <div>
        <h1 class="text-2xl font-bold tracking-tight text-zinc-900">Manajemen Pesanan</h1>
        <p class="text-xs text-zinc-500 mt-1">Pantau dan kelola semua transaksi pesanan yang masuk.</p>
    </div>
</div>

{{-- Table Card --}}
<div class="bg-white border border-zinc-200/80 rounded-xl shadow-xs overflow-hidden">
    <div class="overflow-x-auto">
        <table class="w-full min-w-full">
            <thead>
                <tr class="border-b border-zinc-100 bg-zinc-50/60">
                    <th class="py-3.5 px-4 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider">ID Pesanan</th>
                    <th class="py-3.5 px-4 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Pelanggan</th>
                    <th class="py-3.5 px-4 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider hidden sm:table-cell">Tanggal Mulai</th>
                    <th class="py-3.5 px-4 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider hidden md:table-cell">Total Harga</th>
                    <th class="py-3.5 px-4 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                    <th class="py-3.5 px-4 text-right text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Aksi</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-zinc-100">
                @forelse($orders as $order)
                <tr class="hover:bg-zinc-50/40 transition-colors">
                    <td class="py-4 px-4">
                        <p class="text-sm font-bold text-zinc-900">#ORD-{{ str_pad($order->id, 5, '0', STR_PAD_LEFT) }}</p>
                        <span class="inline-flex items-center rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-600 mt-1">{{ ucfirst($order->type) }}</span>
                    </td>
                    <td class="py-4 px-4">
                        <div class="flex items-center gap-3">
                            <div class="h-8 w-8 rounded-full bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-[10px] font-bold text-zinc-900 uppercase shrink-0">
                                {{ strtoupper(substr($order->customer_name, 0, 2)) }}
                            </div>
                            <div>
                                <p class="text-sm font-semibold text-zinc-900">{{ $order->customer_name }}</p>
                                <a href="https://wa.me/{{ $order->whatsapp_number }}" target="_blank" class="text-[10px] text-emerald-600 hover:text-emerald-700 font-medium hover:underline">{{ $order->whatsapp_number }}</a>
                            </div>
                        </div>
                    </td>
                    <td class="py-4 px-4 hidden sm:table-cell">
                        <p class="text-xs font-semibold text-zinc-800">{{ \Carbon\Carbon::parse($order->start_date)->format('d M Y') }}</p>
                        <p class="text-[10px] text-zinc-400 mt-0.5">{{ $order->duration }} Hari</p>
                    </td>
                    <td class="py-4 px-4 hidden md:table-cell">
                        <p class="text-sm font-bold text-zinc-900">Rp {{ number_format($order->total_price, 0, ',', '.') }}</p>
                    </td>
                    <td class="py-4 px-4">
                        <form action="{{ route('admin.orders.update', $order) }}" method="POST">
                            @csrf
                            @method('PUT')
                            <select name="status" onchange="this.form.submit()" class="rounded-lg border text-xs font-semibold py-1.5 px-2.5 focus:outline-none focus:ring-2 transition cursor-pointer
                                {{ $order->status == 'pending' ? 'border-amber-200 bg-amber-50 text-amber-700 focus:ring-amber-500/20' : '' }}
                                {{ $order->status == 'confirmed' ? 'border-blue-200 bg-blue-50 text-blue-700 focus:ring-blue-500/20' : '' }}
                                {{ $order->status == 'completed' ? 'border-emerald-200 bg-emerald-50 text-emerald-700 focus:ring-emerald-500/20' : '' }}
                            ">
                                <option value="pending" {{ $order->status == 'pending' ? 'selected' : '' }}>Pending</option>
                                <option value="confirmed" {{ $order->status == 'confirmed' ? 'selected' : '' }}>Confirmed</option>
                                <option value="completed" {{ $order->status == 'completed' ? 'selected' : '' }}>Completed</option>
                            </select>
                        </form>
                    </td>
                    <td class="py-4 px-4 text-right">
                        <a href="{{ route('admin.orders.show', $order) }}" class="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-xs hover:bg-zinc-50 hover:border-zinc-300 transition-all cursor-pointer">
                            <svg class="h-3.5 w-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                            Detail
                        </a>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="6" class="py-14 text-center">
                        <div class="flex flex-col items-center gap-3">
                            <div class="h-12 w-12 rounded-full bg-zinc-100 flex items-center justify-center">
                                <svg class="h-6 w-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            </div>
                            <p class="text-sm font-medium text-zinc-500">Belum ada pesanan masuk.</p>
                        </div>
                    </td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    @if($orders->hasPages())
    <div class="px-5 py-4 border-t border-zinc-100">
        {{ $orders->links() }}
    </div>
    @endif
</div>
@endsection
