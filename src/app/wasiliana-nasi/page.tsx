export const metadata = { title: "Wasiliana Nasi" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-serif text-3xl font-bold text-ink">Wasiliana Nasi</h1>
      <p className="mt-4 text-secondary-500">
        Una habari, maoni, au marekebisho ya kupendekeza? Tuandikie kupitia barua pepe:{" "}
        <a href="mailto:habari@kishambamedia.co.tz" className="text-primary-500 hover:underline">
          habari@kishambamedia.co.tz
        </a>
      </p>
    </div>
  );
}
