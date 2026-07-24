<header class="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-zinc-200/80 bg-white/80 backdrop-blur-md px-4 sm:px-6">
    <!-- Left Section (Hamburger & Logo on Mobile / Breadcrumbs on Desktop) -->
    <div class="flex items-center gap-3">
        <!-- Hamburger Menu Button -->
        <button class="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 lg:hidden cursor-pointer transition-colors" @click.stop="sidebarToggle = !sidebarToggle">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
        </button>

        <!-- Brand Logo on Mobile -->
        <a href="{{ route('dashboard') }}" class="flex items-center gap-2 lg:hidden font-semibold text-zinc-900 tracking-tight">
            <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 text-white shadow-xs">
                <span class="text-xs font-bold font-mono">B</span>
            </div>
            <span class="text-sm">Browky</span>
        </a>

        <!-- Breadcrumbs / Page Indicator for Desktop -->
        <div class="hidden lg:flex items-center gap-2 text-xs">
            <span class="text-zinc-400 font-medium uppercase tracking-wider">Admin</span>
            <span class="text-zinc-300">/</span>
            <span class="font-bold text-zinc-800 uppercase tracking-wider">
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
        </div>
    </div>

    <!-- Right Section (Lihat Website & User Dropdown) -->
    <div class="flex items-center gap-4">
        <!-- View Website Link -->
        <a href="{{ url('/') }}" target="_blank" class="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3.5 py-1.75 text-xs font-semibold text-zinc-700 shadow-xs hover:bg-zinc-50 hover:text-zinc-950 hover:border-zinc-300 transition-all cursor-pointer">
            <svg class="h-3.5 w-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            <span class="hidden sm:inline">Lihat Website</span>
        </a>

        <!-- User Dropdown Menu -->
        <div class="relative" x-data="{ dropdownOpen: false }" @click.outside="dropdownOpen = false">
            <button class="flex items-center gap-2 rounded-full focus:outline-hidden cursor-pointer" @click.prevent="dropdownOpen = !dropdownOpen">
                <!-- User Initials Avatar -->
                <div class="h-8.5 w-8.5 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-xs shadow-xs hover:bg-zinc-800 transition-colors">
                    {{ strtoupper(substr(Auth::user()->name, 0, 2)) }}
                </div>
            </button>

            <!-- Dropdown Box -->
            <div x-show="dropdownOpen" 
                 class="absolute right-0 mt-2 w-52 origin-top-right rounded-xl border border-zinc-200/80 bg-white p-1.5 shadow-lg z-50"
                 x-transition:enter="transition ease-out duration-100"
                 x-transition:enter-start="transform opacity-0 scale-95"
                 x-transition:enter-end="transform opacity-100 scale-100"
                 x-transition:leave="transition ease-in duration-75"
                 x-transition:leave-start="transform opacity-100 scale-100"
                 x-transition:leave-end="transform opacity-0 scale-95"
                 style="display: none;">
                
                <!-- Profile Summary -->
                <div class="px-3 py-2.5 border-b border-zinc-100">
                    <p class="text-xs font-bold text-zinc-900 truncate">{{ Auth::user()->name }}</p>
                    <p class="text-[10px] text-zinc-400 truncate mt-0.5">{{ Auth::user()->email }}</p>
                </div>

                <!-- Dropdown Links -->
                <div class="py-1">
                    <a href="{{ route('profile.edit') }}" class="flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-700 rounded-lg hover:bg-zinc-50 hover:text-zinc-950 transition-colors w-full text-left font-medium cursor-pointer">
                        <svg class="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span>Profil Saya</span>
                    </a>
                </div>

                <!-- Logout -->
                <div class="border-t border-zinc-100 pt-1 mt-1">
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button type="submit" class="flex items-center gap-2.5 px-3 py-2 text-xs text-rose-600 rounded-lg hover:bg-rose-50 hover:text-rose-700 transition-colors w-full text-left font-semibold cursor-pointer">
                            <svg class="h-4 w-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            <span>Logout</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</header>
