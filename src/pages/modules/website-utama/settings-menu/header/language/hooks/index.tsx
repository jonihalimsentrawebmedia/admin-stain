import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { MenuBase } from '@/pages/modules/website-utama/settings-menu/header/model'

export const UseGetHeaderMenuLanguage = (id: string) => {
  const [language, setLanguage] = useState<{
    id: MenuBase
    en: MenuBase
    zh: MenuBase
    ar: MenuBase
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['header-menu-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/menu-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { language, loading }
}
