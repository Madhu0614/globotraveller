import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Facebook, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-gradient-to-b from-secondary/60 to-background">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo showTag />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Curated group trips, weekend getaways, treks, and international adventures designed for modern Indian travellers.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex max-w-sm gap-2 rounded-full border border-border bg-card p-1 shadow-soft"
            >
              <Input
                type="email"
                placeholder="Get trip drops in your inbox"
                className="border-0 bg-transparent shadow-none focus-visible:ring-0"
              />
              <Button type="submit" size="sm" className="rounded-full px-4">
                Subscribe
              </Button>
            </form>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Trips</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/trips" className="hover:text-primary">All trips</Link></li>
              <li><Link to="/trips" search={{ category: "weekend" } as never} className="hover:text-primary">Weekend trips</Link></li>
              <li><Link to="/trips" search={{ category: "international" } as never} className="hover:text-primary">International</Link></li>
              <li><Link to="/trips" search={{ category: "trekking" } as never} className="hover:text-primary">Treks</Link></li>
              <li><Link to="/trips" search={{ category: "himalayan" } as never} className="hover:text-primary">Himalayan</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary">About us</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
              <li><Link to="/legal/terms" className="hover:text-primary">Terms</Link></li>
              <li><Link to="/legal/privacy" className="hover:text-primary">Privacy</Link></li>
              <li><Link to="/legal/cancellation" className="hover:text-primary">Cancellation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Reach us</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-primary" />
                <span>+91 99999 99999</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-primary" />
                <span>hello@globotraveller.in</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span>Bengaluru, India</span>
              </li>
            </ul>
            <a
              href="https://wa.me/919999999999"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--whatsapp)] px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp us
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 md:flex-row md:items-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Globo Traveller. Wander responsibly.</p>
          <div className="flex items-center gap-3 text-muted-foreground">
            <a href="#" aria-label="Instagram" className="transition hover:text-primary"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="YouTube" className="transition hover:text-primary"><Youtube className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="transition hover:text-primary"><Facebook className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
