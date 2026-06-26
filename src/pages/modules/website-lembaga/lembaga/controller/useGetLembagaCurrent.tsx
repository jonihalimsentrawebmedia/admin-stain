import type { Meta } from '@/components/common/table/TablePagination'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'

const useGetLembagaCurrent = () => {
  const { data, isLoading, isFetching } = useQuery<{
    data: SatuanOrganisasiList
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['lembaga'],
    queryFn: () => AxiosClient.get(`/lembaga/profil/current`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    lembagaCurrent: data?.data,
    loading,
  }
}

export default useGetLembagaCurrent
