import { useEffect, useState } from 'react'
import type { ProfileData } from '@/pages/modules/LPPM/about/profile/hooks/types.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetAboutProfileCarrier = () => {
  const [profile, setProfile] = useState<ProfileData>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['about-profile-carrier'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusat-karir/profil-pusat-karir').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setProfile(data)
    }
  }, [data])

  return { profile, loading }
}
