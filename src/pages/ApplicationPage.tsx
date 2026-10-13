import { Link, useParams } from "react-router";
import { StageBadge } from "../components/StageBadge";
import { seedApplications } from "../data/seed";
import { describeTiming, needsNudge } from "../lib/applications";

export function ApplicationPage() {
  const { id } = useParams();
  const application = seedApplications.find((item) => item.id === id);

  if (!application) {
    return (
      <section className="page-message">
        <h1>We could not find that application</h1>
        <p>It may have been removed, or the address may be wrong.</p>
        <p>
          <Link to="/" className="text-link">
            Back to all applications
          </Link>
        </p>
      </section>
    );
  }

  const nudge = needsNudge(application);

  return (
    <article className="page application-detail">
      <p>
        <Link to="/" className="text-link">
          ← Back to all applications
        </Link>
      </p>
      <header className="application-detail__header">
        <div>
          <h1>{application.company}</h1>
          <p className="application-detail__role">{application.role}</p>
        </div>
        <StageBadge stage={application.stage} />
      </header>
      <p className="application-card__meta">
        {describeTiming(application)}
        {application.link ? (
          <>
            {" · "}
            <a href={application.link} target="_blank" rel="noreferrer">
              View the advert ↗
            </a>
          </>
        ) : null}
      </p>
      {nudge && <p className="nudge-marker">Needs a nudge</p>}
      {application.notes ? (
        <section className="application-detail__notes">
          <h2>Notes</h2>
          <p>{application.notes}</p>
        </section>
      ) : null}
    </article>
  );
}
