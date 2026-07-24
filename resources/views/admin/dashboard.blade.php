@extends('admin.layouts.app')

@section('title', 'Dashboard — Browky Admin')

@section('content')
@php
    $productCount = \App\Models\Product::count();
    $porterCount  = \App\Models\Porter::count();
    $orderCount   = \App\Models\Order::count();
    $revenue      = \App\Models\Order::whereIn('status', ['confirmed', 'completed'])->sum('total_price');
    $pendingCount = \App\Models\Order::where('status', 'pending')->count();
    $recentOrders = \App\Models\Order::with([])->orderBy('created_at', 'desc')->take(10)->get();

    // Chart: 6 months
    $sixMonthsAgo = now()->subMonths(5)->startOfMonth();
    $orders       = \App\Models\Order::where('created_at', '>=', $sixMonthsAgo)->get();

    $months      = [];
    $revenueData = [];
    $ordersData  = [];

    for ($i = 5; $i >= 0; $i--) {
        $monthDate = now()->subMonths($i);
        $monthKey  = $monthDate->format('Y-m');
        $months[]  = $monthDate->format('M Y');

        $monthlyOrders = $orders->filter(function ($o) use ($monthKey) {
            return \Carbon\Carbon::parse($o->created_at)->format('Y-m') === $monthKey;
        });

        $ordersData[]  = $monthlyOrders->count();
        $revenueData[] = (int) $monthlyOrders->whereIn('status', ['confirmed', 'completed'])->sum('total_price');
    }
@endphp

{{-- =============================================
     SECTION CARDS  (shadcn dashboard-01 style)
     ============================================= --}}
<div class="grid grid-cols-1 gap-4 px-0 mb-6
            sm:grid-cols-2 xl:grid-cols-4">

    {{-- Card 1: Total Produk --}}
    <div class="rounded-xl border border-zinc-200 bg-card shadow-xs
                @container/card flex flex-col">
        <div class="flex flex-row items-start justify-between p-6">
            <div class="flex flex-col gap-1">
                <p class="text-sm text-muted-foreground">Total Produk</p>
                <p class="text-3xl font-semibold tabular-nums text-zinc-900">{{ $productCount }}</p>
            </div>
            <span class="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2 py-0.5 text-xs font-medium text-zinc-600">
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                Aktif
            </span>
        </div>
        <div class="flex flex-col gap-1 border-t border-zinc-100 px-6 py-4">
            <p class="flex items-center gap-1 text-sm font-medium text-zinc-700">
                Alat camping terdaftar
            </p>
            <a href="{{ route('admin.products.index') }}" class="text-xs text-muted-foreground hover:text-zinc-900 underline underline-offset-4 transition-colors">
                Kelola Produk →
            </a>
        </div>
    </div>

    {{-- Card 2: Total Porter --}}
    <div class="rounded-xl border border-zinc-200 bg-card shadow-xs
                @container/card flex flex-col">
        <div class="flex flex-row items-start justify-between p-6">
            <div class="flex flex-col gap-1">
                <p class="text-sm text-muted-foreground">Total Porter</p>
                <p class="text-3xl font-semibold tabular-nums text-zinc-900">{{ $porterCount }}</p>
            </div>
            <span class="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2 py-0.5 text-xs font-medium text-zinc-600">
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                Terdaftar
            </span>
        </div>
        <div class="flex flex-col gap-1 border-t border-zinc-100 px-6 py-4">
            <p class="flex items-center gap-1 text-sm font-medium text-zinc-700">
                Porter pendakian gunung
            </p>
            <a href="{{ route('admin.porters.index') }}" class="text-xs text-muted-foreground hover:text-zinc-900 underline underline-offset-4 transition-colors">
                Kelola Porter →
            </a>
        </div>
    </div>

    {{-- Card 3: Total Pesanan --}}
    <div class="rounded-xl border border-zinc-200 bg-card shadow-xs
                @container/card flex flex-col">
        <div class="flex flex-row items-start justify-between p-6">
            <div class="flex flex-col gap-1">
                <p class="text-sm text-muted-foreground">Total Pesanan</p>
                <p class="text-3xl font-semibold tabular-nums text-zinc-900">{{ $orderCount }}</p>
            </div>
            @if($pendingCount > 0)
            <span class="inline-flex items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                {{ $pendingCount }} Pending
            </span>
            @else
            <span class="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2 py-0.5 text-xs font-medium text-zinc-600">
                Semua
            </span>
            @endif
        </div>
        <div class="flex flex-col gap-1 border-t border-zinc-100 px-6 py-4">
            <p class="flex items-center gap-1 text-sm font-medium text-zinc-700">
                Transaksi masuk sistem
            </p>
            <a href="{{ route('admin.orders.index') }}" class="text-xs text-muted-foreground hover:text-zinc-900 underline underline-offset-4 transition-colors">
                Lihat Pesanan →
            </a>
        </div>
    </div>

    {{-- Card 4: Pendapatan --}}
    <div class="rounded-xl border border-zinc-200 bg-card shadow-xs
                @container/card flex flex-col">
        <div class="flex flex-row items-start justify-between p-6">
            <div class="flex flex-col gap-1">
                <p class="text-sm text-muted-foreground">Pendapatan</p>
                <p class="text-2xl font-semibold tabular-nums text-zinc-900 truncate">
                    Rp {{ number_format($revenue, 0, ',', '.') }}
                </p>
            </div>
            <span class="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                Confirmed
            </span>
        </div>
        <div class="flex flex-col gap-1 border-t border-zinc-100 px-6 py-4">
            <p class="flex items-center gap-1 text-sm font-medium text-zinc-700">
                Status confirmed &amp; completed
            </p>
            <a href="{{ route('admin.orders.index') }}" class="text-xs text-muted-foreground hover:text-zinc-900 underline underline-offset-4 transition-colors">
                Detail Pendapatan →
            </a>
        </div>
    </div>

