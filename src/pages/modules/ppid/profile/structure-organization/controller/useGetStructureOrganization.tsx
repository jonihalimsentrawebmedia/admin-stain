import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetStructureOrganization = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['ppip-struktur-organisasi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit-ppid/struktur-organisasi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { structureOrganization: data, loading }
}

export default useGetStructureOrganization
