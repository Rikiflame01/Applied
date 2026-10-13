import { ApplicationList } from "../components/ApplicationList";
import { seedApplications } from "../data/seed";

export function ApplicationsPage() {
  return (
    <>
      <h1 className="visually-hidden">Job applications</h1>
      <ApplicationList applications={seedApplications} />
    </>
  );
}
