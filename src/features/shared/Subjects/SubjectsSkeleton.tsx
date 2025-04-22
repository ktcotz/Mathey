import { Skeleton } from '../../../ui';

export const SubjectsSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Skeleton className="h-6 min-w-16 rounded-md px-2.5 py-0.5" />
      <Skeleton className="h-6 min-w-16 rounded-md px-2.5 py-0.5" />
      <Skeleton className="h-6 min-w-16 rounded-md px-2.5 py-0.5" />
      <Skeleton className="h-6 min-w-16 rounded-md px-2.5 py-0.5" />
    </div>
  );
};
