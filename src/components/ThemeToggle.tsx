import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
