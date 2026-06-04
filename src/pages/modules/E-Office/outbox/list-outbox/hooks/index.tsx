import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IInboxList } from '@/pages/modules/E-Office/inbox/list-inbox/data/types.ts'

export const UseGetOutbox = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}
  const [listInbox, setListInbox] = useState<IInboxList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['outbox', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/surat-keluar?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setListInbox(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { loading, listInbox, meta }
}
