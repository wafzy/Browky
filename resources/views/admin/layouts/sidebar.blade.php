<aside :class="sidebarToggle ? 'translate-x-0' : '-translate-x-full'" class="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-zinc-50 border-r border-zinc-200 duration-300 ease-in-out lg:static lg:translate-x-0" @click.outside="sidebarToggle = false">
    <!-- SIDEBAR HEADER -->
    <div class="flex items-center justify-between px-6 py-5 border-b border-zinc-200 bg-zinc-100/50">
        <a href="{{ route('dashboard') }}" class="flex items-center gap-2.5 font-semibold text-zinc-900 tracking-tight text-lg">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white shadow-xs">
                <span class="text-sm font-bold font-mono">B</span>
            </div>
            <span>Browky Admin</span>
        </a>

        <button class="block lg:hidden text-zinc-400 hover:text-white transition-colors" @click.stop="sidebarToggle = !sidebarToggle">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    </div>

    <!-- SIDEBAR NAVIGATION -->
    <div class="flex flex-col flex-1 overflow-y-auto p-4 custom-scrollbar">
        <nav class="space-y-6">
            <div>
                <h3 class="px-3 text-[10px] font-bold tracking-wider text-[#e2de00] uppercase mb-2 opacity-75">Menu Utama</h3>
                <ul class="space-y-1">
                    <!-- Dashboard -->
                    <li>
                        <a href="{{ route('dashboard') }}" class="group flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all {{ request()->routeIs('dashboard') ? 'bg-white/10 text-white font-medium border-l-4 border-[#e2de00] pl-2' : 'text-zinc-400 hover:bg-white/5 hover:text-white' }}">
                            <svg class="h-4 w-4 shrink-0 {{ request()->routeIs('dashboard') ? 'text-white' : 'text-zinc-500 group-hover:text-white' }}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect width="7" height="9" x="3" y="3" rx="1" />
                                <rect width="7" height="5" x="14" y="3" rx="1" />
                                <rect width="7" height="9" x="14" y="10" rx="1" />
                                <rect width="7" height="5" x="3" y="14" rx="1" />
                            </svg>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    
                    <!-- Products -->
                    <li>
                        <a href="{{ route('admin.products.index') }}" class="group flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all {{ request()->routeIs('admin.products.*') ? 'bg-white/10 text-white font-medium border-l-4 border-[#e2de00] pl-2' : 'text-zinc-400 hover:bg-white/5 hover:text-white' }}">
                            <svg class="h-4 w-4 shrink-0 {{ request()->routeIs('admin.products.*') ? 'text-white' : 'text-zinc-500 group-hover:text-white' }}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                <line x1="12" y1="22.08" x2="12" y2="12" />
                            </svg>
                            <span>Produk</span>
                        </a>
                    </li>

                    <!-- Porters -->
                    <li>
                        <a href="{{ route('admin.porters.index') }}" class="group flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all {{ request()->routeIs('admin.porters.*') ? 'bg-white/10 text-white font-medium border-l-4 border-[#e2de00] pl-2' : 'text-zinc-400 hover:bg-white/5 hover:text-white' }}">
                            <svg class="h-4 w-4 shrink-0 {{ request()->routeIs('admin.porters.*') ? 'text-white' : 'text-zinc-500 group-hover:text-white' }}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            <span>Porter</span>
                        </a>
                    </li>

                    <!-- Camping Packages -->
                    <li>
                        <a href="{{ route('admin.camping-packages.index') }}" class="group flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all {{ request()->routeIs('admin.camping-packages.*') ? 'bg-white/10 text-white font-medium border-l-4 border-[#e2de00] pl-2' : 'text-zinc-400 hover:bg-white/5 hover:text-white' }}">
                            <svg class="h-4 w-4 shrink-0 {{ request()->routeIs('admin.camping-packages.*') ? 'text-white' : 'text-zinc-500 group-hover:text-white' }}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polygon points="12 2 2 22 22 22"></polygon>
                                <polyline points="12 12 17 22"></polyline>
                                <polyline points="12 12 7 22"></polyline>
                            </svg>
                            <span>Paket Camping</span>
                        </a>
                    </li>

                    <!-- Orders -->
                    <li>
                        <a href="{{ route('admin.orders.index') }}" class="group flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all {{ request()->routeIs('admin.orders.*') ? 'bg-white/10 text-white font-medium border-l-4 border-[#e2de00] pl-2' : 'text-zinc-400 hover:bg-white/5 hover:text-white' }}">
                            <svg class="h-4 w-4 shrink-0 {{ request()->routeIs('admin.orders.*') ? 'text-white' : 'text-zinc-500 group-hover:text-white' }}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            <span>Pesanan</span>
                        </a>
                    </li>

                    <!-- Mountains -->
                    <li>
                        <a href="{{ route('admin.mountains.index') }}" class="group flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all {{ request()->routeIs('admin.mountains.*') ? 'bg-white/10 text-white font-medium border-l-4 border-[#e2de00] pl-2' : 'text-zinc-400 hover:bg-white/5 hover:text-white' }}">
                            <svg class="h-4 w-4 shrink-0 {{ request()->routeIs('admin.mountains.*') ? 'text-white' : 'text-zinc-500 group-hover:text-white' }}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                            </svg>
                            <span>Gunung (SEO)</span>
                        </a>
                    </li>

                    <!-- Users -->
                    <li>
                        <a href="{{ route('admin.users.index') }}" class="group flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all {{ request()->routeIs('admin.users.*') ? 'bg-white/10 text-white font-medium border-l-4 border-[#e2de00] pl-2' : 'text-zinc-400 hover:bg-white/5 hover:text-white' }}">
                            <svg class="h-4 w-4 shrink-0 {{ request()->routeIs('admin.users.*') ? 'text-white' : 'text-zinc-500 group-hover:text-white' }}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            <span>Pengguna</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="mt-auto pt-6 border-t border-[#001f3f]">
            <h3 class="px-3 text-[10px] font-bold tracking-wider text-zinc-500 uppercase mb-2">Akun</h3>
            <ul class="space-y-1">
                <li>
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button type="submit" class="w-full group flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors text-left font-medium cursor-pointer">
                            <svg class="h-4 w-4 shrink-0 text-rose-400 group-hover:text-rose-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            <span>Logout</span>
                        </button>
                    </form>
                </li>
            </ul>
        </div>
    </div>
</aside>
