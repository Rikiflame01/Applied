import { Link } from "react-router";
import { describeTiming, needsNudge } from "../lib/applications";
import type { Application } from "../types";
import { StageBadge } from "./StageBadge";

type Props = {
  application: Application;
};

export function ApplicationCard({ application }: Props) {
  const nudge = needsNudge(application);

  return (
    <article className="application-card">
      <Link
        to={`/applications/${application.id}`}
        className="application-card__link"
        aria-label={`${application.company}, ${application.role}`}
      >
        <header className="application-card__header">
          <h3 className="application-card__title">
            <span className="application-card__company">{application.company}</span>
            <span className="application-card__role">{application.role}</span>
          </h3>
          <StageBadge stage={application.stage} />
        </header>
        <p className="application-card__meta">{describeTiming(application)}</p>
        {nudge && <p className="nudge-marker">Needs a nudge</p>}
      </Link>
    </article>
  );
}
