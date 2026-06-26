import type { ProfileData } from '@/pages/modules/LPPM/about/profile/hooks/types.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetAboutProfile = () => {
  const { data, isFetching, isLoading } = useQuery<ProfileData>({
    queryKey: ['about-profile'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/profil-lppm').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { profile: data, loading }
}
