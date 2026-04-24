import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import logoImage from "@/assets/final_logo.png";

interface LogoProps {
  variant?: "default" | "light";
  className?: string;
  showTag?: boolean;
}

export function Logo({ variant = "default", className, showTag = false }: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link to="/" className={cn("inline-flex flex-col items-start gap-1", className)}>
      <span
        className={cn(
          "flex items-center overflow-hidden",
          showTag ? "h-[36px] sm:h-[40px]" : "h-[40px] sm:h-[44px]"
        )}
      >
        <img
          src={logoImage}
          alt="Globo Traveller"
          className={cn(
            "h-full w-auto object-contain origin-center",
            showTag ? "scale-[1.22] sm:scale-[1.26]" : "scale-[1.46] sm:scale-[1.54]",
            isLight && "brightness-0 invert"
          )}
        />
      </span>
      {showTag && (
        <span
          className={cn(
            "pl-1 text-[10px] font-medium uppercase tracking-[0.18em]",
            isLight ? "text-white/70" : "text-muted-foreground"
          )}
        >
          We make it happen
        </span>
      )}
    </Link>
  );
}
