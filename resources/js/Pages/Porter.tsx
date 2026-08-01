import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import { Heart, Navigation, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

interface PorterItem {
    id: number;
    name: string;
    slug: string;
    category?: string;
    status: string;
    image?: string;
    price_per_day: number | string;
    description?: string;
}

interface PorterProps {
    porters?: PorterItem[];
    porterCategories?: string[];
    searchMountain?: string;
    startDate?: string;
    endDate?: string;
}

interface FavItem {
    id: string | number;
    type: string;
    name: string;
    price: number | string;
    image: string;
    link: string;
    timestamp: number;
}

export default function Porter({ porters = [], porterCategories = [], searchMountain = '', startDate = '', endDate = '' }: PorterProps) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [favorites, setFavorites] = useState<(string | number)[]>([]);

    useEffect(() => {
        try {
            const favs = JSON.parse(localStorage.getItem('browky_favorites') || '[]');
            setFavorites(favs.map((f: FavItem) => f.id));
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
                type: 'porter',
                name: item.name,
                price: item.price,
                image: item.image,
                link: item.link,
                timestamp: Date.now()
            }];
            toast.success(`${item.name} ditambahkan ke favorit`);
        }

        localStorage.setItem('browky_favorites', JSON.stringify(updatedFavs));
        setFavorites(updatedFavs.map(f => f.id));
        window.dispatchEvent(new Event('favorites-updated'));
    };

    const filteredPorters = selectedCategory === 'all'
        ? porters
        : porters.filter(p => (p.category || 'Lainnya') === selectedCategory);

    return (
        <FrontendLayout>
            <Head>
                <title>Jasa Porter & Guide Pendakian Dieng Wonosobo | Prau, Bismo, Pakuwaja, Sindoro | Browky Outdoor</title>
                <meta name="description" content="Sewa & pesan jasa porter guide pendakian Dieng Wonosobo. Melayani Gunung Prau, Bismo, Pakuwaja, Sindoro, Sumbing & Kembang. Porter lokal berpengalaman, jujur, hafal jalur & harga terjangkau." />
                <meta name="keywords" content="porter dieng, jasa porter dieng, porter gunung prau dieng, porter gunung prau wonosobo, guide pendakian dieng, jasa guide gunung wonosobo, porter bismo wonosobo, porter pakuwaja wonosobo, porter sindoro, porter sumbing, sewa porter dieng, tarif porter dieng, guide pendakian prau, porter kembang" />
                <meta property="og:title" content="Jasa Porter & Guide Pendakian Dieng Wonosobo | Prau, Bismo, Pakuwaja | Browky Outdoor" />
                <meta property="og:description" content="Porter & guide pendakian profesional kawasan Dieng Wonosobo. Prau, Bismo, Pakuwaja, Sindoro, Sumbing — berpengalaman & harga terjangkau." />
                <meta property="og:url" content="https://browkyoutdoor.com/porter-gunung" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://browkyoutdoor.com/images/hero-fallback.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="Browky Outdoor" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Jasa Porter & Guide Pendakian Dieng Wonosobo | Browky Outdoor" />
                <meta name="twitter:description" content="Porter & guide pendakian profesional kawasan Dieng Wonosobo." />
                <meta name="twitter:image" content="https://browkyoutdoor.com/images/hero-fallback.jpg" />
                <link rel="canonical" href="https://browkyoutdoor.com/porter-gunung" />
                <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://browkyoutdoor.com" },
                                { "@type": "ListItem", "position": 2, "name": "Jasa Porter Gunung", "item": "https://browkyoutdoor.com/porter-gunung" }
                            ]
                        },
                        {
                            "@type": "FAQPage",
                            "mainEntity": [
                                {
                                    "@type": "Question",
                                    "name": "Berapa tarif porter gunung Prau & Dieng?",
                                    "acceptedAnswer": { "@type": "Answer", "text": "Tarif porter Browky Outdoor mulai dari Rp 150.000 per hari. Harga bervariasi tergantung gunung dan durasi pendakian. Hubungi kami via WhatsApp untuk info tarif terbaru Gunung Prau, Bismo, Pakuwaja, Sindoro, dan Sumbing." }
                                },
                                {
                                    "@type": "Question",
                                    "name": "Porter gunung Browky melayani gunung apa saja di Wonosobo?",
                                    "acceptedAnswer": { "@type": "Answer", "text": "Porter Browky Outdoor melayani pendakian di Gunung Prau, Gunung Bismo, Gunung Pakuwaja, Gunung Sindoro, Gunung Sumbing, dan Gunung Kembang di kawasan Dieng dan Wonosobo, Jawa Tengah." }
                                },
                                {
                                    "@type": "Question",
                                    "name": "Apakah porter Browky bisa menjadi guide pendakian?",
                                    "acceptedAnswer": { "@type": "Answer", "text": "Ya! Porter Browky Outdoor adalah warga lokal yang sudah sangat familiar dengan jalur pendakian di kawasan Dieng Wonosobo. Mereka bisa berfungsi ganda sebagai porter sekaligus guide/penunjuk jalan yang hafal setiap rute." }
                                },
                                {
                                    "@type": "Question",
                                    "name": "Bagaimana cara pesan porter Dieng Browky Outdoor?",
                                    "acceptedAnswer": { "@type": "Answer", "text": "Pemesanan porter Browky Outdoor dilakukan langsung melalui WhatsApp di +6287834443012. Pilih porter yang tersedia, tentukan tanggal & gunung tujuan, lalu konfirmasi jadwal. Mudah dan cepat!" }
                                }
                            ]
                        }
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
                            <li>
                                <Link href="/" className="hover:text-gray-900 transition">
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                            </li>
                            <li className="text-gray-900 font-medium">
                                Jasa Porter
                            </li>
                        </ol>
                    </nav>

                    <h1 className="text-4xl font-anton tracking-wide uppercase text-gray-900 mb-4">
                        Jasa Porter {searchMountain ? (searchMountain.toLowerCase().includes('gunung') ? searchMountain : `Gunung ${searchMountain}`) : 'Gunung'} Browky Outdoor
                    </h1>

                    {/* Search Results and Category Filter */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                        <div className="text-base text-gray-600">
                            <span className="font-medium text-gray-900">{filteredPorters.length}</span> Hasil pencarian
                        </div>

                        <div className="flex gap-2 overflow-x-auto scrollbar-none">
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap cursor-pointer ${selectedCategory === 'all' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'}`}
                            >
                                Semua
                            </button>
                            {porterCategories.map((category) => (
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
            </div>

            {/* GRID CONTENT */}
            <div className="bg-white py-8">
                <div className="max-w-7xl mx-auto px-4 md:px-8">

                    {/* Porter Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {filteredPorters.map((porter) => {
                            const pCat = porter.category || 'Lainnya';
                            const isFav = favorites.includes(`porter-${porter.id}`);
                            const imgSrc = porter.image
                                ? (porter.image.startsWith('http') ? porter.image : `/storage/${porter.image}`)
                                : 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be1?auto=format&fit=crop&w=500&q=80';

                            return (
                                <div
                                    key={porter.id}
                                    className="group relative overflow-hidden transition-all duration-300"
                                >
                                    {/* Favorite toggle */}
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
                                                className="w-full h-full object-cover transition-transform duration-300"
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
                            <div className="col-span-full py-16 flex flex-col items-center justify-center text-center text-gray-500 bg-zinc-50 border border-dashed border-zinc-200 p-6 rounded-lg space-y-3">
                                <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                                    <Navigation className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-bold text-gray-900">
                                    Belum ada Porter khusus {searchMountain || 'kategori ini'} yang terdaftar secara online.
                                </h3>
                                <p className="text-xs text-gray-500 max-w-md">
                                    Tim Browky Outdoor tetap melayani pemesanan Porter lokal profesional untuk {searchMountain || 'seluruh gunung di Dieng & Wonosobo'} via WhatsApp.
                                </p>
                                <a
                                    href={`https://wa.me/6287834443012?text=Halo%20Browky%20Outdoor,%20saya%20ingin%20tanya%20Jasa%20Porter%20khusus%20${encodeURIComponent(searchMountain || 'Dieng')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white font-semibold text-xs rounded-none hover:bg-black transition"
                                >
                                    Tanya Admin WhatsApp Porter {searchMountain || 'Dieng'}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </FrontendLayout>
    );
}
