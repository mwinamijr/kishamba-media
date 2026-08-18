import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";
import type { ReactElement } from "react";

// A fresh store per render, same as StoreProvider.tsx does per-request in
// the real app — tests never share RTK Query cache state with each other.
export function renderWithStore(ui: ReactElement) {
  const store = makeStore();
  return { store, ...render(<Provider store={store}>{ui}</Provider>) };
}
