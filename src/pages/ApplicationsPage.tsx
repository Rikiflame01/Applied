import { Link } from "react-router";
import { useState } from "react";
import { ApplicationList } from "../components/ApplicationList";
import { FilterBar, type StageFilter } from "../components/FilterBar";
import { StageSummary } from "../components/StageSummary";
import { useApplications } from "../hooks/useApplications";
import { countByStage } from "../lib/applications";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function ApplicationsPage() {
  const { applications, loading, error, reload } = useApplications();
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState<StageFilter>("all");

  const counts = countByStage(applications);
  const query = search.trim().toLowerCase();
  const filtered = applications.filter((application) => {
    const matchesStage = stage === "all" || application.stage === stage;
    const matchesSearch =
      query.length === 0 ||
      application.company.toLowerCase().includes(query) ||
      application.role.toLowerCase().includes(query);
    return matchesStage && matchesSearch;
  });

  return (
    <div className="space-y-4">
      <h1 className="sr-only">Job applications</h1>
      {loading ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2" aria-live="polite" aria-busy="true">
          <p className="sr-only">Loading applications…</p>
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
      ) : error ? (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">Something went wrong</h2>
          <p className="text-muted-foreground">{error}</p>
          <Button type="button" variant="outline" onClick={() => void reload()}>
            Try again
          </Button>
        </section>
      ) : applications.length === 0 ? (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">There is nothing here yet</h2>
          <p className="text-muted-foreground">
            Add your first application and it will show up on this list.
          </p>
          <Button asChild variant="accent">
            <Link to="/new">Add the first application</Link>
          </Button>
        </section>
      ) : (
        <>
          <StageSummary counts={counts} />
          <FilterBar
            search={search}
            onSearchChange={setSearch}
            stage={stage}
            onStageChange={setStage}
          />
          {filtered.length === 0 ? (
            <section className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight">
                No jobs match those filters
              </h2>
              <p className="text-muted-foreground">
                Try a different company, job title, or stage.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setStage("all");
                }}
              >
                Clear filters
              </Button>
            </section>
          ) : (
            <ApplicationList applications={filtered} />
          )}
        </>
      )}
    </div>
  );
}
