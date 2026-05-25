import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetAcceptNotification = () => {
  const [notification, setNotification] = useState<any[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['accept-notification'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/eoffice/settings/penerima-notifikasi').then((res) => res.data),
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
