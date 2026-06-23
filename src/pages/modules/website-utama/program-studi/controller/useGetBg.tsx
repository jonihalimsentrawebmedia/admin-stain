import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetProdiBackground = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['background-prodi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/program-studi-background`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { background: data, loading }
}
