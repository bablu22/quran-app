"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { SearchDialog } from "./quran/SearchDialog";

const QUICK_LINKS = ["Al Mulk", "Yasin", "Al Kahf", "Al Ikhlas"];

export function HeroSection() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <section
      className="relative h-[100svh] w-full overflow-hidden pt-16 flex flex-col"
      style={{ backgroundImage: "var(--gradient-hero-primary)" }}
    >
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex flex-1 flex-col items-center justify-center px-4 -mt-10">
        {/* Title */}
        <h1 className="mb-6 text-center text-4xl font-semibold tracking-tight text-[#343634] md:text-6xl">
          QURAN &nbsp;MAZID
        </h1>

        {/* Search Bar */}
        <button
          className="relative mb-4 w-full max-w-[510px] cursor-pointer text-left focus:outline-none"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSearchOpen(true);
          }}
        >
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8d9e93]"
          />
          <div className="h-12 w-full flex items-center rounded-full border border-[#c9d8c9] bg-[#eef2ee] pl-11 pr-20 text-sm text-[#90a096] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] outline-none transition transition-all hover:bg-[#e6ece6]">
            What do you want to read?
          </div>
          <kbd className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-[#d6ded6] bg-[#f4f6f4] px-3 py-0.5 text-[11px] font-semibold text-[#9ba9a0]">
            Ctrl+K
          </kbd>
        </button>

        {/* Quick Links */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {QUICK_LINKS.map((surah) => (
            <button
              key={surah}
              className="rounded-full border border-[#dbe4db] bg-[#e8eeea] px-5 py-1.5 text-sm text-[#7b8f82] transition hover:bg-[var(--download-app-svg-1)]"
            >
              {surah}
            </button>
          ))}
        </div>

        {/* Verse */}
        <div className="mb-12 max-w-[600px] text-center">
          <p className="text-[24px] leading-tight text-[#6f8377] font-sans md:text-[32px]">
            And worship your Lord until there comes to you the certainty
            (death).
          </p>
          <p className="mt-4 text-[26px] leading-none text-[#76897e] font-amiri">
            وَاعْبُدْ رَبَّكَ حَتَّى يَأْتِيَكَ الْيَقِينُ
          </p>
          <p className="mt-3 text-[13px] font-medium tracking-wide text-[#879a8f]">
            [ Al Hijr : 99 ]
          </p>
        </div>
      </div>

      {/* Skyline Image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[100px] md:h-[160px] lg:h-[200px]"
        style={{
          backgroundImage: 'url("/hero-bottom.svg")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom center",
          backgroundSize: "contain",
          opacity: 0.6,
        }}
      />
    </section>
  );
}
