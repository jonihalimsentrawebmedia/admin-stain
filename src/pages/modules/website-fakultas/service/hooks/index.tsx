import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IServices } from '../data/types'

export const UseGetService = () => {
  const [service, setService] = useState<IServices[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['service-faculty'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/layanan').then((res) => res.data),
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
