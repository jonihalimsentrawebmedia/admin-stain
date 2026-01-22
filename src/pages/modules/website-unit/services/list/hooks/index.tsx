import { useEffect, useState } from 'react'
import type { ListServices } from '@/pages/modules/website-unit/services/list/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetListService = (id: string) => {
  const [listService, setListService] = useState<ListServices[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-service', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/layanan/${id}/layanan`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setListService(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { listService, loading, meta }
}
