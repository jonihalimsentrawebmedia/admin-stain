import { useEffect, useState } from 'react'
import type { IVisionMission } from '../data/types'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetVisionMissionUnit = () => {
  const [visionMission, setVisionMission] = useState<IVisionMission>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['vision-mission-unit'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/profil/visi-misi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setVisionMission(data)
    }
  }, [data])

  return { visionMission, loading }
}
