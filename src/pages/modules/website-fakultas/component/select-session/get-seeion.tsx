import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface ISessionFaculty {
  id_universitas: string
  id_fakultas: string
  nama_fakultas: string
  nama_universitas: string
  singkatan: string
  singkatan_fakultas: string
  singkatan_universitas: string
  domain: string
}

export const UseGetSessionFaculty = () => {
  const { data, isLoading, isFetching } = useQuery<ISessionFaculty>({
    queryKey: ['session-faculty'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/user-session').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { session: data, loading }
}
