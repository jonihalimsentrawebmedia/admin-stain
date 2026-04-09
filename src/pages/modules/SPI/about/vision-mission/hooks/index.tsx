import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetVisionMissionSPI = () => {
  const [visionMission, setVisionMission] = useState<{
    visi: string
    misi: string
  }>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['vision-mission-spi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/spi/visi-misi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setVisionMission(data)
    }
  }, [data])

  return { visionMission, loading }
}
