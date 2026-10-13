import { STAGE_LABELS, STAGES } from "../lib/applications";
import type { Stage } from "../types";

export type StageFilter = Stage | "all";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  stage: StageFilter;
  onStageChange: (value: StageFilter) => void;
};

export function FilterBar({
  search,
  onSearchChange,
  stage,
  onStageChange,
}: Props) {
  return (
    <form className="filter-bar" onSubmit={(event) => event.preventDefault()}>
      <p className="filter-bar__field">
        <label htmlFor="application-search">Search company or job title</label>
        <input
          id="application-search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search company or job title…"
        />
      </p>
      <p className="filter-bar__field">
        <label htmlFor="application-stage-filter">Stage</label>
        <select
          id="application-stage-filter"
          value={stage}
          onChange={(event) => onStageChange(event.target.value as StageFilter)}
        >
          <option value="all">All stages</option>
          {STAGES.map((item) => (
            <option key={item} value={item}>
              {STAGE_LABELS[item]}
            </option>
          ))}
        </select>
      </p>
    </form>
  );
}
