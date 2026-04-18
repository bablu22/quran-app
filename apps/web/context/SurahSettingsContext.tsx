"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export const fontOptions = [
  { name: "NooreHuda", class: "font-noorehuda" },
  { name: "Hidayat", class: "font-hidayat" },
  { name: "Hira", class: "font-hira" },
  { name: "Amiri", class: "font-amiri" },
];

interface SurahSettingsContextType {
  arabicFontSize: number;
  setArabicFontSize: (size: number) => void;
  translationFontSize: number;
  setTranslationFontSize: (size: number) => void;
  activeFont: string;
  setActiveFont: (font: string) => void;
}

const SurahSettingsContext = createContext<
  SurahSettingsContextType | undefined
>(undefined);

export function SurahSettingsProvider({ children }: { children: ReactNode }) {
  // Use default values initially
  const [arabicFontSize, setArabicFontSize] = useState(40);
  const [translationFontSize, setTranslationFontSize] = useState(21);
  const [activeFont, setActiveFont] = useState(
    fontOptions?.[0]?.name || "NooreHuda",
  );

  // Load from localStorage on mount
  useEffect(() => {
    const savedArabic = localStorage.getItem("quran_arabicFontSize");
    const savedTranslation = localStorage.getItem("quran_translationFontSize");
    const savedFont = localStorage.getItem("quran_activeFont");

    if (savedArabic) {
      setArabicFontSize(Number(savedArabic));
    } else if (window.innerWidth < 768) {
      setArabicFontSize(25);
    }

    if (savedTranslation) {
      setTranslationFontSize(Number(savedTranslation));
    } else if (window.innerWidth < 768) {
      setTranslationFontSize(16);
    }

    if (savedFont) setActiveFont(savedFont);
  }, []);

  // Save to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem("quran_arabicFontSize", arabicFontSize.toString());
  }, [arabicFontSize]);

  useEffect(() => {
    localStorage.setItem(
      "quran_translationFontSize",
      translationFontSize.toString(),
    );
  }, [translationFontSize]);

  useEffect(() => {
    localStorage.setItem("quran_activeFont", activeFont);
  }, [activeFont]);

  return (
    <SurahSettingsContext.Provider
      value={{
        arabicFontSize,
        setArabicFontSize,
        translationFontSize,
        setTranslationFontSize,
        activeFont,
        setActiveFont,
      }}
    >
      {children}
    </SurahSettingsContext.Provider>
  );
}

export function useSurahSettings() {
  const context = useContext(SurahSettingsContext);
  if (context === undefined) {
    throw new Error(
      "useSurahSettings must be used within a SurahSettingsProvider",
    );
  }
  return context;
}
