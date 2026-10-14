import { STAGE_LABELS } from "../lib/applications";
import type { Stage } from "../types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  stage: Stage;
};

const stageDot: Record<Stage, string> = {
  wishlist: "bg-[#8a8f98]",
  applied: "bg-primary",
  interview: "bg-[#f0bf00]",
  offer: "bg-[#27a644]",
  closed: "bg-[#eb5757]",
};

export function StageBadge({ stage }: Props) {
  return (
    <Badge
      variant="ghost"
      className="h-5 gap-1.5 px-1 font-normal text-muted-foreground hover:bg-transparent"
    >
      <span className={cn("size-1.5 rounded-full", stageDot[stage])} />
      {STAGE_LABELS[stage]}
    </Badge>
  );
}
