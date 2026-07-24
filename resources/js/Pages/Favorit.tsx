import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

interface FavoriteItem {
    id: number | string;
    name: string;
    type: 'product' | 'camping' | 'porter';
    price: number | string;
    image: string;
    link: string;
    timestamp: number;
}

export default function Favorit() {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

    const loadFavorites = () => {
        try {
            const favs = JSON.parse(localStorage.getItem('browky_favorites') || '[]');
            // Sort by timestamp descending
            favs.sort((a: FavoriteItem, b: FavoriteItem) => b.timestamp - a.timestamp);
            setFavorites(favs);
        } catch (e) {
            setFavorites([]);
        }
    };

    useEffect(() => {
        loadFavorites();
        window.addEventListener('favorites-updated', loadFavorites);
        return () => {
            window.removeEventListener('favorites-updated', loadFavorites);
        };
    }, []);

    const removeFavorite = (e: React.MouseEvent<HTMLButtonElement>, item: FavoriteItem) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const favs = JSON.parse(localStorage.getItem('browky_favorites') || '[]');
            const updatedFavs = favs.filter((f: FavoriteItem) => f.id !== item.id);
            localStorage.setItem('browky_favorites', JSON.stringify(updatedFavs));
            setFavorites(updatedFavs);
            window.dispatchEvent(new Event('favorites-updated'));
            toast.success(`${item.name} dihapus dari favorit`);
        } catch (err) {
            toast.error('Gagal menghapus item');
        }
    };

    return (
        <FrontendLayout>
            <Head>
                <title>Favorit Saya | Browky Outdoor</title>
            </Head>

            <div className="bg-gray-50/50 py-12 min-h-[calc(100vh-80px-300px)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-10">
                        <h1 className="text-4xl font-anton tracking-wide uppercase text-gray-900">Daftar Favorit Saya</h1>
                        <p className="mt-2 text-sm text-gray-500 font-medium">Peralatan dan paket porter yang Anda simpan.</p>
                    </div>

                    {favorites.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                            {favorites.map((item) => {
                                const typeLabel = item.type === 'product' ? 'Sewa Alat' : (item.type === 'camping' ? 'Paket Camping' : 'Jasa Porter');
                                return (
                                    <div
                                        key={item.id}
                                        className="group relative overflow-hidden transition-all duration-300"
                                    >
                                        {/* Remove button */}
                                        <button
                                            onClick={(e) => removeFavorite(e, item)}
                                            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/95 text-red-500 hover:text-gray-400 active:scale-90 shadow-sm transition-transform cursor-pointer"
                                            title="Hapus dari favorit"
                                        >
                                            <Heart className="w-5 h-5 fill-current" strokeWidth={1.5} />
                                        </button>

                                        <Link href={item.link} className="block">
                                            <div className="relative aspect-square w-full overflow-hidden bg-gray-50 rounded-sm">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                            </div>

                                            <div className="pt-4 space-y-1">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                                    {typeLabel}
                                                </span>
                                                <h3 className="text-sm font-semibold text-gray-950 line-clamp-1 group-hover:text-primary transition-colors">
                                                    {item.name}
                                                </h3>
                                                <div className="text-sm font-bold text-red-600">
                                                    Rp {Number(item.price).toLocaleString('id-ID')}
                                                    <span className="text-xs text-gray-400 font-normal ml-0.5">/ hari</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="max-w-md mx-auto text-center py-16 bg-white border border-gray-100 rounded-3xl shadow-sm flex flex-col items-center justify-center">
                            <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4 text-gray-300">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Belum ada item favorit</h3>
                            <p className="text-xs text-gray-400 max-w-xs leading-relaxed mb-6">
                                Mulai jelajahi katalog kami dan simpan peralatan atau paket porter yang Anda sukai dengan menekan tombol hati.
                            </p>
                            <div className="flex justify-center gap-3 w-full px-6">
                                <Link
                                    href="/sewa-alat"
                                    className="flex-1 flex justify-center py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-primary hover:bg-primary/95 transition-all shadow shadow-primary/10 cursor-pointer"
                                >
                                    Eksplor Alat
                                </Link>
                                <Link
                                    href="/porter-gunung"
                                    className="flex-1 flex justify-center py-2.5 rounded-xl text-xs font-bold border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-all cursor-pointer"
                                >
                                    Cari Porter
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </FrontendLayout>
    );
}
