const SIZES = {
  leaderboard: "h-24 w-full max-w-[728px]", // 728x90-ish, header/between-sections
  rectangle: "aspect-[4/3] w-full max-w-[300px]", // 300x250-ish, sidebar
  banner: "h-20 w-full", // full-width in-content banner
  square: "aspect-square w-full max-w-[250px]",
} as const;

type AdSize = keyof typeof SIZES;

// A clearly-labeled placeholder — never a real ad network integration.
// Swap the inner content for an actual ad provider's embed/script when
// that's ready; every call site in the app already marks where an ad slot
// belongs, so wiring in a real network later means editing this one file
// (or adding a real provider component with the same props shape),
// not hunting through every page.
export default function AdSlot({ size = "banner", label }: { size?: AdSize; label?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded border border-dashed border-secondary-50 bg-secondary-50/30 text-xs text-secondary-500 ${SIZES[size]}`}
      role="complementary"
      aria-label="Advertisement"
    >
      {label || "Ad Space"}
    </div>
  );
}
