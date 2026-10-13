import { useState } from "react";
import { ApplicationList } from "../components/ApplicationList";
import { FilterBar, type StageFilter } from "../components/FilterBar";
import { StageSummary } from "../components/StageSummary";
import { seedApplications } from "../data/seed";
import { countByStage } from "../lib/applications";

export function ApplicationsPage() {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState<StageFilter>("all");

  const counts = countByStage(seedApplications);
  const query = search.trim().toLowerCase();
  const filtered = seedApplications.filter((application) => {
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
  );
}
