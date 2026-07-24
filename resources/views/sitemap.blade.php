{!! '<?xml version="1.0" encoding="UTF-8"?>' !!}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    @foreach ($staticUrls as $item)
        <url>
            <loc>{{ $item['url'] }}</loc>
            <changefreq>{{ $item['changefreq'] }}</changefreq>
            <priority>{{ $item['priority'] }}</priority>
        </url>
    @endforeach

    @foreach ($products as $product)
        <url>
            <loc>{{ $baseUrl }}/sewa-alat/{{ $product->slug }}</loc>
            <lastmod>{{ $product->updated_at ? $product->updated_at->toAtomString() : now()->toAtomString() }}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>
    @endforeach

    @foreach ($porters as $porter)
        <url>
            <loc>{{ $baseUrl }}/porter-gunung/{{ $porter->slug }}</loc>
            <lastmod>{{ $porter->updated_at ? $porter->updated_at->toAtomString() : now()->toAtomString() }}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>
    @endforeach

    @foreach ($campingPackages as $pkg)
        <url>
            <loc>{{ $baseUrl }}/paket-camping/{{ $pkg->slug }}</loc>
            <lastmod>{{ $pkg->updated_at ? $pkg->updated_at->toAtomString() : now()->toAtomString() }}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.7</priority>
        </url>
    @endforeach

    @foreach ($mountains as $mountain)
        <url>
            <loc>{{ $baseUrl }}/gunung/{{ $mountain->slug }}</loc>
            <lastmod>{{ $mountain->updated_at ? $mountain->updated_at->toAtomString() : now()->toAtomString() }}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.7</priority>
        </url>
    @endforeach
</urlset>
