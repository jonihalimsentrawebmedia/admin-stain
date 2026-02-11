import {Card, CardContent} from "@/components/ui/card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

export const SkeletonForm=()=>(
  <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
    <Card className="max-w-2xl w-full h-full lg:h-fit backdrop-blur-md bg-white/40 flex flex-col items-center justify-center">
      <CardContent className="flex flex-col gap-4 w-full">

        {/* Header Skeleton */}
        <div className="bg-green-800 rounded-lg p-4">
          <div className="flex gap-4 items-center">
            <Skeleton className="w-[100px] h-[75px] lg:h-[100px] rounded-xl bg-white/50" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-4 w-40 bg-white/50" />
              <Skeleton className="h-6 w-64 bg-white/50" />
            </div>
          </div>
        </div>

        {/* Form Skeleton */}
        <div className="flex flex-col gap-3 mt-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>

      </CardContent>
    </Card>
  </div>
)