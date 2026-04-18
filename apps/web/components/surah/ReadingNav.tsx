"use client";

import { cn } from "@/lib/utils";
import { Bookmark, Grid, Home, Layout, Send } from "lucide-react";
import Link from "next/link";

export function MiniSidebar() {
  const icons = [
    { icon: Home, active: false, href: "/" },
    { icon: Grid, active: true, href: "#" },
    { icon: Send, active: false, href: "#" },
    { icon: Bookmark, active: false, href: "#" },
    { icon: Layout, active: false, href: "#" },
  ];

  return (
    <aside className="hidden md:flex w-16 border-r border-gray-100 flex-col items-center py-6 gap-8 bg-white shrink-0">
      {icons.map((item, i) => (
        <Link
          href={item.href}
          key={i}
          className={cn(
            "p-2 rounded-xl transition-all",
            item.active
              ? "bg-primary/10 text-primary"
              : "text-gray-300 hover:text-gray-500 hover:bg-gray-50",
          )}
        >
          <item.icon size={22} />
        </Link>
      ))}
    </aside>
  );
}
