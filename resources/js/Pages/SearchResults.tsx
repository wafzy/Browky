import React, { useState } from 'react';
import { Link, Head, usePage } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import { Box, UserCheck, Flame, Star, Tag, ThumbsUp, Calendar, MapPin, Search } from 'lucide-react';

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
    photo?: string;
    price_per_day: number | string;
    mountain?: string;
    category?: string;
    rating?: number;
    experience_years?: number;
}

interface CampingPackage {
    id: number;
    name: string;
    slug: string;
    cover_image?: string;
    price: number | string;
    special_badge?: string;
    tags?: string;
}

interface Mountain {
    id: number;
    name: string;
    slug: string;
    location?: string;
    elevation?: string;
}

interface SearchResultsProps {
    products?: Product[];
    porters?: Porter[];
    campingPackages?: CampingPackage[];
    mountain?: Mountain | null;
    searchMountain?: string;
    startDate?: string;
    endDate?: string;
    queryKeyword?: string;
}

export default function SearchResults({
    products = [],
    porters = [],
    campingPackages = [],
    mountain,
    searchMountain = '',
    startDate = '',
    endDate = '',
    queryKeyword = ''
}: SearchResultsProps) {
    const [activeTab, setActiveTab] = useState<'all' | 'products' | 'porters' | 'camping'>('all');

    const totalCount = products.length + porters.length + campingPackages.length;

    const getBadgeConfig = (badge: string) => {
        const configs: Record<string, { colors: string; icon: React.ReactNode }> = {
            'Paling Diminati': { colors: 'from-red-500 to-orange-400', icon: <Flame className="w-3 h-3" /> },
            'Pilihan Lokal': { colors: 'from-blue-600 to-cyan-400', icon: <ThumbsUp className="w-3 h-3" /> },
            'Spesial Diskon': { colors: 'from-pink-500 to-orange-400', icon: <Tag className="w-3 h-3" /> },
            'Paling Hemat': { colors: 'from-green-600 to-emerald-400', icon: <Star className="w-3 h-3" /> }
        };
        return configs[badge] || { colors: 'from-gray-600 to-gray-400', icon: <Star className="w-3 h-3" /> };
    };

    const getFormattedHeading = () => {
        if (searchMountain) {
            const clean = searchMountain.toLowerCase().includes('gunung') ? searchMountain : `Gunung ${searchMountain}`;
            return `Hasil Pencarian di ${clean}`;
        }
        if (queryKeyword) {
            return `Hasil Pencarian: "${queryKeyword}"`;
        }
        return 'Semua Layanan Pendakian & Camping';
    };

    return (
        <FrontendLayout>
            <Head>
                <title>{getFormattedHeading()} | Browky Outdoor</title>
                <meta name="description" content="Temukan alat outdoor, jasa porter gunung, dan paket camping terbaik di Dieng Wonosobo." />
            </Head>

            {/* HEADER SECTION */}
            <div className="bg-white border-b border-gray-100 pt-10 pb-6">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex text-xs md:text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-1.5 md:space-x-2">
                            <li><a href="/" className="hover:text-gray-900 transition">Beranda</a></li>
                            <li><span className="text-gray-400 mx-1">/</span></li>
                            <li className="text-gray-900 font-medium">Hasil Pencarian</li>
                        </ol>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-anton tracking-wide uppercase text-gray-900 mb-2">
                                {getFormattedHeading()}
                            </h1>
                            <p className="text-sm text-gray-500">
                                Ditemukan <span className="font-semibold text-gray-900">{totalCount}</span> opsi sesuai pencarian kamu.
                            </p>
                        </div>

                        {/* Active Search Filter Badges */}
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                            {searchMountain && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 border border-zinc-200 text-zinc-800 font-semibold rounded-full">
                                    <MapPin className="w-3.5 h-3.5 text-primary" />
                                    {searchMountain}
                                </span>
                            )}
                            {startDate && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 border border-zinc-200 text-zinc-800 font-semibold rounded-full">
                                    <Calendar className="w-3.5 h-3.5 text-primary" />
                                    {startDate} {endDate ? `- ${endDate}` : ''}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* FILTER TABS */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-gray-100 pt-4">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-4 py-2 text-sm font-semibold rounded-none border transition-all duration-200 cursor-pointer whitespace-nowrap ${
                                activeTab === 'all'
                                    ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'
                            }`}
                        >
                            Semua Layanan ({totalCount})
                        </button>
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`px-4 py-2 text-sm font-semibold rounded-none border transition-all duration-200 cursor-pointer whitespace-nowrap ${
                                activeTab === 'products'
                                    ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'
                            }`}
                        >
                            Sewa Alat ({products.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('porters')}
                            className={`px-4 py-2 text-sm font-semibold rounded-none border transition-all duration-200 cursor-pointer whitespace-nowrap ${
                                activeTab === 'porters'
                                    ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'
                            }`}
                        >
                            Porter Gunung ({porters.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('camping')}
                            className={`px-4 py-2 text-sm font-semibold rounded-none border transition-all duration-200 cursor-pointer whitespace-nowrap ${
                                activeTab === 'camping'
                                    ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'
                            }`}
                        >
                            Paket Camping ({campingPackages.length})
                        </button>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="bg-white py-10 min-h-[50vh]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
                    {totalCount === 0 && (
                        <div className="py-20 flex flex-col items-center justify-center text-center text-gray-400">
                            <div className="w-16 h-16 rounded-none bg-gray-50 border border-gray-200 flex items-center justify-center mb-4 text-gray-400">
                                <Search className="w-8 h-8" />
                            </div>
                            <h3 className="text-base font-semibold text-gray-900 mb-1">Hasil tidak ditemukan</h3>
                            <p className="text-sm text-gray-500 max-w-md">
                                Maaf, tidak ada layanan yang cocok dengan kriteria pencarian kamu. Coba ganti pilihan gunung atau kata kunci pencarian.
                            </p>
                        </div>
                    )}

                    {/* SECTION 1: SEWA ALAT */}
                    {(activeTab === 'all' || activeTab === 'products') && products.length > 0 && (
                        <div>
                            <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
                                <div className="flex items-center gap-2">
                                    <Box className="w-5 h-5 text-primary" />
                                    <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">
                                        Sewa Alat Pendakian ({products.length})
                                    </h2>
                                </div>
                                {activeTab === 'all' && (
                                    <button
                                        onClick={() => setActiveTab('products')}
                                        className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                                    >
                                        Lihat Semua Alat &rarr;
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {products.map((product) => {
                                    const imgSrc = product.cover_image
                                        ? (product.cover_image.startsWith('http') ? product.cover_image : `/storage/${product.cover_image}`)
                                        : 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=500&q=80';
                                    const badge = product.special_badge ? getBadgeConfig(product.special_badge) : null;

                                    return (
                                        <Link key={product.id} href={`/sewa-alat/${product.slug}`} className="group block">
                                            <div className="relative aspect-square w-full overflow-hidden bg-gray-50 rounded-none border border-gray-100">
                                                <img
                                                    src={imgSrc}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                                {badge && (
                                                    <div className={`absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-white rounded bg-gradient-to-r ${badge.colors}`}>
                                                        {badge.icon}
                                                        <span>{product.special_badge}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="pt-3 space-y-1">
                                                <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
                                                    {product.name}
                                                </h3>
                                                <div className="flex items-baseline text-sm font-bold text-red-600">
                                                    <span>Rp {Number(product.price_per_day).toLocaleString('id-ID')}</span>
                                                    <span className="text-xs text-gray-400 font-normal ml-1">/ hari</span>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* SECTION 2: JASA PORTER */}
                    {(activeTab === 'all' || activeTab === 'porters') && porters.length > 0 && (
                        <div>
                            <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
                                <div className="flex items-center gap-2">
                                    <UserCheck className="w-5 h-5 text-primary" />
                                    <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">
                                        Jasa Porter & Guide ({porters.length})
                                    </h2>
                                </div>
                                {activeTab === 'all' && (
                                    <button
                                        onClick={() => setActiveTab('porters')}
                                        className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                                    >
                                        Lihat Semua Porter &rarr;
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                                {porters.map((porter) => {
                                    const imgSrc = porter.photo
                                        ? (porter.photo.startsWith('http') ? porter.photo : `/storage/${porter.photo}`)
                                        : '/images/logobrowkyoutdoor.png';

                                    return (
                                        <Link key={porter.id} href={`/porter-gunung/${porter.slug}`} className="group block">
                                            <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50 rounded-none border border-gray-100">
                                                <img
                                                    src={imgSrc}
                                                    alt={porter.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                                {porter.mountain && (
                                                    <div className="absolute top-3 left-3 bg-black/75 text-white text-[10px] font-medium px-2 py-1 rounded">
                                                        {porter.mountain}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="pt-3 space-y-1">
                                                <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
                                                    {porter.name}
                                                </h3>
                                                <div className="flex items-baseline text-sm font-bold text-red-600">
                                                    <span>Rp {Number(porter.price_per_day).toLocaleString('id-ID')}</span>
                                                    <span className="text-xs text-gray-400 font-normal ml-1">/ hari</span>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* SECTION 3: PAKET CAMPING */}
                    {(activeTab === 'all' || activeTab === 'camping') && campingPackages.length > 0 && (
                        <div>
                            <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
                                <div className="flex items-center gap-2">
                                    <Flame className="w-5 h-5 text-primary" />
                                    <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">
                                        Paket Camping ({campingPackages.length})
                                    </h2>
                                </div>
                                {activeTab === 'all' && (
                                    <button
                                        onClick={() => setActiveTab('camping')}
                                        className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                                    >
                                        Lihat Semua Paket Camping &rarr;
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {campingPackages.map((pkg) => {
                                    const imgSrc = pkg.cover_image
                                        ? (pkg.cover_image.startsWith('http') ? pkg.cover_image : `/storage/${pkg.cover_image}`)
                                        : 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80';

                                    return (
                                        <Link key={pkg.id} href={`/paket-camping/${pkg.slug}`} className="group block">
                                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-50 rounded-none border border-gray-100">
                                                <img
                                                    src={imgSrc}
                                                    alt={pkg.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                                {pkg.tags && (
                                                    <div className="absolute top-3 left-3 bg-black/75 text-white text-[10px] font-medium px-2 py-1 rounded">
                                                        {pkg.tags}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="pt-3 space-y-1">
                                                <h3 className="text-base font-semibold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
                                                    {pkg.name}
                                                </h3>
                                                <div className="flex items-baseline text-sm font-bold text-red-600">
                                                    <span>Rp {Number(pkg.price).toLocaleString('id-ID')}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </FrontendLayout>
    );
}
