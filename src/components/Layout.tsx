import { Link, NavLink, Outlet } from "react-router";

export function Layout() {
  return (
    <>
      <header className="site-header">
        <Link to="/" className="site-title">
          Applied
        </Link>
        <NavLink to="/new" className="add-application">
          Add application
        </NavLink>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
