import { useEffect, useState } from 'react'
import type { IHourOperational } from '../data/types'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetOperationalHour = () => {
  const [operationalHour, setOperationalHour] = useState<IHourOperational[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['operational-hour'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/jam-operasional').then((res) => res.data),
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
