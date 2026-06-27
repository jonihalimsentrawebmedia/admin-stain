import type { ManagementUnitList } from '@/pages/modules/website-utama/program-studi/detail/model/management-unit.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface IManagementUnitResponse {
  data: ManagementUnitList[]
  meta: Meta
}

export const UseGetManagementUnit = () => {
  const { data, isLoading, isFetching } = useQuery<IManagementUnitResponse>({
    queryKey: ['management-unit'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/profil/unit-pengelola').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { unitUser: data?.data ?? [], loading, meta: data?.meta }
}
