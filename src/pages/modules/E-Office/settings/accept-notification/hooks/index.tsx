import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { INotification } from '@/pages/modules/E-Office/settings/accept-notification/data/types.ts'

export const UseGetAcceptNotification = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}
  const [notification, setNotification] = useState<INotification[]>([])
  const [meta, setMeta] = useState<Meta>()

  const params = new URLSearchParams()
  if (page) params.append('page', page ?? '1')
  if (limit) params.append('limit', limit ?? '10')
  if (search) params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['accept-notification', params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/notifikasi?${params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setNotification(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { loading, notification, meta }
}
