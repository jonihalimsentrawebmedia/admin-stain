import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IInboxMessage } from '@/pages/modules/Pulsikom/inbox/data/types.ts'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetInboxMessage = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const [inboxMessage, setInboxMessage] = useState<IInboxMessage[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.set('page', page ?? '1')
  if (limit) ParamsSearch.set('limit', limit ?? '10')
  if (search) ParamsSearch.set('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['inbox-message', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/pertanyaan?${ParamsSearch}`).then((res) => res.data),
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
