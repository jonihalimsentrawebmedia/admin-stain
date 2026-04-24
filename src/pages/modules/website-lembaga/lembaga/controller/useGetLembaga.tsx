import type { Meta } from '@/components/common/table/TablePagination'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'
interface props {
  real_data?: boolean
}
const useGetLembaga = (props?: props) => {
    const { real_data } = props ?? {}
  const [lembaga, setLembaga] = useState<SatuanOrganisasiList>()
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

  useEffect(() => {
    if (data) {
      setLembaga(data.data)
    }
  }, [data])

  return {
    lembaga,
    loading,
  }
}

export default useGetLembaga
