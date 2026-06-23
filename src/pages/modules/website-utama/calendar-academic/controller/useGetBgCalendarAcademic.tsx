import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetBgCalendarAcademic = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['bg-calendar-academic'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/tahun-akademik-background`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, background: data?.data ?? [] }
}

export default useGetBgCalendarAcademic
