import React from 'react';
import { usePage } from '@inertiajs/react';
import { Phone } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';
import { SiteFooter } from '@/components/site-footer';
import { SiteNavbar } from '@/components/site-navbar';

interface FrontendLayoutProps {
    children: React.ReactNode;
}

export default function FrontendLayout({ children }: FrontendLayoutProps) {
    const { url } = usePage();
    const isHome = url === '/' || url === '';

    return (
        <div className="flex flex-col min-h-screen font-sans antialiased text-gray-900 bg-white selection:bg-secondary/30">
            {/* Reusable Header Navbar */}
            <SiteNavbar />

            {/* Main Content Area */}
            <main className={`flex-grow ${isHome ? '' : 'pt-20'}`}>
                {children}
            </main>

            {/* Global Toaster */}
            <Toaster position="top-center" closeButton richColors />

            {/* WhatsApp Floating Button */}
            <a
                href="https://wa.me/6287834443012"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-2xl hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
                aria-label="Hubungi Browky Outdoor via WhatsApp: +62 878-3444-3012"
                title="Chat WhatsApp Browky Outdoor"
            >
                <img src="/images/icons/whatsapp.svg" alt="WhatsApp" className="w-6 h-6 sm:w-8 sm:h-8 invert brightness-200" />
            </a>

            {/* Site Footer Component */}
            <SiteFooter />
        </div>
    );
}
