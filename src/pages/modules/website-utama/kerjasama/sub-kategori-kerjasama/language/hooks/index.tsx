import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { SubCalloborationCategory } from '../../model/index'

export const UseGetCorporationSubCategoryLanguage = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<{
    id: SubCalloborationCategory
    en: SubCalloborationCategory
    zh: SubCalloborationCategory
    ar: SubCalloborationCategory
  }>({
    queryKey: ['corporation-language', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/website-utama/sub-kategori-kerjasama-translate/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { language: data, loading }
}
