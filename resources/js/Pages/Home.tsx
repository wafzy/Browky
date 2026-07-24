import React, { useState, useEffect, useRef } from 'react';
import { Link, Head } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import { Heart, ChevronLeft, ChevronRight, Tent, Mountain as MountainIcon, Flame, Star, Tag, ThumbsUp, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
    id: number;
    name: string;
    slug: string;
    category?: string;
    cover_image?: string;
    price_per_day: number | string;
    special_badge?: string;
    stock: number;
}

interface Porter {
    id: number;
    name: string;
    slug: string;
    category?: string;
    image?: string;
    price_per_day: number | string;
}

interface Mountain {
    id: number;
    name: string;
    slug: string;
    location: string;
    image?: string;
    elevation?: string | number;
}

interface CampingPackage {
    id: number;
    name: string;
    slug: string;
    image?: string;
    price: number | string;
    special_badge?: string;
    tags?: string;
}

interface HomeProps {
    popularProducts?: Product[];
    categories?: string[];
    popularPorters?: Porter[];
    porterCategories?: string[];
    mountains?: Mountain[];
    campingPackages?: CampingPackage[];
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

// Custom hook to detect scroll limits of a container
function useScrollLimits(ref: React.RefObject<HTMLDivElement | null>, dependencies: any[] = []) {
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkLimits = () => {
        const el = ref.current;
        if (!el) {
            setCanScrollLeft(false);
            setCanScrollRight(false);
            return;
        }
        const scrollLeft = el.scrollLeft;
        const scrollWidth = el.scrollWidth;
        const clientWidth = el.clientWidth;

        setCanScrollLeft(scrollLeft > 2);
        setCanScrollRight(scrollWidth > clientWidth && scrollLeft < (scrollWidth - clientWidth - 2));
    };

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        checkLimits();

        // Extra checks to handle layout/image loading delays
        const timer1 = setTimeout(checkLimits, 100);
        const timer2 = setTimeout(checkLimits, 500);

        const handleScroll = () => {
            checkLimits();
        };

        el.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            el.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [ref, ref.current, ...dependencies]);

    return { canScrollLeft, canScrollRight };
}

