import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { IModules } from '@/pages/modules/interface'
import type { IMenu } from '../data/types'

export const UseGetSideMenu = (idModules: string = '1') => {
  const { data, isLoading, isFetching } = useQuery<IMenu[]>({
    queryKey: ['settings-side-menu', idModules],
    enabled: !!idModules,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000,
    queryFn: () => AxiosClient.get(`/pengaturan/menu/${idModules}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { menu: data ?? [], loading, idModules }
}

export const UseGetListModule = () => {
  const { data, isLoading, isFetching } = useQuery<{ data: IModules[] }>({
    queryKey: ['settings-side-menu-modules'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pengaturan/modules?page=1&limit=10000').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { modules: data?.data ?? [], loading }
}
