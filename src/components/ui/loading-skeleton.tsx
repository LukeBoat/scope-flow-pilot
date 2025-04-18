
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  className?: string;
}

export function LoadingSkeleton({ count = 1, className, ...props }: LoadingSkeletonProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton 
          key={i}
          className={cn(
            "w-full h-[60px] rounded-lg",
            i === 0 && "w-[80%]",
            i === count - 1 && "w-[90%]"
          )}
        />
      ))}
    </div>
  );
}
