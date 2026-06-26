import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAnnouncement } from '../../data/index'

interface IAnnouncementLanguage {
  id: IAnnouncement
  en: IAnnouncement
  zh: IAnnouncement
  ar: IAnnouncement
}

export const UseGetAnnouncementLanguage = (id?: string) => {
  const { data, isLoading, isFetching } = useQuery<IAnnouncementLanguage>({
    queryKey: ['announcement-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/lembaga/pengumuman-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { loading, language: data }
}
