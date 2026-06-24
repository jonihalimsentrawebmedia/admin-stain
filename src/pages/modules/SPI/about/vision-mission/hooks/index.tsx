import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetVisionMissionSPI = () => {
  const { data: visionMission, isFetching, isLoading } = useQuery({
    queryKey: ['vision-mission-spi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/spi/visi-misi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { visionMission, loading }
}
