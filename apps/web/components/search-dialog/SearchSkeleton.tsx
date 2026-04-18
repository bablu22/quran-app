"use client";

import { memo } from "react";

import { Skeleton } from "@/components/ui/skeleton";

function SearchSkeletonComponent() {
  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-gray-50 p-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32 rounded-full" />
        <Skeleton className="h-3 w-16 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-full rounded-full" />
        <Skeleton className="h-3 w-2/3 rounded-full" />
      </div>
    </div>
  );
}

SearchSkeletonComponent.displayName = "SearchSkeleton";

export const SearchSkeleton = memo(SearchSkeletonComponent);
