import { Globe2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "light";
  className?: string;
  showTag?: boolean;
}

export function Logo({ variant = "default", className, showTag = false }: LogoProps) {
  const isLight = variant === "light";
  return (
    <Link to="/" className={cn("inline-flex items-center gap-2 group", className)}>
      <span
        className={cn(
          "relative flex h-9 w-9 items-center justify-center rounded-xl shadow-soft transition-transform group-hover:rotate-6",
          isLight ? "bg-white/15 backdrop-blur ring-1 ring-white/30" : "bg-gradient-brand"
        )}
      >
        <Globe2 className={cn("h-5 w-5", isLight ? "text-white" : "text-primary-foreground")} strokeWidth={2.4} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.05rem] font-extrabold tracking-tight",
            isLight ? "text-white" : "text-foreground"
          )}
        >
          Globo<span className="text-primary group-data-[variant=light]:text-warm">{isLight ? "" : ""}</span>
          <span className={cn(isLight ? "text-warm" : "text-primary")}>·</span>traveller
        </span>
        {showTag && (
          <span className={cn("text-[10px] font-medium uppercase tracking-[0.18em]", isLight ? "text-white/70" : "text-muted-foreground")}>
            Explore more
          </span>
        )}
      </span>
    </Link>
  );
}
