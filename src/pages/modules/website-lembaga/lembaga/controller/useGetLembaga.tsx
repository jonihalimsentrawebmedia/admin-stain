import type { Meta } from '@/components/common/table/TablePagination'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'
interface Props {
  real_data?: boolean
}
const useGetLembaga = (props?: Props) => {
    const { real_data } = props ?? {}
  const ParamsSearch = new URLSearchParams()
  if (real_data) ParamsSearch.append('is_real_data', real_data.toString() ?? 'false')
  const { data, isLoading, isFetching } = useQuery<{
    data: SatuanOrganisasiList
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['lembaga',ParamsSearch.toString()],
    queryFn: () => AxiosClient.get(`/lembaga/profil?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    lembaga: data?.data,
    loading,
  }
}

export default useGetLembaga
