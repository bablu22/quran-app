"use client";

import { fontOptions, useSurahSettings } from "@/context/SurahSettingsContext";
import { cn } from "@/lib/utils";
import { ChevronDown, Settings2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function SurahSettingsSidebar() {
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);
  const {
    arabicFontSize,
    setArabicFontSize,
    translationFontSize,
    setTranslationFontSize,
    activeFont,
    setActiveFont,
  } = useSurahSettings();

  return (
    <aside className="flex flex-col w-full h-full overflow-hidden border-l border-gray-100 flex-shrink-0 bg-white">
      <div className="p-4 border-b border-gray-100">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="pt-2">
              <div className="flex items-center justify-between mb-4 group cursor-pointer">
                <div className="flex items-center gap-2">
                  <Settings2 size={18} className="text-primary" />
                  <span className="text-sm font-bold text-gray-700">
                    Settings
                  </span>
                </div>
                <ChevronDown size={18} className="text-gray-400" />
              </div>

              <div className="space-y-6 pl-1">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                    <span>Arabic Font Size</span>
                    <span className="text-primary">{arabicFontSize}</span>
                  </div>
                  <input
                    type="range"
                    min="24"
                    max="80"
                    value={arabicFontSize}
                    onChange={(e) =>
                      setArabicFontSize(parseInt(e.target.value))
                    }
                    className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                    <span>Translation Font Size</span>
                    <span className="text-primary">{translationFontSize}</span>
                  </div>
                  <input
                    type="range"
                    min="14"
                    max="40"
                    value={translationFontSize}
                    onChange={(e) =>
                      setTranslationFontSize(parseInt(e.target.value))
                    }
                    className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div className="space-y-3 relative">
                  <span className="text-xs font-bold text-gray-500">
                    Arabic Font Face
                  </span>
                  <div className="relative">
                    <button
                      onClick={() => setIsFontDropdownOpen(!isFontDropdownOpen)}
                      className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors border border-transparent focus:border-primary/20"
                    >
                      <span>{activeFont}</span>
                      <ChevronDown
                        size={14}
                        className={cn(
                          "text-gray-400 transition-transform duration-200",
                          isFontDropdownOpen && "rotate-180",
                        )}
                      />
                    </button>

                    {isFontDropdownOpen && (
                      <div className="absolute top-full left-0 w-full mt-2 py-2 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">
                        {fontOptions.map((font) => (
                          <button
                            key={font.name}
                            onClick={() => {
                              setActiveFont(font.name);
                              setIsFontDropdownOpen(false);
                            }}
                            className={cn(
                              "w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-primary/5",
                              activeFont === font.name
                                ? "text-primary font-bold bg-primary/5"
                                : "text-gray-600",
                            )}
                          >
                            {font.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-5 bg-primary/5 rounded-2xl border border-primary/10">
            <h4 className="text-sm font-bold text-gray-800 mb-2">
              Help spread the knowledge of Islam
            </h4>
            <p className="text-[11px] text-gray-500 leading-relaxed mb-4">
              Your regular support helps us reach our religious brothers and
              sisters with the message of Islam. Join our mission and be part of
              the big change.
            </p>
            <Button className="w-full h-10 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-bold shadow-none">
              Support Us
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
