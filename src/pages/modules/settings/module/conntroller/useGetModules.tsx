import { useQuery } from '@tanstack/react-query'
import type { ModuleList } from '../model'
import AxiosClient from '@/provider/axios'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Meta } from '@/components/common/table/TablePagination'

const useGetModules = () => {
  const [searchParams] = useSearchParams()
  const [meta, setMeta] = useState<Meta>()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''
  const [modules, setModules] = useState<ModuleList[]>([])

  const { data, isLoading, isFetching } = useQuery<{
    data: ModuleList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['modules-list',{search,page,limit}],
    queryFn: () => AxiosClient.get(`/pengaturan/modules?${searchParams.toString()}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setModules(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return {
    modules,
    loading,meta
  }
}

export default useGetModules
