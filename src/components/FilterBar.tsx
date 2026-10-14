import { Search } from "lucide-react";
import { STAGE_LABELS, STAGES } from "../lib/applications";
import type { Stage } from "../types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <form
      className="flex flex-wrap items-center gap-2"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="relative min-w-0 flex-1">
        <Label htmlFor="application-search" className="sr-only">
          Search company or job title
        </Label>
        <Search className="pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="application-search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Filter by company or title…"
          className="pl-7"
        />
      </div>
      <div className="w-full sm:w-36">
        <Label htmlFor="application-stage-filter" className="sr-only">
          Stage
        </Label>
        <Select
          value={stage}
          onValueChange={(value) => onStageChange(value as StageFilter)}
        >
          <SelectTrigger id="application-stage-filter" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All stages</SelectItem>
            {STAGES.map((item) => (
              <SelectItem key={item} value={item}>
                {STAGE_LABELS[item]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}
