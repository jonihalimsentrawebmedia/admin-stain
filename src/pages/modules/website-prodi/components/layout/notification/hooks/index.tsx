import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface INotification {
  id: string
  judul: string
  content: string
  status: string
  email: string
}

export const UseGetNotificationProdi = () => {
  const ParamsSearch = new URLSearchParams({ page: '0', limit: '0' })

  const { data, isLoading, isFetching } = useQuery<INotification[]>({
    queryKey: ['notification', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/prodi/notification?${ParamsSearch}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { notification: data ?? [], loading }
}
