import { STAGE_LABELS, STAGES } from "../lib/applications";
import type { Stage } from "../types";

type Props = {
  counts: Record<Stage, number>;
};

export function StageSummary({ counts }: Props) {
  return (
    <ul className="mb-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
      {STAGES.map((stage) => (
        <li key={stage} className="flex items-baseline gap-1.5">
          <span className="text-muted-foreground">{STAGE_LABELS[stage]}</span>
          <span className="font-semibold text-foreground">{counts[stage]}</span>
        </li>
      ))}
    </ul>
  );
}
