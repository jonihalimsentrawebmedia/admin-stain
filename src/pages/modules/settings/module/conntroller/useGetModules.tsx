import { useQuery } from '@tanstack/react-query'
import type { ModuleList } from '../model'
import AxiosClient from '@/provider/axios'
import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination'
import type { BasicProps } from '@/utils/globalType.ts'

const useGetModules = (props?: BasicProps) => {
  const { search, page, limit } = props ?? {}

  const [meta, setMeta] = useState<Meta>()
  const [modules, setModules] = useState<ModuleList[]>([])

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '0')

  const { data, isLoading, isFetching } = useQuery<{
    data: ModuleList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['modules-list', Params.toString()],
    queryFn: () => AxiosClient.get(`/pengaturan/modules?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setModules(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    modules,
    loading,
    meta,
  }
}

export default useGetModules
