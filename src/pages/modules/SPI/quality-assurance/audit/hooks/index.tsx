import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetDescriptionAuditManagement = () => {
  const { data: description, isFetching, isLoading } = useQuery<{ isi: string }>({
    queryKey: ['description-audit-management'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/spi/tinjauan-manajemen').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { description, loading }
}
