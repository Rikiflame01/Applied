import { Inbox, Plus } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "flex h-7 items-center gap-2 rounded-md px-2 text-[13px] text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
    isActive && "bg-foreground/6 text-foreground",
  );

export function Layout() {
  return (
    <div className="flex min-h-svh w-full bg-background">
      <aside className="hidden w-56 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        <div className="flex h-11 items-center px-3">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-md outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <span className="flex size-5 items-center justify-center rounded-[5px] bg-primary text-[11px] font-medium text-primary-foreground">
              A
            </span>
            <span className="text-[13px] font-medium tracking-tight">Applied</span>
          </Link>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 px-2">
          <NavLink to="/" end className={navClass}>
            <Inbox />
            All applications
          </NavLink>
          <NavLink to="/new" className={navClass}>
            <Plus />
            New application
          </NavLink>
        </nav>
        <div className="border-t border-sidebar-border p-2">
          <ThemeToggle />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-11 items-center justify-between gap-2 border-b px-3 md:hidden">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-md outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <span className="flex size-5 items-center justify-center rounded-[5px] bg-primary text-[11px] font-medium text-primary-foreground">
              A
            </span>
            <span className="text-[13px] font-medium tracking-tight">Applied</span>
          </Link>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button asChild variant="accent" size="sm">
              <NavLink to="/new">New</NavLink>
            </Button>
          </div>
        </header>
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
