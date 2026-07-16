import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IRoleTreeItem, IRole } from '../data/types.ts'

export const UseGetRoleTree = () => {
  const { data, isLoading, isFetching } = useQuery<IRoleTreeItem[]>({
    queryKey: ['role-tree'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient('/simrs/manajemen-user/role/role-tree').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { tree: data, loading }
}

export const UseGetRole = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  if (limit) ParamsSearch.append('limit', limit ?? '0')

  const { data, isLoading, isFetching } = useQuery<{
    data: IRole[]
    meta: Meta
  }>({
    queryKey: ['role', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/manajemen-user/role?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { role: data?.data ?? [], meta: data?.meta, loading }
}

export const UseGetDetailRole = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IRole>({
    queryKey: ['detail-role', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/manajemen-user/role/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
