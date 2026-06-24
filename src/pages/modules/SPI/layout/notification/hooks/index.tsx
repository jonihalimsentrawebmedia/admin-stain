import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface notification {
  id: string
  judul: string
  content: string
  status: string
  email: string
}

export const UseGetNotification = () => {
  const ParamsSearch = new URLSearchParams({ page: '0', limit: '0' })

  const { data: notification, isLoading, isFetching } = useQuery<notification[]>({
    queryKey: ['notification', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/notification?${ParamsSearch}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { notification: notification ?? [], loading }
}
