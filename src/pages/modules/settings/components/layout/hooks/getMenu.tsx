import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface IMenuItem {
  id_menu: string
  id_module: string
  parent_id: string
  label: string
  link: string
  icon?: string
  urutan: number
  is_active: boolean
  children?: IMenuItem[]
}

export const UseGetMenus = (idModules: string) => {
  const { data, isLoading, isFetching } = useQuery<IMenuItem[]>({
    queryKey: ['menu', idModules],
    enabled: !!idModules,
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pengaturan/menu/${idModules}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { menu: data, loading }
}