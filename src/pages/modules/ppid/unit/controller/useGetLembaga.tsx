import type { Meta } from '@/components/common/table/TablePagination'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'
interface props {
  real_data?: boolean
}
const useGetUnit = (props?: props) => {
    const { real_data } = props ?? {}
  const [unit, setUnit] = useState<SatuanOrganisasiList>()
 const ParamsSearch = new URLSearchParams()
  if (real_data) ParamsSearch.append('is_real_data', real_data.toString() ?? 'false')
  const { data, isLoading, isFetching } = useQuery<{
    data: SatuanOrganisasiList
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['unit-ppid', ParamsSearch.toString()],
    queryFn: () => AxiosClient.get(`/unit-ppid/profil?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setUnit(data.data)
    }
  }, [data])

  return {
    unit,
    loading,
  }
}


export default useGetUnit
