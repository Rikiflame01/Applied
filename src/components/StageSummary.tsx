import { STAGE_LABELS, STAGES } from "../lib/applications";
import type { Stage } from "../types";

type Props = {
  counts: Record<Stage, number>;
};

export function StageSummary({ counts }: Props) {
  return (
    <ul className="stage-summary">
      {STAGES.map((stage) => (
        <li key={stage} className="stage-summary__item">
          <span className="stage-summary__label">{STAGE_LABELS[stage]}</span>
          <span className="stage-summary__count">{counts[stage]}</span>
        </li>
      ))}
    </ul>
  );
}
