import type { IVisionMission } from './types'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetProfileVisionMission = () => {
  const { data, isLoading, isFetching } = useQuery<IVisionMission>({
    queryKey: ['about-vision-mission'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/visi-misi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { visionMission: data, loading }
}
