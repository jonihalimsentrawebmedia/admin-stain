import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAcademicRules } from '../../types/index'

export const UseGetAcademicRulesLanguage = () => {
  const { data, isLoading, isFetching } = useQuery<{
    id: IAcademicRules
    en: IAcademicRules
    zh: IAcademicRules
    ar: IAcademicRules
  }>({
    queryKey: ['academic-rules-language'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/pengaturan-akademik-translate`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { loading, language: data }
}
