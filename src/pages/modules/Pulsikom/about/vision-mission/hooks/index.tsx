import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface IVisionMission {
  visi: string // Image URL
  misi: string // HTML content describing the partner
}

export const UseGetHistoryVisionMission = () => {
  const { data, isFetching, isLoading } = useQuery<IVisionMission>({
    queryKey: ['vision-mission'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusilkom/visi-misi').then((res) => res.data.data),
  })

  const loading = isFetching || isLoading

  return { loading, visionMission: data }
}
