import Image from "next/image";
import Link from "next/link";
import AdSlot from "./AdSlot";

// Contact details and social links carried over from the site's original
// masthead — update these as the real newsroom's details are finalized.
const CONTACT = {
  address: "Kinondoni Mwananyamala, Dar es Salaam, Plot No 12, Block No 31",
  phone: "+255 754 675 410",
  email: "kishambamedia2023@gmail.com",
};

const SOCIAL_LINKS = [
  {
    name: "Twitter",
    href: "https://twitter.com/kishambamedia",
    path: "M23 3a10.9 10.9 0 01-3.14.86 5.48 5.48 0 002.4-3.04 10.65 10.65 0 01-3.38 1.29 5.42 5.42 0 00-9.24 4.94A15.41 15.41 0 013 4.9a5.41 5.41 0 001.68 7.22 5.35 5.35 0 01-2.46-.68v.07a5.42 5.42 0 004.34 5.31 5.4 5.4 0 01-2.45.09 5.43 5.43 0 005.06 3.77A10.86 10.86 0 013 19.54a15.37 15.37 0 008.29 2.42c9.95 0 15.4-8.24 15.4-15.4 0-.24 0-.48-.02-.71A11 11 0 0023 3z",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/kishambamedia",
    path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.54V9.79c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 17 22 12z",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/kishambamedia",
    path: "M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a1 1 0 110 2 1 1 0 010-2zm-5 3a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@kishambamedia",
    path: "M19.8 7.2c-.2-.7-.8-1.3-1.5-1.4C16.8 5.5 12 5.5 12 5.5s-4.8 0-6.3.3c-.7.1-1.3.7-1.5 1.4-.2.7-.2 2.2-.2 2.2s0 1.5.2 2.2c.2.7.8 1.3 1.5 1.4 1.5.3 6.3.3 6.3.3s4.8 0 6.3-.3c.7-.1 1.3-.7 1.5-1.4.2-.7.2-2.2.2-2.2s0-1.5-.2-2.2zM10 14.5v-5l4 2.5-4 2.5z",
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-secondary-50 bg-secondary-900 text-secondary-50">
      <div className="mx-auto max-w-container px-4 py-10">
        <div className="flex justify-center">
          <AdSlot size="leaderboard" label="Ad Space — 728×90" />
        </div>

        <div className="mt-8 grid gap-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-serif text-lg font-bold text-white">
              <Image src="/logo192.png" alt="" width={24} height={24} className="rounded" />
              Kishamba Media
            </Link>
            <p className="mt-2 max-w-xs text-secondary-50/70">Habari za kuaminika, kila siku.</p>
          </div>

          <div>
            <h5 className="mb-3 text-xs font-bold uppercase tracking-wide text-secondary-50/70">
              Wasiliana Nasi
            </h5>
            <address className="flex flex-col gap-2 not-italic text-secondary-50/90">
              <span>{CONTACT.address}</span>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="hover:text-primary-500">
                {CONTACT.phone}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-primary-500">
                {CONTACT.email}
              </a>
            </address>
          </div>

          <div>
            <h5 className="mb-3 text-xs font-bold uppercase tracking-wide text-secondary-50/70">
              Viungo
            </h5>
            <nav className="flex flex-col gap-2">
              <Link href="/kuhusu" className="text-secondary-50/90 hover:text-primary-500">
                Kuhusu
              </Link>
              <Link href="/wasiliana-nasi" className="text-secondary-50/90 hover:text-primary-500">
                Wasiliana Nasi
              </Link>
              <Link href="/tafuta" className="text-secondary-50/90 hover:text-primary-500">
                Tafuta
              </Link>
            </nav>
          </div>

          <div>
            <h5 className="mb-3 text-xs font-bold uppercase tracking-wide text-secondary-50/70">
              Tufuate
            </h5>
            <div className="flex gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded bg-secondary-500/40 text-secondary-50 hover:bg-primary-500 hover:text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-secondary-50/20 pt-6 text-xs text-secondary-50/50">
          © {new Date().getFullYear()} Kishamba Media. Haki zote zimehifadhiwa.
        </p>
      </div>
    </footer>
  );
}
