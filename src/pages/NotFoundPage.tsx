import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <section className="page-message">
      <h1>That page does not exist</h1>
      <p>You may have followed an old link, or mistyped the address.</p>
      <p>
        <Link to="/" className="text-link">
          Back to all applications
        </Link>
      </p>
    </section>
  );
}
