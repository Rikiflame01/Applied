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
      className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-[1fr_12rem] md:items-end"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="grid gap-1.5">
        <Label htmlFor="application-search">Search company or job title</Label>
        <Input
          id="application-search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search company or job title…"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="application-stage-filter">Stage</Label>
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
