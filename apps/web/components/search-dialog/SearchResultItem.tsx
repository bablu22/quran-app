"use client";

import { memo, useCallback } from "react";

import type { SearchResult } from "./types";

interface SearchResultItemProps {
  result: SearchResult;
  onClick: (result: SearchResult) => void;
}

function SearchResultItemComponent({ result, onClick }: SearchResultItemProps) {
  const handleClick = useCallback(() => {
    onClick(result);
  }, [onClick, result]);

  return (
    <button
      onClick={handleClick}
      className="group flex w-full cursor-pointer flex-col gap-1 rounded-2xl p-4 text-left transition-colors hover:bg-gray-50"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-primary">
          {result.surah_name}{" "}
          <span className="font-medium text-gray-400">
            {result.surah_number}:{result.verse_number}
          </span>
        </span>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-tighter text-gray-500">
          {result.revelation_place}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-gray-600 line-clamp-2">
        {result.text_en}
      </p>
    </button>
  );
}

SearchResultItemComponent.displayName = "SearchResultItem";

export const SearchResultItem = memo(SearchResultItemComponent);
