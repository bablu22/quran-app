"use client";

import { Play, BookOpen, Bookmark, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSurahUI } from "@/context/SurahUIContext";
import { Button } from "../ui/button";

interface VerseActionsProps {
  surahNumber: number;
  verseNumber: number;
  className?: string;
}

export default function VerseActions({
  surahNumber,
  verseNumber,
  className,
}: VerseActionsProps) {
  const { setActiveVerse } = useSurahUI();

  return (
    <div
      className={cn(
        "flex items-center justify-between w-full h-fit mb-4 md:mb-0 md:flex-col md:w-auto md:gap-5 md:mt-1 md:shrink-0 md:bg-primary/5 md:rounded-full md:px-2 md:py-4 md:border md:border-primary/10",
        className,
      )}
    >
      {/* Surah:Verse ID */}
      <div className="text-[13px] md:text-[11px] font-bold text-primary/60 tracking-tighter">
        {surahNumber}:{verseNumber}
      </div>

      {/* Mobile Trigger (Three Dots) - Now just sets context state */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-gray-600"
          onClick={() => setActiveVerse({ surahNumber, verseNumber })}
        >
          <MoreHorizontal size={20} />
        </Button>
      </div>

      {/* Desktop Actions Sidebar */}
      <div className="hidden md:flex flex-col gap-4 text-gray-400">
        <button className="hover:text-primary transition-colors">
          <Play size={18} fill="currentColor" className="opacity-20 hover:opacity-100" />
        </button>
        <button className="hover:text-primary transition-colors">
          <BookOpen size={18} />
        </button>
        <button className="hover:text-primary transition-colors">
          <Bookmark size={18} />
        </button>
        <button className="hover:text-primary transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}
