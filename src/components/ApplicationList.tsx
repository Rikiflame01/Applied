import type { Application } from "../types";
import { ApplicationCard } from "./ApplicationCard";

type Props = {
  applications: Application[];
};

export function ApplicationList({ applications }: Props) {
  const newestFirst = [...applications].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );

  return (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {newestFirst.map((application) => (
        <li key={application.id}>
          <ApplicationCard application={application} />
        </li>
      ))}
    </ul>
  );
}
