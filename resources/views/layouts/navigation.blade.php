<nav x-data="{ open: false }" class="border-b border-zinc-200 bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-14 items-center justify-between">

            <!-- Left: Logo + Nav Links -->
            <div class="flex items-center gap-6">
                <!-- Logo -->
                <a href="{{ route('dashboard') }}" class="flex items-center gap-2 shrink-0">
                    <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 text-white shadow-xs">
                        <span class="text-xs font-bold font-mono">B</span>
                    </div>
                    <span class="text-sm font-semibold tracking-tight text-zinc-900 hidden sm:inline">Browky</span>
                </a>

                <!-- Separator -->
                <div class="hidden sm:block h-5 w-px bg-zinc-200"></div>

                <!-- Nav Links -->
                <div class="hidden sm:flex items-center gap-1">
                    <a href="{{ route('dashboard') }}"
                       class="inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors
                              {{ request()->routeIs('dashboard')
                                  ? 'bg-zinc-100 text-zinc-900'
                                  : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900' }}">
                        Dashboard
                    </a>
                </div>
            </div>

            <!-- Right: User Dropdown -->
            <div class="hidden sm:flex sm:items-center sm:gap-2">
                <div class="relative" x-data="{ dropdownOpen: false }" @click.outside="dropdownOpen = false">
                    <button
                        @click="dropdownOpen = !dropdownOpen"
                        class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer focus:outline-none"
                    >
                        <!-- Avatar -->
                        <div class="h-7 w-7 rounded-full bg-zinc-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                            {{ strtoupper(substr(Auth::user()->name, 0, 2)) }}
                        </div>
                        <span class="text-sm text-zinc-700">{{ Auth::user()->name }}</span>
                        <svg class="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <!-- Dropdown Menu -->
                    <div
                        x-show="dropdownOpen"
                        x-transition:enter="transition ease-out duration-100"
                        x-transition:enter-start="transform opacity-0 scale-95"
                        x-transition:enter-end="transform opacity-100 scale-100"
                        x-transition:leave="transition ease-in duration-75"
                        x-transition:leave-start="transform opacity-100 scale-100"
                        x-transition:leave-end="transform opacity-0 scale-95"
                        class="absolute right-0 mt-1.5 w-52 rounded-lg border border-zinc-200 bg-white p-1 shadow-md z-50"
                        style="display: none;"
                    >
                        <!-- User Info -->
                        <div class="px-2 py-2 border-b border-zinc-100 mb-1">
                            <p class="text-xs font-semibold text-zinc-900 truncate">{{ Auth::user()->name }}</p>
                            <p class="text-xs text-zinc-500 truncate mt-0.5">{{ Auth::user()->email }}</p>
                        </div>

                        <a href="{{ route('profile.edit') }}"
                           class="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer">
                            <svg class="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Profil
                        </a>

                        <div class="h-px bg-zinc-100 my-1"></div>

                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <button type="submit"
                                    class="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer text-left">
                                <svg class="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Keluar
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Mobile Hamburger -->
            <div class="-me-2 flex items-center sm:hidden">
                <button
                    @click="open = !open"
                    class="inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition-colors focus:outline-none"
                >
                    <svg x-show="!open" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <svg x-show="open" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="display:none;">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Menu -->
    <div :class="{'block': open, 'hidden': !open}" class="hidden sm:hidden border-t border-zinc-200">
        <div class="px-4 py-2 space-y-0.5">
            <a href="{{ route('dashboard') }}"
               class="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors
                      {{ request()->routeIs('dashboard')
                          ? 'bg-zinc-100 text-zinc-900'
                          : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900' }}">
                Dashboard
            </a>
        </div>

        <div class="border-t border-zinc-200 px-4 py-3 space-y-0.5">
            <div class="px-3 py-1.5">
                <p class="text-sm font-semibold text-zinc-900">{{ Auth::user()->name }}</p>
                <p class="text-xs text-zinc-500">{{ Auth::user()->email }}</p>
            </div>

            <a href="{{ route('profile.edit') }}"
               class="flex items-center rounded-md px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors">
                Profil
            </a>

            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button type="submit"
                        class="flex w-full items-center rounded-md px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors text-left cursor-pointer">
                    Keluar
                </button>
            </form>
        </div>
    </div>
</nav>
