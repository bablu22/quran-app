"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

export interface Surah {
  number: number;
  name_ar: string;
  name_en: string;
  name_transliteration: string;
  revelation_place: string;
  number_of_verses: number;
}

interface SurahCardProps {
  surah: Surah;
}

export function SurahCard({ surah }: SurahCardProps) {
  return (
    <Link
      href={`/surah/${surah.number}`}
      className="group relative flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 hover:border-primary/20 transition-all duration-300 text-left hover:bg-background/50"
    >
      <div className="flex items-center gap-4">
        {/* Diamond Number Badge */}
        <div className="relative flex-shrink-0 w-8 h-8 flex items-center justify-center">
          <div
            className={cn(
              "absolute inset-0 rotate-45 rounded-[4px] transition-colors duration-300 bg-[#F9FAFB] group-hover:bg-[#428038]",
            )}
          />
          <span
            className={cn(
              "relative z-10 text-[12px] font-bold transition-colors duration-300 text-[#9CA3AF] group-hover:text-white",
            )}
          >
            {surah.number}
          </span>
        </div>

        {/* Surah Info */}
        <div className="flex flex-col min-w-0">
          <h3 className="text-[15px] font-bold font-sans text-[#1F2937] leading-tight group-hover:text-primary transition-colors duration-300 truncate">
            {surah.name_transliteration}
          </h3>
          <p className="text-[12px] text-[#9CA3AF] mt-0.5 font-normal truncate">
            {surah.name_en}
          </p>
        </div>
      </div>

      {/* Arabic Name */}
      <div className="flex items-center pl-2">
        <h2
          className="text-xl md:text-2xl text-[#374151] font-amiri leading-none opacity-80 group-hover:opacity-100 transition-all duration-300"
          dir="rtl"
        >
          {surah.name_ar}
        </h2>
      </div>
    </Link>
  );
}
