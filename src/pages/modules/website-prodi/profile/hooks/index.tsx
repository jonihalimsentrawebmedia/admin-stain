import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'

export const UseGetProfileProdi = () => {
  const { data, isLoading, isFetching } = useQuery<SatuanOrganisasiList>({
    queryKey: ['profile-prodi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/profil').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { profileProdi: data, loading }
}
