import { Link } from "react-router";
import { useState } from "react";
import { ApplicationList } from "../components/ApplicationList";
import { FilterBar, type StageFilter } from "../components/FilterBar";
import { StageSummary } from "../components/StageSummary";
import { useApplications } from "../hooks/useApplications";
import { countByStage } from "../lib/applications";

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
    <>
      <h1 className="visually-hidden">Job applications</h1>
      {loading ? (
        <div className="loading-stack" aria-live="polite" aria-busy="true">
          <p>Loading applications…</p>
          <div className="skeleton" />
          <div className="skeleton" />
          <div className="skeleton" />
        </div>
      ) : error ? (
        <section className="page-message">
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <p>
            <button type="button" className="text-link text-link--button" onClick={() => void reload()}>
              Try again
            </button>
          </p>
        </section>
      ) : applications.length === 0 ? (
        <section className="page-message">
          <h2>There is nothing here yet</h2>
          <p>Add your first application and it will show up on this list.</p>
          <p>
            <Link to="/new" className="add-application">
              Add the first application
            </Link>
          </p>
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
            <section className="page-message">
              <h2>No jobs match those filters</h2>
              <p>Try a different company, job title, or stage.</p>
              <p>
                <button
                  type="button"
                  className="text-link text-link--button"
                  onClick={() => {
                    setSearch("");
                    setStage("all");
                  }}
                >
                  Clear filters
                </button>
              </p>
            </section>
          ) : (
            <ApplicationList applications={filtered} />
          )}
        </>
      )}
    </>
  );
}
