import AxiosClient from '@/provider/axios'
import { useQuery } from '@tanstack/react-query'

interface Dikti {
  id: string
  nama: string
  id_jenis_unit: number
}

const useGetListDikti = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<{
    data: Dikti[]
  }>({
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryKey: ['satuan-organisasi-list-dikti', id],
    queryFn: () => AxiosClient.get(`/pengaturan/dikti/unit-kerja/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    dikti: data?.data ?? [],
    loading,
  }
}

export default useGetListDikti
