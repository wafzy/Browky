<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', config('app.name', 'Browky Admin'))</title>

    <!-- Favicon & App Icons -->
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    <link rel="icon" type="image/svg+xml" href="{{ asset('favicon.svg') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('apple-touch-icon.png') }}">
    <link rel="icon" type="image/png" sizes="192x192" href="{{ asset('favicon-192x192.png') }}">
    <link rel="icon" type="image/png" sizes="512x512" href="{{ asset('favicon-512x512.png') }}">
    <link rel="manifest" href="{{ asset('site.webmanifest') }}">
    <meta name="theme-color" content="#ffffff">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <style>
        /* Sidebar transition */
        .sidebar-transition {
            transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        /* Hide label text when sidebar is collapsed */
        .sidebar-collapsed .nav-label,
        .sidebar-collapsed .nav-section-label,
        .sidebar-collapsed .brand-text,
        .sidebar-collapsed .sidebar-footer-text {
            opacity: 0;
            width: 0;
            overflow: hidden;
            white-space: nowrap;
        }
        .sidebar-collapsed .nav-label,
        .sidebar-collapsed .brand-text {
            display: none;
        }
        /* Center nav items when collapsed */
        .sidebar-collapsed .nav-item {
            justify-content: center;
            padding-left: 0;
            padding-right: 0;
        }
        .sidebar-collapsed .nav-item .active-indicator {
            display: none;
        }
        .sidebar-collapsed .brand-logo {
            margin: 0 auto;
        }
        /* Tooltip on hover when collapsed */
        .sidebar-collapsed [data-tooltip]:hover::after {
            content: attr(data-tooltip);
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            margin-left: 12px;
            background: #18181b;
            color: #fff;
            font-size: 11px;
            font-weight: 600;
            padding: 4px 10px;
            border-radius: 6px;
            white-space: nowrap;
            z-index: 100;
            pointer-events: none;
        }
        .sidebar-collapsed [data-tooltip] {
            position: relative;
        }
        /* When sidebar is collapsed, section labels become dots */
        .sidebar-collapsed .section-divider {
            margin: 0 auto;
            width: 80%;
        }
    </style>
</head>
<body class="font-sans antialiased text-zinc-900 bg-zinc-50/50"
      x-data="{
          mobileSidebarOpen: false,
          sidebarCollapsed: localStorage.getItem('browky_sidebar_collapsed') === 'true',
          toggleCollapse() {
              this.sidebarCollapsed = !this.sidebarCollapsed;
              localStorage.setItem('browky_sidebar_collapsed', this.sidebarCollapsed);
          }
      }">

    <!-- Mobile Backdrop -->
    <div x-show="mobileSidebarOpen"
         class="fixed inset-0 z-40 bg-black/40 lg:hidden"
         @click="mobileSidebarOpen = false"
         x-transition:enter="transition ease-out duration-300"
         x-transition:enter-start="opacity-0"
         x-transition:enter-end="opacity-100"
         x-transition:leave="transition ease-in duration-200"
         x-transition:leave-start="opacity-100"
         x-transition:leave-end="opacity-0"
         style="display: none;">
    </div>

    <div class="flex h-screen overflow-hidden">

        <!-- ===================== SIDEBAR ===================== -->
        <aside
            :class="{
                'translate-x-0': mobileSidebarOpen,
                '-translate-x-full lg:translate-x-0': !mobileSidebarOpen,
                'w-[240px]': !sidebarCollapsed,
                'w-[60px]': sidebarCollapsed
            }"
            class="fixed left-0 top-0 z-50 flex h-screen flex-col bg-zinc-50 border-r border-zinc-200 sidebar-transition lg:static lg:z-auto"
            :aria-expanded="!sidebarCollapsed"
            @click.outside="mobileSidebarOpen = false">

            <!-- Brand Header -->
            <div class="flex h-14 items-center border-b border-zinc-200 shrink-0"
                 :class="sidebarCollapsed ? 'justify-center px-0' : 'px-4 gap-3'">
                <a href="{{ route('dashboard') }}"
                   class="flex items-center brand-logo shrink-0"
                   :class="sidebarCollapsed ? '' : 'gap-2.5'">
                    <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white shadow-xs shrink-0">
                        <span class="text-sm font-bold font-mono">B</span>
                    </div>
                    <span class="nav-label text-zinc-900 font-semibold text-sm tracking-tight whitespace-nowrap overflow-hidden transition-all duration-200"
                          :class="sidebarCollapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-[120px]'">
                        Browky Admin
                    </span>
                </a>

                <!-- Close button (mobile only) -->
                <button class="ml-auto text-zinc-400 hover:text-white transition-colors lg:hidden shrink-0"
                        @click.stop="mobileSidebarOpen = false"
                        x-show="!sidebarCollapsed">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <!-- Navigation -->
            <div class="flex flex-col flex-1 overflow-y-auto overflow-x-hidden py-4"
                 :class="sidebarCollapsed ? 'px-1.5' : 'px-3'">
                <nav class="space-y-1">

                    <!-- Section: Menu Utama -->
                    <p class="px-2 text-[9px] font-bold tracking-widest text-zinc-500 uppercase mb-1 mt-2 transition-all duration-200 whitespace-nowrap"
                       :class="sidebarCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'">
                        Menu Utama
                    </p>
                    <div :class="sidebarCollapsed ? 'border-t border-zinc-200 mb-2 mt-1' : 'hidden'"></div>

                    @php
                        $navItems = [
                            ['route' => 'dashboard', 'label' => 'Dashboard', 'match' => 'dashboard', 'icon' => '<rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="10" rx="1" /><rect width="7" height="5" x="3" y="14" rx="1" />'],
                            ['route' => 'admin.products.index', 'label' => 'Produk', 'match' => 'admin.products.*', 'icon' => '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>'],
                            ['route' => 'admin.porters.index', 'label' => 'Porter', 'match' => 'admin.porters.*', 'icon' => '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'],
                            ['route' => 'admin.camping-packages.index', 'label' => 'Paket Camping', 'match' => 'admin.camping-packages.*', 'icon' => '<polygon points="12 2 2 22 22 22"/>'],
                            ['route' => 'admin.orders.index', 'label' => 'Pesanan', 'match' => 'admin.orders.*', 'icon' => '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'],
                            ['route' => 'admin.mountains.index', 'label' => 'Gunung (SEO)', 'match' => 'admin.mountains.*', 'icon' => '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>'],
                            ['route' => 'admin.users.index', 'label' => 'Pengguna', 'match' => 'admin.users.*', 'icon' => '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'],
                        ];
                    @endphp

                    @foreach($navItems as $item)
                    @php
                        $isActive = request()->routeIs($item['match']);
                        $activeClasses = $isActive
                            ? 'bg-zinc-200/60 text-zinc-900 font-semibold'
                            : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900';
                        $collapsedActiveClasses = $isActive
                            ? 'bg-zinc-200 text-zinc-900'
                            : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900';
                    @endphp
                    <a href="{{ route($item['route']) }}"
                       data-tooltip="{{ $item['label'] }}"
                       title="{{ $item['label'] }}"
                       class="relative group flex items-center rounded-lg text-sm transition-all duration-150 cursor-pointer {{ $activeClasses }}"
                       :class="sidebarCollapsed ? 'justify-center p-2.5' : 'px-3 py-2 gap-3'">

                        <svg class="h-4 w-4 shrink-0 transition-colors {{ $isActive ? 'text-zinc-900' : 'text-zinc-500 group-hover:text-zinc-900' }}"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            {!! $item['icon'] !!}
                        </svg>

                        <span class="whitespace-nowrap overflow-hidden transition-all duration-200 leading-none"
                              :class="sidebarCollapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-[160px]'">
                            {{ $item['label'] }}
                        </span>
                    </a>
                    @endforeach
                </nav>

                <!-- Footer -->
                <div class="mt-auto pt-4 border-t border-zinc-200">
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button type="submit"
                                data-tooltip="Logout"
                                title="Logout"
                                class="relative group w-full flex items-center gap-3 rounded-lg text-sm text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
                                :class="sidebarCollapsed ? 'justify-center p-2.5' : 'px-3 py-2'">
                            <svg class="h-4 w-4 shrink-0 text-rose-600 group-hover:text-rose-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                <polyline points="16 17 21 12 16 7"/>
                                <line x1="21" y1="12" x2="9" y2="12"/>
                            </svg>
                            <span class="whitespace-nowrap overflow-hidden font-medium transition-all duration-200"
                                  :class="sidebarCollapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-[120px]'">
                                Logout
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </aside>

        <!-- ===================== MAIN CONTENT ===================== -->
        <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden min-w-0">

            <!-- ===================== HEADER ===================== -->
            <header class="sticky top-0 z-30 flex h-14 w-full items-center border-b border-zinc-200/80 bg-white/90 backdrop-blur-sm shrink-0">
                <div class="flex w-full items-center px-4 gap-3">

                    <!-- Left: Desktop Sidebar Toggle + Mobile Hamburger -->
                    <div class="flex items-center gap-2">
                        <!-- Desktop Toggle (collapses/expands sidebar) -->
                        <button class="hidden lg:flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-colors cursor-pointer"
                                @click="toggleCollapse()"
                                :title="sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'">
                            <!-- Panel Left Open icon (collapse) -->
                            <svg x-show="!sidebarCollapsed" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                                <path d="M9 3v18"/>
                                <path d="m16 15-3-3 3-3"/>
                            </svg>
                            <!-- Panel Left Close icon (expand) -->
                            <svg x-show="sidebarCollapsed" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                                <path d="M9 3v18"/>
                                <path d="m14 9 3 3-3 3"/>
                            </svg>
                        </button>

                        <!-- Mobile Hamburger -->
                        <button class="flex lg:hidden h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-colors cursor-pointer"
                                @click.stop="mobileSidebarOpen = !mobileSidebarOpen">
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="4" y1="12" x2="20" y2="12"/>
                                <line x1="4" y1="6" x2="20" y2="6"/>
                                <line x1="4" y1="18" x2="20" y2="18"/>
                            </svg>
                        </button>

                        <!-- Separator -->
                        <div class="hidden lg:block h-5 w-px bg-zinc-200"></div>

                        <!-- Breadcrumb -->
                        <nav class="hidden lg:flex items-center gap-1.5 text-xs">
                            <span class="text-zinc-400 font-medium">Admin</span>
                            <svg class="h-3 w-3 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                            <span class="font-semibold text-zinc-800">
                                @if(request()->routeIs('dashboard'))
                                    Dashboard
                                @elseif(request()->routeIs('admin.products.*'))
                                    Produk
                                @elseif(request()->routeIs('admin.porters.*'))
                                    Porter
                                @elseif(request()->routeIs('admin.camping-packages.*'))
                                    Paket Camping
                                @elseif(request()->routeIs('admin.orders.*'))
                                    Pesanan
                                @elseif(request()->routeIs('admin.mountains.*'))
                                    Gunung (SEO)
                                @elseif(request()->routeIs('admin.users.*'))
                                    Pengguna
                                @else
                                    Panel
                                @endif
                            </span>
                        </nav>

                        <!-- Mobile Brand -->
                        <a href="{{ route('dashboard') }}" class="flex lg:hidden items-center gap-2 font-semibold text-zinc-900">
                            <div class="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-900 text-white">
                                <span class="text-[10px] font-bold font-mono">B</span>
                            </div>
                            <span class="text-sm">Browky</span>
                        </a>
                    </div>

                    <!-- Right: Actions -->
                    <div class="ml-auto flex items-center gap-2">
                        <!-- View Website -->
                        <a href="{{ url('/') }}" target="_blank"
                           class="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 transition-all cursor-pointer shadow-xs">
                            <svg class="h-3.5 w-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                            Lihat Website
                        </a>

                        <!-- User Avatar + Dropdown -->
                        <div class="relative" x-data="{ dropdownOpen: false }" @click.outside="dropdownOpen = false">
                            <button class="flex items-center gap-2 rounded-full cursor-pointer focus:outline-none"
                                    @click.prevent="dropdownOpen = !dropdownOpen">
                                <div class="h-8 w-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-xs shadow-xs hover:bg-zinc-800 transition-colors ring-2 ring-white">
                                    {{ strtoupper(substr(Auth::user()->name, 0, 2)) }}
                                </div>
                            </button>

                            <div x-show="dropdownOpen"
                                 class="absolute right-0 mt-2 w-52 origin-top-right rounded-xl border border-zinc-200/80 bg-white p-1.5 shadow-lg z-50"
                                 x-transition:enter="transition ease-out duration-100"
                                 x-transition:enter-start="transform opacity-0 scale-95"
                                 x-transition:enter-end="transform opacity-100 scale-100"
                                 x-transition:leave="transition ease-in duration-75"
                                 x-transition:leave-start="transform opacity-100 scale-100"
                                 x-transition:leave-end="transform opacity-0 scale-95"
                                 style="display: none;">

                                <div class="px-3 py-2.5 border-b border-zinc-100">
                                    <p class="text-xs font-bold text-zinc-900 truncate">{{ Auth::user()->name }}</p>
                                    <p class="text-[10px] text-zinc-400 truncate mt-0.5">{{ Auth::user()->email }}</p>
                                </div>

                                <div class="py-1">
                                    <a href="{{ route('profile.edit') }}"
                                       class="flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-700 rounded-lg hover:bg-zinc-50 hover:text-zinc-950 transition-colors font-medium cursor-pointer">
                                        <svg class="h-3.5 w-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                            <circle cx="12" cy="7" r="4"/>
                                        </svg>
                                        Profil Saya
                                    </a>
                                </div>

                                <div class="border-t border-zinc-100 pt-1 mt-1">
                                    <form method="POST" action="{{ route('logout') }}">
                                        @csrf
                                        <button type="submit"
                                                class="flex items-center gap-2.5 px-3 py-2 text-xs text-rose-600 rounded-lg hover:bg-rose-50 hover:text-rose-700 transition-colors w-full text-left font-semibold cursor-pointer">
                                            <svg class="h-3.5 w-3.5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                                <polyline points="16 17 21 12 16 7"/>
                                                <line x1="21" y1="12" x2="9" y2="12"/>
                                            </svg>
                                            Logout
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <!-- ===================== MAIN ===================== -->
            <main class="flex-1">
                <div class="mx-auto max-w-screen-2xl p-4 md:p-6">

                    @if(session('success'))
                    <div class="flex w-full items-start gap-3 border border-zinc-200/80 border-l-4 border-l-emerald-500 bg-white p-4 shadow-xs rounded-lg mb-6">
                        <div class="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                        </div>
                        <div>
                            <h5 class="text-sm font-semibold text-zinc-900">Berhasil!</h5>
                            <p class="text-xs text-zinc-500 mt-0.5">{{ session('success') }}</p>
                        </div>
                    </div>
                    @endif

                    @yield('content')
                </div>
            </main>
        </div>
    </div>

    @stack('scripts')
</body>
</html>
