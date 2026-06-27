import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface ISessionProdi {
  id_universitas: string
  nama_universitas: string
  singkatan_universitas: string
  id_fakultas: string
  nama_fakultas: string
  singkatan_fakultas: string
  id_prodi: string
  nama_prodi: string
  singkatan: string
  domain: string
}

export const UseGetProdiSession = () => {
  const { data, isLoading, isFetching } = useQuery<ISessionProdi>({
    queryKey: ['session-prodi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/user-session').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { session: data, loading }
}
