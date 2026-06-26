import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface ISessionPMB {
  id_universitas: string
  id_unit: string
  nama_unit: string
  nama_universitas: string
  singkatan: string
  singkatan_universitas: string
  domain: string
}

export const UseGetSessionPMB = () => {
  const { data, isLoading, isFetching } = useQuery<ISessionPMB>({
    queryKey: ['session-pmb'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pmb/user-session').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { session: data, loading }
}
