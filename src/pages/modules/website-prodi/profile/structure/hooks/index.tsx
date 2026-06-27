import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { OrganizationalStructure } from '@/pages/modules/website-utama/program-studi/detail/model/organizational-structure.ts'

export const UseGetStructureOrganization = () => {
  const { data, isLoading, isFetching } = useQuery<OrganizationalStructure>({
    queryKey: ['structure-organization'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/prodi/profil/struktur-organisasi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { structure: data, loading }
}
