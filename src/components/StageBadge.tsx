import type { Stage } from "../types";

type Props = {
  stage: Stage;
};

const labels: Record<Stage, string> = {
  wishlist: "Saved",
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
  closed: "Closed",
};

export function StageBadge({ stage }: Props) {
  return <span className={`stage-badge stage-badge--${stage}`}>{labels[stage]}</span>;
}
