<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Browky Outdoor') }}</title>

        <!-- Fonts (Inter — shadcn/ui default) -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])

        <style>
            body.app-layout,
            body.app-layout * {
                font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
            }
        </style>
    </head>
    <body class="app-layout bg-zinc-50/50 antialiased text-zinc-900">
        <div class="flex min-h-screen flex-col">

            <!-- Navigation -->
            @include('layouts.navigation')

            <!-- Page Header -->
            @isset($header)
                <div class="border-b border-zinc-200 bg-white">
                    <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                        {{ $header }}
                    </div>
                </div>
            @endisset

            <!-- Page Content -->
            <main class="flex-1">
                {{ $slot }}
            </main>
        </div>
    </body>
</html>
