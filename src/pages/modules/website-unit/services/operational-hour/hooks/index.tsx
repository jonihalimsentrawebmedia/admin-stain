import { useEffect, useState } from 'react'
import type { IHourOperational } from '../data/types'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetOperationalHour = (props?: BasicProps) => {
  const { search, page, limit } = props ?? {}

  const [operationalHour, setOperationalHour] = useState<IHourOperational[]>([])
  const [meta, setMeta] = useState<Meta>()

  const params = new URLSearchParams()
  if (search) params.append('search', search ?? '')
  if (page) params.append('page', page.toString() ?? '1')
  if (limit) params.append('limit', limit.toString() ?? '10')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['operational-hour', params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/jam-operasional?${params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setOperationalHour(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { operationalHour, loading, meta }
}
