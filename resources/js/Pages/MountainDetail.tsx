import React from 'react';
import { Link, Head } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import {
    MapPin, Mountain as MountainIcon, Compass, ArrowRight, ChevronRight,
    Clock, ShieldCheck, CheckCircle2, AlertCircle, Calendar, Flame,
    UserCheck, PackageCheck, Lightbulb, Phone, HelpCircle, Check, Map,
    Navigation, Sparkles, AlertTriangle
} from 'lucide-react';

interface Mountain {
    id: number;
    name: string;
    slug: string;
    location: string;
    elevation?: string | number;
    image?: string;
    image_1?: string;
    image_2?: string;
    image_3?: string;
    image_4?: string;
    image_5?: string;
    description?: string;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    category?: string;
    price_per_day: number | string;
    cover_image?: string;
    special_badge?: string;
}

interface Porter {
    id: number;
    name: string;
    slug: string;
    category?: string;
    mountain?: string;
    price_per_day: number | string;
    image?: string;
    special_badge?: string;
}

interface CampingPackage {
    id: number;
    name: string;
    slug: string;
    price: number | string;
    tags?: string;
    facilities?: string;
    image?: string;
    special_badge?: string;
}

interface MountainDetailProps {
    mountain: Mountain;
    products?: Product[];
    porters?: Porter[];
    campingPackages?: CampingPackage[];
}

