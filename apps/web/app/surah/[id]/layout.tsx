"use client";

import { ReadingHeader } from "@/components/surah/ReadingHeader";
import { MiniSidebar } from "@/components/surah/ReadingNav";
import { SurahSettingsProvider } from "@/context/SurahSettingsContext";
import { SurahUIProvider, useSurahUI } from "@/context/SurahUIContext";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import React from "react";

interface SlotProps {
  children: React.ReactNode;
  list: React.ReactNode;
  details: React.ReactNode;
  settings: React.ReactNode;
}

function SurahLayoutInner({ children, list, details, settings }: SlotProps) {
  const { isListOpen, setIsListOpen, isSettingsOpen, setIsSettingsOpen } =
    useSurahUI();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col h-screen overflow-hidden bg-white">
        <ReadingHeader />
        <div className="flex flex-1 overflow-hidden">
          <MiniSidebar />
          <div className="hidden lg:block border-r border-gray-100 w-[300px] shrink-0">
            {list}
          </div>
          <main className="flex-1 overflow-hidden relative flex">
            {details}
            {children}
          </main>
          <div className="hidden xl:block border-l border-gray-100 w-[320px] shrink-0">
            {settings}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <ReadingHeader />

      {/* Mobile Surah List Drawer */}
      <Drawer open={isListOpen} onOpenChange={setIsListOpen} direction="left">
        <DrawerContent className="h-full w-[300px] rounded-none border-r">
          <DrawerTitle className="sr-only">Surah List</DrawerTitle>
          <DrawerDescription className="sr-only">
            Select a surah to read
          </DrawerDescription>
          <div className="flex flex-col h-full overflow-hidden [&>aside]:border-r-0">
            {list}
          </div>
        </DrawerContent>
      </Drawer>

      {/* Mobile Settings Drawer */}
      <Drawer
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        direction="right"
      >
        <DrawerContent className="h-full w-[320px] rounded-none border-l ml-auto">
          <DrawerTitle className="sr-only">Reading Settings</DrawerTitle>
          <DrawerDescription className="sr-only">
            Adjust font size and appearance
          </DrawerDescription>
          <div className="flex flex-col h-full overflow-hidden [&>aside]:border-l-0">
            {settings}
          </div>
        </DrawerContent>
      </Drawer>

      <div className="flex flex-1 overflow-hidden">
        <MiniSidebar />
        {/* Desktop Sidebars */}
        <div className="hidden lg:block border-r border-gray-100 w-[300px] shrink-0">
          {list}
        </div>
        <main className="flex-1 overflow-hidden relative flex">
          {details}
          {children}
        </main>
        <div className="hidden xl:block border-l border-gray-100 w-[320px] shrink-0">
          {settings}
        </div>
      </div>
    </div>
  );
}

export default function SurahLayout(props: SlotProps) {
  return (
    <SurahSettingsProvider>
      <SurahUIProvider>
        <SurahLayoutInner {...props} />
      </SurahUIProvider>
    </SurahSettingsProvider>
  );
}
