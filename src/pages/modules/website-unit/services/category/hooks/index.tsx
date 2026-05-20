import { useEffect, useState } from 'react'
import type { ICategoryServices } from '@/pages/modules/website-unit/services/category/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetListServices = (props?: BasicProps) => {
  const { search, page, limit } = props ?? {}

  const [listServices, setListServices] = useState<ICategoryServices[]>([])
  const [meta, setMeta] = useState<Meta>()

  const params = new URLSearchParams()
  if (search) params.append('search', search ?? '')
  if (page) params.append('page', page.toString() ?? '1')
  if (limit) params.append('limit', limit.toString() ?? '10')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['category-services', params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/kategori-layanan?${params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching
  useEffect(() => {
    if (data) {
      setListServices(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { listServices, loading, meta }
}

export const UseGetDetailServices = (id: string) => {
  const [detailServices, setDetailServices] = useState<ICategoryServices>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-services', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/kategori-layanan/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetailServices(data)
    }
  }, [data])

  return { detailServices, loading }
}
