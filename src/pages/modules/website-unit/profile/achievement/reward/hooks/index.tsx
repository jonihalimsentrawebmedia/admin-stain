import type { IReward } from '@/pages/modules/website-unit/profile/achievement/reward/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

interface Props extends BasicProps {
  id: string
}

export const UseGetReward = (props?: Props) => {
  const { id, limit, search, page } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (limit) ParamsSearch.append('limit', limit.toString() ?? '10')
  if (page) ParamsSearch.append('page', page.toString() ?? '1')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IReward[]; meta: Meta }>({
    queryKey: ['reward', id, ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(
        `/unit/profil/unit-kategori-penghargaan-penghargaan/${id}/penghargaan?${ParamsSearch}`
      ).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { reward: data?.data ?? [], loading, meta: data?.meta }
}
