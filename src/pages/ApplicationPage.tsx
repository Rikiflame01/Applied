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
      <section className="space-y-2 p-4" aria-live="polite">
        <p>Loading application…</p>
      </section>
    );
  }

  if (error && !application) {
    return (
      <section className="space-y-3 p-4">
        <h1 className="text-[15px] font-medium tracking-tight">Something went wrong</h1>
        <p className="text-muted-foreground">{error}</p>
        <Button type="button" variant="outline" onClick={() => void reload()}>
          Try again
        </Button>
      </section>
    );
  }

  if (!application) {
    return (
      <section className="space-y-3 p-4">
        <h1 className="text-[15px] font-medium tracking-tight">
          We could not find that application
        </h1>
        <p className="text-muted-foreground">
          It may have been removed, or the address may be wrong.
        </p>
        <Button asChild variant="link" className="h-auto px-0">
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
    <article>
      <div className="flex h-11 items-center justify-between gap-3 border-b px-3">
        <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
          <Link to="/">Back</Link>
        </Button>
        <StageBadge stage={application.stage} />
      </div>

      <div className="space-y-5 p-4">
        <header className="space-y-1">
          <h1 className="text-[18px] leading-6 font-medium tracking-tight">
            {application.company}
          </h1>
          <p className="text-muted-foreground">{application.role}</p>
        </header>

        <dl className="divide-y border-y text-[13px]">
          <div className="grid grid-cols-[7rem_minmax(0,1fr)] items-center gap-3 py-2">
            <dt className="text-muted-foreground">Timing</dt>
            <dd>{describeTiming(application)}</dd>
          </div>
          {application.link ? (
            <div className="grid grid-cols-[7rem_minmax(0,1fr)] items-center gap-3 py-2">
              <dt className="text-muted-foreground">Advert</dt>
              <dd className="min-w-0 truncate">
                <a
                  href={application.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  View the advert ↗
                </a>
              </dd>
            </div>
          ) : null}
          <div className="grid grid-cols-[7rem_minmax(0,1fr)] items-center gap-3 py-2">
            <dt>
              <Label htmlFor="application-stage">Stage</Label>
            </dt>
            <dd>
              <Select
                value={application.stage}
                onValueChange={(value) => void handleStageChange(value as Stage)}
                disabled={saving}
              >
                <SelectTrigger id="application-stage" className="w-full max-w-xs">
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
            </dd>
          </div>
        </dl>

        {nudge ? (
          <Badge
            variant="outline"
            className="border-transparent bg-transparent font-normal text-[#f0bf00]"
          >
            <span className="size-1.5 rounded-full bg-[#f0bf00]" />
            Needs a nudge
          </Badge>
        ) : null}
        {error ? (
          <p role="alert" className="text-[13px] font-medium text-destructive">
            {error}
          </p>
        ) : null}

        <section className="space-y-2">
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
      </div>
    </article>
  );
}
