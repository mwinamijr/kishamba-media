import Link from "next/link";

export const metadata = { title: "Admin" };

const SECTIONS = [
  {
    href: "/admin/users",
    title: "Watumiaji",
    description: "Ona watumiaji wote, badilisha majukumu (roles), au unda akaunti mpya za wafanyakazi.",
  },
  {
    href: "/admin/categories",
    title: "Kategoria",
    description: "Simamia kategoria za habari zinazoonekana kwenye tovuti.",
  },
  {
    href: "/admin/tags",
    title: "Tags",
    description: "Simamia tags zinazotumika kwenye habari.",
  },
  {
    href: "/admin/media",
    title: "Picha",
    description: "Ona na simamia picha zote zilizopakiwa.",
  },
  {
    href: "/newsroom",
    title: "Newsroom",
    description: "Bodi ya uhariri — rasimu, ukaguzi, uchapishaji.",
  },
];

export default function AdminPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink">Admin</h1>
      <p className="mt-1 text-sm text-secondary-500">Usimamizi wa jumla wa tovuti.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="rounded border border-secondary-50 p-4 hover:border-primary-500 hover:bg-primary-50"
          >
            <h2 className="font-semibold text-ink">{s.title}</h2>
            <p className="mt-1 text-sm text-secondary-500">{s.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
