import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface Props {
  page?: string
  limit?: string
  search?: string
}

interface IInboxResponse<T> {
  data: T[]
  meta: Meta
}

export const UseGetInboxMessage = (props?: Props) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page)
  if (limit) ParamsSearch.append('limit', limit)
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery<IInboxResponse<unknown>>({
    queryKey: ['inbox-message', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/pertanyaan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { inboxMessage: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetInboxBackground = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['inbox-background'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/prodi/pertanyaan-background').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { background: data ?? [], loading }
}
