import { Skeleton } from '@/components/ui/skeleton'

export const ProfilePageSkeleton = () => {
  return (
    <>
      {/* Title + Button */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-9 w-36" />
      </div>

      {/* Logo & Favicon */}
      <div className="flex items-start gap-5 mt-5">
        {/* Logo */}
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-20" />
          <div className="border border-[#70F2B1] bg-[#F5FFFA] p-5 rounded">
            <Skeleton className="size-40 rounded" />
          </div>
        </div>

        {/* Favicon */}
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-20" />
          <div className="border border-[#70F2B1] bg-[#F5FFFA] p-5 rounded">
            <Skeleton className="size-15 rounded" />
          </div>
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="mt-5 flex flex-col gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border rounded p-4">
            <Skeleton className="h-5 w-40 mb-4" />

            <div className="grid grid-cols-[12rem_1fr] gap-5">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <Skeleton key={`label-${idx}`} className="h-4 w-32" />
                  <Skeleton key={`value-${idx}`} className="h-4 w-64" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
