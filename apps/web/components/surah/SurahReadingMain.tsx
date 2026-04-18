"use client";

import { useEffect } from "react";

import { cn } from "@/lib/utils";
import { Surah } from "../quran/SurahCard";
import { useSurahSettings, fontOptions } from "@/context/SurahSettingsContext";
import Image from "next/image";
import AyahNumber from "./AyahNumber";
import VerseActions from "./VerseActions";
import VerseActionsDrawer from "./VerseActionsDrawer";

interface Verse {
  number: number;
  text_ar: string;
  text_en: string;
  juz?: number;
  page?: number;
}

interface SurahReadingMainProps {
  currentSurah: Surah;
  verses: Verse[];
}

export default function SurahReadingMain({
  currentSurah,
  verses,
}: SurahReadingMainProps) {
  const { arabicFontSize, translationFontSize, activeFont } =
    useSurahSettings();

  const currentFontClass =
    fontOptions.find((f) => f.name === activeFont)?.class || "font-noorehuda";

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(`verse-${id}`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }
  }, []);

  return (
    <main className="flex-1 overflow-y-auto px-4 py-8 md:px-12 custom-scrollbar">
      <div className="w-full">
        <div className="flex items-center justify-between mb-16">
          <div className="hidden md:block w-40">
            <Image
              src="/makkah.webp"
              alt="Makkah"
              className="w-full drop-shadow-sm opacity-60"
              width={160}
              height={160}
            />
          </div>

          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Surah {currentSurah.name_transliteration}
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
              <span>
                {currentSurah.number_of_verses || verses.length} Ayahs
              </span>
              <span className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
              <span className="capitalize">
                {currentSurah.revelation_place}
              </span>
            </div>
          </div>

          <div className="hidden md:block w-48">
            {currentSurah.number !== 1 && currentSurah.number !== 9 && (
              <Image
                src="/bismillah.svg"
                alt="Bismillah"
                className="w-full opacity-80"
                width={192}
                height={60}
              />
            )}
          </div>
        </div>

        <div className="space-y-12">
          {verses.map((verse) => (
            <div
              key={verse.number}
              id={`verse-${verse.number}`}
              className="group border-b border-gray-100 pb-12 last:border-0 scroll-mt-24"
            >
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
                <VerseActions
                  surahNumber={currentSurah.number}
                  verseNumber={verse.number}
                />

                <div className="flex-1">
                  <div className="flex justify-end mb-8">
                    <div
                      className={cn(
                        "text-gray-800 text-right leading-[2.5]",
                        currentFontClass,
                      )}
                      style={{ fontSize: `${arabicFontSize}px` }}
                      dir="rtl"
                    >
                      {verse.text_ar}
                      <span className="inline-flex mr-4 align-middle transform scale-90 origin-right">
                        <AyahNumber number={verse.number} />
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-gray-300 tracking-widest uppercase">
                      SAHEEH INTERNATIONAL
                    </span>
                    <p
                      className="text-gray-600 leading-relaxed font-sans"
                      style={{ fontSize: `${translationFontSize}px` }}
                    >
                      {verse.text_en}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <VerseActionsDrawer />
    </main>
  );
}
