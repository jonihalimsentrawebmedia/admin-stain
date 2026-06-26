import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { INewsDetail } from '@/pages/modules/website-utama/public-content/news/data'

interface INewsLanguage {
  id: INewsDetail
  en: INewsDetail
  zh: INewsDetail
  ar: INewsDetail
}

export const UseGetNewsLanguage = (id?: string) => {
  const { data, isLoading, isFetching } = useQuery<INewsLanguage>({
    queryKey: ['news-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/lembaga/berita-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { loading, newsLanguage: data }
}
