import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetCalendar = () => {
  const [calendar, setCalendar] = useState<[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['calendar'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/training/kalender`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setMeta(data.meta)
      setCalendar(data?.data)
    }
  }, [data])

  return { calendar, meta, loading }
}
