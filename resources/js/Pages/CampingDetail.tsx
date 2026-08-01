import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import { ArrowLeft, Share2, Heart, Info, CheckCircle2, ShieldCheck, Compass, ThumbsUp, MapPin } from 'lucide-react';
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

interface CampingDetailProps {
  package: CampingPackage;
  relatedPackages?: CampingPackage[];
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

export default function CampingDetail({ package: packageItem, relatedPackages = [] }: CampingDetailProps) {
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

  const getMountainCategory = () => {
    if (packageItem?.tags) {
      const firstTag = packageItem.tags.split(',')[0].trim();
      if (firstTag) return firstTag;
    }
    const nameLower = (packageItem?.name || '').toLowerCase();
    if (nameLower.includes('prau')) return 'Gunung Prau';
    if (nameLower.includes('sumbing')) return 'Gunung Sumbing';
    if (nameLower.includes('sindoro')) return 'Gunung Sindoro';
    if (nameLower.includes('bismo')) return 'Gunung Bismo';
    if (nameLower.includes('kembang')) return 'Gunung Kembang';
    return 'Kawasan Dieng';
  };

  if (!packageItem) {
    return (
      <FrontendLayout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-gray-500 font-medium">Paket camping tidak ditemukan.</p>
        </div>
      </FrontendLayout>
    );
  }

  const isFav = favorites.includes(packageItem.id.toString());
  const imgSrc = packageItem.image
    ? (packageItem.image.startsWith('http') ? packageItem.image : `/storage/${packageItem.image}`)
    : '/images/logobrowkyoutdoor.png';

  const facilities = packageItem.facilities ? packageItem.facilities.split(',') : [];

  const waText = encodeURIComponent(`Halo Admin Browky, saya tertarik dengan ${packageItem.name} seharga Rp${Number(packageItem.price).toLocaleString('id-ID')}. Mohon informasi lebih lanjut.`);
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
      id: packageItem.id.toString(),
      type: 'camping',
      name: packageItem.name,
      price: packageItem.price,
      image: imgSrc,
      link: `/paket-camping/${packageItem.slug}`,
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
      title: `Paket Camping ${packageItem.name} | Browky Outdoor`,
      text: 'Sewa & pesan paket camping gunung lengkap di Dieng Wonosobo.',
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
      toast.success('Link paket camping berhasil disalin!');
    } catch (err) {
      toast.error('Gagal menyalin link');
    }
  };

  return (
    <FrontendLayout>
      <Head title={`Paket Camping Dieng - ${packageItem.name} | Browky Outdoor`}>
        <meta name="description" content={`Sewa & pesan ${packageItem.name} di Dieng Wonosobo. Paket camping gunung lengkap, tenda & perlengkapan outdoor.`} />
        <link rel="canonical" href={`https://browkyoutdoor.com/paket-camping/${packageItem.slug}`} />
      </Head>

      <div className="bg-white py-8 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back Button and Breadcrumbs Row */}
          <div className="flex items-center gap-0 mb-4 w-full min-w-0">
            <Link
              href="/paket-camping"
              className="text-zinc-700 hover:text-zinc-950 hover:bg-gray-100 transition-all rounded-full flex-shrink-0"
              title="Kembali ke Paket Camping"
              aria-label="Kembali ke Paket Camping"
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
                  <Link href="/paket-camping" className="hover:text-zinc-900 transition whitespace-nowrap">Paket Camping</Link>
                </li>
                <li className="flex-shrink-0">
                  <span className="text-zinc-300">/</span>
                </li>
                <li className="text-zinc-900 font-medium truncate flex-1 min-w-0">
                  {packageItem.name}
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
                  alt={packageItem.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Side: Info & Actions (55% Vertically Centered) */}
              <div className="w-full lg:w-[55%] flex-1 py-2 flex flex-col justify-center">
                <div>
                  <div className="p-0 pb-4">
                    <div className="flex items-center justify-between lg:justify-start gap-3.5 mb-3">
                      <span className="inline-block px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-normal rounded-none">
                        {getMountainCategory()}
                      </span>

                      {/* Share & Favorite icons next to category */}
                      <div className="flex items-center gap-3.5">
                        <button
                          type="button"
                          onClick={handleShare}
                          className="p-0 text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer border-0 bg-transparent"
                          title="Bagikan Paket"
                          aria-label="Bagikan Paket"
                        >
                          <Share2 className="w-5 h-5" strokeWidth={1.5} />
                        </button>

                        <button
                          type="button"
                          onClick={toggleFavorite}
                          className={`p-0 transition-colors cursor-pointer border-0 bg-transparent ${isFav ? 'text-red-500' : 'text-zinc-400 hover:text-red-500'}`}
                          title="Favoritkan Paket"
                          aria-label="Favoritkan Paket"
                        >
                          <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>

                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-anton tracking-wide font-normal uppercase text-zinc-900 leading-tight">
                      {packageItem.name}
                    </h1>
                  </div>

                  <div className="p-0 space-y-6">
                    {/* Price */}
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg lg:text-2xl font-bold text-red-600">
                        Rp {Number(packageItem.price).toLocaleString('id-ID')}
                      </span>
                      <span className="text-sm font-normal text-zinc-500">/ paket</span>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-zinc-500 w-16">Status</span>
                      <span className={`text-sm font-semibold ${packageItem.status === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
                        {packageItem.status === 'Available' ? 'Tersedia' : 'Penuh'}
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
                  <span>Pemesanan paket camping dilakukan langsung via WhatsApp untuk ketersediaan jadwal & lokasi.</span>
                </div>
              </div>

            </div>
          </div>

          <div className="space-y-10 mt-10">
            {/* Deskripsi */}
            <div className="w-full lg:max-w-[80%]">
              <h3 className="text-base font-bold text-zinc-900 mb-4">Deskripsi</h3>
              <div className="text-base text-zinc-600 leading-relaxed whitespace-pre-line">
                {packageItem.description || 'Belum ada deskripsi untuk paket camping ini.'}
              </div>
            </div>

            {/* Fasilitas yang Didapat */}
            <div className="w-full lg:max-w-[80%] pt-4">
              <h3 className="text-base font-bold text-zinc-900 mb-6">Fasilitas yang Didapat</h3>
              <div>
                {facilities.length > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {facilities.map((facility, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-base text-zinc-700 font-normal">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span>{facility.trim()}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-base text-zinc-500 italic">Detail fasilitas tidak disebutkan, silakan tanyakan admin.</p>
                )}
              </div>
            </div>

            {/* Keunggulan Layanan */}
            <div className="w-full lg:max-w-[80%] pt-4">
              <h3 className="text-base font-bold text-zinc-900 mb-8">Keunggulan Layanan Browky Outdoor</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-3">
                  <ShieldCheck className="w-6 h-6 text-zinc-700 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h4 className="font-bold text-zinc-900 text-base">Peralatan Bersih & Terawat</h4>
                    <p className="text-base text-zinc-500 mt-1">Seluruh peralatan camping selalu dicuci dan steril setelah digunakan.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Compass className="w-6 h-6 text-zinc-700 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h4 className="font-bold text-zinc-900 text-base">Paket Lengkap Siap Pakai</h4>
                    <p className="text-base text-zinc-500 mt-1">Lengkap tenda, matras, SB & alat masak tanpa perlu pusing sewa terpisah.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <ThumbsUp className="w-6 h-6 text-zinc-700 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h4 className="font-bold text-zinc-900 text-base">Pengambilan & Penyerahan Praktis</h4>
                    <p className="text-base text-zinc-500 mt-1">Bisa diambil langsung di toko atau diantarkan ke meeting point pilihanmu.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="w-6 h-6 text-zinc-700 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h4 className="font-bold text-zinc-900 text-base">Bisa Tambah Porter & Guide</h4>
                    <p className="text-base text-zinc-500 mt-1">Dapat dikombinasikan dengan jasa porter lokal berpengalaman Dieng.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations Section */}
          {relatedPackages && relatedPackages.length > 0 && (
            <>
              <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-16" />
              <div>
                <h2 className="text-2xl font-anton tracking-wide uppercase text-zinc-900 dark:text-zinc-50 mb-8">
                  Mungkin Anda Suka
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                  {relatedPackages.map((related) => {
                    const relatedImg = related.image
                      ? (related.image.startsWith('http') ? related.image : `/storage/${related.image}`)
                      : '/images/logobrowkyoutdoor.png';

                    const isRelatedFav = favorites.includes(related.id.toString());

                    return (
                      <div key={related.id} className="group relative flex flex-col h-full bg-white dark:bg-zinc-900">
                        <Link href={`/paket-camping/${related.slug}`} className="block relative aspect-square overflow-hidden bg-gray-100 rounded-sm mb-3">
                          <img
                            src={relatedImg}
                            alt={related.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <button
                            type="button"
                            onClick={(e) => toggleFavoriteItem(e, {
                              id: related.id.toString(),
                              type: 'camping',
                              name: related.name,
                              price: related.price,
                              image: relatedImg,
                              link: `/paket-camping/${related.slug}`,
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
                            <Link href={`/paket-camping/${related.slug}`}>{related.name}</Link>
                          </h3>
                          <div className="flex items-baseline text-sm font-semibold text-red-600 mt-1">
                            <span>Rp {Number(related.price).toLocaleString('id-ID')}</span>
                            <span className="text-sm text-zinc-400 font-normal ml-1">/ paket</span>
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
            Rp {Number(packageItem.price).toLocaleString('id-ID')}
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
