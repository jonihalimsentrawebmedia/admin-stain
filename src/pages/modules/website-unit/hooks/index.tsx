import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface ISessionUnit {
  id_universitas: string
  nama_universitas: string
  singkatan_universitas: string
  id_unit: string
  nama_unit: string
  singkatan: string
  domain: string
}

export const UseGetSessionUnit = () => {
  const { data, isLoading, isFetching } = useQuery<ISessionUnit>({
    queryKey: ['session-unit'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/user-session').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { session: data, loading }
}
