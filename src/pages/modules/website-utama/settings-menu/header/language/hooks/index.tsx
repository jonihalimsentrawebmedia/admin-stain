import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { MenuBase } from '@/pages/modules/website-utama/settings-menu/header/model'

export const UseGetHeaderMenuLanguage = (id: string) => {
  const { data: queryData, isLoading, isFetching } = useQuery<{
    id: MenuBase
    en: MenuBase
    zh: MenuBase
    ar: MenuBase
  }>({
    queryKey: ['header-menu-language', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/website-utama/menu-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { language: queryData, loading }
}
