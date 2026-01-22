import { useEffect, useState } from 'react'
import type { ICategoryCollection } from '@/pages/modules/website-unit/collection/listCollection/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetCollectionCategory = (id: string) => {
  const [collection, setCollection] = useState<ICategoryCollection[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['collection-category', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/unit-koleksi/${id}/koleksi`).then((res) => res.data),
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
