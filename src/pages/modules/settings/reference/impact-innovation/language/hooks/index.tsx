import { useQuery } from '@tanstack/react-query'
import type { InovationList } from '../../model/index'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetImpactCategoryLanguage = (id?: string) => {
  const { data, isLoading, isFetching } = useQuery<{
    id: InovationList
    en: InovationList
    zh: InovationList
    ar: InovationList
  }>({
    queryKey: ['news-category-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pengaturan/referensi/inovasi-berdampak-translate/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { loading, language: data }
}
