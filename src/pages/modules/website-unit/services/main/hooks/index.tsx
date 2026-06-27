import type { IUnitMainService } from '@/pages/modules/website-unit/services/main/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetMainListService = () => {
  const { data, isLoading, isFetching } = useQuery<{ data: IUnitMainService[]; meta: Meta }>({
    queryKey: ['main-service'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/layanan-utama').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { mainService: data?.data ?? [], loading, meta: data?.meta }
}
