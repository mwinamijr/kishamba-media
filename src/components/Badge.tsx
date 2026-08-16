const TONES = {
  breaking: "bg-breaking text-ink",
  category: "bg-primary-50 text-primary-700",
  neutral: "bg-secondary-50 text-secondary-500",
};

export default function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: keyof typeof TONES;
}) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${TONES[tone]}`}
    >
      {children}
    </span>
  );
}
