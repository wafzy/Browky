@extends('admin.layouts.app')

@section('content')
{{-- Page Header --}}
<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-8">
    <div>
        <h1 class="text-2xl font-bold tracking-tight text-zinc-900">Manajemen Pengguna</h1>
        <p class="text-xs text-zinc-500 mt-1">Kelola akun pengguna dan hak akses sistem.</p>
    </div>
    <a href="{{ route('admin.users.create') }}" class="inline-flex items-center gap-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-white shadow-xs transition-colors cursor-pointer px-4 py-2.5 border border-zinc-900">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Tambah Pengguna
    </a>
</div>

@if(session('error'))
<div class="flex gap-3 w-full border-l-4 border-red-500 bg-red-50 p-4 rounded-lg mb-6">
    <svg class="h-5 w-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    <div>
        <h5 class="text-sm font-semibold text-red-700 mb-0.5">Error</h5>
        <p class="text-xs text-red-600">{{ session('error') }}</p>
    </div>
</div>
@endif

{{-- Table Card --}}
<div class="bg-white border border-zinc-200/80 rounded-xl shadow-xs overflow-hidden">
    <div class="overflow-x-auto">
        <table class="w-full min-w-full">
            <thead>
                <tr class="border-b border-zinc-100 bg-zinc-50/60">
                    <th class="py-3.5 px-4 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider w-12">#</th>
                    <th class="py-3.5 px-4 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Pengguna</th>
                    <th class="py-3.5 px-4 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider hidden sm:table-cell">Email</th>
                    <th class="py-3.5 px-4 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Role</th>
                    <th class="py-3.5 px-4 text-right text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Aksi</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-zinc-100">
                @foreach($users as $key => $user)
                <tr class="hover:bg-zinc-50/40 transition-colors">
                    <td class="py-4 px-4">
                        <span class="text-xs text-zinc-400 font-medium">{{ $users->firstItem() + $key }}</span>
                    </td>
                    <td class="py-4 px-4">
                        <div class="flex items-center gap-3">
                            <div class="h-9 w-9 rounded-full bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-xs font-bold text-zinc-900 uppercase shrink-0">
                                {{ strtoupper(substr($user->name, 0, 2)) }}
                            </div>
                            <div>
                                <p class="text-sm font-semibold text-zinc-900">{{ $user->name }}</p>
                                <p class="text-[10px] text-zinc-400 sm:hidden">{{ $user->email }}</p>
                            </div>
                        </div>
                    </td>
                    <td class="py-4 px-4 hidden sm:table-cell">
                        <span class="text-sm text-zinc-600">{{ $user->email }}</span>
                    </td>
                    <td class="py-4 px-4">
                        @if($user->role === 'admin')
                            <span class="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-600/20 ring-inset">
                                Admin
                            </span>
                        @else
                            <span class="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600 ring-1 ring-zinc-500/10 ring-inset">
                                {{ ucfirst($user->role ?? 'user') }}
                            </span>
                        @endif
                    </td>
                    <td class="py-4 px-4 text-right">
                        <div class="flex items-center justify-end gap-2">
                            <a href="{{ route('admin.users.edit', $user->id) }}" class="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-xs hover:bg-zinc-50 hover:border-zinc-300 transition-all cursor-pointer">
                                <svg class="h-3.5 w-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                Edit
                            </a>
                            <form action="{{ route('admin.users.destroy', $user->id) }}" method="POST" onsubmit="return confirm('Apakah Anda yakin ingin menghapus pengguna ini?');" class="inline">
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
                @endforeach
            </tbody>
        </table>
    </div>

    @if($users->hasPages())
    <div class="px-5 py-4 border-t border-zinc-100">
        {{ $users->links() }}
    </div>
    @endif
</div>
@endsection
