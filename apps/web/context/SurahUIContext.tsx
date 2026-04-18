"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface SurahUIContextType {
  isListOpen: boolean;
  setIsListOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  activeVerse: { surahNumber: number; verseNumber: number } | null;
  setActiveVerse: (
    verse: { surahNumber: number; verseNumber: number } | null,
  ) => void;
}

const SurahUIContext = createContext<SurahUIContextType | undefined>(undefined);

export function SurahUIProvider({ children }: { children: ReactNode }) {
  const [isListOpen, setIsListOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeVerse, setActiveVerse] = useState<{
    surahNumber: number;
    verseNumber: number;
  } | null>(null);

  return (
    <SurahUIContext.Provider
      value={{
        isListOpen,
        setIsListOpen,
        isSettingsOpen,
        setIsSettingsOpen,
        activeVerse,
        setActiveVerse,
      }}
    >
      {children}
    </SurahUIContext.Provider>
  );
}

export function useSurahUI() {
  const context = useContext(SurahUIContext);
  if (context === undefined) {
    throw new Error("useSurahUI must be used within a SurahUIProvider");
  }
  return context;
}
