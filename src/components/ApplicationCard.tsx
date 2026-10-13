import { Link } from "react-router";
import { describeTiming, needsNudge } from "../lib/applications";
import type { Application } from "../types";
import { StageBadge } from "./StageBadge";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  application: Application;
};

export function ApplicationCard({ application }: Props) {
  const nudge = needsNudge(application);

  return (
    <Card className="h-full transition-colors hover:ring-foreground/20">
      <Link
        to={`/applications/${application.id}`}
        className="block rounded-xl focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        aria-label={`${application.company}, ${application.role}`}
      >
        <CardHeader>
          <CardTitle>
            {application.company}
            <span className="font-normal text-muted-foreground">
              {" "}
              · {application.role}
            </span>
          </CardTitle>
          <CardAction>
            <StageBadge stage={application.stage} />
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-2">
          <CardDescription>{describeTiming(application)}</CardDescription>
          {nudge ? (
            <Badge className="border-transparent bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
              Needs a nudge
            </Badge>
          ) : null}
        </CardContent>
      </Link>
    </Card>
  );
}
