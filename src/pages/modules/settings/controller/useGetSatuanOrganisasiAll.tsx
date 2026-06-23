import { useQuery } from '@tanstack/react-query'
import type { SatuanOrganisasiList } from '../model'
import AxiosClient from '@/provider/axios'

const useGetSatuanOrganisasiAll = () => {
  const { data, isLoading, isFetching } = useQuery<{
    data: SatuanOrganisasiList[]
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['satuan-organisasi-list'],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/satuan-organisasi?page=0&limit=0`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    satuanOrganisasi: data?.data ?? [],
    loading,
  }
}

export default useGetSatuanOrganisasiAll
