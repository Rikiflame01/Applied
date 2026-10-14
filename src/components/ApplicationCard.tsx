import { Link } from "react-router";
import { compactTiming, needsNudge } from "../lib/applications";
import type { Application } from "../types";
import { StageBadge } from "./StageBadge";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type Props = {
  application: Application;
};

export function ApplicationCard({ application }: Props) {
  const nudge = needsNudge(application);

  return (
    <Card
      size="sm"
      className="rounded-none border-0 bg-transparent py-0 shadow-none hover:bg-muted/70"
    >
      <Link
        to={`/applications/${application.id}`}
        className="flex items-center gap-2 px-3 py-1.5 outline-none focus-visible:bg-muted"
        aria-label={`${application.company}, ${application.role}`}
      >
        <span className="min-w-0 flex-1 truncate font-medium text-foreground">
          {application.company}
          <span className="font-normal text-muted-foreground">
            {" "}
            · {application.role}
          </span>
        </span>
        {nudge ? (
          <Badge
            variant="outline"
            className="hidden border-transparent bg-transparent font-normal text-[#f0bf00] sm:inline-flex"
          >
            <span className="size-1.5 rounded-full bg-[#f0bf00]" />
            Nudge
          </Badge>
        ) : null}
        <StageBadge stage={application.stage} />
        <span className="w-8 shrink-0 text-right text-[12px] text-muted-foreground tabular-nums">
          {compactTiming(application)}
        </span>
      </Link>
    </Card>
  );
}
