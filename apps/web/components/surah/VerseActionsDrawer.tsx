"use client";

import {
  Play,
  BookOpen,
  Bookmark,
  Share2,
  Copy,
  Link as LinkIcon,
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { useSurahUI } from "@/context/SurahUIContext";

export default function VerseActionsDrawer() {
  const { activeVerse, setActiveVerse } = useSurahUI();

  const actions = [
    { icon: Play, label: "Play" },
    { icon: BookOpen, label: "Tafsir" },
    { icon: Bookmark, label: "Bookmark" },
    { icon: Copy, label: "Ayah Copy" },
    { icon: LinkIcon, label: "Copy Link" },
    { icon: Share2, label: "Ayah Share" },
  ];

  return (
    <Drawer
      open={!!activeVerse}
      onOpenChange={(open) => !open && setActiveVerse(null)}
    >
      <DrawerContent className="rounded-t-[32px]">
        <DrawerTitle className="sr-only">Verse Actions</DrawerTitle>
        <DrawerDescription className="sr-only">
          Actions for Surah {activeVerse?.surahNumber}, Verse{" "}
          {activeVerse?.verseNumber}
        </DrawerDescription>
        <div className="p-4 space-y-0.5">
          {actions.map((action, i) => (
            <button
              key={i}
              className="flex items-center gap-4 w-full px-4 py-2.5 hover:bg-gray-50 rounded-xl transition-colors text-gray-700 font-medium"
            >
              <action.icon size={20} className="text-gray-400" />
              <span className="text-[14px]">{action.label}</span>
            </button>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
