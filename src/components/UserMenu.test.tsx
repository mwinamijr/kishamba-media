import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithStore } from "@/test-utils";
import UserMenu from "./UserMenu";

const push = vi.fn();
const refresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh }),
}));

vi.mock("next/link", () => ({
  // A real Next <Link> needs router context we're not mounting here — a
  // plain anchor is all UserMenu actually relies on (href + children).
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

function mockMeResponse(body: unknown, status = 200) {
  vi.mocked(fetch).mockImplementation(
    async () =>
      new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
      })
  );
}

describe("UserMenu", () => {
  beforeEach(() => {
    push.mockClear();
    refresh.mockClear();
  });

  it("shows Ingia/Jiunge when there is no session", async () => {
    mockMeResponse({ message: "No token" }, 401);
    renderWithStore(<UserMenu />);

    expect(await screen.findByText("Ingia")).toBeInTheDocument();
    expect(screen.getByText("Jiunge")).toBeInTheDocument();
  });

  it("shows the display name and role once a session resolves", async () => {
    mockMeResponse({
      user: { id: "u1", username: "mwinami", firstName: "Mwinami", role: "EDITOR_IN_CHIEF" },
    });
    renderWithStore(<UserMenu />);

    expect(await screen.findByText("Mwinami")).toBeInTheDocument();
    expect(screen.queryByText("Ingia")).not.toBeInTheDocument();
  });

  it("falls back to username when firstName is absent", async () => {
    mockMeResponse({ user: { id: "u1", username: "mreporta23", role: "REPORTER" } });
    renderWithStore(<UserMenu />);

    expect(await screen.findByText("mreporta23")).toBeInTheDocument();
  });

  it("opens the dropdown on click and shows Dashibodi/Wasifu/Toka", async () => {
    mockMeResponse({ user: { id: "u1", username: "editor1", firstName: "Editor", role: "MANAGING_EDITOR" } });
    renderWithStore(<UserMenu />);

    const trigger = await screen.findByRole("button", { name: /Editor/ });
    await userEvent.click(trigger);

    // MANAGING_EDITOR's dashboard is /newsroom (see lib/dashboard.ts).
    expect(screen.getByRole("menuitem", { name: "Dashibodi" })).toHaveAttribute("href", "/newsroom");
    expect(screen.getByRole("menuitem", { name: "Wasifu wangu" })).toHaveAttribute("href", "/profile");
    expect(screen.getByRole("menuitem", { name: "Toka" })).toBeInTheDocument();
  });

  it("clicking Toka logs out and redirects home", async () => {
    mockMeResponse({ user: { id: "u1", username: "editor1", role: "ADMIN" } });
    renderWithStore(<UserMenu />);

    const trigger = await screen.findByRole("button", { name: /editor1/ });
    await userEvent.click(trigger);
    await userEvent.click(screen.getByRole("menuitem", { name: "Toka" }));

    await waitFor(() => expect(push).toHaveBeenCalledWith("/"));
    expect(refresh).toHaveBeenCalled();
  });
});
