import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ContentList } from '../../model/index.tsx'

export const UseGetHeaderMenuContentLanguage = (id: string) => {
  const { data: queryData, isLoading, isFetching } = useQuery<{
    id: ContentList
    en: ContentList
    zh: ContentList
    ar: ContentList
  }>({
    queryKey: ['header-menu-language', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/website-utama/konten-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { language: queryData, loading }
}
