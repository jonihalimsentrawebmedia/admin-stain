import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IEvent } from '@/pages/modules/E-Office/event-activity/event-data/data/types.ts'

export const UseGetEventActivity = (props: BasicProps) => {
  const { search, limit, page } = props

  const [event, setEvent] = useState([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['event-activity', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/acara?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setEvent(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { meta, loading, event }
}

export const UseGetDetailEventActivity = (id: string) => {
  const [event, setEvent] = useState<IEvent>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['event-activity-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/acara/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setEvent(data)
    }
  }, [data])

  return { event, loading }
}
