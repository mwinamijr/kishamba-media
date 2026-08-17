import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface SharedProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

interface ButtonAsButton extends SharedProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
}

interface ButtonAsLink extends SharedProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

// Every interactive style decision the app makes lives here once, instead
// of every screen hand-rolling its own `rounded bg-primary-500 px-4 py-2...`
// combination slightly differently. The focus-visible ring is the
// accessibility-critical part: keyboard users get a clear, consistent
// indicator of what's focused everywhere in the app, not just where
// someone remembered to add one.
//
// Pass `href` to render a Next.js `Link` styled identically to a button
// (for navigation that should look like a CTA); omit it for a real
// `<button>` (for in-page actions/mutations).
const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-primary-500 text-white hover:bg-primary-600 disabled:bg-primary-500/50",
  secondary: "bg-secondary-500 text-white hover:bg-secondary-900 disabled:bg-secondary-500/50",
  outline: "border border-primary-500 text-primary-600 hover:bg-primary-50 disabled:border-primary-500/50 disabled:text-primary-600/50",
  ghost: "text-secondary-500 hover:bg-secondary-50 hover:text-ink disabled:text-secondary-500/50",
  danger: "border border-red-200 text-red-600 hover:bg-red-50 disabled:border-red-200/50 disabled:text-red-600/50",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-1.5 rounded font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:cursor-not-allowed";

const Spinner = () => (
  <span
    aria-hidden="true"
    className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent"
  />
);

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>((props, ref) => {
  const { variant = "primary", size = "md", loading = false, className = "", children, ...rest } = props;
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorProps } = rest as Omit<ButtonAsLink, keyof SharedProps | "children">;
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...anchorProps}
      >
        {loading && <Spinner />}
        {children}
      </Link>
    );
  }

  const { disabled, ...buttonProps } = rest as Omit<ButtonAsButton, keyof SharedProps | "children">;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={classes}
      {...buttonProps}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
