@extends('admin.layouts.app')

@section('content')
<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-8">
    <div>
        <h1 class="text-2xl font-bold tracking-tight text-zinc-900">Tambah Pengguna</h1>
        <p class="text-xs text-zinc-500 mt-1">Buat akun pengguna baru untuk sistem.</p>
    </div>
    <a href="{{ route('admin.users.index') }}" class="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 shadow-xs hover:bg-zinc-50 transition-colors cursor-pointer">
        <svg class="h-3.5 w-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Kembali ke Daftar
    </a>
</div>

<div class="max-w-lg">
    <div class="bg-white border border-zinc-200/80 rounded-xl shadow-xs p-6">
        <h2 class="text-sm font-bold text-zinc-900 mb-5 pb-4 border-b border-zinc-100">Informasi Pengguna</h2>

        <form action="{{ route('admin.users.store') }}" method="POST">
            @csrf
            <div class="space-y-5">
                <div>
                    <label for="name" class="block text-xs font-semibold text-zinc-700 mb-1.5">Nama Lengkap <span class="text-red-500">*</span></label>
                    <input type="text" id="name" name="name" value="{{ old('name') }}" placeholder="Masukkan nama lengkap" class="w-full rounded-lg border @error('name') border-red-400 @else border-zinc-300 @enderror bg-white py-2.5 px-3.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition" required>
                    @error('name')
                        <p class="text-xs text-red-500 mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="email" class="block text-xs font-semibold text-zinc-700 mb-1.5">Email <span class="text-red-500">*</span></label>
                    <input type="email" id="email" name="email" value="{{ old('email') }}" placeholder="contoh@email.com" class="w-full rounded-lg border @error('email') border-red-400 @else border-zinc-300 @enderror bg-white py-2.5 px-3.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition" required>
                    @error('email')
                        <p class="text-xs text-red-500 mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="role" class="block text-xs font-semibold text-zinc-700 mb-1.5">Role <span class="text-red-500">*</span></label>
                    <select id="role" name="role" class="w-full rounded-lg border border-zinc-300 bg-white py-2.5 px-3.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition" required>
                        <option value="staff" {{ old('role') == 'staff' ? 'selected' : '' }}>Staff</option>
                        <option value="admin" {{ old('role') == 'admin' ? 'selected' : '' }}>Admin</option>
                    </select>
                    @error('role')
                        <p class="text-xs text-red-500 mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="password" class="block text-xs font-semibold text-zinc-700 mb-1.5">Password <span class="text-red-500">*</span></label>
                    <input type="password" id="password" name="password" placeholder="Minimal 8 karakter" class="w-full rounded-lg border @error('password') border-red-400 @else border-zinc-300 @enderror bg-white py-2.5 px-3.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition" required>
                    @error('password')
                        <p class="text-xs text-red-500 mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="password_confirmation" class="block text-xs font-semibold text-zinc-700 mb-1.5">Konfirmasi Password <span class="text-red-500">*</span></label>
                    <input type="password" id="password_confirmation" name="password_confirmation" placeholder="Ulangi password" class="w-full rounded-lg border border-zinc-300 bg-white py-2.5 px-3.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition" required>
                </div>

                <div class="pt-2 flex gap-3">
                    <button type="submit" class="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-900 px-4 py-3 text-sm font-semibold text-white shadow-xs transition-colors cursor-pointer">
                        Simpan Pengguna
                    </button>
                    <a href="{{ route('admin.users.index') }}" class="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 shadow-xs hover:bg-zinc-50 transition-colors cursor-pointer">
                        Batal
                    </a>
                </div>
            </div>
        </form>
    </div>
</div>
@endsection
