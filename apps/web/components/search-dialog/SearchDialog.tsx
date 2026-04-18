"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Book, ChevronDown, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  memo,
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  useTransition,
  type ChangeEvent,
} from "react";

import { SearchResultItem } from "./SearchResultItem";
import { SearchSkeleton } from "./SearchSkeleton";

interface SearchResult {
  surah_number: number;
  verse_number: number;
  surah_name: string;
  text_en: string;
  revelation_place: string;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function SearchDialogComponent({ open, onOpenChange }: SearchDialogProps) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isPending, startTransition] = useTransition();
  const abortControllerRef = useRef<AbortController | null>(null);
  const router = useRouter();

  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange, open]);

  useEffect(() => {
    abortControllerRef.current?.abort();

    const trimmedSearch = deferredSearch.trim();
    if (!trimmedSearch) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    startTransition(async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/search?q=${encodeURIComponent(trimmedSearch)}`,
          { signal: controller.signal },
        );

        if (res.ok) {
          const data = await res.json();

          if (!controller.signal.aborted) {
            setResults(data);
          }
        }
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Search error:", err);
        }
      }
    });

    return () => {
      controller.abort();
    };
  }, [deferredSearch]);

  useEffect(() => {
    if (!open) {
      setSearch("");
      setResults([]);
      abortControllerRef.current?.abort();
    }
  }, [open]);

  const handleResultClick = useCallback(
    (result: SearchResult) => {
      startTransition(() => {
        onOpenChange(false);
        router.push(
          `/surah/${result.surah_number}${result.verse_number ? `#${result.verse_number}` : ""}`,
        );
      });
    },
    [onOpenChange, router],
  );

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const isLoading = isPending || search !== deferredSearch;
  const hasSearch = search.trim() !== "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] overflow-hidden rounded-3xl border-none p-0 shadow-2xl">
        <DialogTitle className="sr-only">Search Quran</DialogTitle>
        <div className="p-6">
          <div className="mb-8 flex items-center gap-4">
            <div className="group relative flex-1">
              <Book
                className="absolute left-0 top-1/2 -translate-y-1/2 text-primary"
                size={22}
              />
              <input
                autoFocus
                value={search}
                onChange={handleSearchChange}
                placeholder="Find wisdom in the Quran"
                className="w-full py-2 pl-10 pr-4 text-xl font-medium text-gray-800 outline-none placeholder:text-gray-300"
                aria-label="Search Quran"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100"
                aria-label="Filter by Quran"
              >
                <span>Quran</span>
                <ChevronDown size={14} />
              </button>
              <button
                className="rounded-full border border-gray-100 bg-gray-50 p-2 text-gray-400 transition-colors hover:text-primary"
                aria-label="Search filters"
              >
                <SlidersHorizontal size={18} />
              </button>
            </div>
          </div>

          <div className="custom-scrollbar max-h-[400px] space-y-6 overflow-y-auto pr-2">
            {!hasSearch ? null : (
              <div className="space-y-4">
                {isLoading ? (
                  <>
                    <SearchSkeleton />
                    <SearchSkeleton />
                    <SearchSkeleton />
                    <SearchSkeleton />
                  </>
                ) : results.length > 0 ? (
                  results.map((result) => (
                    <SearchResultItem
                      key={`${result.surah_number}-${result.verse_number}`}
                      result={result}
                      onClick={handleResultClick}
                    />
                  ))
                ) : (
                  <p className="py-10 text-center text-sm font-medium text-gray-400">
                    No results found for &quot;{deferredSearch}&quot;
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-50 bg-gray-50/50 p-4 text-center">
          <span className="font-amiri text-xs font-bold tracking-wider text-gray-400">
            [ Al Hijr : 99 ]
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export const SearchDialog = memo(SearchDialogComponent);
