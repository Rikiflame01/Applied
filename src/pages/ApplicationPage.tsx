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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function ApplicationPage() {
  const { id } = useParams();
  const { applications, loading, error, saving, update, remove, reload } =
    useApplications();
  const application = applications.find((item) => item.id === id);

  if (loading) {
    return (
      <section className="space-y-2" aria-live="polite">
        <p>Loading application…</p>
      </section>
    );
  }

  if (error && !application) {
    return (
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
        <p className="text-muted-foreground">{error}</p>
        <Button type="button" variant="outline" onClick={() => void reload()}>
          Try again
        </Button>
      </section>
    );
  }

  if (!application) {
    return (
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">
          We could not find that application
        </h1>
        <p className="text-muted-foreground">
          It may have been removed, or the address may be wrong.
        </p>
        <Button asChild variant="link">
          <Link to="/">Back to all applications</Link>
        </Button>
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
    <article className="space-y-5">
      <Button asChild variant="link" className="h-auto px-0">
        <Link to="/">← Back to all applications</Link>
      </Button>
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {application.company}
          </h1>
          <p className="text-muted-foreground">{application.role}</p>
        </div>
        <StageBadge stage={application.stage} />
      </header>
      <p className="text-sm text-muted-foreground">
        {describeTiming(application)}
        {application.link ? (
          <>
            {" · "}
            <a
              href={application.link}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              View the advert ↗
            </a>
          </>
        ) : null}
      </p>
      {nudge ? (
        <Badge className="border-transparent bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
          Needs a nudge
        </Badge>
      ) : null}
      {error ? (
        <p role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      ) : null}

      <div className="grid max-w-xs gap-1.5">
        <Label htmlFor="application-stage">Stage</Label>
        <Select
          value={application.stage}
          onValueChange={(value) => void handleStageChange(value as Stage)}
          disabled={saving}
        >
          <SelectTrigger id="application-stage" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STAGES.map((stage) => (
              <SelectItem key={stage} value={stage}>
                {STAGE_LABELS[stage]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <section className="space-y-2 border-t pt-4">
        <Label htmlFor="application-notes">Notes</Label>
        <Textarea
          id="application-notes"
          value={notes}
          disabled={saving}
          onChange={(event) => setNotes(event.target.value)}
          rows={5}
        />
        <Button type="button" disabled={saving} onClick={() => void handleSaveNotes()}>
          {saving ? "Saving…" : "Save notes"}
        </Button>
      </section>

      <section className="border-t pt-4">
        <Button
          type="button"
          variant="destructive"
          disabled={saving}
          onClick={() => setConfirmDelete(true)}
        >
          Delete this application
        </Button>
        <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove this application?</AlertDialogTitle>
              <AlertDialogDescription>
                This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={saving}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                disabled={saving}
                onClick={() => void handleDelete()}
              >
                Yes, delete it
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </article>
  );
}
