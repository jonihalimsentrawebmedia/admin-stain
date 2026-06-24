import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetCalendar = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['calendar'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/training/kalender`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { calendar: data?.data ?? [], meta: data?.meta, loading }
}
