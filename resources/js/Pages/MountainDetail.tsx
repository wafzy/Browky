import React from 'react';
import { Link, Head } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import { MapPin, Mountain as MountainIcon, Compass } from 'lucide-react';

interface Mountain {
    id: number;
    name: string;
    slug: string;
    location: string;
    elevation?: string | number;
    image?: string;
    description?: string;
}

interface MountainDetailProps {
    mountain: Mountain;
}

export default function MountainDetail({ mountain }: MountainDetailProps) {
    const imgSrc = mountain.image 
        ? (mountain.image.startsWith('http') ? mountain.image : `/storage/${mountain.image}`)
        : 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80';

    const absoluteImg = mountain.image
        ? (mountain.image.startsWith('http') ? mountain.image : `https://browkyoutdoor.com/storage/${mountain.image}`)
        : 'https://browkyoutdoor.com/images/hero-fallback.jpg';

    return (
        <FrontendLayout>
            <Head>
                <title>{`Info Pendakian Gunung ${mountain.name} Dieng & Porter Guide | Browky Outdoor`}</title>
                <meta name="description" content={`Panduan pendakian Gunung ${mountain.name} (${mountain.elevation} MDPL) di ${mountain.location} Dieng Wonosobo. Sewa alat hiking & jasa porter guide Gunung ${mountain.name} berpengalaman, hafal jalur, siap antar dari basecamp.`} />
                <meta name="keywords" content={`pendakian gunung ${mountain.name}, porter gunung ${mountain.name}, guide pendakian ${mountain.name}, sewa alat hiking gunung ${mountain.name}, pendakian dieng, porter dieng, guide wonosobo, sewa tenda ${mountain.name}`} />
                <meta property="og:title" content={`Info Pendakian Gunung ${mountain.name} Dieng | Browky Outdoor`} />
                <meta property="og:description" content={`Panduan pendakian Gunung ${mountain.name} & layanan porter guide gunung Dieng Wonosobo.`} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content={absoluteImg} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="Browky Outdoor" />
                <meta property="og:url" content={`https://browkyoutdoor.com/gunung/${mountain.slug}`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`Info Pendakian Gunung ${mountain.name} Dieng | Browky Outdoor`} />
                <meta name="twitter:description" content={`Panduan pendakian Gunung ${mountain.name} & layanan porter guide gunung Dieng Wonosobo.`} />
                <meta name="twitter:image" content={absoluteImg} />
                <link rel="canonical" href={`https://browkyoutdoor.com/gunung/${mountain.slug}`} />
                <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://browkyoutdoor.com" },
                                { "@type": "ListItem", "position": 2, "name": "Destinasi Gunung", "item": "https://browkyoutdoor.com/gunung" },
                                { "@type": "ListItem", "position": 3, "name": `Gunung ${mountain.name}`, "item": `https://browkyoutdoor.com/gunung/${mountain.slug}` }
                            ]
                        },
                        {
                            "@type": "TouristAttraction",
                            "name": `Gunung ${mountain.name}`,
                            "description": mountain.description || `Gunung ${mountain.name} (${mountain.elevation} mdpl) adalah salah satu destinasi pendakian populer di kawasan Dieng, Wonosobo, Jawa Tengah.`,
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
                        }
                    ]
                })}
                </script>
            </Head>

            {/* Hero Section */}
            <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-gray-950">
                <img src={imgSrc} alt={mountain.name} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-4 max-w-4xl space-y-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">{mountain.name}</h1>
                        <div className="flex items-center justify-center gap-4 text-white/90 text-sm md:text-base font-semibold">
                            <span className="flex items-center gap-1.5">
                                <MapPin className="w-4.5 h-4.5" />
                                {mountain.location}
                            </span>
                            {mountain.elevation && (
                                <>
                                    <span className="hidden md:inline">•</span>
                                    <span className="flex items-center gap-1.5">
                                        <MountainIcon className="w-4.5 h-4.5" />
                                        {mountain.elevation} mdpl
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Details and Description */}
            <div className="bg-gray-50/50 py-16 min-h-[400px]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* About Content Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12 space-y-6">
                        <h2 className="text-xl font-bold text-gray-950 flex items-center gap-2">
                            <Compass className="w-5 h-5 text-primary" />
                            <span>Tentang {mountain.name}</span>
                        </h2>
                        <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                            {mountain.description || (
                                `Informasi detail mengenai ${mountain.name} sedang dalam tahap pembaruan. Gunung ini merupakan salah satu destinasi pendakian populer yang menawarkan pemandangan alam memukau dan pengalaman mendaki yang tak terlupakan.`
                            )}
                        </div>
                    </div>

                    {/* Mountain Guide CTA Box */}
                    <div className="bg-gradient-to-br from-primary to-blue-900 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_50%,white_1px,transparent_1px),radial-gradient(circle_at_80%_20%,white_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>

                        <div className="relative z-10 space-y-6">
                            <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                                Siap Mewujudkan Pendakian ke {mountain.name}?
                            </h3>
                            <p className="text-sm text-gray-200 max-w-2xl mx-auto leading-relaxed">
                                Ingin menikmati petualangan mendaki gunung ini tanpa beban berat di pundak Anda? Kami menyediakan jasa porter profesional lokal dan rental perlengkapan outdoor terlengkap di Wonosobo.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
                                <Link 
                                    href="/porter-gunung" 
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-primary bg-white hover:bg-gray-50 transition-all shadow-md cursor-pointer text-sm"
                                >
                                    Cari Porter
                                </Link>
                                <Link 
                                    href="/rental-alat" 
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold border border-white/30 hover:bg-white hover:text-primary transition-all cursor-pointer text-sm"
                                >
                                    Sewa Alat
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </FrontendLayout>
    );
}
