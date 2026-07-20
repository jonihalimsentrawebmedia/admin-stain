import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAuthMenuItem } from '../data/types.ts'

export const UseGetAuthRole = () => {
  const { data, isLoading, isFetching } = useQuery<IAuthMenuItem[]>({
    queryKey: ['auth-role'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient('/simrs/auth/role').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { menus: data, loading }
}
