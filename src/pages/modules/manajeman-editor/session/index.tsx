import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface session {
  singkatan_universitas: string
  id_universitas: string
  nama_universitas: string
}

export const UseGetSessionEditor = () => {
  const { data, isLoading, isFetching } = useQuery<session>({
    queryKey: ['session-editor'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/editor/user-session').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { session: data, loading }
}
