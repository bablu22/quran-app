"use client";

import { Menu, Settings2, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Logo } from "../logo";
import Link from "next/link";
import React from "react";
import { useSurahUI } from "@/context/SurahUIContext";

export function ReadingHeader() {
  const { setIsListOpen, setIsSettingsOpen } = useSurahUI();

  return (
    <header className="h-16 border-b border-gray-100 flex items-center justify-between px-4 md:px-6 bg-white sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-gray-500"
          onClick={() => setIsListOpen(true)}
        >
          <Menu size={20} />
        </Button>
        <Link href="/" className="flex items-center gap-3">
          <Logo />
        </Link>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="xl:hidden text-gray-500"
          onClick={() => setIsSettingsOpen(true)}
        >
          <Settings2 size={20} />
        </Button>
        <Button className="hidden sm:flex bg-primary hover:bg-primary/90 text-white rounded-full h-9 px-5 text-sm font-bold items-center gap-2 shadow-none">
          Support Us
          <Heart size={14} fill="currentColor" />
        </Button>
      </div>
    </header>
  );
}
