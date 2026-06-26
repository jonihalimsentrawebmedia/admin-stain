import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IProcedureText } from './types.tsx'

export const UseGetProcedurePartnership = () => {
  const { data, isFetching, isLoading } = useQuery<IProcedureText>({
    queryKey: ['procedure-partnership'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/pusat-karir/prosedur-pendaftaran-mitra-kerja').then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  return { procedure: data, loading }
}
