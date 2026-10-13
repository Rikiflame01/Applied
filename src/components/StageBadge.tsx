import { STAGE_LABELS } from "../lib/applications";
import type { Stage } from "../types";

type Props = {
  stage: Stage;
};

export function StageBadge({ stage }: Props) {
  return (
    <span className={`stage-badge stage-badge--${stage}`}>
      {STAGE_LABELS[stage]}
    </span>
  );
}
