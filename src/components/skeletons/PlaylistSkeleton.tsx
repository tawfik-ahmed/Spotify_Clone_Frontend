import { Skeleton } from "@/components/ui/skeleton";

const PlaylistSkeleton = () => {
  return Array.from({ length: 7 }).map((_, i) => (
    <div key={i} className="flex items-center space-x-4">
      <Skeleton className="h-13 w-13 rounded-full" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  ));
};

export default PlaylistSkeleton;
