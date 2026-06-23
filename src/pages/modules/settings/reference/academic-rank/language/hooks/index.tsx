import { useQuery } from '@tanstack/react-query'
import type { AcademicRankList } from '../../model/index'
import AxiosClient from '@/provider/axios.tsx'

export const UseRankedAcademicLanguage = (id?: string) => {
  const { data, isLoading, isFetching } = useQuery<{
    id: AcademicRankList
    en: AcademicRankList
    zh: AcademicRankList
    ar: AcademicRankList
  }>({
    queryKey: ['rank-academic-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pengaturan/referensi/pangkat-akademik-translate/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { loading, language: data }
}
