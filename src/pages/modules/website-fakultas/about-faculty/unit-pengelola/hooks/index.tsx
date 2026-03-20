import { useEffect, useState } from 'react'
import type { IManagementUnit } from '@/pages/modules/website-fakultas/about-faculty/unit-pengelola/data/resolver.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetFacultyUnit = () => {
  const [facultyUser, setFacultyUser] = useState<IManagementUnit[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['faculty-unit'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/profil/unit-pengelola').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setFacultyUser(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { facultyUser, loading, meta }
}
