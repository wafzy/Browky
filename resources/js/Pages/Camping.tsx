import React, { useState, useEffect } from 'react';
import { Link, Head, usePage } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import { Heart, Box, Flame, Star, Tag, ThumbsUp } from 'lucide-react';
import { toast } from 'sonner';

interface CampingPackage {
    id: number;
    name: string;
    slug: string;
    description?: string;
    price: number | string;
    image?: string;
    status: string;
    tags?: string;
    facilities?: string;
}

interface CampingProps {
    packages?: CampingPackage[];
    campingCategories?: string[];
    searchMountain?: string;
    startDate?: string;
    endDate?: string;
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

export default function Camping({ packages = [], campingCategories = [], searchMountain = '', startDate = '', endDate = '' }: CampingProps) {
    const { url } = usePage();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentMountain, setCurrentMountain] = useState(searchMountain);
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const m = urlParams.get('mountain');
            if (m) {
                setCurrentMountain(m);
            } else if (searchMountain) {
                setCurrentMountain(searchMountain);
            }
        }

        try {
            const favs = JSON.parse(localStorage.getItem('browky_favorites') || '[]');
            setFavorites(favs.map((f: FavItem) => f.id.toString()));
        } catch (e) {
            setFavorites([]);
        }
    }, [url, searchMountain]);

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
                type: 'camping',
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

    const filteredPackages = selectedCategory === 'all'
        ? packages
        : packages.filter(p => (p.tags || 'Lainnya').toLowerCase().includes(selectedCategory.toLowerCase()));

    return (
        <FrontendLayout>
            <Head>
                <title>Paket Camping Dieng & Wonosobo Lengkap All-In | Browky Outdoor</title>
                <meta name="description" content="Paket camping Dieng & Gunung Prau all-in tanpa ribet. Peralatan camping lengkap, tenda, perlengkapan masak, plus porter berpengalaman Siap Huni." />
                <meta name="keywords" content="paket camping dieng, sewa paket camping dieng, paket camping gunung prau, paket camping wonosobo, sewa alat camping dieng" />
                <meta property="og:title" content="Paket Camping Dieng & Wonosobo Lengkap All-In | Browky Outdoor" />
                <meta property="og:description" content="Pilihan paket camping Dieng lengkap & siap pakai untuk liburan outdoor di Gunung Prau & Wonosobo." />
                <meta property="og:url" content="https://browkyoutdoor.com/paket-camping" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://browkyoutdoor.com/images/hero-fallback.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="Browky Outdoor" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Paket Camping Dieng & Wonosobo Lengkap All-In | Browky Outdoor" />
                <meta name="twitter:description" content="Pilihan paket camping Dieng lengkap & siap pakai untuk liburan outdoor di Gunung Prau & Wonosobo." />
                <meta name="twitter:image" content="https://browkyoutdoor.com/images/hero-fallback.jpg" />
                <link rel="canonical" href="https://browkyoutdoor.com/paket-camping" />
                <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://browkyoutdoor.com" },
                        { "@type": "ListItem", "position": 2, "name": "Paket Camping", "item": "https://browkyoutdoor.com/paket-camping" }
                    ]
                })}
                </script>
            </Head>

            {/* PAGE HEADER */}
            <div className="bg-white pt-10">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    {/* Breadcrumbs */}
                    <nav className="flex text-xs md:text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-1.5 md:space-x-2">
                            <li><a href="/" className="hover:text-gray-900 transition">Beranda</a></li>
                            <li><span className="text-gray-400 mx-1">/</span></li>
                            <li className="text-gray-900 font-medium">Paket Camping</li>
                        </ol>
                    </nav>
                    <h1 className="text-4xl font-anton tracking-wide uppercase text-gray-900 mb-6">
                        Paket Camping {currentMountain ? (currentMountain.toLowerCase().includes('gunung') ? currentMountain : `Gunung ${currentMountain}`) : ''} Browky Outdoor
                    </h1>

                    {/* Search Results and Category Filter */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                        <div className="text-base text-gray-600">
                            <span className="font-medium text-gray-900">{filteredPackages.length}</span> Hasil pencarian
                        </div>

                        {!currentMountain && (
                            <div className="flex gap-2 overflow-x-auto scrollbar-none">
                                <button
                                    onClick={() => setSelectedCategory('all')}
                                    className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap cursor-pointer ${selectedCategory === 'all' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'}`}
                                >
                                    Semua
                                </button>
                                {campingCategories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap cursor-pointer ${selectedCategory === category ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'}`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* GRID CONTENT */}
            <div className="bg-white py-8">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    {/* Packages Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {filteredPackages.map((packageItem) => {
                            const isFav = favorites.includes(`camping-${packageItem.id}`);
                            const imgSrc = packageItem.image 
                                ? (packageItem.image.startsWith('http') ? packageItem.image : `/storage/${packageItem.image}`)
                                : 'https://images.unsplash.com/photo-1504280390224-2c3554e22295?auto=format&fit=crop&w=500&q=80';
                            
                            const badge = packageItem.special_badge ? getBadgeConfig(packageItem.special_badge) : null;

                            return (
                                <div 
                                    key={packageItem.id} 
                                    className="group relative overflow-hidden transition-all duration-300"
                                >
                                    {/* Favorite toggle */}
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

                        {filteredPackages.length === 0 && (
                            <div className="col-span-full py-16 flex flex-col items-center justify-center text-center text-gray-500 bg-zinc-50 border border-dashed border-zinc-200 p-6 rounded-lg space-y-3">
                                <Box className="w-12 h-12 text-zinc-300" />
                                <h3 className="text-base font-bold text-gray-900">
                                    Belum ada Paket Camping khusus {searchMountain || 'pilihan ini'} yang terdaftar secara online.
                                </h3>
                                <p className="text-xs text-gray-500 max-w-md">
                                    Tim Browky Outdoor siap melayani paket camping custom All-In untuk {searchMountain || 'berbagai gunung'} via WhatsApp.
                                </p>
                                <a
                                    href={`https://wa.me/6287834443012?text=Halo%20Browky%20Outdoor,%20saya%20ingin%20tanya%20Paket%20Camping%20khusus%20${encodeURIComponent(searchMountain || 'Dieng')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white font-semibold text-xs rounded-none hover:bg-black transition"
                                >
                                    Konsultasi Paket Custom WhatsApp {searchMountain}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
