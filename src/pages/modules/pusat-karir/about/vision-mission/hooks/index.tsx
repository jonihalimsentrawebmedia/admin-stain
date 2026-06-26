import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IVisionMission } from './types.tsx'

export const UseGetVisionMissionCarrier = () => {
  const { data, isFetching, isLoading } = useQuery<IVisionMission>({
    queryKey: ['vision-mission-carrier'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusat-karir/visi-misi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { visionMission: data, loading }
}
