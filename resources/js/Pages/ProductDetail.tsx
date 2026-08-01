import React, { useState, useEffect } from 'react';
import { Link, Head, useForm, router } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import { Heart, Share2, Plus, Minus, Info, ChevronRight, ShoppingCart, ThumbsUp, ShieldCheck, Calendar, MapPin, Flame, Tag, Star, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Product {
  id: number;
  name: string;
  slug: string;
  category?: string;
  brand?: string;
  cover_image?: string;
  price_per_day: number | string;
  stock: number;
  description?: string;
  special_badge?: string;
  status?: string;
}

interface ProductDetailProps {
  product: Product;
  relatedProducts?: Product[];
}

interface FavItem {
  id: string;
  type: string;
  name: string;
  price: number | string;
  image: string;
  link: string;
  timestamp: number;
}

export default function ProductDetail({ product, relatedProducts = [] }: ProductDetailProps) {
  if (!product) {
    return (
      <FrontendLayout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-gray-500 font-medium">Produk tidak ditemukan.</p>
        </div>
      </FrontendLayout>
    );
  }

  const [favorites, setFavorites] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  const { post, processing } = useForm({
    product_id: product?.id || 0,
    quantity: 1,
  });

  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem('browky_favorites') || '[]');
      setFavorites(favs.map((f: FavItem) => f.id.toString()));
    } catch (e) {
      setFavorites([]);
    }
  }, []);

  const isFav = favorites.includes(product.id.toString());
  const imgSrc = product.cover_image
    ? (product.cover_image.startsWith('http') ? product.cover_image : `/storage/${product.cover_image}`)
    : 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1200&q=80';

  const getBadgeConfig = (badgeName: string) => {
    const configs: Record<string, { colors: string; icon: React.ReactNode }> = {
      'Paling Diminati': { colors: 'bg-red-500 text-white', icon: <Flame className="w-3.5 h-3.5" /> },
      'Pilihan Lokal': { colors: 'bg-blue-600 text-white', icon: <ThumbsUp className="w-3.5 h-3.5" /> },
      'Spesial Diskon': { colors: 'bg-pink-500 text-white', icon: <Tag className="w-3.5 h-3.5" /> },
      'Paling Hemat': { colors: 'bg-green-600 text-white', icon: <Star className="w-3.5 h-3.5" /> }
    };
    return configs[badgeName] || { colors: 'bg-zinc-600 text-white', icon: <Star className="w-3.5 h-3.5" /> };
  };

  const badge = product.special_badge ? getBadgeConfig(product.special_badge) : null;

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>, item: FavItem) => {
    e.preventDefault();
    e.stopPropagation();

    let favs: FavItem[] = [];
    try {
      favs = JSON.parse(localStorage.getItem('browky_favorites') || '[]');
    } catch (err) {
      favs = [];
    }

    const currentIsFav = favs.some(f => f.id === item.id);
    let updatedFavs: FavItem[] = [];

    if (currentIsFav) {
      updatedFavs = favs.filter(f => f.id !== item.id);
      toast.success(`${item.name} dihapus dari favorit`);
    } else {
      updatedFavs = [...favs, {
        id: item.id,
        type: 'product',
        name: item.name,
        price: item.price,
        image: item.image,
        link: item.link,
        timestamp: Date.now()
      }];
      toast.success(`${item.name} ditambahkan ke favorit`);
    }

    localStorage.setItem('browky_favorites', JSON.stringify(updatedFavs));
    setFavorites(updatedFavs.map(f => f.id.toString()));
    window.dispatchEvent(new Event('favorites-updated'));
  };

  const handleShare = async () => {
    const shareData = {
      title: `Sewa ${product.name} | Browky Outdoor`,
      text: 'Platform sewa alat pendakian & jasa porter gunung Wonosobo terpercaya.',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // fall through
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link produk berhasil disalin!');
    } catch (err) {
      toast.error('Gagal menyalin link');
    }
  };

  const handleQuantityChange = (val: string | number) => {
    let newQty = typeof val === 'number' ? val : (parseInt(val) || 1);
    if (newQty < 1) newQty = 1;
    if (newQty > product.stock) newQty = product.stock;
    setQuantity(newQty);
  };

  const handleAddToCart = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>, redirectMode: 'back' | 'cart' = 'cart') => {
    e.preventDefault();
    if (product.stock <= 0) return;

    const prefix = typeof window !== 'undefined' && window.location.pathname.includes('/Browky/public') ? '/Browky/public' : '';
    router.post(prefix + '/keranjang/add', {
      product_id: product.id,
      quantity: quantity,
      redirect: redirectMode
    }, {
      preserveScroll: true,
      onSuccess: () => {
        if (redirectMode === 'back') {
          toast.success('Produk ditambahkan ke keranjang!');
        }
      }
    });
  };

  return (
    <FrontendLayout>
      <Head title={`Sewa ${product.name} Dieng & Wonosobo | Browky Outdoor`}>
        <meta name="description" content={`Sewa ${product.name} murah di Dieng & Wonosobo. ${product.description ? product.description.substring(0, 150) : ''}...`} />
        <meta name="keywords" content={`sewa ${product.name}, rental ${product.name} dieng, sewa alat outdoor wonosobo, browky outdoor`} />
        <meta property="og:title" content={`Sewa ${product.name} Dieng & Wonosobo | Browky Outdoor`} />
        <meta property="og:description" content={`Sewa ${product.name} kualitas terbaik & bersih di Dieng Wonosobo.`} />
        <meta property="og:image" content={product.cover_image ? (product.cover_image.startsWith('http') ? product.cover_image : `/storage/${product.cover_image}`) : 'https://browkyoutdoor.com/images/hero-fallback.jpg'} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Browky Outdoor" />
        <meta property="og:url" content={`https://browkyoutdoor.com/sewa-alat/${product.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Sewa ${product.name} Dieng & Wonosobo | Browky Outdoor`} />
        <meta name="twitter:description" content={`Sewa ${product.name} murah & berkualitas di Dieng Wonosobo.`} />
        <meta name="twitter:image" content={product.cover_image && !product.cover_image.startsWith('http') ? `https://browkyoutdoor.com/storage/${product.cover_image}` : (product.cover_image || 'https://browkyoutdoor.com/images/hero-fallback.jpg')} />
        <link rel="canonical" href={`https://browkyoutdoor.com/sewa-alat/${product.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://browkyoutdoor.com" },
                  { "@type": "ListItem", "position": 2, "name": "Sewa Alat", "item": "https://browkyoutdoor.com/sewa-alat" },
                  { "@type": "ListItem", "position": 3, "name": `Sewa ${product.name}`, "item": `https://browkyoutdoor.com/sewa-alat/${product.slug}` }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": `Sewa ${product.name} Dieng Wonosobo`,
                "image": [product.cover_image && !product.cover_image.startsWith('http') ? `https://browkyoutdoor.com/storage/${product.cover_image}` : (product.cover_image || 'https://browkyoutdoor.com/images/hero-fallback.jpg')],
                "description": product.description || `Sewa ${product.name} berkualitas di Dieng & Wonosobo.`,
                "brand": {
                  "@type": "Brand",
                  "name": "Browky Outdoor"
                },
                "offers": {
                  "@type": "Offer",
                  "url": `https://browkyoutdoor.com/sewa-alat/${product.slug}`,
                  "priceCurrency": "IDR",
                  "price": product.price_per_day,
                  "priceValidUntil": "2028-12-31",
                  "itemCondition": "https://schema.org/UsedCondition",
                  "availability": (product.stock > 0 || product.status === 'Available') ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                  "seller": {
                    "@type": "Organization",
                    "name": "Browky Outdoor"
                  }
                }
              }
            ]
          })}
        </script>
      </Head>

      <div className="bg-white py-8 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back Button and Breadcrumbs Row */}
          <div className="flex items-center gap-2 mb-4 w-full min-w-0">
            {/* Back Button (Icon Only) */}
            <Link
              href="/sewa-alat"
              className=" text-zinc-700 hover:text-zinc-950 hover:bg-gray-100 transition-all rounded-full flex-shrink-0"
              title="Kembali ke Sewa Alat"
              aria-label="Kembali ke Sewa Alat"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            </Link>

            {/* Breadcrumbs (Full container width with trailing text truncation ...) */}
            <nav className="flex-1 min-w-0 text-xs md:text-sm text-zinc-500" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 w-full min-w-0">
                <li className="flex-shrink-0">
                  <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition whitespace-nowrap">Beranda</Link>
                </li>
                <li className="flex-shrink-0">
                  <span className="text-zinc-300 dark:text-zinc-700">/</span>
                </li>
                <li className="flex-shrink-0">
                  <Link href="/sewa-alat" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition whitespace-nowrap">Sewa Alat</Link>
                </li>
                <li className="flex-shrink-0">
                  <span className="text-zinc-300 dark:text-zinc-700">/</span>
                </li>
                <li className="text-zinc-900 dark:text-zinc-100 font-medium truncate flex-1 min-w-0">
                  {product.name}
                </li>
              </ol>
            </nav>
          </div>

          {/* Top Section: Image + Buy Box (45:55 Ratio - Vertically Centered) */}
          <div className="mb-12 bg-white">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-center">

              {/* Left Side: Product Image (45%) */}
              <div className="w-full lg:w-[45%] flex-shrink-0 relative aspect-square max-h-[540px] bg-gray-50 rounded-sm overflow-hidden">
                <img
                  src={imgSrc}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {badge && (
                  <Badge className={`absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-none ${badge.colors} border-0 shadow-none`}>
                    {badge.icon}
                    <span>{product.special_badge}</span>
                  </Badge>
                )}
              </div>

              {/* Right Side: Product Info & Actions (55% Vertically Centered) */}
              <div className="w-full lg:w-[55%] flex-1 py-2 flex flex-col justify-center">
                <div>
                  <CardHeader className="p-0 pb-4">
                    <div className="flex items-center justify-between lg:justify-start gap-3.5 mb-3">
                      <span className="inline-block px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-normal rounded-none">
                        {product.category || 'Perlengkapan Outdoor'}
                      </span>

                      {/* Share & Favorite icons next to category */}
                      <div className="flex items-center gap-3.5">
                        <button
                          type="button"
                          onClick={handleShare}
                          className="p-0 text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer border-0 bg-transparent"
                          title="Bagikan Produk"
                          aria-label="Bagikan Produk"
                        >
                          <Share2 className="w-5 h-5" strokeWidth={1.5} />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => toggleFavorite(e, {
                            id: product.id.toString(),
                            type: 'product',
                            name: product.name,
                            price: product.price_per_day,
                            image: imgSrc,
                            link: `/sewa-alat/${product.slug}`,
                            timestamp: Date.now()
                          })}
                          className={`p-0 transition-colors cursor-pointer border-0 bg-transparent ${isFav ? 'text-red-500' : 'text-zinc-400 hover:text-red-500'}`}
                          title="Favoritkan Produk"
                          aria-label="Favoritkan Produk"
                        >
                          <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>

                    <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-anton tracking-wide font-normal uppercase text-zinc-900 dark:text-zinc-50 leading-tight">
                      {product.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-0 space-y-6">
                    {/* Price */}
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold text-red-600">
                        Rp {Number(product.price_per_day).toLocaleString('id-ID')}
                      </span>
                      <span className="text-sm font-normal text-zinc-500">/ hari</span>
                    </div>

                    {/* Brand / Merk */}
                    {product.brand && (
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-zinc-500 w-16">Merk</span>
                        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{product.brand}</span>
                      </div>
                    )}

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-zinc-500 w-16">Jumlah</span>
                      <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-none p-0.5 bg-background">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleQuantityChange(quantity - 1)}
                          disabled={product.stock <= 0 || quantity <= 1}
                          className="h-9 w-9 text-zinc-500 hover:text-zinc-900 cursor-pointer disabled:opacity-40 rounded-none"
                        >
                          <Minus className="h-4 w-4" strokeWidth={1.5} />
                        </Button>
                        <span className="w-10 text-center text-sm font-semibold text-foreground">
                          {quantity}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleQuantityChange(quantity + 1)}
                          disabled={product.stock <= 0 || quantity >= product.stock}
                          className="h-9 w-9 text-zinc-500 hover:text-zinc-900 cursor-pointer rounded-none"
                        >
                          <Plus className="h-4 w-4" strokeWidth={1.5} />
                        </Button>
                      </div>
                      {product.stock > 0 && (
                        <span className="text-sm text-zinc-400 font-medium">Stok: {product.stock} unit</span>
                      )}
                    </div>

                    {/* Action buttons (Desktop only, hidden on mobile) */}
                    <div className="hidden lg:flex flex-wrap items-center gap-3.5 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={(e) => handleAddToCart(e, 'back')}
                        disabled={product.stock <= 0}
                        className="h-14 px-6 text-base font-medium border-zinc-200 dark:border-zinc-800 hover:bg-muted/50 shadow-none cursor-pointer rounded-none gap-2.5"
                      >
                        <div className="relative inline-flex items-center">
                          <ShoppingCart className="w-5.5 h-5.5 shrink-0 text-zinc-800" strokeWidth={1.5} />
                        </div>
                        <span>Masukkan Keranjang</span>
                      </Button>

                      <Button
                        type="button"
                        onClick={(e) => handleAddToCart(e, 'cart')}
                        disabled={product.stock <= 0}
                        className="h-14 px-8 text-base font-normal text-zinc-50 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-none cursor-pointer rounded-none"
                      >
                        <span>Sewa Sekarang</span>
                      </Button>
                    </div>
                  </CardContent>
                </div>

                {/* Informational Note */}
                <div className="flex items-center gap-2.5 text-sm text-zinc-500 mt-6">
                  <Info className="w-5 h-5 text-zinc-400 shrink-0" strokeWidth={1.5} />
                  <span>Pembayaran dilakukan secara langsung saat pengambilan alat.</span>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Container: Tentang, Keunggulan & Rekomendasi */}
          <div className="space-y-10 mt-10">

            {/* Deskripsi */}
            <div className="w-full lg:max-w-[80%]">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-4">Deskripsi</h3>
              <div className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                {product.description || 'Belum ada deskripsi untuk produk ini.'}
              </div>
            </div>

            {/* Keunggulan Layanan */}
            <div className="w-full lg:max-w-[80%] pt-4">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-8">Keunggulan Layanan Browky Outdoor</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-3">
                  <ShieldCheck className="w-6 h-6 text-zinc-700 dark:text-zinc-400 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-50 text-base">Kondisi Alat Terawat</h4>
                    <p className="text-base text-zinc-500 mt-1">Peralatan dibersihkan dan dicek ketat setelah digunakan.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <ThumbsUp className="w-6 h-6 text-zinc-700 dark:text-zinc-400 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-50 text-base">Siap Pakai Pendakian</h4>
                    <p className="text-base text-zinc-500 mt-1">Standar keamanan sangat terjamin untuk medan gunung Dieng.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Calendar className="w-6 h-6 text-zinc-700 dark:text-zinc-400 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-50 text-base">Sewa Harian Fleksibel</h4>
                    <p className="text-base text-zinc-500 mt-1">Sewa harian atau paket menyesuaikan itinerary pendakianmu.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="w-6 h-6 text-zinc-700 dark:text-zinc-400 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-50 text-base">Pengambilan Alat Mudah</h4>
                    <p className="text-base text-zinc-500 mt-1">Pengambilan dan pengembalian fleksibel di toko atau meeting point pilihanmu.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products Recommendations */}
            {relatedProducts.length > 0 && (
              <>
                <Separator className="bg-zinc-200 dark:bg-zinc-800 h-px" />
                <div>
                  <h2 className="text-2xl font-anton tracking-wide uppercase text-zinc-900 dark:text-zinc-50 mb-8">Rekomendasi Lainnya</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {relatedProducts.map((related) => {
                      const relatedImg = related.cover_image
                        ? (related.cover_image.startsWith('http') ? related.cover_image : `/storage/${related.cover_image}`)
                        : '/images/logobrowkyoutdoor.png';

                      const isRelatedFav = favorites.includes(related.id.toString());

                      return (
                        <div key={related.id} className="group relative flex flex-col h-full bg-white dark:bg-zinc-900">
                          <Link href={`/sewa-alat/${related.slug}`} className="block relative aspect-square overflow-hidden bg-gray-100 rounded-sm mb-3">
                            <img
                              src={relatedImg}
                              alt={related.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <button
                              type="button"
                              onClick={(e) => toggleFavorite(e, {
                                id: related.id.toString(),
                                type: 'product',
                                name: related.name,
                                price: related.price_per_day,
                                image: relatedImg,
                                link: `/sewa-alat/${related.slug}`,
                                timestamp: Date.now()
                              })}
                              className={`absolute top-3 right-3 z-20 p-2 rounded-full bg-white/95 active:scale-90 transition-transform cursor-pointer ${isRelatedFav ? 'text-red-500' : 'text-gray-400 hover:bg-zinc-50'}`}
                              aria-label="Tambah ke Favorit"
                            >
                              <Heart className={`w-5 h-5 ${isRelatedFav ? 'fill-current' : ''}`} strokeWidth={1.5} />
                            </button>
                          </Link>

                          <div className="flex flex-col flex-1">
                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 line-clamp-1 group-hover:text-primary transition-colors">
                              <Link href={`/sewa-alat/${related.slug}`}>{related.name}</Link>
                            </h3>
                            <div className="flex items-baseline text-sm font-semibold text-red-600 mt-1">
                              <span>Rp {Number(related.price_per_day).toLocaleString('id-ID')}</span>
                              <span className="text-sm text-zinc-400 font-normal ml-1">/ hari</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      </div>

      {/* Mobile Sticky Booking Footer Bar */}
      <div className="fixed lg:hidden bottom-0 left-0 right-0 z-40 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 p-4 pb-safe flex flex-col gap-3 shadow-lg">
        {/* Top Row: Price & Quantity */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-normal text-zinc-400">Total Harga</span>
            <span className="text-lg font-bold text-red-600 leading-tight">
              Rp {Number((typeof product.price_per_day === 'number' ? product.price_per_day : parseFloat(product.price_per_day as string) || 0) * quantity).toLocaleString('id-ID')}
            </span>
          </div>

          <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-none p-0.5 bg-background">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={product.stock <= 0 || quantity <= 1}
              className="h-8 w-8 text-zinc-500 hover:text-zinc-900 cursor-pointer disabled:opacity-40 rounded-none"
            >
              <Minus className="w-3.5 h-3.5" strokeWidth={1.5} />
            </Button>
            <span className="w-8 text-center text-xs font-semibold text-foreground">
              {quantity}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={product.stock <= 0 || quantity >= product.stock}
              className="h-8 w-8 text-zinc-500 hover:text-zinc-900 cursor-pointer rounded-none"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
            </Button>
          </div>
        </div>

        {/* Bottom Row: Actions */}
        <div className="flex items-center gap-2">
          <Button
            onClick={(e) => handleAddToCart(e, 'back')}
            disabled={product.stock <= 0}
            variant="outline"
            className="w-12 h-12 sm:w-14 sm:h-14 p-0 shrink-0 border-zinc-200 dark:border-zinc-800 active:bg-zinc-50 shadow-none cursor-pointer rounded-none flex items-center justify-center"
            title="Masukkan Keranjang"
            aria-label="Masukkan Keranjang"
          >
            <div className="relative inline-flex items-center">
              <ShoppingCart className="w-5 h-5 text-zinc-800" strokeWidth={1.5} />
            </div>
          </Button>

          <Button
            onClick={(e) => handleAddToCart(e, 'cart')}
            disabled={product.stock <= 0}
            className="flex-1 h-12 sm:h-14 text-sm sm:text-base font-normal text-zinc-50 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 shadow-none cursor-pointer rounded-none"
          >
            Sewa Sekarang
          </Button>
        </div>
      </div>
    </FrontendLayout>
  );
}
