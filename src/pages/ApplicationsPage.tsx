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
    <div>
      <div className="flex h-11 items-center justify-between gap-3 border-b px-3">
        <div className="flex min-w-0 items-baseline gap-2">
          <h1 className="text-[13px] font-medium tracking-tight">Applications</h1>
          {loading ? null : (
            <span className="text-[12px] text-muted-foreground tabular-nums">
              {applications.length}
            </span>
          )}
        </div>
        <Button asChild variant="accent" size="sm" className="hidden md:inline-flex">
          <Link to="/new">New</Link>
        </Button>
      </div>

      {loading ? (
        <div className="divide-y border-b" aria-live="polite" aria-busy="true">
          <p className="sr-only">Loading applications…</p>
          <Skeleton className="h-8 rounded-none" />
          <Skeleton className="h-8 rounded-none" />
          <Skeleton className="h-8 rounded-none" />
          <Skeleton className="h-8 rounded-none" />
        </div>
      ) : error ? (
        <section className="space-y-3 p-4">
          <h2 className="text-[15px] font-medium tracking-tight">Something went wrong</h2>
          <p className="text-muted-foreground">{error}</p>
          <Button type="button" variant="outline" onClick={() => void reload()}>
            Try again
          </Button>
        </section>
      ) : applications.length === 0 ? (
        <section className="space-y-3 p-4">
          <h2 className="text-[15px] font-medium tracking-tight">There is nothing here yet</h2>
          <p className="text-muted-foreground">
            Add your first application and it will show up on this list.
          </p>
          <Button asChild variant="accent">
            <Link to="/new">Add the first application</Link>
          </Button>
        </section>
      ) : (
        <>
          <div className="flex flex-col gap-2 border-b px-3 py-2">
            <StageSummary counts={counts} stage={stage} onStageChange={setStage} />
            <FilterBar
              search={search}
              onSearchChange={setSearch}
              stage={stage}
              onStageChange={setStage}
            />
          </div>
          {filtered.length === 0 ? (
            <section className="space-y-3 p-4">
              <h2 className="text-[15px] font-medium tracking-tight">
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
