import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IInbox } from '@/pages/modules/E-Office/inbox/registration-inbox/data/types.ts'

export const UseGetDetailInbox = (id: string) => {
  const [detailInbox, setDetailInbox] = useState<IInbox>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-inbox', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/surat-masuk/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetailInbox(data)
    }
  }, [data])

  return { loading, detailInbox }
}
