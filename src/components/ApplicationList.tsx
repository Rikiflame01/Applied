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
    <ul className="divide-y border-y">
      {newestFirst.map((application) => (
        <li key={application.id}>
          <ApplicationCard application={application} />
        </li>
      ))}
    </ul>
  );
}
