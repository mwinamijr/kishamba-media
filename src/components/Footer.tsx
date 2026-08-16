import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-secondary-50 bg-secondary-900 text-secondary-50">
      <div className="mx-auto max-w-container px-4 py-10 text-sm">
        <div className="flex flex-col justify-between gap-6 sm:flex-row">
          <div>
            <p className="font-serif text-lg font-bold text-white">Kishamba Media</p>
            <p className="mt-1 max-w-xs text-secondary-50/70">
              Habari za kuaminika, kila siku.
            </p>
          </div>
          <div className="flex gap-8">
            <Link href="/kuhusu" className="hover:text-white">
              Kuhusu
            </Link>
            <Link href="/wasiliana-nasi" className="hover:text-white">
              Wasiliana Nasi
            </Link>
          </div>
        </div>
        <p className="mt-8 text-xs text-secondary-50/50">
          © {new Date().getFullYear()} Kishamba Media. Haki zote zimehifadhiwa.
        </p>
      </div>
    </footer>
  );
}
