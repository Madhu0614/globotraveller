import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle, ChevronDown } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  to?: string;
  children?: { label: string; to: string }[];
};

const nav: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "Destinations",
    children: [
      { label: "Ladakh", to: "/trips?destination=ladakh" },
      { label: "Spiti Valley", to: "/trips?destination=spiti-valley" },
      { label: "Kashmir", to: "/trips?destination=kashmir" },
      { label: "Meghalaya", to: "/trips?destination=meghalaya" },
      { label: "Kerala", to: "/trips?destination=kerala" },
      { label: "Rajasthan", to: "/trips?destination=rajasthan" },
    ],
  },
  {
    label: "Domestic Trips",
    children: [
      { label: "Weekend Trips", to: "/trips?category=weekend" },
      { label: "Backpacking Trips", to: "/trips?category=backpacking" },
      { label: "Group Trips", to: "/trips?type=group" },
      { label: "Upcoming Trips", to: "/trips?category=upcoming" },
    ],
  },
  {
    label: "International Trips",
    children: [
      { label: "Bali", to: "/trips?destination=bali" },
      { label: "Vietnam", to: "/trips?destination=vietnam" },
      { label: "Thailand", to: "/trips?destination=thailand" },
      { label: "Japan", to: "/trips?destination=japan" },
      { label: "Georgia", to: "/trips?destination=georgia" },
      { label: "Sri Lanka", to: "/trips?destination=sri-lanka" },
    ],
  },
  {
    label: "Treks",
    children: [
      { label: "All Treks", to: "/trips?category=trekking" },
      { label: "Triund Trek", to: "/trips?destination=triund" },
      { label: "Kedarkantha", to: "/trips?destination=kedarkantha" },
      { label: "Hampta Pass", to: "/trips?destination=hampta-pass" },
    ],
  },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileOpenMenus, setMobileOpenMenus] = useState<string[]>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMobileMenu = (label: string) => {
    setMobileOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

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

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-foreground/75 transition hover:bg-primary-soft hover:text-primary"
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>

                <div className="invisible absolute left-0 top-full z-50 mt-2 min-w-[240px] rounded-2xl border border-border/60 bg-background p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="flex flex-col gap-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.to as "/"}
                        className="rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 transition hover:bg-primary-soft hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                to={(item.to || "/") as "/"}
                className="rounded-full px-3 py-2 text-sm font-medium text-foreground/75 transition hover:bg-primary-soft hover:text-primary"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/917975550990"
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

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[88vw] max-w-sm overflow-y-auto">
              <div className="mt-2 flex flex-col gap-1 pb-6">
                <Logo />

                <nav className="mt-6 flex flex-col gap-2">
                  {nav.map((item) =>
                    item.children ? (
                      <div key={item.label} className="rounded-xl border border-border/50">
                        <button
                          type="button"
                          onClick={() => toggleMobileMenu(item.label)}
                          className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base font-medium text-foreground/85"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              mobileOpenMenus.includes(item.label) && "rotate-180"
                            )}
                          />
                        </button>

                        {mobileOpenMenus.includes(item.label) && (
                          <div className="flex flex-col gap-1 px-2 pb-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                to={child.to as "/"}
                                onClick={() => setOpen(false)}
                                className="rounded-lg px-3 py-2 text-sm text-foreground/75 hover:bg-primary-soft hover:text-primary"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        key={item.label}
                        to={(item.to || "/") as "/"}
                        onClick={() => setOpen(false)}
                        className="rounded-xl px-3 py-3 text-base font-medium text-foreground/85 hover:bg-primary-soft hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </nav>

                <Button asChild className="mt-4 rounded-full" onClick={() => setOpen(false)}>
                  <Link to="/trips">Explore Trips</Link>
                </Button>

                <a
                  href="https://wa.me/917975550990"
                  target="_blank"
                  rel="noopener noreferrer"
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