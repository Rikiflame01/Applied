import { Link } from "react-router";

export function NewApplicationPage() {
  return (
    <section className="page">
      <p>
        <Link to="/" className="text-link">
          ← Back to all applications
        </Link>
      </p>
      <h1>Add an application</h1>
      <p className="page-lede">
        The form for a new job will live here. Cancel to go back to the list.
      </p>
      <p>
        <Link to="/" className="text-link">
          Cancel
        </Link>
      </p>
    </section>
  );
}
