import { useEffect, useState } from 'react'
import type { IManagementUnit } from '@/pages/modules/website-fakultas/about-faculty/unit-pengelola/data/resolver.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetProdiUnit = (id_unit: string) => {
  const [prodiUser, setProdiUser] = useState<IManagementUnit[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['faculty-unit'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/satuan-organisasi/${id_unit}/unit-pengelola`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setProdiUser(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { prodiUser, loading, meta }
}
