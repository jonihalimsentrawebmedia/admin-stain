import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IMainService } from '@/pages/modules/pusat-karir/service/main/data/types.ts'

export const UseGetMainService = () => {
  const { data, isLoading, isFetching } = useQuery<IMainService[]>({
    queryKey: ['main-service'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusat-karir/layanan-utama').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { mainService: data ?? [], loading }
}
