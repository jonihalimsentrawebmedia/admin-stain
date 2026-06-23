import { useQuery } from '@tanstack/react-query'
import type { EducationLevelLanguage } from '../../model/index'
import AxiosClient from '@/provider/axios.tsx'

export const UseEducatioinLevelLanguage = (id?: string) => {
  const { data, isLoading, isFetching } = useQuery<{
    id: EducationLevelLanguage
    en: EducationLevelLanguage
    zh: EducationLevelLanguage
    ar: EducationLevelLanguage
  }>({
    queryKey: ['education-level-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pengaturan/referensi/jenjang-pendidikan-translate/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { loading, language: data }
}
