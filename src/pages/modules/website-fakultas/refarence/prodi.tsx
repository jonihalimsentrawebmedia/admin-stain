import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'

export const UseGetProdiFaculty = () => {
  const { data, isLoading, isFetching } = useQuery<SatuanOrganisasiList[]>({
    queryKey: ['prodi-faculty'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/fakultas/program-studi/satuan-organisasi/program-studi').then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  return { prodiFaculty: data ?? [], loading }
}
