import type { IUnitTeamGroup } from '@/pages/modules/website-unit/profile/our-team/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { basicProps } from '@/pages/modules/LPPM/hooks/types.ts'

export const UseGetDivisionUnit = (props?: basicProps) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.set('page', page.toString() ?? '1')
  if (limit) ParamsSearch.set('limit', limit.toString() ?? '10')
  if (search) ParamsSearch.set('search', search.toString() ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IUnitTeamGroup[]; meta: Meta }>({
    queryKey: ['division-unit', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/profil/tim?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { division: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetDivisionDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IUnitTeamGroup>({
    queryKey: ['division-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/profil/tim/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { unitTeam: data, loading }
}
