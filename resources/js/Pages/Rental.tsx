import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import { Heart, Box, Flame, Star, Tag, ThumbsUp } from 'lucide-react';
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

interface RentalProps {
    products?: Product[];
    categories?: string[];
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

export default function Rental({ products = [], categories = [] }: RentalProps) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [favorites, setFavorites] = useState<string[]>([]);

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
        window.dispatchEvent(new Event('favorites-updated'));
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

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <FrontendLayout>
            <Head>
                <title>Sewa Alat Hiking Dieng & Wonosobo Lengkap | Browky Outdoor</title>
                <meta name="description" content="Rental & sewa alat hiking Dieng Wonosobo lengkap: tenda waterproof, carrier, sleeping bag, matras, kompor camping & perlengkapan outdoor murah siap pakai." />
                <meta name="keywords" content="sewa alat hiking dieng, sewa alat pendakian dieng, sewa tenda dieng, sewa perlengkapan pendakian wonosobo, rental outdoor dieng, sewa carrier dieng, sewa alat camping wonosobo" />
                <meta property="og:title" content="Sewa Alat Hiking Dieng & Wonosobo Lengkap | Browky Outdoor" />
                <meta property="og:description" content="Sewa peralatan pendakian & camping lengkap di Dieng Wonosobo dengan harga terjangkau." />
                <meta property="og:url" content="https://browkyoutdoor.com/sewa-alat" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://browkyoutdoor.com/images/hero-fallback.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="Browky Outdoor" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Sewa Alat Hiking Dieng & Wonosobo Lengkap | Browky Outdoor" />
                <meta name="twitter:description" content="Sewa peralatan pendakian & camping lengkap di Dieng Wonosobo dengan harga terjangkau." />
                <meta name="twitter:image" content="https://browkyoutdoor.com/images/hero-fallback.jpg" />
                <link rel="canonical" href="https://browkyoutdoor.com/sewa-alat" />
                <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://browkyoutdoor.com" },
                        { "@type": "ListItem", "position": 2, "name": "Sewa Alat Pendakian", "item": "https://browkyoutdoor.com/sewa-alat" }
                    ]
                })}
                </script>
            </Head>

            {/* PAGE HEADER & FILTER */}
            <div className="bg-white pt-10">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    {/* Breadcrumbs */}
                    <nav className="flex text-xs md:text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-1.5 md:space-x-2">
                            <li><a href="/" className="hover:text-gray-900 transition">Beranda</a></li>
                            <li><span className="text-gray-400 mx-1">/</span></li>
                            <li className="text-gray-900 font-medium">Sewa Alat Pendakian</li>
                        </ol>
                    </nav>
                    <h1 className="text-4xl font-anton tracking-wide uppercase text-gray-900 mb-6">
                        Sewa Alat Pendakian Browky Outdoor
                    </h1>
                    
                    {/* Category Filter */}
                    <div className="flex gap-2 overflow-x-auto pb-4 mb-6 border-b border-gray-100 scrollbar-none">
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
                </div>
            </div>

            {/* GRID CONTENT */}
            <div className="bg-white py-8">
                <div className="max-w-7xl mx-auto px-4 md:px-8">

                    {/* Product Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {filteredProducts.map((product) => {
                            const isFav = favorites.includes(product.id.toString());
                            const imgSrc = product.cover_image 
                                ? (product.cover_image.startsWith('http') ? product.cover_image : `/storage/${product.cover_image}`)
                                : 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=500&q=80';

                            const badge = product.special_badge ? getBadgeConfig(product.special_badge) : null;

                            return (
                                <div 
                                    key={product.id} 
                                    className="group relative overflow-hidden transition-all duration-300"
                                >
                                    {/* Favorite toggle */}
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
                                        className={`absolute top-3 right-3 z-20 p-2 rounded-full bg-white/95 shadow-sm active:scale-90 transition-transform cursor-pointer ${isFav ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}`}
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
                            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center text-gray-400">
                                <div className="w-16 h-16 rounded-none bg-gray-50 border border-gray-100 flex items-center justify-center mb-4 text-gray-300">
                                    <Box className="w-8 h-8" />
                                </div>
                                <h3 className="text-sm font-semibold text-gray-900 mb-1">Belum ada alat</h3>
                                <p className="text-xs text-gray-500">Katalog perlengkapan sedang diperbarui.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