</div>

{{-- =============================================
     CHART AREA INTERACTIVE  (shadcn dashboard-01)
     ============================================= --}}
<div class="mb-6">
    <div class="rounded-xl border border-zinc-200 bg-card shadow-xs @container/card">
        {{-- Card Header --}}
        <div class="flex flex-col gap-1 border-b border-zinc-100 px-6 py-4
                    sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h2 class="text-base font-semibold text-zinc-900">Grafik Analisis Transaksi</h2>
                <p class="text-sm text-muted-foreground mt-0.5">
                    Pendapatan dan volume pesanan selama 6 bulan terakhir.
                </p>
            </div>
            <div class="flex items-center gap-2 mt-3 sm:mt-0" id="chartToggleGroup">
                <button onclick="setChartView('revenue')" id="btn-revenue"
                    class="inline-flex items-center rounded-md border border-zinc-300 bg-zinc-900 text-white px-3 py-1 text-xs font-medium transition-colors">
                    Pendapatan
                </button>
                <button onclick="setChartView('orders')" id="btn-orders"
                    class="inline-flex items-center rounded-md border border-zinc-200 bg-white text-zinc-600 px-3 py-1 text-xs font-medium transition-colors hover:bg-zinc-50">
                    Pesanan
                </button>
                <button onclick="setChartView('both')" id="btn-both"
                    class="inline-flex items-center rounded-md border border-zinc-200 bg-white text-zinc-600 px-3 py-1 text-xs font-medium transition-colors hover:bg-zinc-50">
                    Keduanya
                </button>
            </div>
        </div>
        {{-- Chart --}}
        <div class="px-6 pb-6 pt-4">
            <div class="relative w-full h-[260px]">
                <canvas id="analyticsChart"></canvas>
            </div>
        </div>
    </div>
</div>

{{-- =============================================
     DATA TABLE — PESANAN TERBARU
     (shadcn dashboard-01 DataTable style)
     ============================================= --}}
