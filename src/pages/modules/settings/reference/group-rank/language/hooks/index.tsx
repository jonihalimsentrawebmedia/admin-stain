import { useQuery } from '@tanstack/react-query'
import type { GroupRankList } from '../../model/index'
import AxiosClient from '@/provider/axios.tsx'

export const UseRankedGroupLanguage = (id?: string) => {
  const { data, isLoading, isFetching } = useQuery<{
    id: GroupRankList
    en: GroupRankList
    zh: GroupRankList
    ar: GroupRankList
  }>({
    queryKey: ['rank-category-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pengaturan/referensi/pangkat-golongan-translate/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { loading, language: data }
}
