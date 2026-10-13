import { Link, NavLink, Outlet } from "react-router";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

export function Layout() {
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-4xl flex-col border-x bg-background">
      <header className="flex items-center justify-between gap-3 border-b px-4 py-3 md:px-6">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          Applied
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="accent">
            <NavLink to="/new">Add application</NavLink>
          </Button>
        </div>
      </header>
      <main className="flex-1 px-4 py-4 md:px-6 md:py-6">
        <Outlet />
      </main>
    </div>
  );
}
