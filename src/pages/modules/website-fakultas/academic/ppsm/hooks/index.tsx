import { useEffect, useState } from 'react'
import type { ProfileData } from '@/pages/modules/LPPM/about/profile/hooks/types.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetDetailPPSM = () => {
  const [profile, setProfile] = useState<ProfileData>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['ppsm-faculty'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/ppsm').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setProfile(data)
    }
  }, [data])

  return { profile, loading }
}
