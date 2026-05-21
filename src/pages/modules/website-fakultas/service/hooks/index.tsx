import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IServices } from '../data/types'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetService = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}
  const [service, setService] = useState<IServices[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['service-faculty', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/layanan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setService(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { service, loading, meta }
}
