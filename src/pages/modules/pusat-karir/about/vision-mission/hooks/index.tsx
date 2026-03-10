import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IVisionMission } from './types.tsx'

export const UseGetVisionMissionCarrier = () => {
  const [visionMission, setVisionMission] = useState<IVisionMission>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['vision-mission-carrier'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusat-karir/visi-misi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setVisionMission(data)
    }
  }, [data])

  return { visionMission, loading }
}
