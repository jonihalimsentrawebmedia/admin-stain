import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAgendaDetail } from '../../data/index'

interface IAgendaLanguage {
  id: IAgendaDetail
  en: IAgendaDetail
  zh: IAgendaDetail
  ar: IAgendaDetail
}

export const UseGetAgendaLanguage = (id?: string) => {
  const { data, isLoading, isFetching } = useQuery<IAgendaLanguage>({
    queryKey: ['agenda-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/agenda-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { loading, language: data }
}
