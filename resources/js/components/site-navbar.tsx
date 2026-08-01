import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { ShoppingBag, Heart, Menu, X, Phone, Search, Compass, MapPin, Calendar as CalendarIcon, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar } from '@/components/ui/calendar';
import type { DateRange } from 'react-day-picker';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

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

  // Search Bar States (Airbnb Style)
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchMountain, setSearchMountain] = useState('');
  const [searchService, setSearchService] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const [isMountainOpen, setIsMountainOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);

  const availableMountains = [
    { id: 1, name: 'Gunung Prau', slug: 'prau', location: 'Dieng, Wonosobo', elevation: '2.565 mdpl' },
    { id: 2, name: 'Gunung Sumbing', slug: 'sumbing', location: 'Garung, Wonosobo', elevation: '3.371 mdpl' },
    { id: 3, name: 'Gunung Sindoro', slug: 'sindoro', location: 'Kledung, Wonosobo', elevation: '3.153 mdpl' },
    { id: 4, name: 'Gunung Bismo', slug: 'bismo', location: 'Campurejo, Wonosobo', elevation: '2.365 mdpl' },
    { id: 5, name: 'Gunung Pakuwaja', slug: 'pakuwaja', location: 'Parikesit, Wonosobo', elevation: '2.421 mdpl' },
    { id: 6, name: 'Gunung Kembang', slug: 'kembang', location: 'Blembem, Wonosobo', elevation: '2.340 mdpl' },
    { id: 7, name: 'Dieng Plateau', slug: 'dieng-plateau', location: 'Kejajar, Wonosobo', elevation: '2.000 mdpl' },
  ];

  const filteredMountains = availableMountains.filter((m) =>
    m.name.toLowerCase().includes(searchMountain.toLowerCase()) ||
    m.location.toLowerCase().includes(searchMountain.toLowerCase())
  );

  const formatDateToYYYYMMDD = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const startDate = dateRange?.from ? formatDateToYYYYMMDD(dateRange.from) : '';
  const endDate = dateRange?.to ? formatDateToYYYYMMDD(dateRange.to) : '';

  const getFormattedDateDisplay = () => {
    if (!dateRange?.from) return 'Pilih tanggal';

    const MONTHS_ID = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const sDay = dateRange.from.getDate();
    const sMonth = dateRange.from.getMonth();
    const sYear = dateRange.from.getFullYear();

    if (!dateRange.to) {
      return `${sDay} ${MONTHS_ID[sMonth]} ${sYear}`;
    }

    const eDay = dateRange.to.getDate();
    const eMonth = dateRange.to.getMonth();
    const eYear = dateRange.to.getFullYear();

    if (sYear === eYear && sMonth === eMonth && sDay === eDay) {
      return `${sDay} ${MONTHS_ID[sMonth]} ${sYear}`;
    }

    if (sYear === eYear && sMonth === eMonth) {
      return `${sDay} - ${eDay} ${MONTHS_ID[sMonth]} ${sYear}`;
    }

    if (sYear === eYear) {
      return `${sDay} ${MONTHS_ID[sMonth]} - ${eDay} ${MONTHS_ID[eMonth]} ${sYear}`;
    }

    return `${sDay} ${MONTHS_ID[sMonth]} ${sYear} - ${eDay} ${MONTHS_ID[eMonth]} ${eYear}`;
  };

  const isAnySearchOpen = isMountainOpen || isDateOpen || isServiceOpen;

  const handleNavbarSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const matchedMountain = searchMountain
      ? availableMountains.find(
          (m) =>
            m.name.toLowerCase() === searchMountain.toLowerCase() ||
            searchMountain.toLowerCase().includes(m.name.toLowerCase()) ||
            m.name.toLowerCase().includes(searchMountain.toLowerCase())
        )
      : null;

    const rawSlug = (matchedMountain && 'slug' in matchedMountain && matchedMountain.slug)
      ? matchedMountain.slug
      : (searchMountain ? searchMountain.toLowerCase().trim().replace(/\s+/g, '-') : '');

    const cleanSlug = rawSlug.replace(/^gunung-/, '');
    const mountainDetailSlug = cleanSlug ? (cleanSlug.includes('dieng') ? cleanSlug : `gunung-${cleanSlug}`) : '';

    // If a specific service is selected (porter, camping, or sewa-alat), direct to that service listing page
    if (searchService && searchService !== 'all') {
      let targetPath = '/sewa-alat';
      if (searchService === 'porter') {
        targetPath = cleanSlug ? `/porter-${cleanSlug}` : '/porter-gunung';
      } else if (searchService === 'camping') {
        targetPath = cleanSlug ? `/paket-camping-${cleanSlug}` : '/paket-camping';
      } else if (searchService === 'sewa-alat' || searchService === 'rental') {
        targetPath = '/sewa-alat';
        if (searchMountain) {
          params.append('mountain', searchMountain);
        }
      }

      if (searchService !== 'sewa-alat' && searchService !== 'rental' && searchMountain) {
        params.append('mountain', searchMountain);
      }

      const queryString = params.toString();
      const fullUrl = queryString ? `${targetPath}?${queryString}` : targetPath;
      router.get(fullUrl);
      setSearchOpen(false);
      return;
    }

    // If NO specific service is selected (or 'all' is chosen):
    // If mountain is specified, redirect directly to mountain detail page (/gunung/{mountainDetailSlug})
    if (mountainDetailSlug) {
      const queryString = params.toString();
      const fullUrl = queryString ? `/gunung/${mountainDetailSlug}?${queryString}` : `/gunung/${mountainDetailSlug}`;
      router.get(fullUrl);
      setSearchOpen(false);
      return;
    }

    // Fallback: general search results page (/pencarian)
    if (searchMountain) params.append('mountain', searchMountain);
    const queryString = params.toString();
    const fullUrl = queryString ? `/pencarian?${queryString}` : '/pencarian';
    router.get(fullUrl);
    setSearchOpen(false);
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

    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const m = urlParams.get('mountain');
      const sDate = urlParams.get('startDate');
      const eDate = urlParams.get('endDate');

      if (m) setSearchMountain(m);

      if (sDate) {
        try {
          const fromParts = sDate.split('-').map(Number);
          if (fromParts.length === 3) {
            const fromDate = new Date(fromParts[0], fromParts[1] - 1, fromParts[2]);
            let toDate = fromDate;
            if (eDate) {
              const toParts = eDate.split('-').map(Number);
              if (toParts.length === 3) {
                toDate = new Date(toParts[0], toParts[1] - 1, toParts[2]);
              }
            }
            if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
              setDateRange({ from: fromDate, to: toDate });
            }
          }
        } catch (err) {
          // ignore date parse errors
        }
      }
    }

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
  }, [url]);

  const navLinkClass = (path: string, exact = false) => {
    const isActive = exact ? url === path : url.startsWith(path);
    const baseClass = "text-sm uppercase tracking-wider transition-colors duration-300 py-1 ";
    if (isHome && !scrolled && !mobileMenuOpen && !searchOpen) {
      return baseClass + (isActive ? "text-secondary font-semibold" : "text-white/90 hover:text-white font-normal");
    }
    return baseClass + (isActive ? "text-zinc-950 font-bold" : "text-zinc-900 hover:text-zinc-950 font-normal");
  };

  const navbarBgClass = () => {
    if (searchOpen) {
      return "bg-white text-gray-900";
    }
    if (isHome) {
      if (mobileMenuOpen || scrolled) {
        return "bg-white border-b border-gray-100 text-gray-900 ";
      }
      return "bg-transparent text-white";
    }
    return "bg-white border-b border-gray-100 text-gray-900 ";
  };

  // Reusable 3-Segment Search Form Component
  const renderSearchForm = (isMobileView = false) => (
    <form
      onSubmit={handleNavbarSearchSubmit}
      className={cn(
        "flex flex-col md:flex-row items-stretch w-full text-black dark:text-white gap-2.5 md:gap-0 divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800 transition-colors duration-300 border border-zinc-200 dark:border-white rounded-none shadow-none overflow-hidden",
        isAnySearchOpen ? "bg-transparent md:bg-zinc-200 dark:bg-zinc-950" : "bg-transparent md:bg-white dark:bg-black"
      )}
    >
      {/* 1. DESTINASI GUNUNG */}
      <Popover open={isMountainOpen} onOpenChange={setIsMountainOpen}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "flex-1 p-3.5 sm:p-4 transition-all duration-300 cursor-pointer select-none relative group border border-zinc-200 dark:border-zinc-800 md:border-none",
              isMountainOpen
                ? "bg-white dark:bg-zinc-900 shadow-none z-10"
                : (isAnySearchOpen ? "bg-white md:bg-zinc-200 dark:bg-zinc-950/80 hover:bg-zinc-300/50" : "bg-white dark:bg-black hover:bg-zinc-50 dark:hover:bg-zinc-900")
            )}
          >
            <div className="flex-1 min-w-0 pr-6">
              <span className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Mau ke mana
              </span>
              <input
                type="text"
                value={searchMountain}
                onChange={(e) => {
                  setSearchMountain(e.target.value);
                  if (!isMountainOpen) setIsMountainOpen(true);
                }}
                placeholder="Cari gunung"
                className={`w-full bg-transparent border-none p-0 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-0 truncate mt-0.5 ${searchMountain ? 'font-semibold text-zinc-900 dark:text-zinc-100' : 'font-normal text-zinc-700 dark:text-zinc-300'}`}
              />
            </div>
            {searchMountain && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setSearchMountain('');
                }}
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 rounded-full cursor-pointer transition-opacity",
                  isMountainOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                )}
                title="Reset pencarian gunung"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="start"
          sideOffset={6}
          className="w-[calc(100vw-2rem)] md:w-96 px-3 py-4 text-sm z-50 rounded-xs border border-zinc-200 dark:border-zinc-800 shadow-none bg-white dark:bg-zinc-950 max-w-full"
        >
          <div className="text-xs font-normal px-2.5 text-muted-foreground flex justify-between items-center pb-2">
            <span>Pilih Destinasi Pendakian</span>
            {searchMountain && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchMountain('');
                }}
                className="text-muted-foreground hover:text-foreground underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
          <ScrollArea className="h-60">
            <div className="pr-2">
              {filteredMountains.length > 0 ? (
                filteredMountains.map((m) => {
                  const isSelected = searchMountain.toLowerCase() === m.name.toLowerCase();
                  return (
                    <div
                      key={m.id}
                      onClick={() => {
                        setSearchMountain(m.name);
                        setIsMountainOpen(false);
                      }}
                      className={cn(
                        "px-2.5 py-3 text-sm hover:bg-accent hover:text-accent-foreground transition cursor-pointer flex items-center justify-between group rounded-none",
                        isSelected && "bg-accent font-semibold"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="font-semibold text-sm">{m.name}</div>
                          {m.location && (
                            <div className="text-xs font-medium text-muted-foreground">
                              {m.location}
                            </div>
                          )}
                        </div>
                      </div>
                      {m.elevation && (
                        <span className="text-[10px] font-semibold bg-zinc-100 border border-zinc-200 text-zinc-800 px-2 py-0.5 rounded-full">
                          {m.elevation}
                        </span>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="p-4 text-sm text-muted-foreground text-center font-medium">
                  Gunung "{searchMountain}" tidak ditemukan.
                </div>
              )}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>

      {/* 2. TANGGAL PENDAKIAN */}
      <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "flex-1 p-3.5 sm:p-4 transition-all duration-300 cursor-pointer select-none relative group border border-zinc-200 dark:border-zinc-800 md:border-none",
              isDateOpen
                ? "bg-white dark:bg-zinc-900 shadow-none z-10"
                : (isAnySearchOpen ? "bg-white md:bg-zinc-200 dark:bg-zinc-950/80 hover:bg-zinc-300/50" : "bg-white dark:bg-black hover:bg-zinc-50 dark:hover:bg-zinc-900")
            )}
          >
            <div className="flex-1 min-w-0 pr-6">
              <span className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Kapan
              </span>
              <div className={`mt-0.5 truncate text-sm ${startDate || endDate ? 'font-semibold text-zinc-900 dark:text-zinc-100' : 'font-normal text-zinc-400'}`}>
                {getFormattedDateDisplay()}
              </div>
            </div>
            {(dateRange?.from || dateRange?.to) && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setDateRange(undefined);
                }}
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 rounded-full cursor-pointer transition-opacity",
                  isDateOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                )}
                title="Reset tanggal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="start"
          sideOffset={6}
          className="w-[calc(100vw-2rem)] md:w-80 px-4 py-4 text-sm z-50 rounded-xs border border-zinc-200 dark:border-zinc-800 shadow-none bg-white dark:bg-zinc-950 max-w-full"
        >
          <div className="flex items-center justify-between pb-2.5 mb-2 text-xs font-normal text-muted-foreground px-0.5">
            <span>Pilih Tanggal Pendakian</span>
            {(dateRange?.from || dateRange?.to) && (
              <button
                type="button"
                onClick={() => setDateRange(undefined)}
                className="text-muted-foreground hover:text-foreground underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
          <div className="relative pt-1">
            <Calendar
              mode="range"
              defaultMonth={dateRange?.from || new Date()}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={1}
              className="w-full rounded-none border-none p-0 text-xs [--cell-size:1.75rem] [&_table]:w-full [&_table]:table-fixed [&_td]:text-center [&_th]:text-center"
              classNames={{
                root: "w-full",
                months: "w-full",
                month: "w-full space-y-2",
                month_caption: "flex h-7 w-full items-center justify-center font-medium text-xs mb-2",
                nav: "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1 z-10",
              }}
            />
          </div>
        </PopoverContent>
      </Popover>

      {/* 3. KEBUTUHAN */}
      <Popover open={isServiceOpen} onOpenChange={setIsServiceOpen}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "flex-1 p-3.5 sm:p-4 transition-all duration-300 cursor-pointer select-none relative group border border-zinc-200 dark:border-zinc-800 md:border-none",
              isServiceOpen
                ? "bg-white dark:bg-zinc-900 shadow-none z-10"
                : (isAnySearchOpen ? "bg-white md:bg-zinc-200 dark:bg-zinc-950/80 hover:bg-zinc-300/50" : "bg-white dark:bg-black hover:bg-zinc-50 dark:hover:bg-zinc-900")
            )}
          >
            <div className="flex-1 min-w-0 pr-6">
              <span className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Kebutuhan
              </span>
              <div className={`mt-0.5 truncate text-sm ${searchService ? 'font-semibold text-zinc-900 dark:text-zinc-100' : 'font-normal text-zinc-400'}`}>
                {searchService === 'all' && 'Pilih Semua'}
                {searchService === 'sewa-alat' && 'Sewa Alat Pendakian'}
                {searchService === 'porter' && 'Jasa Porter Gunung'}
                {searchService === 'camping' && 'Paket Camping'}
                {!searchService && 'Pilih yang kamu mau'}
              </div>
            </div>
            {searchService && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setSearchService('');
                }}
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 rounded-full cursor-pointer transition-opacity",
                  isServiceOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                )}
                title="Reset kebutuhan"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="start"
          sideOffset={6}
          className="w-[calc(100vw-2rem)] md:w-80 px-3 py-4 text-sm z-50 rounded-xs border border-zinc-200 dark:border-zinc-800 shadow-none bg-white dark:bg-zinc-950 max-w-full"
        >
          <div className="text-xs font-normal px-2.5 text-muted-foreground flex justify-between items-center pb-2">
            <span>Pilih yang kamu butuhkan</span>
            {searchService && (
              <button
                type="button"
                onClick={() => {
                  setSearchService('');
                  setIsServiceOpen(false);
                }}
                className="text-muted-foreground hover:text-foreground underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
          <div className="pt-1">
            {[
              { value: 'all', label: 'Pilih Semua' },
              { value: 'sewa-alat', label: 'Sewa Alat Pendakian' },
              { value: 'porter', label: 'Jasa Porter Gunung' },
              { value: 'camping', label: 'Paket Camping' }
            ].map((option) => {
              const isSelected = searchService === option.value;
              return (
                <div
                  key={option.value}
                  onClick={() => {
                    setSearchService(option.value);
                    setIsServiceOpen(false);
                  }}
                  className={cn(
                    "px-2.5 py-3 text-sm hover:bg-accent hover:text-accent-foreground transition cursor-pointer flex items-center justify-between group rounded-none",
                    isSelected && "bg-accent font-semibold"
                  )}
                >
                  <span>{option.label}</span>
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>

      {/* SUBMIT SEARCH BUTTON */}
      <button
        type="submit"
        className="w-full md:w-auto px-8 py-3.5 sm:py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-sm uppercase tracking-wider rounded-none hover:bg-black dark:hover:bg-white transition flex items-center justify-center gap-2 cursor-pointer shrink-0 mt-1 md:mt-0 shadow-none border border-black dark:border-white md:border-l-0"
      >
        <Search className="w-4 h-4" />
        <span>Cari</span>
      </button>
    </form>
  );

  return (
    <>
      {/* BACKDROP OVERLAY (DESKTOP & MOBILE) */}
      <div
        onClick={() => setSearchOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          searchOpen ? "opacity-100 backdrop-blur-xs pointer-events-auto" : "opacity-0 backdrop-blur-none pointer-events-none"
        )}
      />

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          navbarBgClass(),
          searchOpen && "shadow-none border-b border-gray-200"
        )}
      >
        {/* Top Navbar Row (h-16 on mobile, h-20 on desktop) */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 z-10">
            {isHome && !scrolled && !mobileMenuOpen && !searchOpen ? (
              <img src="/images/logobrowkyoutdoor.png" alt="Browky Outdoor" className="h-6 sm:h-7 md:h-9 w-auto brightness-0 invert transition-all duration-300" />
            ) : (
              <img src="/images/logobrowkyoutdoor.png" alt="Browky Outdoor" className="h-6 sm:h-7 md:h-9 w-auto transition-all duration-300" />
            )}
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 z-10">
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
              className={`text-sm font-normal uppercase tracking-wider transition-colors duration-300 py-1 ${isHome && !scrolled && !searchOpen && !mobileMenuOpen ? 'text-white/90 hover:text-white' : 'text-zinc-900 hover:text-zinc-950'}`}
            >
              Lokasi
            </a>
          </nav>

          {/* Right Action Icons: Search, Wishlist (Love), Cart & Mobile Menu */}
          <div className="flex items-center gap-1 sm:gap-2 z-10">
            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 sm:p-2.5 rounded-full hover:bg-gray-100/10 transition-all duration-300 relative cursor-pointer ${searchOpen ? 'text-black bg-zinc-100 scale-105' : (isHome && !scrolled && !mobileMenuOpen ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100')}`}
              title="Cari Alat & Layanan"
              aria-label="Cari alat dan layanan"
            >
              {searchOpen ? <X className="w-5 h-5 sm:w-5.5 sm:h-5.5 transition-transform duration-300 rotate-90" strokeWidth={1.5} /> : <Search className="w-5 h-5 sm:w-5.5 sm:h-5.5 transition-transform duration-300" strokeWidth={1.5} />}
            </button>

            {/* Wishlist / Love Icon */}
            <Link
              href="/favorit"
              className={`p-2 sm:p-2.5 rounded-full hover:bg-gray-100/10 transition-colors duration-300 relative ${isHome && !scrolled && !mobileMenuOpen && !searchOpen ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'}`}
              title="Wishlist Saya"
            >
              <Heart className="w-5 h-5 sm:w-5.5 sm:h-5.5" strokeWidth={1.5} />
              {favoritesCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 text-[9px] sm:text-[10px] font-bold text-white bg-red-500 rounded-full animate-pulse">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Cart / Keranjang Icon */}
            <Link
              href="/keranjang"
              className={`p-2 sm:p-2.5 rounded-full hover:bg-gray-100/10 transition-colors duration-300 relative ${isHome && !scrolled && !mobileMenuOpen && !searchOpen ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'}`}
              title="Keranjang Saya"
            >
              <ShoppingBag className="w-5 h-5 sm:w-5.5 sm:h-5.5" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 text-[9px] sm:text-[10px] font-bold text-white bg-red-500 rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile / Main Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 sm:p-2.5 rounded-full hover:bg-gray-100/10 transition-colors duration-300 cursor-pointer ${isHome && !scrolled && !mobileMenuOpen && !searchOpen ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'}`}
              aria-label="Toggle menu"
              title="Menu Navigasi"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-5.5 sm:h-5.5" strokeWidth={1.5} /> : <Menu className="w-5 h-5 sm:w-5.5 sm:h-5.5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* ACCORDION SEARCH EXPANSION INSIDE NAVBAR HEADER (DESKTOP & MOBILE) */}
        <div
          className={cn(
            "grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] max-h-[85vh] overflow-y-auto",
            searchOpen ? "grid-rows-[1fr] opacity-100 pb-4 md:pb-6" : "grid-rows-[0fr] opacity-0 pb-0"
          )}
        >
          <div className="overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 md:px-8">
              {renderSearchForm(false)}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[64px] md:top-[80px] inset-x-0 bottom-0 z-40 bg-white border-t border-gray-100 py-6 px-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 shadow-2xl">
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
            <a
              href="https://wa.me/6287834443012"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-3.5 px-4 bg-zinc-950 text-white font-medium text-base rounded-none hover:bg-zinc-800 transition-colors"
            >
              <img src="/images/icons/whatsapp.svg" alt="WhatsApp" className="w-5 h-5 shrink-0 invert brightness-200" />
              <span>+62 878-3444-3012</span>
            </a>

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
    </>
  );
}
