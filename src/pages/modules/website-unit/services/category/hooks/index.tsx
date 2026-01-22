import { useEffect, useState } from 'react'
import type { ICategoryServices } from '@/pages/modules/website-unit/services/category/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetListServices = () => {
  const [listServices, setListServices] = useState<ICategoryServices[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['category-services'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/kategori-layanan').then((res) => res.data),
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
