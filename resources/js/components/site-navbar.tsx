import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { ShoppingBag, Heart, Menu, X, Phone, Search, Compass } from 'lucide-react';

interface PageProps {
  [key: string]: any;
  cartCount?: number;
}

export function SiteNavbar() {
  const { url } = usePage();
  const props = usePage().props as PageProps;
  const cartCount = props.cartCount || 0;
  const isHome = url === '/' || url === '';

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsSearching(true);
      const prefix = typeof window !== 'undefined' && window.location.pathname.includes('/Browky/public') ? '/Browky/public' : '';
      fetch(`${prefix}/api/search?q=${encodeURIComponent(searchQuery.trim())}`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data);
          setIsSearching(false);
        })
        .catch(() => {
          setSearchResults([]);
          setIsSearching(false);
        });
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.visit(`/sewa-alat?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  // Update favorites count from local storage
  const updateFavoritesCount = () => {
    try {
      const favs = JSON.parse(localStorage.getItem('browky_favorites') || '[]');
      setFavoritesCount(favs.length);
    } catch (e) {
      setFavoritesCount(0);
    }
  };

  useEffect(() => {
    updateFavoritesCount();

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('favorites-updated', updateFavoritesCount);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('favorites-updated', updateFavoritesCount);
    };
  }, []);

  const navLinkClass = (path: string, exact = false) => {
    const isActive = exact ? url === path : url.startsWith(path);
    const baseClass = "text-sm uppercase tracking-wider transition-all duration-200 py-1 ";
    if (isHome && !scrolled && !mobileMenuOpen) {
      return baseClass + (isActive ? "text-secondary font-semibold" : "text-white/90 hover:text-white font-normal");
    }
    return baseClass + (isActive ? "text-zinc-950 font-semibold" : "text-zinc-900 hover:text-zinc-950 font-normal");
  };

  const navbarBgClass = () => {
    if (isHome) {
      if (mobileMenuOpen || scrolled) {
        return "bg-white border-b border-gray-100 text-gray-900";
      }
      return "bg-transparent text-white";
    }
    return "bg-white border-b border-gray-100 text-gray-900";
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${navbarBgClass()}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          {isHome && !scrolled && !mobileMenuOpen ? (
            <img src="/images/logobrowkyoutdoor.png" alt="Browky Outdoor" className="h-7 md:h-9 w-auto brightness-0 invert" />
          ) : (
            <img src="/images/logobrowkyoutdoor.png" alt="Browky Outdoor" className="h-7 md:h-9 w-auto" />
          )}
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/sewa-alat" className={navLinkClass('/sewa-alat')}>
            Sewa Alat
          </Link>
          <Link href="/porter-gunung" className={navLinkClass('/porter-gunung')}>
            Porter
          </Link>
          <Link href="/paket-camping" className={navLinkClass('/paket-camping')}>
            Paket Camping
          </Link>
          <a
            href="https://maps.app.goo.gl/xSWc6pS5EA7Mnzzo9"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-normal uppercase tracking-wider transition-colors duration-200 py-1 ${isHome && !scrolled ? 'text-white/90 hover:text-white' : 'text-zinc-900 hover:text-zinc-950'}`}
          >
            Lokasi
          </a>
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-0 sm:gap-3.5">
          {/* Search Icon (Di sebelah kiri Favorit) */}
          <button
            onClick={() => setSearchOpen(true)}
            className={`p-2.5 rounded-full hover:bg-gray-100/10 transition-colors relative cursor-pointer ${isHome && !scrolled && !mobileMenuOpen ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'}`}
            title="Cari Alat & Layanan"
            aria-label="Cari alat dan layanan"
          >
            <Search className="w-5.5 h-5.5" strokeWidth={1.5} />
          </button>

          {/* Wishlist Icon */}
          <Link
            href="/favorit"
            className={`p-2.5 rounded-full hover:bg-gray-100/10 transition-colors relative ${isHome && !scrolled && !mobileMenuOpen ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'}`}
            title="Wishlist Saya"
          >
            <Heart className="w-5.5 h-5.5" strokeWidth={1.5} />
            {favoritesCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 rounded-full animate-pulse">
                {favoritesCount}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <Link
            href="/keranjang"
            className={`p-2.5 rounded-full hover:bg-gray-100/10 transition-colors relative ${isHome && !scrolled && !mobileMenuOpen ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'}`}
            title="Keranjang Saya"
          >
            <ShoppingBag className="w-5.5 h-5.5" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 rounded-full animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2.5 rounded-full hover:bg-gray-100/10 transition-colors ${isHome && !scrolled && !mobileMenuOpen ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'}`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5.5 h-5.5" strokeWidth={1.5} /> : <Menu className="w-5.5 h-5.5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel (Slide-in from right, full screen below navbar) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[72px] inset-x-0 bottom-0 z-40 bg-white border-t border-gray-100 py-6 px-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 shadow-2xl">
          <div className="flex flex-col">
            <Link
              href="/sewa-alat"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-3.5 text-base uppercase tracking-wider block border-b border-gray-100 ${url.startsWith('/sewa-alat') ? 'text-zinc-950 font-bold' : 'text-zinc-800 font-normal'}`}
            >
              Sewa Alat
            </Link>
            <Link
              href="/porter-gunung"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-3.5 text-base uppercase tracking-wider block border-b border-gray-100 ${url.startsWith('/porter-gunung') ? 'text-zinc-950 font-bold' : 'text-zinc-800 font-normal'}`}
            >
              Porter
            </Link>
            <Link
              href="/paket-camping"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-3.5 text-base uppercase tracking-wider block border-b border-gray-100 ${url.startsWith('/paket-camping') ? 'text-zinc-950 font-bold' : 'text-zinc-800 font-normal'}`}
            >
              Paket Camping
            </Link>
            <a
              href="https://maps.app.goo.gl/xSWc6pS5EA7Mnzzo9"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3.5 text-base font-normal uppercase tracking-wider text-zinc-800 block border-b border-gray-100"
            >
              Lokasi Toko
            </a>
          </div>

          <div className="pt-6 pb-8 space-y-4">
            {/* WhatsApp Button (Black BG, Rata Tengah) */}
            <a
              href="https://wa.me/6287834443012"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-3.5 px-4 bg-zinc-950 text-white font-medium text-base rounded-none hover:bg-zinc-800 transition-colors"
            >
              <img src="/images/icons/whatsapp.svg" alt="WhatsApp" className="w-5 h-5 shrink-0 invert brightness-200" />
              <span>+62 878-3444-3012</span>
            </a>

            {/* Social Media Links (Text Only) */}
            <div className="flex items-center justify-center gap-6 pt-1 text-sm font-medium text-zinc-600">
              <a
                href="https://www.instagram.com/browky_0utdoor/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-950 transition-colors underline underline-offset-4"
              >
                Instagram
              </a>
              <span className="text-zinc-300">•</span>
              <a
                href="https://www.tiktok.com/@browky_outdoor"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-950 transition-colors underline underline-offset-4"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Search Modal Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
            <form onSubmit={handleSearchSubmit} className="p-4 flex items-center gap-3 border-b border-gray-100">
              <Search className="w-5.5 h-5.5 text-gray-400 shrink-0" strokeWidth={1.5} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari alat pendakian, porter, paket camping..."
                className="w-full text-base md:text-lg text-gray-900 placeholder:text-gray-400 bg-transparent border-0 focus:outline-none focus:ring-0"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Tutup pencarian"
              >
                <X className="w-5.5 h-5.5" strokeWidth={1.5} />
              </button>
            </form>

            {/* Live Autocomplete Results */}
            {searchQuery.trim() ? (
              <div className="max-h-96 overflow-y-auto p-4 space-y-2">
                {isSearching ? (
                  <div className="p-6 text-center text-sm text-gray-400">
                    Mencari "{searchQuery}"...
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {searchResults.map((item) => (
                      <Link
                        key={item.id}
                        href={item.url}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md bg-gray-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">
                            {item.type}
                          </span>
                          <h4 className="text-sm font-semibold text-zinc-900 group-hover:text-primary transition-colors truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs text-red-600 font-medium">
                            {item.price}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-sm text-gray-400">
                    Tidak ada hasil ditemukan untuk "{searchQuery}".
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 bg-gray-50/50 space-y-4">
                <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Pencarian Populer
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Tenda Dome', url: '/sewa-alat' },
                    { label: 'Carrier 60L', url: '/sewa-alat' },
                    { label: 'Porter Prau', url: '/porter-gunung' },
                    { label: 'Porter Bismo', url: '/porter-gunung' },
                    { label: 'Paket Camping Dieng', url: '/paket-camping' },
                    { label: 'Sleeping Bag', url: '/sewa-alat' },
                  ].map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.url}
                      onClick={() => setSearchOpen(false)}
                      className="px-3.5 py-2 rounded-full bg-white border border-gray-200 text-xs text-gray-700 font-medium capitalize hover:border-zinc-900 hover:text-zinc-900 transition-colors flex items-center gap-1.5 shadow-none"
                    >
                      <Compass className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="capitalize">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
