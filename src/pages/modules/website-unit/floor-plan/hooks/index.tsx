import type { IFloorPlan } from '@/pages/modules/website-unit/floor-plan/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetFloorPlan = (props?: BasicProps) => {
  const { search, page, limit } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (search) ParamsSearch.set('search', search ?? '')
  if (page) ParamsSearch.set('page', page.toString() ?? '1')
  if (limit) ParamsSearch.set('limit', limit.toString() ?? '10')

  const { data, isLoading, isFetching } = useQuery<{ data: IFloorPlan[]; meta: Meta }>({
    queryKey: ['floor-plan', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/denah-lantai?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { floorPlan: data?.data ?? [], loading, meta: data?.meta }
}
