import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md text-center">
      <h1 className="font-serif text-4xl font-bold text-ink">404</h1>
      <p className="mt-2 text-secondary-500">Ukurasa haukupatikana.</p>
      <Link href="/" className="mt-4 inline-block text-primary-500 hover:underline">
        Rudi Nyumbani
      </Link>
    </div>
  );
}
