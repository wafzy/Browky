<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- Dark Mode Anti-FOUC Script -->
    <script>
        (function() {
            try {
                var theme = localStorage.getItem('theme');
                var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && supportDarkMode)) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            } catch (e) {}
        })();
    </script>
    
    <link rel="icon" type="image/svg+xml" href="{{ asset('images/logotab-browkyoutdoor.svg') }}">
    <link rel="alternate icon" type="image/png" href="{{ asset('images/faviconbrowky.png') }}">

    <!-- Primary SEO Meta Tags -->
    <meta name="robots" content="index, follow">
    <meta name="author" content="Browky Outdoor">
    <meta name="geo.region" content="ID-JT">
    <meta name="geo.placename" content="Dieng, Wonosobo, Jawa Tengah">

    <!-- Default OpenGraph / Social Meta Tags -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Browky Outdoor">
    <meta property="og:locale" content="id_ID">
    <meta property="og:image" content="{{ asset('images/logobrowkyoutdoor.png') }}">

    <!-- Canonical URL -->
    <link rel="canonical" href="{{ url()->current() }}">

    <!-- Schema.org JSON-LD (LocalBusiness & SportingGoodsStore) -->
    <script type="application/ld+json">
    {
      "@@context": "https://schema.org",
      "@@type": ["SportsActivityLocation", "LocalBusiness"],
      "name": "Browky Outdoor - Sewa Alat Hiking & Porter Dieng Wonosobo",
      "image": "{{ asset('images/logobrowkyoutdoor.png') }}",
      "url": "https://browkyoutdoor.com",
      "telephone": "+6287834443012",
      "priceRange": "Rp 15.000 - Rp 500.000",
      "address": {
        "@@type": "PostalAddress",
        "streetAddress": "Dieng Wonosobo",
        "addressLocality": "Wonosobo",
        "addressRegion": "Jawa Tengah",
        "addressCountry": "ID"
      },
      "geo": {
        "@@type": "GeoCoordinates",
        "latitude": -7.2104,
        "longitude": 109.9079
      },
      "openingHoursSpecification": {
        "@@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "sameAs": [
        "https://www.instagram.com/browkyoutdoor",
        "https://www.tiktok.com/@browkyoutdoor",
        "https://www.youtube.com/@browkyoutdoor",
        "https://maps.google.com/?q=Browky+Outdoor+Sewa+Alat+Hiking+Porter+Dieng+Wonosobo"
      ],
      "areaServed": ["Dieng", "Wonosobo", "Gunung Prau", "Gunung Sumbing", "Gunung Sindoro", "Gunung Kembang"]
    }
    </script>

    @viteReactRefresh
    @vite(['resources/js/app.tsx', 'resources/css/app.css'])
    @inertiaHead


</head>
<body class="font-sans antialiased bg-white text-gray-900 flex flex-col min-h-screen">


    @inertia
</body>
</html>
