import { useEffect, useState } from 'react'
import type { ManagementUnitList } from '@/pages/modules/website-utama/program-studi/detail/model/management-unit.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetManagementUnit = () => {
  const [unitUser, setUnitUser] = useState<ManagementUnitList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['management-unit'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/profil/unit-pengelola').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setUnitUser(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { unitUser, loading, meta }
}
