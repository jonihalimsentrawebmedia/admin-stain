import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IOutbox } from '../data/types.ts'

export const UseGetDetailOutbox = (id: string) => {
  const [detailInbox, setDetailInbox] = useState<IOutbox>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-outbox', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/surat-keluar/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetailInbox(data)
    }
  }, [data])

  return { loading, detailInbox }
}