<div class="rounded-xl border border-zinc-200 bg-card shadow-xs mb-6">

    {{-- Table Header --}}
    <div class="flex flex-col gap-3 border-b border-zinc-100 px-6 py-4
                sm:flex-row sm:items-center sm:justify-between">
        <div>
            <h2 class="text-base font-semibold text-zinc-900">Pesanan Terbaru</h2>
            <p class="text-sm text-muted-foreground mt-0.5">
                10 transaksi pesanan terakhir yang masuk ke sistem.
            </p>
        </div>
        <a href="{{ route('admin.orders.index') }}"
           class="inline-flex items-center gap-1.5 self-start rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-xs hover:bg-zinc-50 transition-colors sm:self-auto">
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
            Semua Pesanan
        </a>
    </div>

    {{-- Table --}}
    <div class="overflow-x-auto">
        <table class="w-full text-sm">
            <thead>
                <tr class="border-b border-zinc-100 bg-muted/40">
                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground w-8">#</th>
                    <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Pelanggan</th>
                    <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Tanggal Sewa</th>
                    <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground hidden md:table-cell">Tipe</th>
                    <th class="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground hidden md:table-cell">Tagihan</th>
                    <th class="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-zinc-100">
                @forelse($recentOrders as $i => $order)
                <tr class="hover:bg-muted/30 transition-colors group">
                    <td class="px-6 py-3.5 text-xs text-muted-foreground">{{ $i + 1 }}</td>
                    <td class="px-4 py-3.5">
                        <div class="flex items-center gap-3">
                            <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 text-[10px] font-bold text-zinc-700 uppercase">
                                {{ strtoupper(substr($order->customer_name, 0, 2)) }}
                            </div>
                            <div>
                                <p class="text-sm font-medium text-zinc-900">{{ $order->customer_name }}</p>
                                <p class="text-xs text-muted-foreground md:hidden">
                                    Rp {{ number_format($order->total_price, 0, ',', '.') }}
                                </p>
                            </div>
                        </div>
                    </td>
                    <td class="px-4 py-3.5 text-sm text-muted-foreground hidden sm:table-cell">
                        {{ \Carbon\Carbon::parse($order->start_date)->format('d M Y') }}
                    </td>
                    <td class="px-4 py-3.5 hidden md:table-cell">
                        <span class="inline-flex items-center rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs font-medium text-zinc-600">
                            {{ ucfirst($order->type) }}
                        </span>
                    </td>
                    <td class="px-4 py-3.5 text-right text-sm font-semibold text-zinc-900 hidden md:table-cell">
                        Rp {{ number_format($order->total_price, 0, ',', '.') }}
                    </td>
                    <td class="px-4 py-3.5 text-right">
                        @if($order->status === 'pending')
                            <span class="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                                Pending
                            </span>
                        @elseif($order->status === 'confirmed')
                            <span class="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                                Confirmed
                            </span>
                        @elseif($order->status === 'completed')
                            <span class="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                                Completed
                            </span>
                        @else
                            <span class="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700">
                                {{ ucfirst($order->status) }}
                            </span>
                        @endif
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="6" class="px-6 py-12 text-center text-sm text-muted-foreground">
                        Belum ada pesanan yang masuk.
                    </td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    {{-- Table Footer --}}
    <div class="flex items-center justify-between border-t border-zinc-100 px-6 py-3">
        <p class="text-xs text-muted-foreground">
            Menampilkan {{ $recentOrders->count() }} dari {{ \App\Models\Order::count() }} pesanan
        </p>
        <a href="{{ route('admin.orders.index') }}"
           class="text-xs font-medium text-zinc-700 hover:text-zinc-900 underline underline-offset-4 transition-colors">
            Lihat semua →
        </a>
    </div>
