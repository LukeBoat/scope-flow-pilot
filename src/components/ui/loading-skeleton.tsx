
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonProps {
  count?: number;
  height?: string;
  className?: string;
}

export function LoadingSkeleton({
  count = 3,
  height = "h-16",
  className = ""
}: LoadingSkeletonProps) {
  return (
    <div className={`space-y-3 animate-pulse ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className={`w-full ${height}`} />
      ))}
    </div>
  );
}
