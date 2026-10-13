import { STAGE_LABELS } from "../lib/applications";
import type { Stage } from "../types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  stage: Stage;
};

const stageClass: Record<Stage, string> = {
  wishlist:
    "border-transparent bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  applied:
    "border-transparent bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
  interview:
    "border-transparent bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
  offer:
    "border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
  closed:
    "border-transparent bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200",
};

export function StageBadge({ stage }: Props) {
  return (
    <Badge className={cn("uppercase tracking-wide", stageClass[stage])}>
      {STAGE_LABELS[stage]}
    </Badge>
  );
}