export default function Home({
    popularProducts = [],
    categories = [],
    popularPorters = [],
    porterCategories = [],
    mountains = [],
    campingPackages = []
}: HomeProps) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedPorterCategory, setSelectedPorterCategory] = useState('all');
    const [favorites, setFavorites] = useState<string[]>([]);

    const productGridRef = useRef<HTMLDivElement>(null);
    const porterGridRef = useRef<HTMLDivElement>(null);
    const campingSliderRef = useRef<HTMLDivElement>(null);
    const mountainSliderRef = useRef<HTMLDivElement>(null);

    // Load favorites from local storage
    useEffect(() => {
        try {
            const favs = JSON.parse(localStorage.getItem('browky_favorites') || '[]');
            setFavorites(favs.map((f: FavItem) => f.id.toString()));
        } catch (e) {
            setFavorites([]);
        }
    }, []);

    const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>, item: FavItem) => {
        e.preventDefault();
        e.stopPropagation();

        let favs: FavItem[] = [];
        try {
            favs = JSON.parse(localStorage.getItem('browky_favorites') || '[]');
        } catch (err) {
            favs = [];
        }

        const isFav = favs.some(f => f.id === item.id);
        let updatedFavs: FavItem[] = [];

        if (isFav) {
            updatedFavs = favs.filter(f => f.id !== item.id);
            toast.success(`${item.name} dihapus dari favorit`);
        } else {
            updatedFavs = [...favs, {
                id: item.id,
                type: item.type,
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

        // Dispatch event to update layout badge
        window.dispatchEvent(new Event('favorites-updated'));
    };

    const scrollGrid = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
        if (!ref.current) return;
        const scrollAmount = 600;
        ref.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    };

    const getBadgeConfig = (badge: string) => {
        const configs: Record<string, { colors: string; icon: React.ReactNode }> = {
            'Paling Diminati': { colors: 'from-red-500 to-orange-400', icon: <Flame className="w-3 h-3" /> },
            'Pilihan Lokal': { colors: 'from-blue-600 to-cyan-400', icon: <ThumbsUp className="w-3 h-3" /> },
            'Spesial Diskon': { colors: 'from-pink-500 to-orange-400', icon: <Tag className="w-3 h-3" /> },
            'Paling Hemat': { colors: 'from-green-600 to-emerald-400', icon: <Star className="w-3 h-3" /> }
        };
        return configs[badge] || { colors: 'from-gray-600 to-gray-400', icon: <Star className="w-3 h-3" /> };
    };

    // Filtered lists
    const filteredProducts = selectedCategory === 'all'
        ? popularProducts
        : popularProducts.filter(p => p.category === selectedCategory);

    const filteredPorters = selectedPorterCategory === 'all'
        ? popularPorters
        : popularPorters.filter(p => (p.category || 'Lainnya') === selectedPorterCategory);

    const { canScrollLeft: canScrollProductsLeft, canScrollRight: canScrollProductsRight } = useScrollLimits(productGridRef, [filteredProducts, selectedCategory]);
    const { canScrollLeft: canScrollPortersLeft, canScrollRight: canScrollPortersRight } = useScrollLimits(porterGridRef, [filteredPorters, selectedPorterCategory]);
    const { canScrollLeft: canScrollCampingLeft, canScrollRight: canScrollCampingRight } = useScrollLimits(campingSliderRef, [campingPackages]);
    const { canScrollLeft: canScrollMountainsLeft, canScrollRight: canScrollMountainsRight } = useScrollLimits(mountainSliderRef, [mountains]);

    return (
        <FrontendLayout>
            <Head>
                <title>Sewa Alat Hiking Dieng & Jasa Porter Gunung Wonosobo | Browky Outdoor</title>
                <meta name="description" content="Browky Outdoor — Platform sewa alat hiking Dieng & jasa porter gunung profesional di Wonosobo & Dieng. Sewa tenda, carrier, sleeping bag & porter Gunung Prau, Sumbing, Sindoro terpercaya." />
                <meta name="keywords" content="porter dieng, sewa alat hiking dieng, sewa alat pendakian dieng, jasa porter dieng, sewa tenda dieng, porter gunung prau dieng, sewa perlengkapan pendakian wonosobo, sewa outdoor dieng, porter wonosobo, browky outdoor" />
                <meta property="og:title" content="Sewa Alat Hiking Dieng & Jasa Porter Gunung Wonosobo | Browky Outdoor" />
                <meta property="og:description" content="Sewa alat pendakian & perlengkapan outdoor lengkap di Dieng & Wonosobo. Porter gunung berpengalaman untuk Prau, Sumbing, Sindoro." />
                <meta property="og:url" content="https://browkyoutdoor.com" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://browkyoutdoor.com/images/hero-fallback.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="Browky Outdoor" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Sewa Alat Hiking Dieng & Jasa Porter Gunung Wonosobo | Browky Outdoor" />
                <meta name="twitter:description" content="Sewa alat pendakian & perlengkapan outdoor lengkap di Dieng & Wonosobo. Porter gunung berpengalaman untuk Prau, Sumbing, Sindoro." />
                <meta name="twitter:image" content="https://browkyoutdoor.com/images/hero-fallback.jpg" />
                <link rel="canonical" href="https://browkyoutdoor.com" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "LocalBusiness",
                                "@id": "https://browkyoutdoor.com/#business",
                                "name": "Browky Outdoor",
                                "description": "Platform sewa alat hiking & jasa porter gunung profesional di Wonosobo dan Dieng, Jawa Tengah.",
                                "url": "https://browkyoutdoor.com",
                                "telephone": "+6287834443012",
                                "email": "hello@browkyoutdoor.com",
                                "image": "https://browkyoutdoor.com/images/hero-fallback.jpg",
                                "priceRange": "Rp 25.000 - Rp 500.000",
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressLocality": "Wonosobo",
                                    "addressRegion": "Jawa Tengah",
                                    "addressCountry": "ID"
                                },
                                "geo": {
                                    "@type": "GeoCoordinates",
                                    "latitude": "-7.3595",
                                    "longitude": "109.9057"
                                },
                                "sameAs": [
                                    "https://www.instagram.com/browkyoutdoor",
                                    "https://www.tiktok.com/@browkyoutdoor",
                                    "https://www.youtube.com/@browkyoutdoor"
                                ],
                                "openingHoursSpecification": [
                                    {
                                        "@type": "OpeningHoursSpecification",
                                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                                        "opens": "07:00",
                                        "closes": "21:00"
                                    }
                                ]
                            },
                            {
                                "@type": "WebSite",
                                "@id": "https://browkyoutdoor.com/#website",
                                "url": "https://browkyoutdoor.com",
                                "name": "Browky Outdoor",
                                "publisher": { "@id": "https://browkyoutdoor.com/#business" }
                            }
                        ]
                    })}
                </script>
            </Head>

            {/* HERO SECTION */}
            <section className="relative w-full h-screen overflow-hidden">
                {/* Background Video */}
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster="/images/hero-fallback.jpg"
                >
                    <source src="/videos/loop-2.webm" type="video/webm" />
                    <source src="/videos/loop-2.mp4" type="video/mp4" />
                </video>
                {/* Preload hero poster for LCP */}
                <link rel="preload" as="image" href="/images/hero-fallback.jpg" />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

                {/* Hero Content */}
                <div className="relative z-10 h-full flex items-center">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
                        <div className="max-w-2xl text-left space-y-6">
                            <h1 className="text-4xl md:text-6xl font-anton tracking-wide uppercase text-white leading-tight">
                                Sewa Alat Pendakian & Porter Gunung Dieng Browky Outdoor
                            </h1>
                            <p className="text-lg text-gray-200 font-medium max-w-lg">
                                Platform #1 sewa perlengkapan outdoor & jasa porter profesional di Wonosobo — mulai Rp 25.000/hari.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <Link
                                    href="/sewa-alat"
                                    className="inline-flex uppercase items-center gap-2 px-6 py-3.5 rounded-xs bg-white hover:bg-white/90 active:scale-95 text-gray-900 font-bold text-sm transition-all shadow-md"
                                >
                                    Sewa Alat
                                </Link>
                                <Link
                                    href="/porter-gunung"
                                    className="inline-flex uppercase items-center gap-2 px-6 py-3.5 rounded-xs border border-white/30 bg-transparent hover:bg-white/10 hover:text-white active:scale-95 text-white font-bold text-sm transition-all"
                                >
                                    Booking Porter
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Hint indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50">
                    <ChevronRight className="w-5 h-5 rotate-90 animate-bounce" />
                </div>
            </section>

            {/* BRAND LOGOS MARQUEE */}
            <section className="py-10 border-b border-zinc-100 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400 text-center mb-8">
                        Peralatan dari brand terpercaya
                    </p>
                    <div className="w-full relative overflow-hidden">
                        {/* Fade gradients */}
                        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                        <div className="flex w-max">
                            <div className="flex items-center gap-16 sm:gap-24 animate-[marquee_25s_linear_infinite] pr-16">
                                <img src="/images/Logo/eiger-logo.png" alt="Eiger" width="120" height="40" className="h-10 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105" loading="lazy" />
                                <img src="/images/Logo/consina-logo.png" alt="Consina" width="120" height="40" className="h-10 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105" loading="lazy" />
                                <img src="/images/Logo/logo-arei.webp" alt="Arei" width="120" height="40" className="h-10 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105" loading="lazy" />
                                <img src="/images/Logo/antarestar-logo.png" alt="Antarestar" width="120" height="40" className="h-10 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105" loading="lazy" />
                                <img src="/images/Logo/Arcteryx-Logo.png" alt="Arc'teryx" width="120" height="40" className="h-10 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105" loading="lazy" />

                                {/* Duplicate set — aria-hidden to avoid duplicate screen reader content */}
                                <img src="/images/Logo/eiger-logo.png" alt="" width="120" height="40" className="h-10 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105" aria-hidden="true" loading="lazy" />
                                <img src="/images/Logo/consina-logo.png" alt="" width="120" height="40" className="h-10 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105" aria-hidden="true" loading="lazy" />
                                <img src="/images/Logo/logo-arei.webp" alt="" width="120" height="40" className="h-10 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105" aria-hidden="true" loading="lazy" />
                                <img src="/images/Logo/antarestar-logo.png" alt="" width="120" height="40" className="h-10 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105" aria-hidden="true" loading="lazy" />
                                <img src="/images/Logo/Arcteryx-Logo.png" alt="" width="120" height="40" className="h-10 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105" aria-hidden="true" loading="lazy" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEWA ALAT PRODUCTS */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    {/* Header */}
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <h2 className="text-4xl font-anton tracking-wide uppercase text-gray-900">
                                Sewa Alat Pendakian Browky Outdoor
                            </h2>
                            <p className="text-base text-gray-500 mt-2">Perlengkapan lengkap siap pakai untuk petualangan Anda di Dieng & Wonosobo</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/sewa-alat" className="text-sm font-semibold text-gray-900 hover:text-gray-700 underline underline-offset-4 hidden sm:block">
                                Lihat semua
                            </Link>
                            <div className="hidden sm:flex items-center gap-2">
                                <button
                                    onClick={() => scrollGrid(productGridRef, 'left')}
                                    disabled={!canScrollProductsLeft}
                                    className="w-10 h-10 rounded-full border border-gray-200 bg-zinc-50 flex items-center justify-center text-gray-600 hover:bg-gray-50 active:scale-95 transition disabled:opacity-40 disabled:pointer-events-none"
                                    aria-label="Scroll Left"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => scrollGrid(productGridRef, 'right')}
                                    disabled={!canScrollProductsRight}
                                    className="w-10 h-10 rounded-full border border-gray-200 bg-zinc-50 flex items-center justify-center text-gray-600 hover:bg-gray-50 active:scale-95 transition disabled:opacity-40 disabled:pointer-events-none"
                                    aria-label="Scroll Right"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap cursor-pointer ${selectedCategory === 'all' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'}`}
                        >
                            Semua
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap cursor-pointer ${selectedCategory === category ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Product Cards Row */}
                    <div
                        ref={productGridRef}
                        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-none"
                    >
                        {filteredProducts.map((product) => {
                            const isFav = favorites.includes(product.id.toString());
                            const imgSrc = product.cover_image
                                ? (product.cover_image.startsWith('http') ? product.cover_image : `/storage/${product.cover_image}`)
                                : 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=500&q=80';

                            const badge = product.special_badge ? getBadgeConfig(product.special_badge) : null;

                            return (
                                <div
                                    key={product.id}
                                    className="group relative flex-shrink-0 w-[220px] overflow-hidden transition-all duration-300"
                                >
                                    {/* Favorite Toggle Button */}
                                    <button
                                        onClick={(e) => toggleFavorite(e, {
                                            id: product.id.toString(),
                                            type: 'product',
                                            name: product.name,
                                            price: product.price_per_day,
                                            image: imgSrc,
                                            link: `/sewa-alat/${product.slug}`,
                                            timestamp: Date.now()
                                        })}
                                        className={`absolute top-3 right-3 z-20 p-2 rounded-full bg-white/95 active:scale-90 transition-transform cursor-pointer ${isFav ? 'text-red-500' : 'text-gray-400 hover:bg-zinc-50'}`}
                                    >
                                        <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} strokeWidth={1.5} />
                                    </button>

                                    <Link href={`/sewa-alat/${product.slug}`} className="block">
                                        <div className="relative aspect-square w-full overflow-hidden bg-gray-50 rounded-sm">
                                            <img
                                                src={imgSrc}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                                                loading="lazy"
                                            />
                                            {badge && (
                                                <div className={`absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-white rounded bg-gradient-to-r ${badge.colors}`}>
                                                    {badge.icon}
                                                    <span>{product.special_badge}</span>
                                                </div>
                                            )}
                                            {product.stock <= 0 && (
                                                <div className="absolute inset-0 bg-black/55 flex items-center justify-center rounded-sm">
                                                    <span className="bg-white text-gray-900 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-sm shadow-md">
                                                        Stok Habis
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="pt-4 space-y-1">
                                            <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
                                                {product.name}
                                            </h3>
                                            <div className="flex items-baseline text-sm font-semibold text-red-600">
                                                <span>Rp {Number(product.price_per_day).toLocaleString('id-ID')}</span>
                                                <span className="text-sm text-gray-400 font-normal ml-1">/ hari</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}

                        {filteredProducts.length === 0 && (
                            <div className="w-full py-12 text-center text-gray-400 border border-dashed border-gray-200 rounded-2xl">
                                Belum ada produk dalam kategori ini.
                            </div>
                        )}
                    </div>

                    {/* Mobile: View all Link */}
                    <div className="mt-6 sm:hidden text-center">
                        <Link href="/sewa-alat" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary underline underline-offset-4">
                            Lihat semua alat <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* PORTER SECTION */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    {/* Header */}
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <h2 className="text-4xl font-anton tracking-wide uppercase text-gray-900">
                                Porter Gunung Browky Outdoor
                            </h2>
                            <p className="text-base text-gray-500 mt-2">Layanan porter gunung handal dan berpengalaman hafal rute</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/porter-gunung" className="text-sm font-semibold text-gray-900 hover:text-gray-700 underline underline-offset-4 hidden sm:block">
                                Lihat semua
                            </Link>
                            <div className="hidden sm:flex items-center gap-2">
                                <button
                                    onClick={() => scrollGrid(porterGridRef, 'left')}
                                    disabled={!canScrollPortersLeft}
                                    className="w-10 h-10 rounded-full border border-gray-200 bg-zinc-50 flex items-center justify-center text-gray-600 hover:bg-gray-50 active:scale-95 transition disabled:opacity-40 disabled:pointer-events-none"
                                    aria-label="Scroll Left"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => scrollGrid(porterGridRef, 'right')}
                                    disabled={!canScrollPortersRight}
                                    className="w-10 h-10 rounded-full border border-gray-200 bg-zinc-50 flex items-center justify-center text-gray-600 hover:bg-gray-50 active:scale-95 transition disabled:opacity-40 disabled:pointer-events-none"
                                    aria-label="Scroll Right"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
                        <button
                            onClick={() => setSelectedPorterCategory('all')}
                            className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap cursor-pointer ${selectedPorterCategory === 'all' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'}`}
                        >
                            Semua
                        </button>
                        <button
                            onClick={() => setSelectedPorterCategory('Tektok')}
                            className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap cursor-pointer ${selectedPorterCategory === 'Tektok' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'}`}
                        >
                            Tektok
                        </button>
                        <button
                            onClick={() => setSelectedPorterCategory('Porter Inap')}
                            className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap cursor-pointer ${selectedPorterCategory === 'Porter Inap' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'}`}
                        >
                            Porter Inap
                        </button>
                    </div>

                    {/* Porter Cards Row */}
                    <div
                        ref={porterGridRef}
                        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-none"
                    >
                        {filteredPorters.map((porter) => {
                            const pCat = porter.category || 'Lainnya';
                            const isFav = favorites.includes(`porter-${porter.id}`);
                            const imgSrc = porter.image
                                ? (porter.image.startsWith('http') ? porter.image : `/storage/${porter.image}`)
                                : 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be1?auto=format&fit=crop&w=500&q=80';

                            return (
                                <div
                                    key={porter.id}
                                    className="group relative flex-shrink-0 w-[220px] overflow-hidden transition-all duration-300"
                                >
                                    <button
                                        onClick={(e) => toggleFavorite(e, {
                                            id: `porter-${porter.id}`,
                                            type: 'porter',
                                            name: porter.name,
                                            price: porter.price_per_day,
                                            image: imgSrc,
                                            link: `/porter-gunung/${porter.slug}`,
                                            timestamp: Date.now()
                                        })}
                                        className={`absolute top-3 right-3 z-20 p-2 rounded-full bg-white/95 shadow-sm active:scale-90 transition-transform cursor-pointer ${isFav ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} strokeWidth={1.5} />
                                    </button>

                                    <Link href={`/porter-gunung/${porter.slug}`} className="block">
                                        <div className="relative aspect-square w-full overflow-hidden bg-gray-50 rounded-sm">
                                            <img
                                                src={imgSrc}
                                                alt={porter.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="pt-4 space-y-1">
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
                                                    {porter.name}
                                                </h3>
                                                <p className="text-sm text-gray-400 font-normal">{pCat}</p>
                                            </div>
                                            <div className="text-sm font-semibold text-red-600">
                                                Rp {Number(porter.price_per_day).toLocaleString('id-ID')}
                                                <span className="text-sm text-gray-400 font-normal ml-0.5">/ hari</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}

                        {filteredPorters.length === 0 && (
                            <div className="w-full py-12 text-center text-gray-400 border border-dashed border-gray-200 rounded-2xl">
                                Belum ada paket porter dalam kategori ini.
                            </div>
                        )}
                    </div>

                    {/* Mobile: View all Link */}
                    <div className="mt-6 sm:hidden text-center">
                        <Link href="/porter-gunung" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary underline underline-offset-4">
                            Lihat semua paket <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CAMPING SPECIAL PACKAGES */}
            <section className="py-16 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    {/* Header */}
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <h2 className="text-4xl font-anton tracking-wide uppercase text-gray-900">
                                Paket Camping Browky Outdoor
                            </h2>
                            <p className="text-base text-gray-500 mt-2">Penawaran paket camping Dieng spesial hemat anti-ribet</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/paket-camping" className="text-sm font-semibold text-gray-900 hover:text-gray-700 underline underline-offset-4 hidden sm:block">
                                Lihat semua
                            </Link>
                            <div className="hidden sm:flex items-center gap-2">
                                <button
                                    onClick={() => scrollGrid(campingSliderRef, 'left')}
                                    disabled={!canScrollCampingLeft}
                                    className="w-10 h-10 rounded-full border border-gray-200 bg-zinc-50 flex items-center justify-center text-gray-600 hover:bg-gray-50 active:scale-95 transition disabled:opacity-40 disabled:pointer-events-none"
                                    aria-label="Scroll Left"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => scrollGrid(campingSliderRef, 'right')}
                                    disabled={!canScrollCampingRight}
                                    className="w-10 h-10 rounded-full border border-gray-200 bg-zinc-50 flex items-center justify-center text-gray-600 hover:bg-gray-50 active:scale-95 transition disabled:opacity-40 disabled:pointer-events-none"
                                    aria-label="Scroll Right"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Camping Cards Row */}
                    <div
                        ref={campingSliderRef}
                        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-none"
                    >
                        {campingPackages.map((packageItem) => {
                            const isFav = favorites.includes(`camping-${packageItem.id}`);
                            const imgSrc = packageItem.image
                                ? (packageItem.image.startsWith('http') ? packageItem.image : `/storage/${packageItem.image}`)
                                : 'https://images.unsplash.com/photo-1504280390224-2c3554e22295?auto=format&fit=crop&w=500&q=80';

                            const badge = packageItem.special_badge ? getBadgeConfig(packageItem.special_badge) : null;

                            return (
                                <div
                                    key={packageItem.id}
                                    className="group relative flex-shrink-0 w-[220px] overflow-hidden transition-all duration-300"
                                >
                                    <button
                                        onClick={(e) => toggleFavorite(e, {
                                            id: `camping-${packageItem.id}`,
                                            type: 'camping',
                                            name: packageItem.name,
                                            price: packageItem.price,
                                            image: imgSrc,
                                            link: `/paket-camping/${packageItem.slug}`,
                                            timestamp: Date.now()
                                        })}
                                        className={`absolute top-3 right-3 z-20 p-2 rounded-full bg-white/95 shadow-sm active:scale-90 transition-transform cursor-pointer ${isFav ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} strokeWidth={1.5} />
                                    </button>

                                    <Link href={`/paket-camping/${packageItem.slug}`} className="block">
                                        <div className="relative aspect-square w-full overflow-hidden bg-gray-50 rounded-sm">
                                            <img
                                                src={imgSrc}
                                                alt={packageItem.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                loading="lazy"
                                            />
                                            {badge && (
                                                <div className={`absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-white rounded bg-gradient-to-r ${badge.colors}`}>
                                                    {badge.icon}
                                                    <span>{packageItem.special_badge}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="pt-4 space-y-1">
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
                                                    {packageItem.name}
                                                </h3>
                                                <p className="text-sm text-gray-400 font-normal">{packageItem.tags || 'Paket Lengkap'}</p>
                                            </div>
                                            <div className="text-sm font-semibold text-red-600">
                                                Rp {Number(packageItem.price).toLocaleString('id-ID')}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}


                    </div>
                </div>
            </section>

            {/* POPULAR MOUNTAINS */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    {/* Header */}
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <h2 className="text-4xl font-anton tracking-wide uppercase text-gray-900">
                                Destinasi Gunung Populer Browky Outdoor
                            </h2>
                            <p className="text-base text-gray-500 mt-2">Destinasi pendakian gunung favorit di Wonosobo & sekitarnya</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/gunung" className="text-sm font-semibold text-gray-900 hover:text-gray-700 underline underline-offset-4 hidden sm:block">
                                Lihat semua
                            </Link>
                            <div className="hidden sm:flex items-center gap-2">
                                <button
                                    onClick={() => scrollGrid(mountainSliderRef, 'left')}
                                    disabled={!canScrollMountainsLeft}
                                    className="w-10 h-10 rounded-full border border-gray-200 bg-zinc-50 flex items-center justify-center text-gray-600 hover:bg-gray-50 active:scale-95 transition disabled:opacity-40 disabled:pointer-events-none"
                                    aria-label="Scroll Left"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => scrollGrid(mountainSliderRef, 'right')}
                                    disabled={!canScrollMountainsRight}
                                    className="w-10 h-10 rounded-full border border-gray-200 bg-zinc-50 flex items-center justify-center text-gray-600 hover:bg-gray-50 active:scale-95 transition disabled:opacity-40 disabled:pointer-events-none"
                                    aria-label="Scroll Right"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mountains Cards Row */}
                    <div
                        ref={mountainSliderRef}
                        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-none"
                    >
                        {mountains.map((mountain) => {
                            const imgSrc = mountain.image
                                ? (mountain.image.startsWith('http') ? mountain.image : `/storage/${mountain.image}`)
                                : 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80';

                            return (
                                <div
                                    key={mountain.id}
                                    className="group flex-shrink-0 w-[220px] overflow-hidden transition-all duration-300"
                                >
                                    <Link href={`/gunung/${mountain.slug}`} className="block">
                                        <div className="relative aspect-square w-full overflow-hidden bg-gray-50 rounded-sm">
                                            <img
                                                src={imgSrc}
                                                alt={mountain.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="pt-4 space-y-1">
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
                                                    {mountain.name}
                                                </h3>
                                                <p className="text-sm text-gray-400 font-normal">{mountain.location}</p>
                                            </div>
                                            {mountain.elevation && (
                                                <div className="text-sm font-semibold text-primary flex items-center gap-1">
                                                    <MountainIcon className="w-4 h-4" />
                                                    <span>{mountain.elevation} mdpl</span>
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}

                        {mountains.length === 0 && (
                            <div className="w-full py-12 text-center text-gray-400 border border-dashed border-gray-200 rounded-2xl">
                                Data gunung belum tersedia.
                            </div>
                        )}
                    </div>

                    {/* Mobile: View all Link */}
                    <div className="mt-6 sm:hidden text-center">
                        <Link href="/gunung" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary underline underline-offset-4">
                            Lihat semua destinasi <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA BANNER */}
            <section className="relative overflow-hidden bg-zinc-800 py-16 text-white border-b-6 border-secondary">
                {/* Background accents */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_50%,white_1px,transparent_1px),radial-gradient(circle_at_80%_20%,white_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left max-w-lg space-y-3">
                            <h2 className="text-4xl font-anton tracking-wide uppercase leading-tight">
                                Siap Menjelajahi <span className="text-white">Keindahan Wonosobo?</span>
                            </h2>
                            <p className="text-base text-zinc-300 leading-relaxed">
                                Dapatkan perlengkapan terbaik dan layanan porter profesional untuk pengalaman mendaki yang aman, nyaman, dan tak terlupakan.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full sm:w-auto">
                            <Link
                                href="/sewa-alat"
                                className="inline-flex uppercase items-center justify-center gap-2 px-6 py-3.5 rounded-xs bg-white hover:bg-white/90 active:scale-95 text-gray-900 font-bold text-sm transition-all shadow-md w-full sm:w-auto"
                            >
                                Sewa Alat Sekarang
                            </Link>
                            <Link
                                href="/porter-gunung"
                                className="inline-flex uppercase items-center justify-center gap-2 px-6 py-3.5 rounded-xs border border-white/30 bg-transparent hover:bg-white/10 hover:text-white active:scale-95 text-white font-bold text-sm transition-all w-full sm:w-auto"
                            >
                                Booking Porter
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}
