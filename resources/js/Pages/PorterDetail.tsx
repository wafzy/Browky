import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import { ArrowLeft, Share2, Heart, ShieldCheck, ThumbsUp, MapPin, Compass, Info, Award, UserCheck, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface Porter {
  id: number;
  name: string;
  slug: string;
  category?: string;
  image?: string;
  price_per_day: number | string;
  status: string;
  description?: string;
}

interface PorterDetailProps {
  porter: Porter;
  relatedPorters?: Porter[];
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

export default function PorterDetail({ porter, relatedPorters = [] }: PorterDetailProps) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavoriteItem = (e: React.MouseEvent<HTMLButtonElement>, item: FavItem) => {
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
      updatedFavs = [...favs, item];
      toast.success(`${item.name} ditambahkan ke favorit`);
    }

    localStorage.setItem('browky_favorites', JSON.stringify(updatedFavs));
    setFavorites(updatedFavs.map(f => f.id.toString()));
    window.dispatchEvent(new Event('favorites-updated'));
  };

  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem('browky_favorites') || '[]');
      setFavorites(favs.map((f: FavItem) => f.id.toString()));
    } catch (e) {
      setFavorites([]);
    }
  }, []);

  if (!porter) {
    return (
      <FrontendLayout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-gray-500 font-medium">Porter tidak ditemukan.</p>
        </div>
      </FrontendLayout>
    );
  }

  const isFav = favorites.includes(porter.id.toString());
  const imgSrc = porter.image
    ? (porter.image.startsWith('http') ? porter.image : `/storage/${porter.image}`)
    : '/images/logobrowkyoutdoor.png';

  const waText = encodeURIComponent(`Halo Admin Browky, saya tertarik dengan jasa porter: ${porter.name}. Mohon informasi lebih lanjut.`);
  const waUrl = `https://wa.me/6287834443012?text=${waText}`;

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    let favs: FavItem[] = [];
    try {
      favs = JSON.parse(localStorage.getItem('browky_favorites') || '[]');
    } catch (err) {
      favs = [];
    }

    const item: FavItem = {
      id: porter.id.toString(),
      type: 'porter',
      name: porter.name,
      price: porter.price_per_day,
      image: imgSrc,
      link: `/porter-gunung/${porter.slug}`,
      timestamp: Date.now()
    };

    const currentIsFav = favs.some(f => f.id === item.id);
    let updatedFavs: FavItem[] = [];

    if (currentIsFav) {
      updatedFavs = favs.filter(f => f.id !== item.id);
      toast.success(`${item.name} dihapus dari favorit`);
    } else {
      updatedFavs = [...favs, item];
      toast.success(`${item.name} ditambahkan ke favorit`);
    }

    localStorage.setItem('browky_favorites', JSON.stringify(updatedFavs));
    setFavorites(updatedFavs.map(f => f.id.toString()));
    window.dispatchEvent(new Event('favorites-updated'));
  };

  const handleShare = async () => {
    const shareData = {
      title: `Jasa Porter ${porter.name} | Browky Outdoor`,
      text: 'Jasa porter & guide gunung profesional di Wonosobo & Dieng.',
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
      toast.success('Link porter berhasil disalin!');
    } catch (err) {
      toast.error('Gagal menyalin link');
    }
  };

  return (
    <FrontendLayout>
      <Head title={`Jasa Porter Dieng ${porter.name} | Gunung Prau & Wonosobo | Browky`}>
        <meta name="description" content={`Sewa jasa porter Dieng ${porter.name} untuk pendakian Gunung Prau, Sumbing, Sindoro. Berpengalaman & hafal rute.`} />
        <link rel="canonical" href={`https://browkyoutdoor.com/porter-gunung/${porter.slug}`} />
      </Head>

      <div className="bg-white py-8 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back Button and Breadcrumbs Row */}
          <div className="flex items-center gap-0 mb-4 w-full min-w-0">
            <Link
              href="/porter-gunung"
              className="text-zinc-700 hover:text-zinc-950 hover:bg-gray-100 transition-all rounded-full flex-shrink-0"
              title="Kembali ke Porter Gunung"
              aria-label="Kembali ke Porter Gunung"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            </Link>

            <nav className="flex-1 min-w-0 text-xs md:text-sm text-zinc-500" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 w-full min-w-0">
                <li className="flex-shrink-0">
                  <Link href="/" className="hover:text-zinc-900 transition whitespace-nowrap">Beranda</Link>
                </li>
                <li className="flex-shrink-0">
                  <span className="text-zinc-300">/</span>
                </li>
                <li className="flex-shrink-0">
                  <Link href="/porter-gunung" className="hover:text-zinc-900 transition whitespace-nowrap">Jasa Porter</Link>
                </li>
                <li className="flex-shrink-0">
                  <span className="text-zinc-300">/</span>
                </li>
                <li className="text-zinc-900 font-medium truncate flex-1 min-w-0">
                  {porter.name}
                </li>
              </ol>
            </nav>
          </div>

          {/* Top Section: Image + Info Box (45:55 Ratio) */}
          <div className="mb-12 bg-white">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-center">

              {/* Left Side: Image (45%) */}
              <div className="w-full lg:w-[45%] flex-shrink-0 relative aspect-square max-h-[540px] bg-gray-50 rounded-sm overflow-hidden">
                <img
                  src={imgSrc}
                  alt={porter.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Side: Info & Actions (55% Vertically Centered) */}
              <div className="w-full lg:w-[55%] flex-1 py-2 flex flex-col justify-center">
                <div>
                  <div className="p-0 pb-4">
                    <div className="flex items-center justify-between lg:justify-start gap-3.5 mb-3">
                      <span className="inline-block px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-normal rounded-none">
                        {porter.category || 'Porter Gunung'}
                      </span>

                      {/* Share & Favorite icons next to category */}
                      <div className="flex items-center gap-3.5">
                        <button
                          type="button"
                          onClick={handleShare}
                          className="p-0 text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer border-0 bg-transparent"
                          title="Bagikan Porter"
                          aria-label="Bagikan Porter"
                        >
                          <Share2 className="w-5 h-5" strokeWidth={1.5} />
                        </button>

                        <button
                          type="button"
                          onClick={toggleFavorite}
                          className={`p-0 transition-colors cursor-pointer border-0 bg-transparent ${isFav ? 'text-red-500' : 'text-zinc-400 hover:text-red-500'}`}
                          title="Favoritkan Porter"
                          aria-label="Favoritkan Porter"
                        >
                          <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>

                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-anton tracking-wide font-normal uppercase text-zinc-900 leading-tight">
                      {porter.name}
                    </h1>
                  </div>

                  <div className="p-0 space-y-6">
                    {/* Price */}
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg lg:text-2xl font-bold text-red-600">
                        Rp {Number(porter.price_per_day).toLocaleString('id-ID')}
                      </span>
                      <span className="text-sm font-normal text-zinc-500">/ hari</span>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-zinc-500 w-16">Status</span>
                      <span className={`text-sm font-semibold ${porter.status === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
                        {porter.status === 'Available' ? 'Tersedia' : 'Penuh'}
                      </span>
                    </div>

                    {/* Action button (Desktop only, hidden on mobile) */}
                    <div className="hidden lg:flex items-center gap-3.5 pt-2">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-14 px-8 inline-flex items-center justify-center text-base font-normal text-zinc-50 bg-zinc-900 hover:bg-zinc-800 shadow-none cursor-pointer rounded-none"
                      >
                        Pesan via WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                {/* Informational Note */}
                <div className="flex items-center gap-2.5 text-sm text-zinc-500 mt-6">
                  <Info className="w-5 h-5 text-zinc-400 shrink-0" strokeWidth={1.5} />
                  <span>Pemesanan porter dilakukan langsung via WhatsApp untuk koordinasi jadwal pendakian.</span>
                </div>
              </div>

            </div>
          </div>

          <div className="space-y-10 mt-10">
            {/* Deskripsi */}
            <div className="w-full lg:max-w-[80%]">
              <h3 className="text-base font-bold text-zinc-900 mb-4">Deskripsi</h3>
              <div className="text-base text-zinc-600 leading-relaxed whitespace-pre-line">
                {porter.description || 'Belum ada deskripsi untuk porter ini.'}
              </div>
            </div>

            {/* Keunggulan Layanan */}
            <div className="w-full lg:max-w-[80%] pt-4">
              <h3 className="text-base font-bold text-zinc-900 mb-8">Keunggulan Layanan Browky Outdoor</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-3">
                  <ShieldCheck className="w-6 h-6 text-zinc-700 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h4 className="font-bold text-zinc-900 text-base">Porter Berpengalaman</h4>
                    <p className="text-base text-zinc-500 mt-1">Warga lokal berpengalaman dan hafal rute gunung Dieng.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Compass className="w-6 h-6 text-zinc-700 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h4 className="font-bold text-zinc-900 text-base">Familiar Jalur Gunung</h4>
                    <p className="text-base text-zinc-500 mt-1">Mengetahui rute Gunung Prau, Sumbing, Sindoro & Bismo.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <ThumbsUp className="w-6 h-6 text-zinc-700 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h4 className="font-bold text-zinc-900 text-base">Bantu Logistik Pendakian</h4>
                    <p className="text-base text-zinc-500 mt-1">Siap membawakan perlengkapan kelompok hingga area camp.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="w-6 h-6 text-zinc-700 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h4 className="font-bold text-zinc-900 text-base">Guide & Pendamping</h4>
                    <p className="text-base text-zinc-500 mt-1">Dapat merangkap sebagai penunjuk arah dan pendamping perjalanan.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations Section */}
          {relatedPorters && relatedPorters.length > 0 && (
            <>
              <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-16" />
              <div>
                <h2 className="text-2xl font-anton tracking-wide uppercase text-zinc-900 dark:text-zinc-50 mb-8">
                  Mungkin Anda Suka
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                  {relatedPorters.map((related) => {
                    const relatedImg = related.image
                      ? (related.image.startsWith('http') ? related.image : `/storage/${related.image}`)
                      : '/images/logobrowkyoutdoor.png';

                    const isRelatedFav = favorites.includes(related.id.toString());

                    return (
                      <div key={related.id} className="group relative flex flex-col h-full bg-white dark:bg-zinc-900">
                        <Link href={`/porter-gunung/${related.slug}`} className="block relative aspect-square overflow-hidden bg-gray-100 rounded-sm mb-3">
                          <img
                            src={relatedImg}
                            alt={related.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <button
                            type="button"
                            onClick={(e) => toggleFavoriteItem(e, {
                              id: related.id.toString(),
                              type: 'porter',
                              name: related.name,
                              price: related.price_per_day,
                              image: relatedImg,
                              link: `/porter-gunung/${related.slug}`,
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
                            <Link href={`/porter-gunung/${related.slug}`}>{related.name}</Link>
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

      {/* Mobile Sticky Booking Footer Bar */}
      <div className="fixed lg:hidden bottom-0 left-0 right-0 z-40 bg-white border-t border-zinc-200 p-4 pb-safe flex items-center justify-between gap-4 shadow-lg">
        <div className="flex flex-col">
          <span className="text-xs font-normal text-zinc-400">Total Harga</span>
          <span className="text-lg font-bold text-red-600 leading-tight">
            Rp {Number(porter.price_per_day).toLocaleString('id-ID')}
          </span>
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 h-12 flex items-center justify-center text-sm font-normal text-white bg-zinc-900 hover:bg-zinc-800 rounded-none"
        >
          Pesan via WhatsApp
        </a>
      </div>
    </FrontendLayout>
  );
}
