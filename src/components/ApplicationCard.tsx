import type { Application } from "../types";
import { daysSince, needsNudge } from "../lib/applications";
import { StageBadge } from "./StageBadge";

type Props = {
  application: Application;
};

function formatSentOn(dateSent: string): string {
  const sent = new Date(`${dateSent}T00:00:00`);
  return sent.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function describeTiming(application: Application): string {
  if (application.stage === "wishlist") {
    return "Not sent yet";
  }

  const days = daysSince(application.dateSent);
  const ago = days === 1 ? "1 day ago" : `${days} days ago`;
  return `Sent ${formatSentOn(application.dateSent)} · ${ago}`;
}

export function ApplicationCard({ application }: Props) {
  const nudge = needsNudge(application);

  return (
    <article className="application-card">
      <header className="application-card__header">
        <h3 className="application-card__title">
          <span className="application-card__company">{application.company}</span>
          <span className="application-card__role">{application.role}</span>
        </h3>
        <StageBadge stage={application.stage} />
      </header>
      <p className="application-card__meta">{describeTiming(application)}</p>
      {nudge && <p className="nudge-marker">Needs a nudge</p>}
    </article>
  );
}
