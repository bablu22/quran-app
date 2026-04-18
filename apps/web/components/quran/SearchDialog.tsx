"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Book, ChevronDown, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface SearchResult {
  surah_number: number;
  verse_number: number;
  surah_name: string;
  text_en: string;
  revelation_place: string;
}

function SearchDialogComponent({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Memoized keyboard shortcut handler
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onOpenChange, open]);

  // Debounced search with request cancellation
  useEffect(() => {
    // Cancel previous request if pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!search.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        abortControllerRef.current = new AbortController();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/search?q=${encodeURIComponent(search)}`,
          { signal: abortControllerRef.current.signal },
        );
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    }, 500);

    debounceTimerRef.current = timer;
    return () => {
      clearTimeout(timer);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [search]);

  const router = useRouter();

  const handleNavigate = useCallback(
    (surahNumber: number, verseNumber?: number) => {
      // Force close before navigation
      onOpenChange(false);
      // Clear search state so it's fresh for next time
      setSearch("");
      setResults([]);
      // Perform navigation
      router.push(
        `/surah/${surahNumber}${verseNumber ? `#${verseNumber}` : ""}`,
      );
    },
    [onOpenChange, router],
  );

  const handleResultClick = useCallback(
    (result: SearchResult) => {
      onOpenChange(false);
      setSearch("");
      setResults([]);
      router.push(
        `/surah/${result.surah_number}${result.verse_number ? `#${result.verse_number}` : ""}`,
      );
    },
    [onOpenChange, router],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden rounded-3xl border-none shadow-2xl">
        <DialogTitle className="sr-only">Search Quran</DialogTitle>
        <div className="p-6">
          {/* Search Input Area */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative flex-1 group">
              <Book
                className="absolute left-0 top-1/2 -translate-y-1/2 text-primary"
                size={22}
              />
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find wisdom in the Quran"
                className="w-full pl-10 pr-4 py-2 text-xl font-medium text-gray-800 placeholder:text-gray-300 outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100 text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors">
                <span>Quran</span>
                <ChevronDown size={14} />
              </button>
              <button className="p-2 bg-gray-50 rounded-full border border-gray-100 text-gray-400 hover:text-primary transition-colors">
                <SlidersHorizontal size={18} />
              </button>
            </div>
          </div>

          {/* Navigation Suggestions & Search Results */}
          <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {search.trim() === "" ? (
              <></>
            ) : (
              <div>
                <div className="space-y-4">
                  {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={`skeleton-${i}`}
                        className="flex flex-col gap-3 w-full p-4 border border-gray-50 rounded-2xl"
                      >
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-4 w-32 rounded-full" />
                          <Skeleton className="h-3 w-16 rounded-full" />
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-3 w-full rounded-full" />
                          <Skeleton className="h-3 w-2/3 rounded-full" />
                        </div>
                      </div>
                    ))
                  ) : results.length > 0 ? (
                    results.map((result) => (
                      <button
                        key={`${result.surah_number}-${result.verse_number}`}
                        onClick={() => handleResultClick(result)}
                        className="flex cursor-pointer flex-col gap-1 w-full p-4 hover:bg-gray-50 rounded-2xl transition-colors text-left group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-primary">
                            {result.surah_name}{" "}
                            <span className="text-gray-400 font-medium">
                              {result.surah_number}:{result.verse_number}
                            </span>
                          </span>
                          <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase font-bold tracking-tighter">
                            {result.revelation_place}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                          {result.text_en}
                        </p>
                      </button>
                    ))
                  ) : (
                    <p className="text-center py-10 text-gray-400 text-sm font-medium">
                      No results found for "{search}"
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-gray-50/50 p-4 border-t border-gray-50 text-center">
          <span className="text-xs font-bold text-gray-400 font-amiri tracking-wider">
            [ Al Hijr : 99 ]
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export const SearchDialog = memo(SearchDialogComponent);
