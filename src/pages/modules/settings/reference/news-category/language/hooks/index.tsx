import { useQuery } from '@tanstack/react-query'
import type { NewsCategoryList } from '../../model/index'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetNewsCategoryLanguage = (id?: string) => {
  const { data, isLoading, isFetching } = useQuery<{
    id: NewsCategoryList
    en: NewsCategoryList
    zh: NewsCategoryList
    ar: NewsCategoryList
  }>({
    queryKey: ['news-category-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pengaturan/referensi/kategori-berita-translate/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { loading, language: data }
}
