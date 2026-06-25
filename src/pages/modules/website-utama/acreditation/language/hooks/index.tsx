import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { AcreditationList } from '../../model/index'

export const UseGetAccreditationLanguage = (id?: string) => {
  const { data, isLoading, isFetching } = useQuery<{
    id: AcreditationList
    en: AcreditationList
    zh: AcreditationList
    ar: AcreditationList
  }>({
    queryKey: ['accreditation-language', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/website-utama/akreditas-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { loading, language: data }
}
