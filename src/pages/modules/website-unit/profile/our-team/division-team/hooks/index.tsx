import type { IDivisionTeam } from '@/pages/modules/website-unit/profile/our-team/division-team/data/types.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

interface Props extends BasicProps {
  id: string
}

export const UseGetDivisionTeam = (props?: Props) => {
  const { id, page, limit, search } = props ?? {}

  const params = new URLSearchParams()
  if (page) params.append('page', page.toString() ?? '1')
  if (limit) params.append('limit', limit.toString() ?? '10')
  if (search) params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IDivisionTeam[]; meta: Meta }>({
    queryKey: ['division-team', id, params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/unit/profil/tim-pejabat/${id}/pejabat?${params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { divisionTeam: data?.data ?? [], loading, meta: data?.meta }
}
