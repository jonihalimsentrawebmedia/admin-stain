import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IServices } from '../data/types'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetServices = (props: BasicProps) => {
  const { page, search, limit } = props

  const [service, setService] = useState<IServices[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (limit) Params.append('limit', limit ?? '1')
  if (page) Params.append('page', page ?? '10')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['services', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/spi/layanan?${Params}`).then((res) => res.data),
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
    queryFn: () => AxiosClient.get(`/spi/layanan/${id}`).then((res) => res.data.data),
  })
  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
