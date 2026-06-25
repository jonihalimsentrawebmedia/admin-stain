import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { AcademicYearList } from '../../model/index'

export const UseGetYearAcademicLanguage = (id?: string) => {
  const { data, isLoading, isFetching } = useQuery<{
    id: AcademicYearList
    en: AcademicYearList
    zh: AcademicYearList
    ar: AcademicYearList
  }>({
    queryKey: ['year-academic-language', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/website-utama/tahun-akademik-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { loading, language: data }
}
