import type { Meta } from '@/components/common/table/TablePagination'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'

const useGetLembaga = () => {
  const [lembaga, setLembaga] = useState<SatuanOrganisasiList>()

  const { data, isLoading, isFetching } = useQuery<{
    data: SatuanOrganisasiList
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['lembaga'],
    queryFn: () => AxiosClient.get(`/lembaga/profil`).then((res) => res.data),
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
