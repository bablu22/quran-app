"use client";

import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Read Quran", href: "/read" },
  { label: "Prayer Time", href: "/prayer" },
  { label: "Ramadan 2026", href: "/ramadan" },
];

export function Header() {
  const scrolled = useScroll(10);
  const pathname = usePathname();

  // Hide global header on reading pages
  if (pathname.startsWith("/surah/")) {
    return null;
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all bg-background/70 ",
        scrolled
          ? "bg-background/70 backdrop-blur-md border-border"
          : "bg-background/70 border-none",
      )}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* LEFT: Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-muted/50 transition shrink-0"
        >
          <Logo />
        </Link>

        {/* CENTER: Nav Links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm text-foreground/80 hover:text-foreground hover:bg-muted/50 transition"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {/* Others dropdown placeholder */}
          <li>
            <button className="px-4 py-2 rounded-lg text-sm text-foreground/80 hover:text-foreground hover:bg-muted/50 transition flex items-center gap-1">
              Others
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </li>
        </ul>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Button className="relative hidden md:flex text-sm font-medium rounded-full h-11 p-1 ps-6 pe-2 gap-2 group transition-all duration-500 overflow-hidden">
            <span className="relative z-10">Support Us</span>
            <div className="w-8 h-8 bg-background text-foreground rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={15} />
            </div>
          </Button>
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
