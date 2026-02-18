import type { Meta } from '@/components/common/table/TablePagination'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'

const useGetUnit = () => {
  const [unit, setUnit] = useState<SatuanOrganisasiList>()

  const { data, isLoading, isFetching } = useQuery<{
    data: SatuanOrganisasiList
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['unit-ppid'],
    queryFn: () => AxiosClient.get(`/unit-ppid/profil`).then((res) => res.data),
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
