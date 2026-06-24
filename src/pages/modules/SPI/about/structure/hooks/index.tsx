import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetStructureOrganization = () => {
  const { data: structure, isFetching, isLoading } = useQuery({
    queryKey: ['structure-spi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/spi/struktur-organisasi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { structure, loading }
}
