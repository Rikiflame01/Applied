import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <section className="space-y-3 p-4">
      <h1 className="text-[15px] font-medium tracking-tight">That page does not exist</h1>
      <p className="text-muted-foreground">
        You may have followed an old link, or mistyped the address.
      </p>
      <Button asChild variant="link" className="h-auto px-0">
        <Link to="/">Back to all applications</Link>
      </Button>
    </section>
  );
}
