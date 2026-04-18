import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, MessageCircle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/trips", label: "Trips" },
  { to: "/trips?category=weekend", label: "Weekend" },
  { to: "/trips?category=international", label: "International" },
  { to: "/trips?category=trekking", label: "Treks" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all",
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-lg shadow-soft"
          : "bg-background/0"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to as "/"}
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/75 transition hover:bg-primary-soft hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/919999999999?text=Hi%20Globo%20Traveller%2C%20I%20have%20a%20question"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground/80 transition hover:border-[var(--whatsapp)] hover:text-[var(--whatsapp)] sm:inline-flex"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </a>
          <Button asChild size="sm" className="hidden rounded-full px-5 sm:inline-flex">
            <Link to="/trips">Explore Trips</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu">
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm">
              <div className="mt-2 flex flex-col gap-1">
                <Logo />
                <nav className="mt-6 flex flex-col">
                  {nav.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to as "/"}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-3 py-3 text-base font-medium text-foreground/85 hover:bg-primary-soft hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <Button asChild className="mt-4 rounded-full" onClick={() => setOpen(false)}>
                  <Link to="/trips">Explore Trips</Link>
                </Button>
                <a
                  href="https://wa.me/919999999999"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-foreground"
                >
                  <MessageCircle className="h-4 w-4 text-[var(--whatsapp)]" />
                  Chat on WhatsApp
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
