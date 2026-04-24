import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/917975550990?text=Hi%20Globo%20Traveller%2C%20I%20want%20to%20plan%20a%20trip"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-4 z-50 flex items-center gap-2 rounded-full bg-[var(--whatsapp)] px-4 py-3 text-sm font-semibold text-white shadow-brand transition hover:scale-105 md:bottom-6 md:right-6"
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
        <MessageCircle className="relative h-5 w-5" />
      </span>
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
