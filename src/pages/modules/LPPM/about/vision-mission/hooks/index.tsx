import { useEffect, useState } from 'react'
import type { IVisionMission } from './types'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetProfileVisionMission = () => {
  const [visionMission, setVisionMission] = useState<IVisionMission>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['about-vision-mission'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/visi-misi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setVisionMission(data)
    }
  }, [data])

  return { visionMission, loading }
}
