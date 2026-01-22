import { useEffect, useState } from 'react'
import type { IUnitCollection } from '@/pages/modules/website-unit/collection/data/types.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetUnitCollection = () => {
  const [collection, setCollection] = useState<IUnitCollection[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['unit-collection'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/kategori-koleksi').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCollection(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { collection, loading, meta }
}

export const UseGetUnitCollectionDetail = (id: string) => {
  const [collection, setCollection] = useState<IUnitCollection>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['unit-collection-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/kategori-koleksi/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCollection(data)
    }
  }, [data])

  return { collection, loading }
}
