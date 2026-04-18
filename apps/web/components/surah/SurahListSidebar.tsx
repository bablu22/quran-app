"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { Surah, SurahCard } from "../quran/SurahCard";

interface SurahListSidebarProps {
  surahs: Surah[];
  currentSurahNumber: number;
}

export default function SurahListSidebar({ surahs }: SurahListSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSurahs = surahs.filter(
    (s) =>
      s.name_transliteration
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      s.number.toString().includes(searchQuery),
  );

  return (
    <aside className="flex flex-col w-full h-full overflow-hidden border-r border-gray-100 flex-shrink-0 bg-white">
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search Surah"
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-1 focus:ring-primary/20 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
        {filteredSurahs.map((surah) => (
          <SurahCard key={surah.number} surah={surah} />
        ))}
      </div>
    </aside>
  );
}
