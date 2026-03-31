import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IServices } from '@/pages/modules/Pulsikom/services/data/types.ts'

export const UseGetServices = () => {
  const [service, setService] = useState<IServices[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['services'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusilkom/layanan').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setMeta(data.meta)
      setService(data?.data)
    }
  }, [data])

  return { loading, meta, service }
}

export const UseGetServiceDetail = (id: string) => {
  const [detail, setDetail] = useState<IServices>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-service', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/layanan/${id}`).then((res) => res.data.data),
  })
  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
