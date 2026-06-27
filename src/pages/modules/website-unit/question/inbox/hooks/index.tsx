import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface Props {
  page?: string
  limit?: string
  search?: string
  status: string
}

export const UseGetInboxUnit = (props?: Props) => {
  const { page, limit, search, status } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page)
  if (limit) ParamsSearch.append('limit', limit)
  if (search) ParamsSearch.append('search', search)
  if (status) ParamsSearch.append('status', status)

  const { data, isLoading, isFetching } = useQuery<{ data: unknown[]; meta: Meta }>({
    queryKey: ['inbox-unit', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/pertanyaan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { inboxMessage: data?.data ?? [], loading, meta: data?.meta }
}