export default function MountainDetail({ mountain, products = [], porters = [], campingPackages = [] }: MountainDetailProps) {
    const imgSrc = mountain.image
        ? (mountain.image.startsWith('http') ? mountain.image : `/storage/${mountain.image}`)
        : 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80';

    const absoluteImg = mountain.image
        ? (mountain.image.startsWith('http') ? mountain.image : `https://browkyoutdoor.com/storage/${mountain.image}`)
        : 'https://browkyoutdoor.com/images/hero-fallback.jpg';

    const getImg = (fieldVal: string | undefined, defaultUrl: string) => {
        if (!fieldVal) return defaultUrl;
        return fieldVal.startsWith('http') ? fieldVal : `/storage/${fieldVal}`;
    };

    const img1 = getImg(mountain.image_1, "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80");
    const img2 = getImg(mountain.image_2, "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1400&q=80");
    const img3 = getImg(mountain.image_3, "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1400&q=80");
    const img4 = getImg(mountain.image_4, "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1400&q=80");
    const img5 = getImg(mountain.image_5, "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80");

    const mountainDisplayName = mountain.name.toLowerCase().includes('gunung') ? mountain.name : `Gunung ${mountain.name}`;
    const cleanName = mountain.name.replace(/gunung/i, '').trim();
    const lowerName = cleanName.toLowerCase();

    // Helper data tailored per mountain with fallback defaults
    const getMountainDetails = () => {
        let difficulty = 'Menengah';
        let duration = '4–6 Jam';
        let bestTime = 'Mei – Oktober (Musim Kemarau)';
        let mainRoute = 'Jalur Utama Basecamp';
        let waterSource = 'Tersedia di Basecamp & Pos Utama';
        let sunriseQuality = 'Sangat Bagus';

        let overview = `Gunung ${cleanName} merupakan salah satu destinasi pendakian terfavorit di kawasan Jawa Tengah yang menawarkan keindahan panorama alam terbuka, udara pegunungan Dieng nan sejuk, serta pesona golden sunrise yang menakjubkan. Jalurnya yang tertata dan akses yang mudah menjadikannya tempat favorit bagi para pendaki lokal maupun wisatawan mancanegara.`;

        let whyPopular = `Daya tarik utama Gunung ${cleanName} terletak pada pemandangan puncak yang menyajikan lanskap 360 derajat pegunungan megah, hamparan savana indah, serta momen terbitnya matahari yang sangat fotogenik.`;
        let suitableFor = `Sangat cocok untuk pendaki pemula yang ingin merasakan sensasi mendaki gunung tinggi, rombongan kemping keluarga, hingga pendaki berpengalaman yang ingin melakukan perjalanan santai (tek-tok).`;
        let trailChar = `Karakter jalur pendakian Gunung ${cleanName} bervariasi mulai dari jalan berbatu landai, kawasan hutan rimba yang sejuk, hingga tanjakan tanah/berbatu dengan vegetasi yang semakin terbuka menjelang puncak.`;
        let mainHighlight = `Lanskap matahari terbit (Golden Sunrise), hamparan Bunga Anaphalis (Edelweis), serta samudera awan putih yang membentang luas di atas dataran tinggi Dieng Wonosobo.`;

        if (lowerName.includes('prau')) {
            difficulty = 'Pemula – Menengah';
            duration = '3–4 Jam';
            bestTime = 'Mei – Oktober';
            mainRoute = 'Via Patak Banteng / Dieng / Kalilembu';
            waterSource = 'Basecamp & Pos 3 (Mata Air)';
            sunriseQuality = 'Spektakuler (Nomor 1 se-Jawa)';
            overview = `Gunung Prau (2.565 mdpl) adalah primadona pendakian di Kawasan Dataran Tinggi Dieng, Wonosobo. Terkenal dengan jalur singkat dan pemandangan Bukit Teletubbies yang ikonik, gunung ini menjadi destinasi wajib bagi siapa saja yang berkunjung ke Dieng.`;
            whyPopular = `Puncak Gunung Prau menyajikan lanskap terindah untuk menikmati Golden Sunrise dengan latar belakang puncak kembar Gunung Sindoro dan Gunung Sumbing yang sangat megah.`;
            suitableFor = `Pendaki pemula, kemping santai bersama keluarga/sahabat, serta foto-hunter yang menginginkan perjalanan tanpa trek yang terlalu ekstrem.`;
            trailChar = 'Dominasi anak tangga tanah padat dan perakaran pohon di awal, lalu melintasi hutan pinus dan padang savana rumput nan luas di puncak.';
        } else if (lowerName.includes('sindoro')) {
            difficulty = 'Menengah – Sulit';
            duration = '6–8 Jam';
            bestTime = 'Mei – Oktober';
            mainRoute = 'Via Kledung / Alang-Alang Sewu / Bansari';
            waterSource = 'Basecamp & Pos 2 (Bawa Air Cukup)';
            sunriseQuality = 'Sangat Memukau';
            overview = `Gunung Sindoro (3.153 mdpl) adalah gunung berapi aktif yang menawarkan tantangan pendakian fisik dengan trek menanjak yang memicu adrenalin serta kawah aktif yang menakjubkan.`;
            whyPopular = `Kawah aktif Jolitundo dengan embusan asap solfatara, hamparan padang edelweis yang luas, serta pemandangan langsung berhadapan dengan Gunung Sumbing.`;
            suitableFor = `Pendaki dengan fisik prima, pecinta trek menantang, serta pendaki yang mencari sensasi pemandangan kawah terbuka dari dekat.`;
            trailChar = 'Trek berbatu terjal (batu cadas), jalan tanah berdebu di musim kemarau, dan area terbuka tanpa naungan pohon mendekati puncak.';
        } else if (lowerName.includes('sumbing')) {
            difficulty = 'Menengah – Sulit';
            duration = '7–9 Jam';
            bestTime = 'Mei – Oktober';
            mainRoute = 'Via Garung / Bowongso / Sipetung';
            waterSource = 'Pos 2 Garung & Basecamp';
            sunriseQuality = 'Luar Biasa';
            overview = `Gunung Sumbing (3.371 mdpl) merupakan gunung tertinggi kedua di Jawa Tengah. Menawarkan rute pendakian yang menantang serta Puncak Rajawali dan Puncak Buntu yang sangat legendaris.`;
            whyPopular = `Keindahan kawah kuno pasir putih, tebing batu raksasa Puncak Rajawali, serta panorama sunrise spektakuler di atas awan.`;
            suitableFor = `Pendaki berpengalaman yang menyukai perjalanan endurance dan medan fisik yang menguji ketahanan tubuh.`;
            trailChar = 'Hutan hujan tropis yang rindang, dilanjutkan tanjakan batu cadas yang terjal dan terbuka tanpa vegetasi pohon di puncak.';
        } else if (lowerName.includes('bismo')) {
            difficulty = 'Pemula – Menengah';
            duration = '3–5 Jam';
            bestTime = 'Sepanjang Tahun (Kecuali Hujan Lebat)';
            mainRoute = 'Via Silandak / Sikunang / Deroduwur';
            waterSource = 'Tersedia di Basecamp & Pos Istirahat';
            sunriseQuality = 'Sangat Indah';
            overview = `Gunung Bismo (2.365 mdpl) menyajikan kawah purba raksasa berbentuk mangkuk dengan dinding tebing hijau yang sangat megah di kawasan Dieng Wonosobo.`;
            whyPopular = `Puncak Indraprasta dengan view dinding kawah purba melingkar, jalur pematang tebing yang eksotis, dan fasilitas ojek gunung via Silandak.`;
            suitableFor = `Pendaki pemula hingga menengah yang menyukai suasana jalur yang lebih tenang dan alami.`;
            trailChar = 'Rimbunnya perkebunan warga di awal, dilanjutkan jalur hutan rindang sejuk dan pematang tebing yang aman.';
        } else if (lowerName.includes('merbabu')) {
            difficulty = 'Menengah';
            duration = '6–8 Jam';
            bestTime = 'Mei – Oktober';
            mainRoute = 'Via Selo / Suwanting / Wekas';
            waterSource = 'Pos 2 Wekas & Basecamp Selo';
            sunriseQuality = 'Sangat Indah & Fotogenik';
            overview = `Gunung Merbabu (3.145 mdpl) sangat terkenal dengan keindahan padang savana terluas di Jawa Tengah dan pemandangan jarak dekat ke Gunung Merapi yang gagah.`;
            whyPopular = `Savana 1 dan Savana 2 nan hijau membentang luas bagaikan karpet alam, Puncak Kenteng Songo, dan sunset yang dramatis.`;
            suitableFor = `Pecinta fotografi outdoor, pendaki kelompok, dan siapa saja yang mendambakan panorama savana hijau pegunungan.`;
            trailChar = 'Trek tanah berdebu di musim kemarau, tanjakan sabana panjang, serta terpaan angin kencang di area camping ground.';
        }

        return {
            difficulty,
            duration,
            bestTime,
            mainRoute,
            waterSource,
            sunriseQuality,
            overview,
            whyPopular,
            suitableFor,
            trailChar,
            mainHighlight
        };
    };

    const details = getMountainDetails();

    // 15 Natural FAQs tailored for this mountain
    const faqs = [
        {
            q: `1. Berapa tarif tiket registrasi (simaksi) dan jam operasional Gunung ${cleanName}?`,
            a: `Tarif simaksi pendakian Gunung ${cleanName} berkisar antara Rp 15.000 – Rp 30.000 per orang tergantung jalur basecamp resmi yang dipilih. Jam operasional registrasi biasanya dibuka mulai pukul 07.00 WIB hingga 21.00 WIB setiap harinya.`
        },
        {
            q: `2. Berapa tarif jasa Porter Dieng & Guide Dieng untuk Gunung ${cleanName}?`,
            a: `Tarif jasa Porter Dieng terjangkau mulai dari Rp 150.000 – Rp 350.000 per hari tergantung beban bawaan. Untuk Guide Dieng profesional dipatok mulai dari Rp 300.000 – Rp 500.000 per hari.`
        },
        {
            q: `3. Apakah Gunung ${cleanName} cocok dan aman untuk pendaki pemula?`,
            a: `Tentu! Gunung ${cleanName} sangat ramah bagi pendaki pemula. Jalurnya tertata dengan petunjuk arah yang jelas. Namun, pemula disarankan mendaki bersama tim berpengalaman atau didampingi guide lokal.`
        },
        {
            q: `4. Jalur pendakian mana yang paling favorit dan direkomendasikan untuk Gunung ${cleanName}?`,
            a: `Jalur paling favorit untuk Gunung ${cleanName} adalah ${details.mainRoute}. Jalur ini dipilih karena akses transportasi menuju basecamp sangat mudah, fasilitas umum lengkap, serta pemandangan di sepanjang trek sangat menakjubkan.`
        },
        {
            q: `5. Berapa lama waktu tempuh pendakian Gunung ${cleanName} dari basecamp hingga puncak?`,
            a: `Waktu tempuh normal pendakian Gunung ${cleanName} berkisar antara ${details.duration}. Estimasi ini dapat bervariasi tergantung pada kondisi fisik pendaki, beban barang bawaan, serta frekuensi waktu istirahat.`
        },
        {
            q: `6. Apakah terdapat sumber air bersih di jalur pendakian Gunung ${cleanName}?`,
            a: `${details.waterSource}. Pendaki sangat disarankan untuk menyiapkan air minum secukupnya (minimal 2-3 liter per orang) dari toko atau basecamp sebelum memulai perjalanan.`
        },
        {
            q: `7. Mengapa sangat disarankan memesan Rental Alat Outdoor sebelum tiba di Dieng?`,
            a: `Pemesanan Rental Alat Outdoor lebih awal menjamin ketersediaan tenda, carrier, dan perlengkapan steril, khususnya pada akhir pekan (weekend) atau musim liburan panjang saat permintaan sangat tinggi.`
        },
        {
            q: `8. Peralatan pendakian apa saja yang wajib dibawa untuk Gunung ${cleanName}?`,
            a: `Peralatan wajib meliputi: Tenda waterproof, Carrier, Sleeping Bag thermal, Matras, Headlamp/Senter, Kompor Portable & Nesting, Jaket Gunung windproof, Jas Hujan, Sepatu Hiking ber-grip, dan P3K pribadi.`
        },
        {
            q: `9. Berapa suhu udara di Gunung ${cleanName} saat malam hari?`,
            a: `Suhu udara di malam hari pada puncak/camping ground Gunung ${cleanName} bisa mencapai 5°C hingga 10°C, bahkan di puncak musim kemarau (Juli–Agustus) bisa menyentuh 0°C (fenomena embun upas). Selalu siap pakaian hangat dan sleeping bag tebal.`
        },
        {
            q: `10. Apakah tempat ini menyediakan titik kumpul (meeting point) dan transit pendaki?`,
            a: `Ya! Store kami di Dieng berfungsi sebagai titik kumpul utama. Pendaki dapat beristirahat sejenak, packing ulang barang bawaan, mengambil alat outdoor, serta bertemu dengan porter dan guide sebelum berangkat ke basecamp.`
        },
        {
            q: `11. Jam berapa waktu terbaik mulai mendaki Gunung ${cleanName} untuk berburu Golden Sunrise?`,
            a: `Jika Anda berencana memilih paket 2 hari 1 malam (2D1N), mulailah mendaki antara pukul 08.00–11.00 WIB agar tiba di camp ground sebelum sore. Namun jika ingin melakukan pendakian malam/tek-tok tanpa inap, mulailah mendaki sekitar pukul 00.00–02.00 WIB.`
        },
        {
            q: `12. Apa perbedaan antara Porter Logistik dan Porter Guide untuk pendakian?`,
            a: `Porter Logistik berfokus membawa barang perlengkapan kemping kelompok (tenda, alat masak, bahan makanan). Sedangkan Porter Guide selain membawakan barang, juga bertindak sebagai penunjuk jalan dan pendamping safety pendakian.`
        },
        {
            q: `13. Apakah aman mendaki Gunung ${cleanName} saat musim hujan?`,
            a: `Pendakian saat musim hujan tetap memungkinkan namun memerlukan persiapan ekstra: gunakan sepatu gunung waterproof ber-grip kuat, bungkus seluruh pakaian dalam drybag/trashbag tebal, bawa jas hujan berkualitas, dan hindari mendaki saat badai angin/petir.`
        },
        {
            q: `14. Bagaimana rute transportasi menuju basecamp Gunung ${cleanName} dari Dieng atau Wonosobo?`,
            a: `Dari Kota Wonosobo atau Kawasan Wisata Dieng, Anda dapat menggunakan kendaraan pribadi (motor/mobil) atau angkutan umum lokal menuju basecamp resmi. Kami juga menyediakan opsi layanan pengantaran/shuttle kelompok.`
        },
        {
            q: `15. Bagaimana cara melakukan reservasi sewa alat, Porter Dieng, atau Paket Camping?`,
            a: `Reservasi sangat mudah! Anda dapat memesan secara online melalui website ini atau menghubungi customer service via WhatsApp di +6287834443012. Pilih tanggal pendakian, sebutkan kebutuhan Anda, dan tim kami akan menyiapkan perlengkapan terbaik.`
        }
    ];

    return (
        <FrontendLayout>
            <Head>
                <title>{`Panduan Pendakian ${mountainDisplayName} Dieng Wonosobo | Porter, Guide & Rental Alat Outdoor | Browky Outdoor`}</title>
                <meta name="description" content={`Panduan pendakian ${mountainDisplayName} (${mountain.elevation || '2.500+'} MDPL) Dieng Wonosobo 2026. Penyedia Porter ${mountainDisplayName}, Porter Dieng, Guide Dieng profesional, Sewa & Rental Alat Outdoor steril Wonosobo, serta Paket Camping ${mountainDisplayName} All-In.`} />
                <meta name="keywords" content={`sewa alat outdoor dieng, sewa alat outdoor wonosobo, rental alat outdoor dieng, rental alat outdoor wonosobo, porter ${lowerName}, porter ${cleanName.toLowerCase()}, porter dieng, porter wonosobo, guide ${lowerName}, guide ${cleanName.toLowerCase()}, guide dieng, guide wonosobo, paket camping ${lowerName}, paket camping ${cleanName.toLowerCase()}, paket camping dieng, pendakian ${mountainDisplayName}, basecamp ${mountainDisplayName}`} />
                <meta property="og:title" content={`Panduan Pendakian ${mountainDisplayName} Dieng Wonosobo | Browky Outdoor`} />
                <meta property="og:description" content={`Panduan pendakian ${mountainDisplayName}, Porter Dieng, Guide Dieng & Sewa Alat Outdoor Wonosobo.`} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content={absoluteImg} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="Browky Outdoor" />
                <meta property="og:url" content={`https://browkyoutdoor.com/gunung/${mountain.slug}`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`Panduan Pendakian ${mountainDisplayName} Dieng Wonosobo | Browky Outdoor`} />
                <meta name="twitter:description" content={`Panduan pendakian ${mountainDisplayName}, Porter Dieng, Guide Dieng & Sewa Alat Outdoor Wonosobo.`} />
                <meta name="twitter:image" content={absoluteImg} />
                <link rel="canonical" href={`https://browkyoutdoor.com/gunung/${mountain.slug}`} />

                {/* Schema.org Rich Snippets JSON-LD */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://browkyoutdoor.com" },
                                    { "@type": "ListItem", "position": 2, "name": "Destinasi Gunung", "item": "https://browkyoutdoor.com/gunung" },
                                    { "@type": "ListItem", "position": 3, "name": mountainDisplayName, "item": `https://browkyoutdoor.com/gunung/${mountain.slug}` }
                                ]
                            },
                            {
                                "@type": "TouristAttraction",
                                "name": mountainDisplayName,
                                "description": details.overview,
                                "image": absoluteImg,
                                "url": `https://browkyoutdoor.com/gunung/${mountain.slug}`,
                                "touristType": ["Pendaki Gunung", "Pecinta Alam", "Wisata Alam"],
                                "geo": {
                                    "@type": "GeoCoordinates",
                                    "addressCountry": "ID"
                                },
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressLocality": mountain.location || "Wonosobo",
                                    "addressRegion": "Jawa Tengah",
                                    "addressCountry": "ID"
                                },
                                "isAccessibleForFree": true
                            },
                            {
                                "@type": "Service",
                                "name": `Sewa Alat Outdoor Dieng & Wonosobo`,
                                "serviceType": "Rental Alat Outdoor",
                                "provider": { "@type": "LocalBusiness", "name": "Browky Outdoor", "telephone": "+6287834443012" },
                                "areaServed": ["Dieng", "Wonosobo", "Jawa Tengah"]
                            },
                            {
                                "@type": "Service",
                                "name": `Porter ${mountainDisplayName} & Porter Dieng`,
                                "serviceType": "Jasa Porter Gunung",
                                "provider": { "@type": "LocalBusiness", "name": "Browky Outdoor", "telephone": "+6287834443012" },
                                "areaServed": ["Dieng", "Wonosobo", mountainDisplayName]
                            },
                            {
                                "@type": "Service",
                                "name": `Guide ${mountainDisplayName} & Guide Dieng`,
                                "serviceType": "Pemandu Pendakian Gunung",
                                "provider": { "@type": "LocalBusiness", "name": "Browky Outdoor", "telephone": "+6287834443012" },
                                "areaServed": ["Dieng", "Wonosobo", mountainDisplayName]
                            },
                            {
                                "@type": "Service",
                                "name": `Paket Camping ${mountainDisplayName}`,
                                "serviceType": "Paket Camping All-In",
                                "provider": { "@type": "LocalBusiness", "name": "Browky Outdoor", "telephone": "+6287834443012" },
                                "areaServed": ["Dieng", "Wonosobo", mountainDisplayName]
                            },
                            {
                                "@type": "FAQPage",
                                "mainEntity": faqs.map(faq => ({
                                    "@type": "Question",
                                    "name": faq.q,
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": faq.a
                                    }
                                }))
                            }
                        ]
                    })}
                </script>
            </Head>

            {/* 1. HERO SECTION */}
            <div className="relative w-full h-[65vh] md:h-[75vh] overflow-hidden bg-gray-950">
                <img src={imgSrc} alt={mountain.name} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-4 max-w-5xl space-y-6">
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-anton uppercase tracking-wider text-white leading-tight">
                            {mountainDisplayName}
                        </h1>

                        {/* Quick Stats Badges (Borderless, Clean Text with Dash Separator) */}
                        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-white text-sm md:text-base font-medium">
                            <span className="flex items-center gap-2 text-white">
                                <MapPin className="w-5 h-5 text-white stroke-[1.5]" />
                                <span>{mountain.location || 'Wonosobo & Dieng'}</span>
                            </span>

                            <span className="text-white/60 select-none">-</span>

                            <span className="flex items-center gap-2 text-white">
                                <MountainIcon className="w-5 h-5 text-white stroke-[1.5]" />
                                <span>{mountain.elevation ? `${mountain.elevation} mdpl` : '2.500+ mdpl'}</span>
                            </span>

                            <span className="text-white/60 select-none">-</span>

                            <span className="flex items-center gap-2 text-white">
                                <Clock className="w-5 h-5 text-white stroke-[1.5]" />
                                <span>{details.duration}</span>
                            </span>

                            <span className="text-white/60 select-none">-</span>

                            <span className="flex items-center gap-2 text-white">
                                <ShieldCheck className="w-5 h-5 text-white stroke-[1.5]" />
                                <span>{details.difficulty}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. DESKRIPSI GUNUNG & BREADCRUMB */}
            <div className="bg-white pb-12 pt-10 md:pt-16 md:pb-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="w-full lg:w-[76%] lg:ml-auto space-y-6 sm:space-y-8">
                        {/* BREADCRUMB */}
                        <nav className="flex text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 pt-1" aria-label="Breadcrumb">
                            <ol className="flex items-center space-x-1.5 sm:space-x-2 flex-wrap">
                                <li>
                                    <Link href="/" className="hover:text-gray-900 transition">
                                        Beranda
                                    </Link>
                                </li>
                                <li>
                                    <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 stroke-[2.25]" />
                                </li>
                                <li>
                                    <Link href="/gunung" className="hover:text-gray-900 transition">
                                        Destinasi Gunung
                                    </Link>
                                </li>
                                <li>
                                    <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 stroke-[2.25]" />
                                </li>
                                <li className="text-gray-900 font-medium line-clamp-1">
                                    {mountainDisplayName}
                                </li>
                            </ol>
                        </nav>

                        <div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-950">
                                Panduan Lengkap {mountainDisplayName}
                            </h2>
                        </div>

                        <div className="text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-line space-y-6">
                            <p className="text-base sm:text-lg md:text-xl font-normal text-gray-900 leading-relaxed">
                                {mountain.description || details.overview}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 sm:gap-y-12 pt-4 sm:pt-6">
                                <div className="space-y-2.5 sm:space-y-3">
                                    <h3 className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-black stroke-[1.5]" />
                                        Mengapa Sangat Populer?
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                        {details.whyPopular}
                                    </p>
                                </div>

                                <div className="space-y-2.5 sm:space-y-3">
                                    <h3 className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                                        <UserCheck className="w-5 h-5 text-black stroke-[1.5]" />
                                        Cocok Untuk Siapa?
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                        {details.suitableFor}
                                    </p>
                                </div>

                                <div className="space-y-2.5 sm:space-y-3">
                                    <h3 className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                                        <Navigation className="w-5 h-5 text-black stroke-[1.5]" />
                                        Karakter Jalur
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                        {details.trailChar}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                                        <Flame className="w-5.5 h-5.5 text-black stroke-[1.5]" />
                                        Daya Tarik Utama
                                    </h3>
                                    <p className="text-base text-gray-600 leading-relaxed">
                                        {details.mainHighlight}
                                    </p>
                                </div>
                            </div>

                            {/* Gambar 1: Panorama Puncak Pendakian */}
                            <div className="w-full pt-6">
                                <img
                                    src={img1}
                                    alt={`Pendakian ${mountainDisplayName} Dieng Wonosobo bersama Porter Dieng & Guide Dieng - Browky Outdoor`}
                                    className="w-full aspect-[16/9] object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. INFORMASI CEPAT (FAST FACTS TABLE) */}
            <div className="bg-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="w-full lg:w-[76%] lg:ml-auto space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-950">
                                Ringkasan Informasi Cepat
                            </h2>
                            <p className="text-base text-gray-500">
                                Spesifikasi fakta penting pendakian {mountainDisplayName} untuk kemudahan perencanaan Anda.
                            </p>
                        </div>

                        <div className="overflow-x-auto rounded-xs border border-gray-200">
                            <table className="w-full text-left text-base text-gray-700">
                                <thead className="bg-gray-100 text-gray-900 font-semibold uppercase text-xs">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 border-b border-gray-200 w-1/2 min-w-[200px] whitespace-nowrap">Informasi</th>
                                        <th scope="col" className="px-6 py-4 border-b border-gray-200 w-1/2">Detail Spesifikasi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white text-sm align-top">
                                    <tr className="hover:bg-gray-50/80 transition">
                                        <td className="px-6 py-4 font-semibold text-gray-900">Ketinggian Puncak</td>
                                        <td className="px-6 py-4 leading-relaxed text-gray-600">{mountain.elevation ? `${mountain.elevation} mdpl` : '2.500+ mdpl'}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50/80 transition bg-gray-50/30">
                                        <td className="px-6 py-4 font-semibold text-gray-900">Lokasi / Kabupaten</td>
                                        <td className="px-6 py-4 leading-relaxed text-gray-600">{mountain.location || 'Wonosobo & Dieng, Jawa Tengah'}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50/80 transition">
                                        <td className="px-6 py-4 font-semibold text-gray-900">Jalur Utama Populer</td>
                                        <td className="px-6 py-4 leading-relaxed text-gray-600">{details.mainRoute}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50/80 transition bg-gray-50/30">
                                        <td className="px-6 py-4 font-semibold text-gray-900">Estimasi Durasi Tempuh</td>
                                        <td className="px-6 py-4 leading-relaxed text-gray-600">{details.duration}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50/80 transition">
                                        <td className="px-6 py-4 font-semibold text-gray-900">Tingkat Kesulitan Trek</td>
                                        <td className="px-6 py-4 leading-relaxed text-gray-600">{details.difficulty}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50/80 transition bg-gray-50/30">
                                        <td className="px-6 py-4 font-semibold text-gray-900">Ketersediaan Camping Area</td>
                                        <td className="px-6 py-4 leading-relaxed text-gray-900 font-semibold">Tersedia (Sangat Luas & Nyaman)</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50/80 transition">
                                        <td className="px-6 py-4 font-semibold text-gray-900">Potensi Panorama Sunrise</td>
                                        <td className="px-6 py-4 leading-relaxed text-gray-600">{details.sunriseQuality}</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50/80 transition bg-gray-50/30">
                                        <td className="px-6 py-4 font-semibold text-gray-900">Sumber Air Bersih</td>
                                        <td className="px-6 py-4 leading-relaxed text-gray-600">{details.waterSource}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. LOKASI & AKSES */}
            <div className="bg-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="w-full lg:w-[76%] lg:ml-auto space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-950">
                                Lokasi & Akses Transportasi
                            </h2>
                            <p className="text-base text-gray-500">
                                Panduan cara menuju ke basecamp {mountainDisplayName} dari berbagai kota utama.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 pt-4">
                            <div className="space-y-3">
                                <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                                    <MapPin className="w-5.5 h-5.5 text-black stroke-[1.5]" />
                                    Dari Kawasan Dieng & Wonosobo
                                </h3>
                                <p className="text-base text-gray-600 leading-relaxed">
                                    Dari pusat Kota Wonosobo atau Kawasan Wisata Dieng, perjalanan menuju basecamp memerlukan waktu sekitar 30-60 menit menggunakan kendaraan pribadi atau armada mikrobus.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                                    <MapPin className="w-5.5 h-5.5 text-black stroke-[1.5]" />
                                    Dari Yogyakarta & Solo
                                </h3>
                                <p className="text-base text-gray-600 leading-relaxed">
                                    Dapat ditempuh selama 3–4 jam via jalur Tempel – Magelang – Temanggung – Wonosobo. Banyak pendaki dari Jogja memilih bermalam di Dieng terlebih dahulu sebelum menuju basecamp.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                                    <MapPin className="w-5.5 h-5.5 text-black stroke-[1.5]" />
                                    Dari Semarang & Kendal
                                </h3>
                                <p className="text-base text-gray-600 leading-relaxed">
                                    Memerlukan waktu sekitar 3,5 jam via jalur Ambarawa – Secang – Temanggung atau via jalur Bawang menuju Dieng Wonosobo.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                                    <MapPin className="w-5.5 h-5.5 text-black stroke-[1.5]" />
                                    Dari Jakarta & Jawa Barat
                                </h3>
                                <p className="text-base text-gray-600 leading-relaxed">
                                    Menggunakan Kereta Api turun di Stasiun Purwokerto (lanjut bus 2 jam ke Wonosobo) atau Bus AKAP langsung turun di Terminal Mendolo Wonosobo.
                                </p>
                            </div>
                        </div>

                        {/* Gambar 2: Basecamp & Akses Transportasi */}
                        <div className="w-full pt-4">
                            <img
                                src={img2}
                                alt={`Akses Transportasi Basecamp ${mountainDisplayName} Dieng Wonosobo`}
                                className="w-full aspect-[16/9] object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 6. WAKTU TERBAIK MULAI MENDAKI */}
            <div className="bg-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="w-full lg:w-[76%] lg:ml-auto space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-950">
                                Waktu Terbaik Mulai Mendaki
                            </h2>
                            <p className="text-base text-gray-500">
                                Jadwal estimasi keberangkatan dari basecamp untuk mendapatkan hasil terbaik sesuai target perjalanan Anda.
                            </p>
                        </div>

                        <div className="overflow-x-auto rounded-xs border border-gray-200">
                            <table className="w-full text-left text-base text-gray-700">
                                <thead className="bg-gray-100 text-gray-900 font-semibold uppercase text-xs">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 border-b border-gray-200 w-1/3 min-w-[280px] whitespace-nowrap">Tujuan Pendakian</th>
                                        <th scope="col" className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">Jam Berangkat Ideal</th>
                                        <th scope="col" className="px-6 py-4 border-b border-gray-200">Keterangan & Tips</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white text-sm align-top">
                                    <tr className="hover:bg-gray-50/80 transition">
                                        <td className="px-6 py-4 font-semibold text-gray-900">Paket Camping 2D1N (Sunrise)</td>
                                        <td className="px-6 py-4 text-gray-900 font-semibold whitespace-nowrap">08.00 – 11.00 WIB</td>
                                        <td className="px-6 py-4 leading-relaxed text-gray-600">Tiba di camp ground sore hari untuk mendirikan tenda dan menikmati momen sunset yang indah.</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50/80 transition bg-gray-50/30">
                                        <td className="px-6 py-4 font-semibold text-gray-900">Pendakian Malam (Tek-Tok Sunrise)</td>
                                        <td className="px-6 py-4 text-gray-900 font-semibold whitespace-nowrap">00.00 – 02.00 WIB</td>
                                        <td className="px-6 py-4 leading-relaxed text-gray-600">Mendaki tanpa inap di malam hari, tiba di puncak tepat sebelum matahari terbit. Bawa headlamp terang.</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50/80 transition">
                                        <td className="px-6 py-4 font-semibold text-gray-900">One Day Hike (Pagi - Sore)</td>
                                        <td className="px-6 py-4 text-gray-900 font-semibold whitespace-nowrap">06.00 – 07.00 WIB</td>
                                        <td className="px-6 py-4 leading-relaxed text-gray-600">Cocok untuk perjalanan santai mengamati flora & fauna, dan kembali ke basecamp sebelum malam tiba.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* 7. CUACA & MUSIM */}
            <div className="bg-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="w-full lg:w-[76%] lg:ml-auto space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-950">
                                Analisis Kondisi Cuaca & Musim
                            </h2>
                            <p className="text-base text-gray-500">
                                Karakteristik perubahan musim di Dataran Tinggi Dieng dan panduan antisipasi keselamatan.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 pt-2">
                            <div className="space-y-5">
                                <div className="flex items-center gap-2.5 text-gray-900 font-bold text-lg">
                                    <Calendar className="w-6 h-6 text-black stroke-[1.5]" />
                                    <h3>Musim Kemarau (Mei – Oktober)</h3>
                                </div>
                                <ul className="space-y-4 text-base text-gray-700">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-black stroke-[1.5] flex-shrink-0 mt-0.5" />
                                        <span>Peluang mendapatkan Golden Sunrise dan langit cerah sangat tinggi.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-black stroke-[1.5] flex-shrink-0 mt-0.5" />
                                        <span>Jalur tanah padat dan relatif tidak licin.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <AlertTriangle className="w-5 h-5 text-black stroke-[1.5] flex-shrink-0 mt-0.5" />
                                        <span>Suhu malam sangat dingin (bisa menyentuh 0°C), siapkan jaket tebal & sleeping bag thermal.</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-5">
                                <div className="flex items-center gap-2.5 text-gray-900 font-bold text-lg">
                                    <Calendar className="w-6 h-6 text-black stroke-[1.5]" />
                                    <h3>Musim Hujan (November – April)</h3>
                                </div>
                                <ul className="space-y-4 text-base text-gray-700">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-black stroke-[1.5] flex-shrink-0 mt-0.5" />
                                        <span>Suasana gunung lebih sepi dan hutan lebih hijau merindang.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <AlertTriangle className="w-5 h-5 text-black stroke-[1.5] flex-shrink-0 mt-0.5" />
                                        <span>Jalur pendakian berlumpur dan licin.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <AlertTriangle className="w-5 h-5 text-black stroke-[1.5] flex-shrink-0 mt-0.5" />
                                        <span>Wajib menggunakan jas hujan berkualitas dan melengkapi barang dengan dry bag.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Weather Advisory Alert */}
                        <div className="flex items-start gap-3 text-gray-900 text-base pt-2">
                            <AlertCircle className="w-6 h-6 text-black stroke-[1.5] flex-shrink-0 mt-0.5" />
                            <div>
                                <span className="font-bold">Pengingat Penting Pendakian: </span>
                                Selalu periksa pembaruan prakiraan cuaca resmi BMKG atau tanyakan kondisi rute terkini sebelum Anda memulai pendaftaran pendakian.
                            </div>
                        </div>

                        {/* Gambar 3: Suasana Camping Ground & Musim */}
                        <div className="w-full pt-4">
                            <img
                                src={img3}
                                alt={`Suasana Paket Camping ${mountainDisplayName} Musim Kemarau Dieng`}
                                className="w-full aspect-[16/9] object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 8. JALUR PENDAKIAN & POS */}
            <div className="bg-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="w-full lg:w-[76%] lg:ml-auto space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-950">
                                Analisis Jalur Pendakian & Pos Istirahat
                            </h2>
                            <p className="text-base text-gray-500">
                                Detail karakteristik rute pendakian {mountainDisplayName} agar perjalanan Anda terencana baik.
                            </p>
                        </div>

                        <div className="space-y-6 pt-2">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Rute Utama: {details.mainRoute}</h3>
                                <p className="text-sm text-gray-500">Rute resmi favorit dengan pemandangan paling estetik</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 text-base pt-2">
                                <div className="space-y-3">
                                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-black stroke-[1.5]" /> Kelebihan Jalur
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        Jalur sangat jelas dengan papan penunjuk arah di setiap pos, pemandangan terbuka nan indah, serta lokasi camp ground yang aman dari terpaan angin langsung.
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5 text-black stroke-[1.5]" /> Tantangan Rute
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        Cukup ramai pada akhir pekan (weekend). Diperlukan fisik yang cukup stabil karena terdapat tanjakan lumayan konstan menjelang area puncak.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Gambar 4: Trek Pendakian */}
                        <div className="w-full pt-4">
                            <img
                                src={img4}
                                alt={`Karakter Rute Jalur Pendakian ${mountainDisplayName} Dieng`}
                                className="w-full aspect-[16/9] object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 9. PERALATAN YANG DIBUTUHKAN (ESSENTIAL CHECKLIST) */}
            <div className="bg-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="w-full lg:w-[76%] lg:ml-auto space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-950">
                                Checklist Peralatan Wajib Pendakian
                            </h2>
                            <p className="text-base text-gray-500">
                                Daftar perlengkapan keselamatan & kenyamanan mendaki yang tidak boleh dilewatkan.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                            {[
                                { item: "Carrier (45L - 70L)", desc: "Menampung logistik & tenda" },
                                { item: "Sleeping Bag Thermal", desc: "Menahan dingin malam Dieng" },
                                { item: "Headlamp / Senter", desc: "Penerang trek malam hari" },
                                { item: "Trekking Pole", desc: "Menjaga keseimbangan lutut" },
                                { item: "Sarung Tangan Gunung", desc: "Melindungi dari suhu dingin" },
                                { item: "Jas Hujan / Raincoat", desc: "Antisipasi perubahan cuaca" },
                                { item: "Jaket Windproof", desc: "Menahan terpaan angin puncak" },
                                { item: "Sepatu Hiking Grip", desc: "Mencegah tergelincir di jalur" }
                            ].map((gear, idx) => (
                                <div key={idx} className="flex items-start gap-3.5 py-1">
                                    <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check className="w-4 h-4 text-black stroke-[2.25]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-base">{gear.item}</h3>
                                        <p className="text-sm text-gray-500">{gear.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 10. PORTER DIENG (KONTEN ARTIKEL SEO) */}
            <div className="bg-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="w-full lg:w-[76%] lg:ml-auto space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-950">
                            Layanan Porter {mountainDisplayName} & Porter Dieng Wonosobo
                        </h2>
                        <p className="text-base text-gray-600 leading-relaxed">
                            Jika Anda ingin menikmati pendakian tanpa membawa beban fisik yang berat, Browky Outdoor menyediakan layanan <Link href="/porter-gunung" className="text-gray-900 font-semibold underline hover:text-red-600">Porter {mountainDisplayName}</Link> dan <Link href="/porter-gunung" className="text-gray-900 font-semibold underline hover:text-red-600">Porter Dieng Wonosobo</Link> profesional yang siap membantu membawakan perlengkapan kemping Anda menuju puncak. Tim porter kami merupakan warga lokal terpercaya yang telah berpengalaman mendampingi ribuan pendaki dari berbagai daerah sehingga perjalanan mendaki Anda terasa jauh lebih nyaman, aman, dan berkesan.
                        </p>
                        <div className="pt-2">
                            <Link href="/porter-gunung" className="inline-flex items-center gap-1.5 text-base font-semibold text-red-600 hover:text-red-700 underline underline-offset-4">
                                Booking Porter {mountainDisplayName} & Porter Dieng <ArrowRight className="w-4 h-4 text-black stroke-[2.25]" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* 11. GUIDE DIENG (KONTEN ARTIKEL SEO) */}
            <div className="bg-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="w-full lg:w-[76%] lg:ml-auto space-y-8">
                        <div className="space-y-3">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-950">
                                Layanan Guide {mountainDisplayName} & Guide Dieng Profesional
                            </h2>
                            <p className="text-base text-gray-600 leading-relaxed">
                                Bagi pendaki pemula maupun rombongan instansi, Browky Outdoor menyediakan layanan <Link href="/porter-gunung" className="text-gray-900 font-semibold underline hover:text-red-600">Guide {mountainDisplayName}</Link> dan <Link href="/porter-gunung" className="text-gray-900 font-semibold underline hover:text-red-600">Guide Dieng Wonosobo</Link> yang menguasai karakter rute, mitigasi cuaca ekstrem, serta prosedur pertolongan pertama (P3K). Dengan pendampingan pemandu berpengalaman, pendakian Anda menjadi lebih terarah, aman, dan menyenangkan.
                            </p>
                            <p className="text-base text-gray-600 leading-relaxed pt-1">
                                Kapan Anda membutuhkan pendampingan dari <strong className="text-gray-900 font-semibold">Guide Dieng & Guide {mountainDisplayName}</strong>? Berikut beberapa situasi utama di mana peran guide lokal sangat penting:
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 pt-1">
                            <div className="space-y-2">
                                <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                                    <UserCheck className="w-5 h-5 text-black stroke-[1.5]" />
                                    Pendaki Pertama Kali (Pemula)
                                </h3>
                                <p className="text-base text-gray-600 leading-relaxed">
                                    Tim Guide Dieng membantu mengarahkan ritme jalan, memastikan arah trek benar, dan menangani manajemen pertolongan pertama (P3K).
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                                    <UserCheck className="w-5 h-5 text-black stroke-[1.5]" />
                                    Rombongan Keluarga & Instansi
                                </h3>
                                <p className="text-base text-gray-600 leading-relaxed">
                                    Memastikan seluruh anggota rombongan mendaki dengan aman, membantu mendirikan tenda dari Rental Alat Outdoor, dan memasak makanan lezat di camp.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                                    <UserCheck className="w-5 h-5 text-black stroke-[1.5]" />
                                    Pendaki Luar Kota & Luar Negeri
                                </h3>
                                <p className="text-base text-gray-600 leading-relaxed">
                                    Guide Dieng hafal cerita sejarah lokal, titik spot foto tersembunyi, dan navigasi cuaca yang akurat.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                                    <UserCheck className="w-5 h-5 text-black stroke-[1.5]" />
                                    Open Trip & Private Trip
                                </h3>
                                <p className="text-base text-gray-600 leading-relaxed">
                                    Memfasilitasi perjalanan Paket Camping kelompok besar agar terkoordinasi rapi dari basecamp hingga puncak.
                                </p>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Link href="/porter-gunung" className="inline-flex items-center gap-1.5 text-base font-semibold text-red-600 hover:text-red-700 underline underline-offset-4">
                                Pesan Jasa Guide {mountainDisplayName} & Dieng <ArrowRight className="w-4 h-4 text-black stroke-[2.25]" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* 12. RENTAL ALAT OUTDOOR (KONTEN ARTIKEL SEO) */}
            <div className="bg-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="w-full lg:w-[76%] lg:ml-auto space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-950">
                            Sewa & Rental Alat Outdoor Dieng Wonosobo Lengkap
                        </h2>
                        <p className="text-base text-gray-600 leading-relaxed">
                            Tidak memiliki peralatan mendaki bukan lagi menjadi kendala. Browky Outdoor melayani <Link href="/sewa-alat" className="text-gray-900 font-semibold underline hover:text-red-600">Sewa Alat Outdoor Dieng</Link> dan <Link href="/sewa-alat" className="text-gray-900 font-semibold underline hover:text-red-600">Rental Alat Outdoor Wonosobo</Link> dengan unit perlengkapan steril, terawat, dan siap pakai. Tersedia pilihan alat lengkap mulai dari <Link href="/sewa-alat" className="text-gray-900 font-semibold underline hover:text-red-600">Rental Tenda</Link> dome waterproof, <Link href="/sewa-alat" className="text-gray-900 font-semibold underline hover:text-red-600">Rental Carrier</Link> ergonomis, sleeping bag thermal, matras, kompor portable, nesting, headlamp, hingga trekking pole dengan harga yang paling terjangkau.
                        </p>
                        <div className="pt-2">
                            <Link href="/sewa-alat" className="inline-flex items-center gap-1.5 text-base font-semibold text-red-600 hover:text-red-700 underline underline-offset-4">
                                Katalog Sewa Alat Outdoor Dieng Wonosobo <ArrowRight className="w-4 h-4 text-black stroke-[2.25]" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* 13. PAKET CAMPING (KONTEN ARTIKEL SEO) */}
            <div className="bg-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="w-full lg:w-[76%] lg:ml-auto space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-950">
                            Paket Camping {mountainDisplayName} All-In Dieng Wonosobo
                        </h2>
                        <p className="text-base text-gray-600 leading-relaxed">
                            Selain persewaan alat satuan, Browky Outdoor menawarkan <Link href="/paket-camping" className="text-gray-900 font-semibold underline hover:text-red-600">Paket Camping {mountainDisplayName}</Link> praktis untuk perseorangan, rombongan keluarga, komunitas, hingga event instansi/gathering. Paket camping mencakup tenda siap berdiri, peralatan masak, alat tidur hangat, hingga pendampingan porter dan guide lokal Dieng sehingga Anda tinggal datang dan menikmati momen berkemah tanpa ribet.
                        </p>
                        <div className="pt-2">
                            <Link href="/paket-camping" className="inline-flex items-center gap-1.5 text-base font-semibold text-red-600 hover:text-red-700 underline underline-offset-4">
                                Lihat Pilihan Paket Camping {mountainDisplayName} All-In <ArrowRight className="w-4 h-4 text-black stroke-[2.25]" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* 14. TIPS DARI TIM BROWKY OUTDOOR (EEAT EXPERIENCE VALUE) */}
            <div className="bg-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="w-full lg:w-[76%] lg:ml-auto space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-950">
                                Tips Praktis dari Tim Browky Outdoor
                            </h2>
                            <p className="text-base text-gray-500">
                                Rekomendasi dari tim Browky Outdoor berdasarkan pengalaman bertahun-tahun melayani pendakian di Dieng & Wonosobo.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                "Tiba dan lakukan transit di titik kumpul Browky Outdoor minimal 1–2 jam sebelum jam registrasi basecamp untuk fitting Rental Alat Outdoor dan repacking yang nyaman.",
                                "Hitung kebutuhan air minum dengan cermat: siapkan minimal 2,5 liter air per orang untuk pendakian malam, dan tambahkan 1 liter ekstra jika membawa kompor masak.",
                                "Pastikan menggunakan sepatu gunung dengan sol tapak (grip) yang masih tebal. Rute pegunungan Dieng memiliki karakter tanah padat dan bebata yang licin bila terkena embun pagi.",
                                "Bungkus seluruh pakaian ganti, sleeping bag, dan peralatan elektronik ke dalam dry bag atau plastik trashbag tebal di dalam carrier untuk mengantisipasi hujan mendadak.",
                                "Hindari memulai pendakian terlalu siang saat akhir pekan (weekend) agar Anda mendapatkan spot mendirikan tenda (camping area) yang paling mulus dan terlindung dari angin kencang."
                            ].map((tip, idx) => (
                                <div key={idx} className="p-5 rounded-xl border border-gray-100 bg-white flex items-start gap-4">
                                    <div className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                                        {idx + 1}
                                    </div>
                                    <p className="text-base text-gray-700 leading-relaxed pt-0.5">
                                        {tip}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Gambar 5: Transit & Fitting Peralatan Outdoor */}
                        <div className="w-full pt-4">
                            <img
                                src={img5}
                                alt={`Persiapan Rental Alat Outdoor & Service Porter Dieng Browky Outdoor`}
                                className="w-full aspect-[16/9] object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* INTERNAL LINKING & CROSS MOUNTAIN CAROUSEL SECTION */}
            <div className="bg-white py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="w-full lg:w-[76%] lg:ml-auto space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-950">
                                Layanan Pendakian Gunung Lain di Kawasan Dieng & Jateng
                            </h2>
                            <p className="text-base text-gray-600 leading-relaxed">
                                Selain {mountainDisplayName}, Browky Outdoor juga menyediakan layanan profesional <Link href="/porter-gunung" className="text-gray-900 font-semibold underline hover:text-red-600">Porter Dieng</Link>, <Link href="/porter-gunung" className="text-gray-900 font-semibold underline hover:text-red-600">Guide Dieng</Link>, <Link href="/sewa-alat" className="text-gray-900 font-semibold underline hover:text-red-600">Rental Alat Outdoor</Link> (seperti <Link href="/sewa-alat" className="text-gray-900 font-semibold underline hover:text-red-600">Rental Tenda</Link> & <Link href="/sewa-alat" className="text-gray-900 font-semibold underline hover:text-red-600">Rental Carrier</Link>), serta <Link href="/paket-camping" className="text-gray-900 font-semibold underline hover:text-red-600">Paket Camping</Link> lengkap untuk berbagai destinasi gunung favorit lainnya:
                            </p>
                        </div>

                        {/* Grid 4 Cards Adjusting to Container */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 pt-2">
                            {[
                                { name: 'Gunung Prau', height: '2.565 mdpl', loc: 'Wonosobo', slug: 'gunung-prau', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80' },
                                { name: 'Gunung Sindoro', height: '3.136 mdpl', loc: 'Temanggung', slug: 'gunung-sindoro', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80' },
                                { name: 'Gunung Sumbing', height: '3.371 mdpl', loc: 'Wonosobo', slug: 'gunung-sumbing', img: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=500&q=80' },
                                { name: 'Gunung Bismo', height: '2.365 mdpl', loc: 'Wonosobo', slug: 'gunung-bismo', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=500&q=80' },
                                { name: 'Gunung Pakuwaja', height: '2.421 mdpl', loc: 'Wonosobo', slug: 'gunung-pakuwaja', img: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=500&q=80' },
                                { name: 'Gunung Kembang', height: '2.340 mdpl', loc: 'Wonosobo', slug: 'gunung-kembang', img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=500&q=80' },
                                { name: 'Gunung Merbabu', height: '3.145 mdpl', loc: 'Boyolali', slug: 'gunung-merbabu', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80' },
                            ].filter(m => !mountain?.slug || m.slug !== mountain.slug).slice(0, 4).map((m, idx) => (
                                <div key={idx} className="group relative overflow-hidden transition-all duration-300">
                                    <Link href={`/gunung/${m.slug}`} className="block">
                                        <div className="relative aspect-square w-full overflow-hidden bg-gray-50 rounded-sm">
                                            <img
                                                src={m.img}
                                                alt={m.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="pt-2.5 sm:pt-3 space-y-0.5 sm:space-y-1">
                                            <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-1">
                                                {m.name}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-400 font-normal">{m.height} • {m.loc}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 15. FAQ SECTION (15 COMPREHENSIVE QUESTIONS & ANSWERS) */}
            <section className="py-12 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="w-full lg:w-[76%] lg:ml-auto space-y-6 sm:space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-950">
                                Pertanyaan Umum Seputar Pendakian {mountainDisplayName}
                            </h2>
                            <p className="text-sm sm:text-base text-gray-500">
                                Jawaban lengkap seputar rute, Porter Dieng, Guide Dieng, dan Rental Alat Outdoor untuk membantu perencanaan Anda.
                            </p>
                        </div>

                        <div className="space-y-3.5 sm:space-y-4 pt-2">
                            {faqs.map((faq, index) => (
                                <details key={index} className="group bg-white rounded-xl border border-gray-200 p-4 sm:p-5 hover:border-gray-300 transition-all cursor-pointer">
                                    <summary className="flex justify-between items-center font-bold text-gray-900 text-sm sm:text-base list-none pr-2">
                                        <span>{faq.q}</span>
                                        <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform duration-200 flex-shrink-0">
                                            <ChevronRight className="w-5 h-5 text-black stroke-[2.25] rotate-90 group-open:-rotate-90 transition-transform duration-200" />
                                        </span>
                                    </summary>
                                    <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                                        {faq.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* REKOMENDASI PRODUK DISEWA (RENTAL ALAT OUTDOOR) */}
            {products.length > 0 && (
                <section className="py-12 md:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
                            <div>
                                <h2 className="text-2xl md:text-4xl font-anton tracking-wide uppercase text-gray-900">
                                    Peralatan yang Paling Sering Disewa
                                </h2>
                                <p className="text-sm sm:text-base text-gray-500 mt-1">
                                    Pilihan perlengkapan terbaik melalui layanan Rental Alat Outdoor steril & terawat untuk pendakian {mountainDisplayName}
                                </p>
                            </div>
                            {products.length > 5 && (
                                <Link href="/sewa-alat" className="text-sm font-semibold text-gray-900 hover:text-red-600 underline underline-offset-4 flex items-center gap-1 flex-shrink-0">
                                    Lihat Semua Alat <ArrowRight className="w-4 h-4 text-black stroke-[2.25]" />
                                </Link>
                            )}
                        </div>

                        {/* Mobile: 1 Full Card + Slight Peek | Desktop: Static Grid */}
                        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none">
                            <div className="flex sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 pb-2 sm:pb-0">
                                {products.map((product) => {
                                    const pImg = product.cover_image
                                        ? (product.cover_image.startsWith('http') ? product.cover_image : `/storage/${product.cover_image}`)
                                        : 'https://images.unsplash.com/photo-1504280390224-2c3554e22295?auto=format&fit=crop&w=500&q=80';

                                    return (
                                        <div key={product.id} className="group relative overflow-hidden transition-all duration-300 w-[82%] sm:w-auto flex-shrink-0 sm:flex-shrink">
                                            <Link href={`/sewa-alat/${product.slug}`} className="block">
                                                <div className="relative aspect-square w-full overflow-hidden bg-gray-50 rounded-sm">
                                                    <img
                                                        src={pImg}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div className="pt-2.5 sm:pt-3 space-y-0.5 sm:space-y-1">
                                                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-1">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-xs sm:text-sm text-gray-400 font-normal">{product.category || 'Alat Outdoor'}</p>
                                                    <div className="text-sm sm:text-base font-semibold text-red-600">
                                                        Rp {Number(product.price_per_day).toLocaleString('id-ID')}
                                                        <span className="text-xs sm:text-sm text-gray-400 font-normal ml-0.5">/ hari</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* REKOMENDASI PORTER DIENG */}
            {porters.length > 0 && (
                <section className="py-12 md:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
                            <div>
                                <h2 className="text-2xl md:text-4xl font-anton tracking-wide uppercase text-gray-900">
                                    Layanan Porter Dieng {mountainDisplayName}
                                </h2>
                                <p className="text-sm sm:text-base text-gray-500 mt-1">
                                    Porter lokal profesional hafal rute pendakian {mountainDisplayName} dari basecamp hingga puncak
                                </p>
                            </div>
                            {porters.length > 5 && (
                                <Link href="/porter-gunung" className="text-sm font-semibold text-gray-900 hover:text-red-600 underline underline-offset-4 flex items-center gap-1 flex-shrink-0">
                                    Lihat Semua Porter <ArrowRight className="w-4 h-4 text-black stroke-[2.25]" />
                                </Link>
                            )}
                        </div>

                        {/* Mobile: 1 Full Card + Slight Peek | Desktop: Static Grid */}
                        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none">
                            <div className="flex sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 pb-2 sm:pb-0">
                                {porters.map((porter) => {
                                    const poImg = porter.image
                                        ? (porter.image.startsWith('http') ? porter.image : `/storage/${porter.image}`)
                                        : 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be1?auto=format&fit=crop&w=500&q=80';

                                    return (
                                        <div key={porter.id} className="group relative overflow-hidden transition-all duration-300 w-[82%] sm:w-auto flex-shrink-0 sm:flex-shrink">
                                            <Link href={`/porter-gunung/${porter.slug}`} className="block">
                                                <div className="relative aspect-square w-full overflow-hidden bg-gray-50 rounded-sm">
                                                    <img
                                                        src={poImg}
                                                        alt={porter.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div className="pt-2.5 sm:pt-3 space-y-0.5 sm:space-y-1">
                                                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-1">
                                                        {porter.name}
                                                    </h3>
                                                    <p className="text-xs sm:text-sm text-gray-400 font-normal line-clamp-1">{porter.mountain || porter.category || 'Porter Local'}</p>
                                                    <div className="text-sm sm:text-base font-semibold text-red-600">
                                                        Rp {Number(porter.price_per_day).toLocaleString('id-ID')}
                                                        <span className="text-xs sm:text-sm text-gray-400 font-normal ml-0.5">/ hari</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* REKOMENDASI PAKET CAMPING ALL-IN */}
            {campingPackages.length > 0 && (
                <section className="py-12 md:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
                            <div>
                                <h2 className="text-2xl md:text-4xl font-anton tracking-wide uppercase text-gray-900">
                                    Pilihan Paket Camping All-In {mountainDisplayName}
                                </h2>
                                <p className="text-sm sm:text-base text-gray-500 mt-1">
                                    Pendakian praktis tanpa ribet dengan fasilitas Paket Camping, Porter Dieng, dan Guide Dieng profesional
                                </p>
                            </div>
                            {campingPackages.length > 5 && (
                                <Link href="/paket-camping" className="text-sm font-semibold text-gray-900 hover:text-red-600 underline underline-offset-4 flex items-center gap-1 flex-shrink-0">
                                    Lihat Semua Paket <ArrowRight className="w-4 h-4 text-black stroke-[2.25]" />
                                </Link>
                            )}
                        </div>

                        {/* Mobile: 1 Full Card + Slight Peek | Desktop: Static Grid */}
                        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none">
                            <div className="flex sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 pb-2 sm:pb-0">
                                {campingPackages.map((pkg) => {
                                    const pkgImg = pkg.image
                                        ? (pkg.image.startsWith('http') ? pkg.image : `/storage/${pkg.image}`)
                                        : 'https://images.unsplash.com/photo-1504280390224-2c3554e22295?auto=format&fit=crop&w=800&q=80';

                                    return (
                                        <div key={pkg.id} className="group relative overflow-hidden transition-all duration-300 w-[82%] sm:w-auto flex-shrink-0 sm:flex-shrink">
                                            <Link href={`/paket-camping/${pkg.slug}`} className="block">
                                                <div className="relative aspect-square w-full overflow-hidden bg-gray-50 rounded-sm">
                                                    <img
                                                        src={pkgImg}
                                                        alt={pkg.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div className="pt-2.5 sm:pt-3 space-y-0.5 sm:space-y-1">
                                                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-1">
                                                        {pkg.name}
                                                    </h3>
                                                    <p className="text-xs sm:text-sm text-gray-400 font-normal line-clamp-1">{pkg.tags || 'Paket Lengkap'}</p>
                                                    <div className="text-sm sm:text-base font-semibold text-red-600">
                                                        Rp {Number(pkg.price).toLocaleString('id-ID')}
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 16. CTA BANNER */}
            <section className="relative overflow-hidden bg-zinc-800 py-16 text-white border-b-6 border-secondary">
                {/* Background accents */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_50%,white_1px,transparent_1px),radial-gradient(circle_at_80%_20%,white_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left max-w-2xl space-y-3">
                            <h2 className="text-4xl font-anton tracking-wide uppercase leading-tight">
                                Siap Mendaki <span className="text-white">{mountainDisplayName}?</span>
                            </h2>
                            <p className="text-base text-zinc-300 leading-relaxed">
                                Percayakan kebutuhan pendakian Anda kepada Browky Outdoor. Kami menyediakan layanan Porter Dieng, Guide Dieng, Rental Alat Outdoor, dan Paket Camping dengan tim profesional serta perlengkapan yang terawat. Hubungi kami sekarang untuk mendapatkan informasi ketersediaan alat dan reservasi.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full sm:w-auto">
                            <Link
                                href="/sewa-alat"
                                className="inline-flex uppercase items-center justify-center gap-2 px-6 py-3.5 rounded-xs bg-white hover:bg-white/90 active:scale-95 text-gray-900 font-bold text-sm transition-all shadow-md w-full sm:w-auto"
                            >
                                Rental Alat Outdoor
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
