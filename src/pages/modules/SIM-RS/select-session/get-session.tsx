import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface ISessionSIMRS {
  id_satuan_organisasi: string
  nama_satuan_organisasi: string
  singkatan: string | null
  domain: string
}

export const UseGetSessionSIMRS = () => {
  const { data, isLoading, isFetching } = useQuery<ISessionSIMRS>({
    queryKey: ['session-simrs'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/simrs/user-session').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching
  return { session: data, loading }
}
