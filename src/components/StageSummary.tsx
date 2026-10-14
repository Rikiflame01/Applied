import { STAGE_LABELS, STAGES } from "../lib/applications";
import type { Stage } from "../types";
import { Button } from "@/components/ui/button";
import type { StageFilter } from "./FilterBar";

type Props = {
  counts: Record<Stage, number>;
  stage: StageFilter;
  onStageChange: (value: StageFilter) => void;
};

export function StageSummary({ counts, stage, onStageChange }: Props) {
  const total = STAGES.reduce((sum, item) => sum + counts[item], 0);

  return (
    <ul className="flex flex-wrap items-center gap-0.5">
      <li>
        <Button
          type="button"
          size="sm"
          variant={stage === "all" ? "secondary" : "ghost"}
          className="text-muted-foreground"
          onClick={() => onStageChange("all")}
        >
          All
          <span className="tabular-nums text-foreground">{total}</span>
        </Button>
      </li>
      {STAGES.map((item) => (
        <li key={item}>
          <Button
            type="button"
            size="sm"
            variant={stage === item ? "secondary" : "ghost"}
            className="text-muted-foreground"
            onClick={() => onStageChange(item)}
          >
            {STAGE_LABELS[item]}
            <span className="tabular-nums text-foreground">{counts[item]}</span>
          </Button>
        </li>
      ))}
    </ul>
  );
}
