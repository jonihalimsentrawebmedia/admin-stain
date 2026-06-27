import type { IVisionMission } from '../data/types'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetVisionMissionUnit = () => {
  const { data, isLoading, isFetching } = useQuery<IVisionMission>({
    queryKey: ['vision-mission-unit'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/profil/visi-misi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { visionMission: data, loading }
}
