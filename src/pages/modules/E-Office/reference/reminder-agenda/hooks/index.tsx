import { useEffect, useState } from 'react'
import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IReminderAgenda } from '../data/types'

export const USeGetReminderAgenda = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const [reminderAgenda, setReminderAgenda] = useState<IReminderAgenda[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['reminder-agenda', Params.toString()],
    queryFn: () =>
      AxiosClient.get(`/eoffice/waktu-pengingat-agenda?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setReminderAgenda(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { loading, reminderAgenda, meta }
}
