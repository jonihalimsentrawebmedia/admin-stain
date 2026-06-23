import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetFacultyBackground = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['background-faculty'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/fakultas-background`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { background: data ?? [], loading }
}
