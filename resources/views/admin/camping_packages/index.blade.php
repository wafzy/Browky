@extends('admin.layouts.app')

@section('content')
{{-- Page Header --}}
<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-8">
    <div>
        <h1 class="text-2xl font-bold tracking-tight text-zinc-900">Paket Camping</h1>
        <p class="text-xs text-zinc-500 mt-1">Kelola paket bundling camping yang tersedia.</p>
    </div>
    <a href="{{ route('admin.camping-packages.create') }}" class="inline-flex items-center gap-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-white shadow-xs transition-colors cursor-pointer px-4 py-2.5 border border-zinc-900">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Tambah Paket
    </a>
</div>

{{-- Table Card --}}
<div class="bg-white border border-zinc-200/80 rounded-xl shadow-xs overflow-hidden">
    <div class="overflow-x-auto">
        <table class="w-full min-w-full">
            <thead>
                <tr class="border-b border-zinc-100 bg-zinc-50/60">
                    <th class="py-3.5 px-4 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Paket</th>
                    <th class="py-3.5 px-4 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Harga</th>
                    <th class="py-3.5 px-4 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                    <th class="py-3.5 px-4 text-right text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Aksi</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-zinc-100">
                @forelse($packages as $package)
                <tr class="hover:bg-zinc-50/40 transition-colors">
                    <td class="py-4 px-4">
                        <div class="flex items-center gap-3.5">
                            <div class="h-11 w-11 flex-shrink-0 rounded-lg overflow-hidden border border-zinc-200/80">
                                @if($package->image)
                                    @php $imgSrc = str_starts_with($package->image, 'http') ? $package->image : asset('storage/' . $package->image); @endphp
                                    <img src="{{ $imgSrc }}" alt="{{ $package->name }}" class="h-full w-full object-cover" />
                                @else
                                    <div class="h-full w-full bg-zinc-100 flex items-center justify-center">
                                        <svg class="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 2 22 22 22"/></svg>
                                    </div>
                                @endif
                            </div>
                            <div>
                                <p class="text-sm font-semibold text-zinc-900">{{ $package->name }}</p>
                                @if(isset($package->special_badge) && $package->special_badge)
                                    <span class="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 ring-1 ring-amber-600/20 ring-inset mt-1">{{ $package->special_badge }}</span>
                                @endif
                            </div>
                        </div>
                    </td>
                    <td class="py-4 px-4">
                        <span class="text-sm font-semibold text-zinc-900">Rp {{ number_format($package->price, 0, ',', '.') }}</span>
                    </td>
                    <td class="py-4 px-4">
                        @if($package->status == 'Available')
                            <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20 ring-inset">
                                <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                Available
                            </span>
                        @else
                            <span class="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600 ring-1 ring-zinc-500/10 ring-inset">
                                <span class="h-1.5 w-1.5 rounded-full bg-zinc-400"></span>
                                Unavailable
                            </span>
                        @endif
                    </td>
                    <td class="py-4 px-4 text-right">
                        <div class="flex items-center justify-end gap-2">
                            <a href="{{ route('admin.camping-packages.edit', $package) }}" class="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-xs hover:bg-zinc-50 hover:border-zinc-300 transition-all cursor-pointer">
                                <svg class="h-3.5 w-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                Edit
                            </a>
                            <form action="{{ route('admin.camping-packages.destroy', $package) }}" method="POST" onsubmit="return confirm('Apakah Anda yakin ingin menghapus paket ini?');" class="inline">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 shadow-xs hover:bg-red-50 hover:border-red-300 transition-all cursor-pointer">
                                    <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="m19 6-.867 12.142A2 2 0 0 1 16.138 20H7.862a2 2 0 0 1-1.995-1.858L5 6h14z"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                                    Hapus
                                </button>
                            </form>
                        </div>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="4" class="py-14 text-center">
                        <div class="flex flex-col items-center gap-3">
                            <div class="h-12 w-12 rounded-full bg-zinc-100 flex items-center justify-center">
                                <svg class="h-6 w-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 2 22 22 22"/></svg>
                            </div>
                            <p class="text-sm font-medium text-zinc-500">Belum ada paket camping terdaftar.</p>
                            <a href="{{ route('admin.camping-packages.create') }}" class="text-xs font-semibold text-zinc-900 hover:underline">+ Tambah paket pertama</a>
                        </div>
                    </td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    @if($packages->hasPages())
    <div class="px-5 py-4 border-t border-zinc-100">
        {{ $packages->links() }}
    </div>
    @endif
</div>
@endsection