</div>

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('analyticsChart').getContext('2d');

    const labels    = @json($months);
    const revenue   = @json($revenueData);
    const orders    = @json($ordersData);

    // Shared gradient helper
    function makeGradient(ctx, color) {
        const g = ctx.createLinearGradient(0, 0, 0, 260);
        g.addColorStop(0,   color.replace(')', ', 0.25)').replace('rgb', 'rgba'));
        g.addColorStop(1,   color.replace(')', ', 0)').replace('rgb', 'rgba'));
        return g;
    }

    const revenueGrad = ctx.createLinearGradient(0, 0, 0, 260);
    revenueGrad.addColorStop(0, 'rgba(24,24,27,0.12)');
    revenueGrad.addColorStop(1, 'rgba(24,24,27,0)');

    const ordersGrad = ctx.createLinearGradient(0, 0, 0, 260);
    ordersGrad.addColorStop(0, 'rgba(113,113,122,0.12)');
    ordersGrad.addColorStop(1, 'rgba(113,113,122,0)');

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Pendapatan (Rp)',
                    data: revenue,
                    borderColor: '#18181b',
                    backgroundColor: revenueGrad,
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: '#18181b',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 6,
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y',
                },
                {
                    label: 'Jumlah Pesanan',
                    data: orders,
                    borderColor: '#71717a',
                    backgroundColor: ordersGrad,
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: '#71717a',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 6,
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y1',
                    hidden: true,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { display: false },
                tooltip: {
                    padding: 12,
                    cornerRadius: 8,
                    backgroundColor: 'rgba(0,0,0,0.82)',
                    titleFont: { size: 12, weight: '600', family: 'Inter, sans-serif' },
                    bodyFont:  { size: 11, family: 'Inter, sans-serif' },
                    callbacks: {
                        label(ctx) {
                            if (ctx.datasetIndex === 0) {
                                return ' Rp ' + new Intl.NumberFormat('id-ID').format(ctx.raw);
                            }
                            return ' ' + ctx.raw + ' pesanan';
                        }
                    }
                },
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                        color: '#a1a1aa',
                        font: { size: 11, family: 'Inter, sans-serif' },
                    },
                    border: { display: false },
                },
                y: {
                    position: 'left',
                    grid: { color: '#f4f4f5' },
                    border: { display: false, dash: [4, 4] },
                    ticks: {
                        color: '#a1a1aa',
                        font: { size: 11, family: 'Inter, sans-serif' },
                        callback(v) {
                            if (v >= 1e6) return 'Rp ' + (v/1e6).toFixed(1) + 'M';
                            if (v >= 1e3) return 'Rp ' + (v/1e3).toFixed(0) + 'k';
                            return 'Rp ' + v;
                        }
                    },
                },
                y1: {
                    position: 'right',
                    display: false,
                    grid: { drawOnChartArea: false },
                    ticks: {
                        color: '#a1a1aa',
                        font: { size: 11, family: 'Inter, sans-serif' },
                        callback(v) { return Math.floor(v) === v ? v : null; }
                    },
                },
            },
        },
    });

    // Toggle button logic
    window.setChartView = function(view) {
        const ds0 = chart.data.datasets[0]; // revenue
        const ds1 = chart.data.datasets[1]; // orders
        chart.options.scales.y.display  = true;
        chart.options.scales.y1.display = false;

        if (view === 'revenue') {
            ds0.hidden = false; ds1.hidden = true;
            chart.options.scales.y1.display = false;
        } else if (view === 'orders') {
            ds0.hidden = true; ds1.hidden = false;
            chart.options.scales.y.display  = false;
            chart.options.scales.y1.display = true;
        } else {
            ds0.hidden = false; ds1.hidden = false;
            chart.options.scales.y1.display = true;
        }
        chart.update();

        // Update button active state
        ['revenue', 'orders', 'both'].forEach(id => {
            const btn = document.getElementById('btn-' + id);
            if (id === view) {
                btn.classList.add('bg-zinc-900', 'text-white', 'border-zinc-300');
                btn.classList.remove('bg-white', 'text-zinc-600');
            } else {
                btn.classList.remove('bg-zinc-900', 'text-white', 'border-zinc-300');
                btn.classList.add('bg-white', 'text-zinc-600');
            }
        });
    };
});
</script>
@endpush
@endsection
