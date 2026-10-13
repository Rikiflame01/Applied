import { describe, expect, it } from "vitest";
import type { Application } from "../types";
import { countByStage, needsNudge } from "./applications";

const job: Application = {
  id: "1",
  company: "Vodacom",
  role: "Junior Developer",
  dateSent: "2026-10-01",
  stage: "applied",
  createdAt: "2026-10-01T09:00:00Z",
};

describe("needsNudge", () => {
  it("is false at exactly fourteen days", () => {
    expect(needsNudge(job, new Date("2026-10-15"))).toBe(false);
  });

  it("is true at fifteen days", () => {
    expect(needsNudge(job, new Date("2026-10-16"))).toBe(true);
  });

  it("is false once there is an interview", () => {
    expect(
      needsNudge({ ...job, stage: "interview" }, new Date("2026-12-01")),
    ).toBe(false);
  });
});

describe("countByStage", () => {
  it("counts each stage from the list", () => {
    expect(
      countByStage([
        job,
        { ...job, id: "2", stage: "interview" },
        { ...job, id: "3", stage: "applied" },
      ]),
    ).toEqual({
      wishlist: 0,
      applied: 2,
      interview: 1,
      offer: 0,
      closed: 0,
    });
  });
});
