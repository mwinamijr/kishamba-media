import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe("Button", () => {
  it("renders a real <button> when no href is given", () => {
    render(<Button>Hifadhi</Button>);
    const el = screen.getByRole("button", { name: "Hifadhi" });
    expect(el.tagName).toBe("BUTTON");
  });

  it("renders a <a> (via next/link) when href is given", () => {
    render(<Button href="/newsroom">Nenda Newsroom</Button>);
    const el = screen.getByRole("link", { name: "Nenda Newsroom" });
    expect(el).toHaveAttribute("href", "/newsroom");
  });

  it("calls onClick when a button variant is clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Chapisha</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Chapisha" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled and unclickable while loading", async () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} loading>
        Inatuma...
      </Button>
    );
    const el = screen.getByRole("button", { name: "Inatuma..." });
    expect(el).toBeDisabled();
    expect(el).toHaveAttribute("aria-busy", "true");
    await userEvent.click(el);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("respects an explicit disabled prop even without loading", () => {
    render(<Button disabled>Haiwezi</Button>);
    expect(screen.getByRole("button", { name: "Haiwezi" })).toBeDisabled();
  });

  it("applies the variant's class name", () => {
    render(<Button variant="danger">Futa</Button>);
    expect(screen.getByRole("button", { name: "Futa" }).className).toMatch(/text-red-600/);
  });
});
