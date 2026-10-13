import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { StageBadge } from "../components/StageBadge";
import { useApplications } from "../hooks/useApplications";
import {
  describeTiming,
  needsNudge,
  STAGE_LABELS,
  STAGES,
} from "../lib/applications";
import type { Application, Stage } from "../types";

export function ApplicationPage() {
  const { id } = useParams();
  const { applications, loading, error, saving, update, remove, reload } =
    useApplications();
  const application = applications.find((item) => item.id === id);

  if (loading) {
    return (
      <section className="page-message" aria-live="polite">
        <p>Loading application…</p>
      </section>
    );
  }

  if (error && !application) {
    return (
      <section className="page-message">
        <h1>Something went wrong</h1>
        <p>{error}</p>
        <p>
          <button
            type="button"
            className="text-link text-link--button"
            onClick={() => void reload()}
          >
            Try again
          </button>
        </p>
      </section>
    );
  }

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

  return (
    <ApplicationDetail
      key={application.id}
      application={application}
      error={error}
      saving={saving}
      onUpdate={update}
      onRemove={remove}
    />
  );
}

type DetailProps = {
  application: Application;
  error: string | null;
  saving: boolean;
  onUpdate: (id: string, changes: Partial<Application>) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
};

function ApplicationDetail({
  application,
  error,
  saving,
  onUpdate,
  onRemove,
}: DetailProps) {
  const navigate = useNavigate();
  const [notes, setNotes] = useState(application.notes ?? "");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const nudge = needsNudge(application);

  async function handleStageChange(nextStage: Stage) {
    await onUpdate(application.id, { stage: nextStage });
  }

  async function handleSaveNotes() {
    const trimmed = notes.trim();
    await onUpdate(application.id, {
      notes: trimmed.length > 0 ? trimmed : undefined,
    });
  }

  async function handleDelete() {
    await onRemove(application.id);
    navigate("/");
  }

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
      {error ? <p role="alert">{error}</p> : null}

      <p className="filter-bar__field">
        <label htmlFor="application-stage">Stage</label>
        <select
          id="application-stage"
          value={application.stage}
          disabled={saving}
          onChange={(event) =>
            void handleStageChange(event.target.value as Stage)
          }
        >
          {STAGES.map((stage) => (
            <option key={stage} value={stage}>
              {STAGE_LABELS[stage]}
            </option>
          ))}
        </select>
      </p>

      <section className="application-detail__notes">
        <h2>
          <label htmlFor="application-notes">Notes</label>
        </h2>
        <textarea
          id="application-notes"
          value={notes}
          disabled={saving}
          onChange={(event) => setNotes(event.target.value)}
          rows={5}
        />
        <p>
          <button
            type="button"
            className="add-application"
            disabled={saving}
            onClick={() => void handleSaveNotes()}
          >
            {saving ? "Saving…" : "Save notes"}
          </button>
        </p>
      </section>

      <section className="delete-panel">
        {confirmDelete ? (
          <>
            <p>Remove this application? This cannot be undone.</p>
            <p className="delete-panel__actions">
              <button
                type="button"
                className="danger-button"
                disabled={saving}
                onClick={() => void handleDelete()}
              >
                Yes, delete it
              </button>
              <button
                type="button"
                className="text-link text-link--button"
                disabled={saving}
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </button>
            </p>
          </>
        ) : (
          <button
            type="button"
            className="text-link text-link--button"
            disabled={saving}
            onClick={() => setConfirmDelete(true)}
          >
            Delete this application
          </button>
        )}
      </section>
    </article>
  );
}
