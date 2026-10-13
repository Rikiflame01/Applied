import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { NewApplicationPage } from "./NewApplicationPage";

vi.mock("../hooks/useApplications", () => ({
  useApplications: () => ({
    applications: [],
    loading: false,
    error: null,
    saving: false,
    add: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
    reload: vi.fn(),
  }),
}));

describe("NewApplicationPage", () => {
  it("shows an error under required fields when submitted empty", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <NewApplicationPage />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "Save application" }));

    const company = screen.getByLabelText("Company");
    const role = screen.getByLabelText("Job title");
    expect(company).toHaveAttribute("aria-invalid", "true");
    expect(role).toHaveAttribute("aria-invalid", "true");
    expect(company).toHaveAccessibleDescription("Company is required");
    expect(role).toHaveAccessibleDescription("Job title is required");
    expect(screen.getAllByRole("alert").map((alert) => alert.textContent)).toEqual([
      "Company is required",
      "Job title is required",
    ]);
  });
});
