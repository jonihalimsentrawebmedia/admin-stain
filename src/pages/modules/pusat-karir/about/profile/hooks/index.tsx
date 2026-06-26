import type { ProfileData } from '@/pages/modules/LPPM/about/profile/hooks/types.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetAboutProfileCarrier = () => {
  const { data, isFetching, isLoading } = useQuery<ProfileData>({
    queryKey: ['about-profile-carrier'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusat-karir/profil-pusat-karir').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { profile: data, loading }
}
