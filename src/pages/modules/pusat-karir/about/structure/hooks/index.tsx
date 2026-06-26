import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ProfileData } from '@/pages/modules/pusat-karir/about/profile/hooks/types.tsx'

export const UseGetStructureOrganization = () => {
  const { data, isFetching, isLoading } = useQuery<ProfileData>({
    queryKey: ['about-structure-carrier'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/pusat-karir/struktur-organisasi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detailData: data, loading }
}
