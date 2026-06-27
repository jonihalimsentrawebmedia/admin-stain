import type { IHistoryUnit } from '@/pages/modules/website-unit/profile/history/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface Props {
  page?: string
  limit?: string
  search?: string
}

export const UseGetHistoryUnit = (props?: Props) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page)
  if (limit) ParamsSearch.append('limit', limit)
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery<{ data: IHistoryUnit[]; meta: Meta }>({
    queryKey: ['history-unit', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/profil/sejarah?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { historyUnit: data?.data ?? [], loading, meta: data?.meta }
}
