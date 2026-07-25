<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Browky Outdoor') }}</title>

        <!-- Favicon & App Icons -->
        <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
        <link rel="icon" type="image/svg+xml" href="{{ asset('favicon.svg') }}">
        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('apple-touch-icon.png') }}">
        <link rel="icon" type="image/png" sizes="192x192" href="{{ asset('favicon-192x192.png') }}">
        <link rel="icon" type="image/png" sizes="512x512" href="{{ asset('favicon-512x512.png') }}">
        <link rel="manifest" href="{{ asset('site.webmanifest') }}">
        <meta name="theme-color" content="#ffffff">

        <!-- Inter Font — shadcn/ui default -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

        @vite(['resources/css/app.css', 'resources/js/app.js'])

        <style>
            /* shadcn/ui CSS variables (light mode) */
            :root {
                --background: oklch(1 0 0);
                --foreground: oklch(0.145 0 0);
                --card: oklch(1 0 0);
                --card-foreground: oklch(0.145 0 0);
                --muted: oklch(0.97 0 0);
                --muted-foreground: oklch(0.556 0 0);
                --border: oklch(0.922 0 0);
                --input: oklch(0.922 0 0);
                --ring: oklch(0.708 0 0);
                --primary: oklch(0.145 0 0);
                --primary-foreground: oklch(0.985 0 0);
                --destructive: oklch(0.577 0.245 27.325);
                --radius: 0.625rem;
                --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
            }

            /* Base reset */
            *, *::before, *::after { box-sizing: border-box; }

            html, body {
                height: 100%;
                margin: 0;
                padding: 0;
                font-family: var(--font-sans);
                font-size: 14px;
                line-height: 1.5;
                -webkit-font-smoothing: antialiased;
                background-color: var(--background);
                color: var(--foreground);
            }

            /* ========= LAYOUT: login-02 split ========= */
            .login-root {
                display: grid;
                min-height: 100svh;
            }
            @media (min-width: 1024px) {
                .login-root { grid-template-columns: 1fr 1fr; }
            }

            /* Left panel */
            .login-left {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                padding: 1.5rem;
            }
            @media (min-width: 768px) {
                .login-left { padding: 2.5rem; }
            }

            /* Brand */
            .login-brand {
                display: flex;
                justify-content: center;
            }
            @media (min-width: 768px) {
                .login-brand { justify-content: flex-start; }
            }

            .login-brand a {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-weight: 500;
                font-size: 0.875rem;
                text-decoration: none;
                color: var(--foreground);
            }

            .brand-icon {
                display: flex;
                width: 1.5rem;
                height: 1.5rem;
                align-items: center;
                justify-content: center;
                border-radius: calc(var(--radius) - 2px);
                background-color: var(--primary);
                color: var(--primary-foreground);
            }
            .brand-icon span {
                font-size: 0.7rem;
                font-weight: 700;
                font-family: monospace;
                line-height: 1;
            }

            /* Form area */
            .login-form-area {
                display: flex;
                flex: 1;
                align-items: center;
                justify-content: center;
            }

            .login-form-wrap {
                width: 100%;
                max-width: 22rem;
            }

            /* ========= FORM COMPONENT: login-form ========= */
            .login-form {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
            }

            .field-group {
                display: flex;
                flex-direction: column;
                gap: 1.25rem;
                width: 100%;
            }

            .form-header {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.25rem;
                text-align: center;
            }

            .form-header h1 {
                font-size: 1.5rem;
                font-weight: 700;
                line-height: 1.2;
                margin: 0;
                letter-spacing: -0.02em;
            }

            .form-header p {
                font-size: 0.875rem;
                color: var(--muted-foreground);
                margin: 0;
                text-wrap: balance;
            }

            /* Field */
            .field {
                display: flex;
                flex-direction: column;
                gap: 0.375rem;
                width: 100%;
            }

            .field-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            /* Label */
            .field label {
                font-size: 0.875rem;
                font-weight: 500;
                line-height: 1.25;
                color: var(--foreground);
            }

            .forgot-link {
                font-size: 0.875rem;
                color: var(--foreground);
                text-decoration: underline;
                text-underline-offset: 4px;
                opacity: 0.7;
                transition: opacity 0.15s;
            }
            .forgot-link:hover { opacity: 1; }

            /* Input */
            .field input[type="email"],
            .field input[type="password"] {
                height: 2rem;
                width: 100%;
                min-width: 0;
                border-radius: var(--radius);
                border: 1px solid var(--input);
                background: var(--background);
                padding: 0.25rem 0.625rem;
                font-size: 0.875rem;
                font-family: var(--font-sans);
                color: var(--foreground);
                outline: none;
                transition: border-color 0.15s, box-shadow 0.15s;
            }
            .field input::placeholder { color: var(--muted-foreground); }
            .field input:focus {
                border-color: var(--ring);
                box-shadow: 0 0 0 3px color-mix(in oklch, var(--ring), transparent 50%);
            }
            .field input.input-invalid {
                border-color: var(--destructive);
                box-shadow: 0 0 0 3px color-mix(in oklch, var(--destructive), transparent 80%);
            }

            /* Error text */
            .field-error {
                font-size: 0.8rem;
                color: var(--destructive);
            }

            /* Submit Button */
            .btn-login {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 2rem;
                padding: 0.25rem 1rem;
                font-size: 0.875rem;
                font-weight: 500;
                font-family: var(--font-sans);
                border-radius: var(--radius);
                border: none;
                background-color: var(--primary);
                color: var(--primary-foreground);
                cursor: pointer;
                transition: background-color 0.15s, opacity 0.15s;
            }
            .btn-login:hover { opacity: 0.9; }
            .btn-login:active { opacity: 0.8; transform: scale(0.99); }
            .btn-login:focus-visible {
                outline: none;
                box-shadow: 0 0 0 3px color-mix(in oklch, var(--ring), transparent 50%);
            }

            /* Field Separator (OR divider) */
            .field-separator {
                position: relative;
                height: 1.25rem;
                display: flex;
                align-items: center;
            }
            .field-separator hr {
                position: absolute;
                inset: 0;
                top: 50%;
                border: none;
                border-top: 1px solid var(--border);
                width: 100%;
                margin: 0;
            }
            .field-separator span {
                position: relative;
                margin: 0 auto;
                display: block;
                width: fit-content;
                background-color: var(--background);
                padding: 0 0.5rem;
                font-size: 0.75rem;
                color: var(--muted-foreground);
            }

            /* Session status alert */
            .session-status {
                border-radius: var(--radius);
                border: 1px solid #bbf7d0;
                background-color: #f0fdf4;
                padding: 0.5rem 0.75rem;
                font-size: 0.875rem;
                color: #15803d;
            }

            /* Back link */
            .back-link {
                text-align: center;
                font-size: 0.875rem;
                color: var(--muted-foreground);
            }
            .back-link a {
                display: inline-flex;
                align-items: center;
                gap: 0.375rem;
                color: var(--foreground);
                font-weight: 500;
                text-decoration: underline;
                text-underline-offset: 4px;
                text-decoration-color: transparent;
                transition: text-decoration-color 0.15s;
            }
            .back-link a:hover { text-decoration-color: var(--foreground); }

            /* ========= Right panel (image) ========= */
            .login-right {
                display: none;
                position: relative;
                background-color: var(--muted);
            }
            @media (min-width: 1024px) {
                .login-right { display: block; }
            }
            .login-right img {
                position: absolute;
                inset: 0;
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        </style>
    </head>
    <body>
        <div class="login-root">

            <!-- Left Panel: Form -->
            <div class="login-left">
                <!-- Brand -->
                <div class="login-brand">
                    <a href="/">
                        <div class="brand-icon">
                            <span>B</span>
                        </div>
                        Browky Outdoor
                    </a>
                </div>

                <!-- Form Area -->
                <div class="login-form-area">
                    <div class="login-form-wrap">
                        <form class="login-form" method="POST" action="{{ route('login') }}">
                            @csrf

                            <div class="field-group">
                                <!-- Header -->
                                <div class="form-header">
                                    <h1>Masuk ke Akun</h1>
                                    <p>Masukkan email Anda di bawah untuk masuk ke akun admin</p>
                                </div>

                                <!-- Session Status -->
                                @if (session('status'))
                                    <div class="session-status">{{ session('status') }}</div>
                                @endif

                                <!-- Email -->
                                <div class="field">
                                    <label for="email">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value="{{ old('email') }}"
                                        placeholder="admin@browky.com"
                                        required
                                        autofocus
                                        autocomplete="username"
                                        class="{{ $errors->has('email') ? 'input-invalid' : '' }}"
                                    >
                                    @error('email')
                                        <p class="field-error">{{ $message }}</p>
                                    @enderror
                                </div>

                                <!-- Password -->
                                <div class="field">
                                    <div class="field-row">
                                        <label for="password">Kata Sandi</label>
                                        @if (Route::has('password.request'))
                                            <a class="forgot-link" href="{{ route('password.request') }}">
                                                Lupa kata sandi?
                                            </a>
                                        @endif
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        required
                                        autocomplete="current-password"
                                        class="{{ $errors->has('password') ? 'input-invalid' : '' }}"
                                    >
                                    @error('password')
                                        <p class="field-error">{{ $message }}</p>
                                    @enderror
                                </div>

                                <!-- Submit -->
                                <div class="field">
                                    <button type="submit" class="btn-login">Masuk</button>
                                </div>

                                <!-- Divider -->
                                <div class="field-separator">
                                    <hr>
                                    <span>Atau</span>
                                </div>

                                <!-- Back to site -->
                                <div class="field">
                                    <p class="back-link">
                                        <a href="/">
                                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                                            </svg>
                                            Kembali ke Beranda
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Right Panel: Image -->
            <div class="login-right">
                <img
                    src="{{ asset('images/logobrowkyoutdoor.png') }}"
                    alt="Browky Outdoor"
                    style="object-fit: contain; padding: 3rem; background: #00162B;"
                >
                <!-- Overlay with brand text -->
                <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding: 2.5rem; background: linear-gradient(to top, rgba(0,22,43,0.85) 0%, transparent 60%);">
                    <div style="text-align: center; color: white;">
                        <p style="font-size: 1.125rem; font-weight: 600; margin: 0 0 0.375rem; letter-spacing: -0.01em;">Browky Outdoor</p>
                        <p style="font-size: 0.8rem; color: rgba(255,255,255,0.6); margin: 0;">Platform sewa alat camping & porter pendakian</p>
                    </div>
                </div>
            </div>

        </div>
    </body>
</html>
