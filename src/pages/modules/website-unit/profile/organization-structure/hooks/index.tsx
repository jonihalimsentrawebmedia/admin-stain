import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface IOrganizationStructure {
  id_satuan_organisasi: string
  id_unit: string
  gambar_struktur_url: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export const UseGetOrganizationStructure = () => {
  const { data, isLoading, isFetching } = useQuery<IOrganizationStructure>({
    queryKey: ['organization-structure'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/unit/profil/struktur-organisasi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { organization: data, loading }
}
