import { useEffect, useState } from 'react'
import type { ListServices } from '@/pages/modules/website-unit/services/list/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

interface Props extends BasicProps {
  id: string
}

export const UseGetListService = (props?: Props) => {
  const { id, search, page, limit } = props ?? {}

  const [listService, setListService] = useState<ListServices[]>([])
  const [meta, setMeta] = useState<Meta>()

  const params = new URLSearchParams()
  if (search) params.append('search', search ?? '')
  if (page) params.append('page', page.toString() ?? '1')
  if (limit) params.append('limit', limit.toString() ?? '10')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-service', id, params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/layanan/${id}/layanan?${params}`).then((res) => res.data),
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
