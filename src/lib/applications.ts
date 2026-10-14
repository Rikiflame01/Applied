import type { Application, Stage } from "../types";

const DAY = 1000 * 60 * 60 * 24;

export const STAGES: Stage[] = [
  "wishlist",
  "applied",
  "interview",
  "offer",
  "closed",
];

export const STAGE_LABELS: Record<Stage, string> = {
  wishlist: "Saved",
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
  closed: "Closed",
};

export function daysSince(dateSent: string, today: Date = new Date()): number {
  const sent = new Date(dateSent);
  const gap = today.getTime() - sent.getTime();
  return Math.floor(gap / DAY);
}

export function needsNudge(job: Application, today: Date = new Date()): boolean {
  if (job.stage !== "applied") return false;
  return daysSince(job.dateSent, today) > 14;
}

export function countByStage(
  applications: Application[],
): Record<Stage, number> {
  const counts: Record<Stage, number> = {
    wishlist: 0,
    applied: 0,
    interview: 0,
    offer: 0,
    closed: 0,
  };

  for (const application of applications) {
    counts[application.stage] += 1;
  }

  return counts;
}

export function formatSentOn(dateSent: string): string {
  const sent = new Date(`${dateSent}T00:00:00`);
  return sent.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function localIsoDate(today: Date = new Date()): string {
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function describeTiming(application: Application): string {
  if (application.stage === "wishlist") {
    return "Not sent yet";
  }

  const days = daysSince(application.dateSent);
  const ago = days === 1 ? "1 day ago" : `${days} days ago`;
  return `Sent ${formatSentOn(application.dateSent)} · ${ago}`;
}

export function compactTiming(application: Application): string {
  if (application.stage === "wishlist") return "—";
  return `${daysSince(application.dateSent)}d`;
}
