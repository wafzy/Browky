import React from 'react';
import { Link } from '@inertiajs/react';
import { Phone, Mail, MapPin, Sparkles } from 'lucide-react';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 32 32"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"></path>
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor" />
    <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="currentColor" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 -4 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    {...props}
  >
    <path d="M30.722,20.579 C30.137,21.894 28.628,23.085 27.211,23.348 C27.066,23.375 23.603,24.000 16.010,24.000 L15.990,24.000 C8.398,24.000 4.932,23.375 4.788,23.349 C3.371,23.085 1.861,21.894 1.275,20.578 C1.223,20.461 0.001,17.647 0.001,12.000 C0.001,6.353 1.223,3.538 1.275,3.421 C1.861,2.105 3.371,0.915 4.788,0.652 C4.932,0.625 8.398,-0.000 15.990,-0.000 C23.603,-0.000 27.066,0.625 27.210,0.651 C28.628,0.915 30.137,2.105 30.723,3.420 C30.775,3.538 32.000,6.353 32.000,12.000 C32.000,17.647 30.775,20.461 30.722,20.579 ZM28.893,4.230 C28.581,3.529 27.603,2.759 26.845,2.618 C26.813,2.612 23.386,2.000 16.010,2.000 C8.615,2.000 5.185,2.612 5.152,2.618 C4.394,2.759 3.417,3.529 3.104,4.234 C3.094,4.255 2.002,6.829 2.002,12.000 C2.002,17.170 3.094,19.744 3.106,19.770 C3.417,20.471 4.394,21.241 5.153,21.382 C5.185,21.388 8.615,22.000 15.990,22.000 L16.010,22.000 C23.386,22.000 26.813,21.388 26.846,21.382 C27.604,21.241 28.581,20.471 28.894,19.766 C28.904,19.744 29.998,17.170 29.998,12.000 C29.998,6.830 28.904,4.255 28.893,4.230 ZM13.541,17.846 C13.379,17.949 13.193,18.000 13.008,18.000 C12.842,18.000 12.676,17.959 12.525,17.875 C12.206,17.699 12.008,17.364 12.008,17.000 L12.008,7.000 C12.008,6.637 12.204,6.303 12.521,6.127 C12.838,5.950 13.227,5.958 13.534,6.149 L21.553,11.105 C21.846,11.286 22.026,11.606 22.027,11.951 C22.028,12.296 21.852,12.618 21.560,12.801 L13.541,17.846 ZM14.009,8.794 L14.009,15.189 L19.137,11.963 L14.009,8.794 Z" fill="currentColor" />
  </svg>
);

const WhatsAppSvgIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M11.42 9.49c-.19-.09-1.1-.54-1.27-.61s-.29-.09-.42.1-.48.6-.59.73-.21.14-.4 0a5.13 5.13 0 0 1-1.49-.92 5.25 5.25 0 0 1-1-1.29c-.11-.18 0-.28.08-.38s.18-.21.28-.32a1.39 1.39 0 0 0 .18-.31.38.38 0 0 0 0-.33c0-.09-.42-1-.58-1.37s-.3-.32-.41-.32h-.4a.72.72 0 0 0-.5.23 2.1 2.1 0 0 0-.65 1.55A3.59 3.59 0 0 0 5 8.2 8.32 8.32 0 0 0 8.19 11c.44.19.78.3 1.05.39a2.53 2.53 0 0 0 1.17.07 1.93 1.93 0 0 0 1.26-.88 1.67 1.67 0 0 0 .11-.88c-.05-.07-.17-.12-.36-.21z" />
    <path d="M13.29 2.68A7.36 7.36 0 0 0 8 .5a7.44 7.44 0 0 0-6.41 11.15l-1 3.85 3.94-1a7.4 7.4 0 0 0 3.55.9H8a7.44 7.44 0 0 0 5.29-12.72zM8 14.12a6.12 6.12 0 0 1-3.15-.87l-.22-.13-2.34.61.62-2.28-.14-.23a6.18 6.18 0 0 1 9.6-7.65 6.12 6.12 0 0 1 1.81 4.37A6.19 6.19 0 0 1 8 14.12z" />
  </svg>
);

const LocationSvgIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function SiteFooter() {
  return (
    <div className="mt-auto w-full">
      <footer className="bg-[#0a0a0a] text-zinc-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            {/* Brand Column */}
            <div className="md:col-span-2 space-y-4">
              <img src="/images/logobrowkyoutdoor.png" alt="Browky Outdoor" className="h-10 sm:h-12 w-auto brightness-0 invert" />
              <p className="text-base sm:text-sm text-white leading-relaxed max-w-md mt-8">
                Platform sewa alat pendakian & jasa porter profesional di Wonosobo, Jawa Tengah. Melayani pendakian Gunung Prau, Sumbing, Sindoro & Dieng.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium tracking-wider uppercase text-zinc-400">Layanan</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/sewa-alat" className="text-base text-white hover:text-white transition-colors">
                    Sewa Alat Pendakian
                  </Link>
                </li>
                <li>
                  <Link href="/porter-gunung" className="text-base text-white hover:text-white transition-colors">
                    Jasa Porter & Guide
                  </Link>
                </li>
                <li>
                  <Link href="/paket-camping" className="text-base text-white hover:text-white transition-colors">
                    Paket Camping Browky
                  </Link>
                </li>
                <li>
                  <a
                    href="https://maps.app.goo.gl/xSWc6pS5EA7Mnzzo9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-white hover:text-white transition-colors"
                  >
                    Lokasi
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium tracking-wider uppercase text-zinc-400">Kontak</h3>
              <ul className="space-y-3.5">
                <li>
                  <a
                    href="https://wa.me/6287834443012"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-base text-white hover:text-white group transition-colors"
                  >
                    <WhatsAppSvgIcon className="w-6 h-6 text-white group-hover:text-white transition-colors shrink-0" />
                    <span>+62 878-3444-3012</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@browkyoutdoor.com"
                    className="flex items-center gap-3 text-base text-white hover:text-white group transition-colors"
                  >
                    <Mail className="w-5 h-5 text-white group-hover:text-white transition-colors shrink-0" />
                    <span>hello@browkyoutdoor.com</span>
                  </a>
                </li>
                <li className="pt-2">
                  <div className="grid grid-cols-4 gap-4 w-full mt-2">
                    <a
                      href="https://www.instagram.com/browky_0utdoor/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aspect-square w-full border border-white/30 bg-transparent flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label="Instagram Browky Outdoor"
                      title="Instagram Browky Outdoor"
                    >
                      <InstagramIcon className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.tiktok.com/@browky_outdoor"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aspect-square w-full border border-white/30 bg-transparent flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label="TikTok Browky Outdoor"
                      title="TikTok Browky Outdoor"
                    >
                      <TikTokIcon className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.youtube.com/@browkyoutdoor"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aspect-square w-full border border-white/30 bg-transparent flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label="YouTube Browky Outdoor"
                      title="YouTube Browky Outdoor"
                    >
                      <YoutubeIcon className="w-5 h-5" />
                    </a>
                    <a
                      href="https://maps.google.com/?q=Browky+Outdoor+Sewa+Alat+Hiking+Porter+Dieng+Wonosobo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aspect-square w-full border border-white/30 bg-transparent flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label="Google Maps Browky Outdoor Dieng"
                      title="Google Maps Location Dieng Wonosobo"
                    >
                      <MapPin className="w-5 h-5" strokeWidth={2} />
                    </a>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-200/10">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 text-sm sm:text-base text-zinc-400 flex items-center justify-between">
            <p>
              © {new Date().getFullYear()} Browky Outdoor. Website by <a href="https://www.instagram.com/ralwaf/" target="_blank" rel="noopener noreferrer" className="hover:text-white text-zinc-300 transition-colors underline underline-offset-2">Ralwaf.</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
