import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IInboxMessage } from '@/pages/modules/Pulsikom/inbox/data/types.ts'

export const UseGetInboxMessage = () => {
  const [inboxMessage, setInboxMessage] = useState<IInboxMessage[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['inbox-message'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusilkom/pertanyaan').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setMeta(data.meta)
      setInboxMessage(data?.data)
    }
  }, [data])

  return { loading, meta, inboxMessage }
}
