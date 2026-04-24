import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown, Mail, Menu, MessageCircle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type MobileNavItem = {
  label: string;
  to?: string;
  children?: { label: string; to: string }[];
};

const desktopLeft = [
  { label: "Destinations", to: "/trips" },
  { label: "Experiences", to: "/trips" },
];

const desktopRight = [
  { label: "Blogs", to: "/faq" },
  { label: "About Us", to: "/about" },
  { label: "Travel Guide", to: "/faq", emphasized: true },
];

const mobileNav: MobileNavItem[] = [
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
  { label: "Blogs", to: "/faq" },
  { label: "About Us", to: "/about" },
  { label: "Travel Guide", to: "/faq" },
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
        "fixed left-0 right-0 top-0 z-40 w-full pt-4 transition-all",
        scrolled && "backdrop-blur-sm"
      )}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div
          className={cn(
            "rounded-[1.15rem] border border-white/80 bg-white/94 px-5 py-1.5 shadow-brand backdrop-blur-md transition-all md:px-7",
            scrolled && "bg-white/96"
          )}
        >
          <div className="hidden min-h-[58px] items-center justify-between gap-5 lg:grid lg:grid-cols-[1fr_auto_1fr]">
            <div className="flex items-center gap-3 justify-self-start">
              <a
                href="mailto:hello@globotraveller.in"
                className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-primary px-3.5 text-xs font-semibold text-primary-foreground transition hover:bg-[#2d3d2d]"
              >
                <Mail className="h-3 w-3" />
                Contact Now
              </a>
              {desktopLeft.map((item) => (
                <Link
                  key={item.label}
                  to={item.to as "/"}
                  className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-foreground/80 transition hover:bg-primary-soft hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Logo className="items-center justify-self-center" />

            <nav className="flex items-center justify-end gap-2 justify-self-end">
              {desktopRight.map((item) =>
                item.emphasized ? (
                  <Link
                    key={item.label}
                    to={item.to as "/"}
                    className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#111111] px-3.5 text-xs font-semibold text-white transition hover:bg-primary"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                ) : (
                  <Link
                    key={item.label}
                    to={item.to as "/"}
                    className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-foreground/80 transition hover:bg-primary-soft hover:text-primary"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          <div className="flex min-h-[46px] items-center justify-between gap-3 lg:hidden">
            <a
              href="mailto:hello@globotraveller.in"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground"
              aria-label="Contact now"
            >
              <Mail className="h-3.5 w-3.5" />
            </a>

            <Logo className="items-center" />

            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/917975550990"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground/80 transition hover:border-[var(--whatsapp)] hover:text-[var(--whatsapp)] sm:inline-flex"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp
              </a>

              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg" aria-label="Menu">
                    <Menu className="h-4.5 w-4.5" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-[88vw] max-w-sm overflow-y-auto">
                  <div className="mt-2 flex flex-col gap-1 pb-6">
                    <Logo showTag />

                    <nav className="mt-6 flex flex-col gap-2">
                      {mobileNav.map((item) =>
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
                      <Link to="/trips">Explore Packages</Link>
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
        </div>
      </div>
    </header>
  );
}
