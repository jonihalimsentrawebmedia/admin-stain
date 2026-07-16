import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IUserList } from '../data/types.ts'

export const UseGetUser = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  if (limit) ParamsSearch.append('limit', limit ?? '0')

  const { data, isLoading, isFetching } = useQuery<{
    data: IUserList[]
    meta: Meta
  }>({
    queryKey: ['user-list', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/manajemen-user/user?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { user: data?.data ?? [], meta: data?.meta, loading }
}

export const UseGetDetailUser = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IUserList>({
    queryKey: ['detail-user', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/manajemen-user/user/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
