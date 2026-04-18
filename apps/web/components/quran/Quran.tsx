"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { SurahCard, type Surah } from "./SurahCard";

const INITIAL_COUNT = 24;
const LOAD_MORE_COUNT = 24;

interface QuranProps {
  surahs: Surah[];
}

export default function QuranMazid({ surahs }: QuranProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const visibleSurahs = surahs.slice(0, visibleCount);
  const hasMore = visibleCount < surahs.length;

  return (
    <div className="min-h-screen bg-white md:bg-gray-50/10 px-4 md:px-12 py-10 md:py-16">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight font-sans">
            Quran Mazid
          </h1>
        </div>

        {/* Surah Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {visibleSurahs.map((surah) => (
            <SurahCard key={surah.number} surah={surah} />
          ))}
        </div>

        {/* Show More Button */}
        {hasMore && (
          <div className="flex justify-center mt-12 mb-10">
            <Button
              onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}
              className="h-10 px-6 rounded-lg bg-gray-100 border-none text-gray-500 font-medium hover:bg-gray-200 transition-all flex items-center gap-2 shadow-none"
            >
              Show More
              <ChevronDown className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
