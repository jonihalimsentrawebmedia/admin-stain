import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'

export const UseGetProfileUnit = () => {
  const { data, isLoading, isFetching } = useQuery<SatuanOrganisasiList>({
    queryKey: ['profile-unit'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/profil').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { profileUnit: data, loading }
}
